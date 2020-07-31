export default class CustomError extends Error {
    code: number
    data: any
    constructor({ message = '', code = 500, data = null }) {
        super(message)
        this.code = code
        this.data = data
    }
}
