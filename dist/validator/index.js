"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const func_1 = require("./func");
const custom_error_1 = __importDefault(require("../error/custom-error"));
function default_1(schema, target) {
    return function handle(req, res, next) {
        const data = req[target];
        const errors = func_1.check(schema, data);
        if (errors.length) {
            return next(new custom_error_1.default({ message: errors[0], code: 422, data: errors }));
        }
        next();
    };
}
exports.default = default_1;
