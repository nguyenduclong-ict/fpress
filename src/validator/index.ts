import Schema, { Rules } from 'async-validator'
import { get, defaultsDeep, unset, set, pick } from 'lodash'
import { CustomError } from 'src'

interface Options {
    target: 'body' | 'query'
    parse: boolean
    removeKeys: string[]
    selectKeys: string[]
}

export default function CreateValidator(rules: Rules, options: Options) {
    options = defaultsDeep(options, {
        target: 'body',
        parse: true,
        removeKeys: [],
    })

    return (req, res, next) => {
        let source = get(req, options.target)
        if (options.parse) {
            source = JSON.parse(source)
        }

        let validator
        if (typeof rules === 'function') {
            validator = new Schema((rules as any)(source))
        } else {
            validator = new Schema(rules)
        }

        validator.valiate(source, (errors, fields) => {
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
