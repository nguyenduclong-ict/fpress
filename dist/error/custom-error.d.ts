export default class CustomError extends Error {
    code: number;
    data: any;
    constructor({ message, code, data }: {
        message?: string;
        code?: number;
        data?: any;
    });
}
