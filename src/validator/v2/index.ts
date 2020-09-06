import * as _ from 'lodash'
import { ValidationSchema, ValidationProvider } from './provider'
import CustomError from '../../error/custom-error'
import { hasError } from './utils'
import { isAsyncFunction } from '../../utils'

export async function check(schema: ValidationSchema, data = {}, path = '') {
    const tasks = []
    Object.keys(schema).forEach((key: string) => {
        const itemPath = [path, key].filter((item) => !!item).join('.')
        const value = data[key]
        const provider = schema[key]
        if (provider instanceof ValidationProvider) {
            tasks.push(
                new Promise((rs) => {
                    if (provider.isAsync || isAsyncFunction(provider.func)) {
                        // @ts-ignore
                        provider.func(value, itemPath).then(rs)
                    } else {
                        rs(provider.func(value, itemPath))
                    }
                })
            )
        } else {
            tasks.push(check(provider, value, itemPath))
        }
    })

    let errors = await Promise.all(tasks)
    return _.flatMap(errors.filter(hasError))
}

interface CreateValidatorOptions {
    convert: boolean
    target: 'body' | 'query' | 'param'
}

export default function CreateValidator(
    schema: ValidationSchema,
    options: CreateValidatorOptions
) {
    return async (req, res, next) => {
        options = _.defaultsDeep(options || {}, {
            convert: false,
            target: 'body',
        })
        const data = options.convert
            ? JSON.parse(req[options.target])
            : req[options.target]
        const errors = await check(schema, data)
        if (errors.length) {
            return next(
                new CustomError({
                    message: 'VALIDATE ERROR',
                    code: 422,
                    data: errors,
                })
            )
        }
        next()
    }
}