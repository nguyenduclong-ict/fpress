export default class CustomError extends Error {
    code: number;
    data: any;
    type: any;
    constructor({ message, code, data, type, }: {
        message?: string;
        code?: number;
        data?: any;
        type?: string;
    });
}
