import { Request, Response, NextFunction } from 'express'
import * as checks from './func'
import CustomError from '../error/custom-error'

export default function (schema: any, target: 'query' | 'body' | 'params') {
    return function handle(req: Request, res: Response, next: NextFunction) {
        const data = req[target]
        const errors = checks.check(schema, data)
        if (errors.length) {
            return next(
                new CustomError({ message: errors[0], code: 422, data: errors })
            )
        }
        next()
    }
}

export { checks }
