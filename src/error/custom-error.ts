export default class CustomError extends Error {
    code: number
    data: any
    type
    constructor({
        message = '',
        code = 500,
        data = null,
        type = 'CustomError',
    }) {
        super(message)
        this.code = code
        this.data = data
        this.type = type
    }
}
