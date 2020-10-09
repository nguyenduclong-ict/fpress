"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorCode = void 0;
const MESSAGES = {
    400: 'Bad Request',
    401: 'Vui lòng đăng nhập',
    402: 'Payment Required',
    403: 'Không đủ quyền truy cập',
    404: 'Không tồn tại',
    405: 'Method Not Allowed',
    409: 'Conflict',
    411: 'Length Required',
    422: 'Dữ liệu không đúng định dạng',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
};
class CustomError extends Error {
    constructor({ message = '', code = 500, data = null, type = 'CustomError', }) {
        super(message || MESSAGES[code]);
        this.code = code;
        this.data = data;
        this.type = type;
    }
}
exports.default = CustomError;
exports.formatErrorCode = (code) => {
    code = code || 500;
    if (code < 100 || code > 599) {
        code = 500;
    }
};
