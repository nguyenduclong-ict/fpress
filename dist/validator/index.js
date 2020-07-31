"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checks = __importStar(require("./func"));
exports.checks = checks;
const custom_error_1 = __importDefault(require("../error/custom-error"));
function default_1(schema, target) {
    return function handle(req, res, next) {
        const data = req[target];
        const errors = checks.check(schema, data);
        if (errors.length) {
            return next(new custom_error_1.default({ message: errors[0], code: 422, data: errors }));
        }
        next();
    };
}
exports.default = default_1;
