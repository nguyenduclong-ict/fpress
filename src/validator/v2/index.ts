import * as _ from 'lodash'
import { ValidationSchema, ValidationProvider } from './provider'
import CustomError from '../../error/custom-error'
import { hasError } from './utils'
import { isAsyncFunction } from '../../utils'

export async function check(
    schema: ValidationSchema,
    data = {},
    path = '',
    req?
) {
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
                        provider.func(value, itemPath, req).then(rs)
                    } else {
                        rs(provider.func(value, itemPath, req))
                    }
                })
            )
        } else if (provider) {
            tasks.push(check(provider, value, itemPath, req))
        }
    })

    let errors = await Promise.all(tasks)
    return _.flatMap(errors.filter(hasError))
}

interface CreateValidatorOptions {
    convert: boolean
    target: 'body' | 'query' | 'param'
    pick: string | string[]
    delete: string | string[]
}

export default function CreateValidator(
    schema: ValidationSchema,
    options: CreateValidatorOptions
) {
    return async (req, res, next) => {
        // Init default options
        options = _.defaultsDeep(options || {}, {
            convert: false,
            target: 'body',
        })

        const data = options.convert
            ? JSON.parse(req[options.target])
            : req[options.target]
        const errors = await check(schema, data, '', req)

        if (errors.length) {
            return next(
                new CustomError({
                    message: 'VALIDATE ERROR',
                    code: 422,
                    data: errors,
                })
            )
        }

        // pick and delete
        if (options.pick) {
            req[options.target] = _.pick(
                req[options.target],
                ...getArr(options.pick)
            )
        }

        if (options.delete) {
            req[options.target] = _.omit(
                req[options.target],
                ...getArr(options.delete)
            )
        }

        next()
    }
}

function getArr(data, separator = ',') {
    if (typeof data === 'string') {
        return data.split(separator)
    }
    if (Array.isArray(data)) {
        return data
    }
    return [data]
}
