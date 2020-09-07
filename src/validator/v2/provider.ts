import * as _ from 'lodash'
import { isAsyncFunction } from '../../utils'
import { check } from '.'
import { hasError } from './utils'

type CheckFunction = (
    value,
    path,
    req?
) => Promise<string | string[]> | string | string[]

function isValidDate(d) {
    return d instanceof Date && !isNaN(d as any)
}

export class ValidationProvider {
    _func: CheckFunction
    isAsync
    stop
    name: ''
    optional: false
    convert

    convertFunctions = {
        date: (value) => new Date(value),
        object: (value) => JSON.parse(value),
        array: (value) => JSON.parse(value),
        number: (value) => Number(value),
        string: (value) => String(value),
    }

    constructor(func: CheckFunction, isAsync?) {
        this._func = func
        if (isAsync === undefined) {
            isAsync = isAsyncFunction(func)
        }
        this.isAsync = isAsync
    }

    public get func(): CheckFunction {
        return (value, path, req) => {
            if (value === undefined) {
                return
            }
            if (this.convert) {
            }
            return this._func.call(this, value, path, req)
        }
    }

    set(options) {
        Object.assign(this, options)
        return this
    }
}

export interface ValidationSchema {
    [x: string]: ValidationProvider | ValidationSchema
}

export function date() {
    return new ValidationProvider(function (value, path) {
        if (!isValidDate(value)) {
            return `${path} must be date`
        }
    }).set({ name: 'date' })
}

export function required() {
    return new ValidationProvider(function (value, path) {
        if (!value) {
            return `${path} required`
        }
    }).set({ name: 'required' })
}
export function string() {
    return new ValidationProvider(function (value, path) {
        if (typeof value !== 'string') {
            return `{${path}} must be a string`
        }
    }).set({ name: 'string' })
}

export function number() {
    return new ValidationProvider(function (value, path) {
        if (typeof value !== 'number') {
            return `{${path}} must be a number`
        }
    }).set({ name: 'number' })
}

export function min(m) {
    return all(
        number(),
        new ValidationProvider(function (value, path) {
            if (value < m) {
                return `{${path}} min is ${m}`
            }
        })
    ).set({ stop: true, name: 'min' })
}

export function max(m) {
    return all(
        number(),
        new ValidationProvider(function (value, path) {
            if (value > m) {
                return `{${path}} max is ${m}`
            }
        })
    ).set({ stop: true, name: 'max' })
}

export function length(length) {
    return all(
        some(string(), array()),
        new ValidationProvider(function (value, path) {
            if (!value?.length || value.length !== length) {
                return `{${path}} length must be ${length}`
            }
        })
    ).set({ stop: true, name: 'length' })
}

export function equal(data) {
    return new ValidationProvider(function (value, path) {
        if (!_.isEqual(data, value)) {
            return `{${path}} length must be ${length}`
        }
    }).set({ name: 'equal' })
}

export function minLength(length) {
    return all(
        some(string(), array()),
        new ValidationProvider(function (value, path) {
            if (!value || value.length < length) {
                return `{${path}} minLength is ${length}`
            }
        })
    ).set({ stop: true, name: 'minLength' })
}

export function maxLength(length) {
    return all(
        some(string(), array()),
        new ValidationProvider(function (value, path) {
            if (!value || value.length > length) {
                return `{${path}} maxLength is ${length}`
            }
        })
    ).set({ stop: true, name: 'maxLength' })
}

export function object() {
    return new ValidationProvider(function (value, path) {
        if (!_.isObject(value)) {
            return `{${path}} must be a object`
        }
    }).set({ name: 'object' })
}

export function array(schema?) {
    return new ValidationProvider(async function (value, path) {
        if (!Array.isArray(value)) {
            return `{${path}} must be a array`
        }
        if (schema) {
            const errors = await Promise.all(
                value.map((item, index) =>
                    check(schema, item, `${path}[${index}]`)
                )
            )
            return _.flatMap(errors.filter(hasError))
        }
    }).set({ name: 'array', isAsync: true })
}

export function Enum(...list) {
    return new ValidationProvider(function (value, path) {
        if (!list.find((item) => _.isEqual(item, value))) {
            return `{${path}} must be in [${list
                .map((e) => JSON.stringify(e))
                .join(',')}]`.replace(/\"/g, "'")
        }
    }).set({ name: 'enum' })
}

// Check and return all error
export function all(...checks: ValidationProvider[]) {
    return new ValidationProvider(async function (value, path, req) {
        checks.forEach((check) => {
            if (check.convert === undefined) {
                check.convert = this.convert
            }
        })
        if (!this.stop) {
            const errors = await Promise.all(
                checks.map((check) => {
                    if (!check.isAsync) {
                        return Promise.resolve(check.func(value, path, req))
                    } else {
                        return check.func(value, path, req)
                    }
                })
            )
            return _.flatMap(errors.filter(hasError))
        } else {
            try {
                await Promise.all(
                    checks.map(async (check) => {
                        let error
                        if (check.isAsync) {
                            error = await check.func(value, path, req)
                        } else {
                            error = check.func(value, path, req)
                        }
                        if (hasError(error)) {
                            const e = new Error() as any
                            e.data = error
                            throw e
                        }
                    })
                )
            } catch (error) {
                return error.data
            }
        }
    }).set({ name: 'all', isAsync: true })
}

// Check and return first error
export function some(...checks) {
    return new ValidationProvider(async function (value, path, req) {
        const errors = await Promise.all(
            checks.map((check) => {
                if (!check.isAsync) {
                    return Promise.resolve(check.func(value, path, req))
                } else {
                    return check.func(value, path, req)
                }
            })
        )
        if (errors.findIndex((e) => !hasError(e)) < 0) {
            return _.flatMap(errors.filter((e) => hasError(e))).join(' or ')
        }
    }).set({ name: 'some', isAsync: true })
}

// Check and return first error
export function custom(func: CheckFunction) {
    return new ValidationProvider(func, isAsyncFunction(func))
}
