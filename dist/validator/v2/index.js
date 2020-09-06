"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const _ = __importStar(require("lodash"));
const provider_1 = require("./provider");
const custom_error_1 = __importDefault(require("../../error/custom-error"));
const utils_1 = require("./utils");
const utils_2 = require("../../utils");
function check(schema, data = {}, path = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = [];
        Object.keys(schema).forEach((key) => {
            const itemPath = [path, key].filter((item) => !!item).join('.');
            const value = data[key];
            const provider = schema[key];
            if (provider instanceof provider_1.ValidationProvider) {
                tasks.push(new Promise((rs) => {
                    if (provider.isAsync || utils_2.isAsyncFunction(provider.func)) {
                        // @ts-ignore
                        provider.func(value, itemPath).then(rs);
                    }
                    else {
                        rs(provider.func(value, itemPath));
                    }
                }));
            }
            else {
                tasks.push(check(provider, value, itemPath));
            }
        });
        let errors = yield Promise.all(tasks);
        return _.flatMap(errors.filter(utils_1.hasError));
    });
}
exports.check = check;
function CreateValidator(schema, options) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        options = _.defaultsDeep(options || {}, {
            convert: false,
            target: 'body',
        });
        const data = options.convert
            ? JSON.parse(req[options.target])
            : req[options.target];
        const errors = yield check(schema, data);
        if (errors.length) {
            return next(new custom_error_1.default({
                message: 'VALIDATE ERROR',
                code: 422,
                data: errors,
            }));
        }
        next();
    });
}
exports.default = CreateValidator;
