import { Request, Response, NextFunction } from 'express'
import * as checks from './func'
import CustomError from '../error/custom-error'
import * as _ from 'lodash'

function check(schema, data, path = '', errors = []) {
    // tslint:disable-next-line: forin
    for (const key in schema) {
        // function check
        const p = [path, key].filter((e) => !!e).join('.')
        const c = schema[key]
        if (typeof c !== 'function') {
            // if not is function check, check deep
            check(c, _.get(data, key), p, errors)
        } else {
            // if is function check
            errors.push(c(_.get(data, key), p))
        }
    }
    return _.uniq(_.compact(_.flattenDeep(errors)))
}

export default function CreateValidator(
    schema: any,
    target: 'query' | 'body' | 'params'
) {
    return function handle(req: Request, res: Response, next: NextFunction) {
        const data = req[target]
        const errors = check(schema, data)
        if (errors.length) {
            return next(
                new CustomError({ message: errors[0], code: 422, data: errors })
            )
        }
        next()
    }
}

export { checks, check }
