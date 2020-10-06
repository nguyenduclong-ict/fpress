"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_validator_1 = __importDefault(require("async-validator"));
const lodash_1 = require("lodash");
const custom_error_1 = __importDefault(require("../error/custom-error"));
function CreateValidator(rules, options) {
    options = lodash_1.defaultsDeep(options, {
        target: 'body',
        parse: true,
        removeKeys: [],
    });
    let validator;
    if (typeof rules !== 'function') {
        validator = new async_validator_1.default(rules);
    }
    return (req, res, next) => {
        let source = lodash_1.get(req, options.target);
        if (options.parse) {
            try {
                source = JSON.parse(source);
            }
            catch (error) { }
        }
        if (typeof rules === 'function') {
            validator = new async_validator_1.default(rules(source, req, res, next));
        }
        validator.validate(source, (errors, fields) => {
            if (errors) {
                return next(new custom_error_1.default({
                    message: 'VALIDATE ERROR',
                    code: 422,
                    data: errors,
                }));
            }
            else {
                // pass
                if (options.removeKeys.length) {
                    options.removeKeys.forEach((key) => {
                        lodash_1.unset(source, key);
                    });
                }
                if (options.selectKeys) {
                    source = lodash_1.pick(source, ...options.selectKeys);
                }
                lodash_1.set(req, options.target, source);
                next();
            }
        });
    };
}
exports.default = CreateValidator;
