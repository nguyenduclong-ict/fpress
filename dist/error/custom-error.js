"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor({ message = '', code = 500, data = null, type = 'CustomError', }) {
        super(message);
        this.code = code;
        this.data = data;
        this.type = type;
    }
}
exports.default = CustomError;
