import Schema, { Rules } from 'async-validator'
import { get, defaultsDeep, unset, set, pick } from 'lodash'
import CustomError from '../error/custom-error'

interface Options {
    target: 'body' | 'query'
    parse: boolean
    removeKeys: string[]
    selectKeys: string[]
}

export default function CreateValidator(
    rules: Rules | ((source, req, res, next) => Rules),
    options: Options
) {
    options = defaultsDeep(options, {
        target: 'body',
        parse: true,
        removeKeys: [],
    })

    let validator

    if (typeof rules !== 'function') {
        validator = new Schema(rules)
    }

    return (req, res, next) => {
        let source = get(req, options.target)

        if (options.parse) {
            try {
                source = JSON.parse(source)
            } catch (error) {}
        }

        if (typeof rules === 'function') {
            validator = new Schema((rules as any)(source, req, res, next))
        }

        validator.validate(source, (errors, fields) => {
            if (errors) {
                return next(
                    new CustomError({
                        message: 'VALIDATE ERROR',
                        code: 422,
                        data: errors,
                    })
                )
            } else {
                // pass
                if (options.removeKeys.length) {
                    options.removeKeys.forEach((key) => {
                        unset(source, key)
                    })
                }
                if (options.selectKeys) {
                    source = pick(source, ...options.selectKeys)
                }

                set(req, options.target, source)
                next()
            }
        })
    }
}
