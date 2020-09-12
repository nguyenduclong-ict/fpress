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
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = exports.some = exports.all = exports.Enum = exports.array = exports.object = exports.maxLength = exports.minLength = exports.equal = exports.length = exports.max = exports.min = exports.number = exports.string = exports.required = exports.date = exports.ValidationProvider = void 0;
const _ = __importStar(require("lodash"));
const utils_1 = require("../../utils");
const _1 = require(".");
const utils_2 = require("./utils");
function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
class ValidationProvider {
    constructor(func, isAsync) {
        this.convertFunctions = {
            date: (value) => new Date(value),
            object: (value) => JSON.parse(value),
            array: (value) => JSON.parse(value),
            number: (value) => Number(value),
            string: (value) => String(value),
        };
        this._func = func;
        if (isAsync === undefined) {
            isAsync = utils_1.isAsyncFunction(func);
        }
        this.isAsync = isAsync;
    }
    get func() {
        return (value, path, req) => {
            if (this.optional && (value === undefined || value === null)) {
                return;
            }
            if (this.convert && this.convertFunctions[this.name]) {
                value = this.convertFunctions[this.name](value);
            }
            return this._func.call(this, value, path, req);
        };
    }
    set(options) {
        Object.assign(this, options);
        return this;
    }
}
exports.ValidationProvider = ValidationProvider;
function date() {
    return new ValidationProvider(function (value, path) {
        if (!isValidDate(value)) {
            return `${path} must be date`;
        }
    }).set({ name: 'date' });
}
exports.date = date;
function required() {
    return new ValidationProvider(function (value, path) {
        if (!value) {
            return `${path} required`;
        }
    }).set({ name: 'required' });
}
exports.required = required;
function string() {
    return new ValidationProvider(function (value, path) {
        if (typeof value !== 'string') {
            return `{${path}} must be a string`;
        }
    }).set({ name: 'string' });
}
exports.string = string;
function number() {
    return new ValidationProvider(function (value, path) {
        if (typeof value !== 'number') {
            return `{${path}} must be a number`;
        }
    }).set({ name: 'number' });
}
exports.number = number;
function min(m) {
    return all(number(), new ValidationProvider(function (value, path) {
        if (value < m) {
            return `{${path}} min is ${m}`;
        }
    })).set({ stop: true, name: 'min' });
}
exports.min = min;
function max(m) {
    return all(number(), new ValidationProvider(function (value, path) {
        if (value > m) {
            return `{${path}} max is ${m}`;
        }
    })).set({ stop: true, name: 'max' });
}
exports.max = max;
function length(length) {
    return all(some(string(), array()), new ValidationProvider(function (value, path) {
        if (!(value === null || value === void 0 ? void 0 : value.length) || value.length !== length) {
            return `{${path}} length must be ${length}`;
        }
    })).set({ stop: true, name: 'length' });
}
exports.length = length;
function equal(data) {
    return new ValidationProvider(function (value, path) {
        if (!_.isEqual(data, value)) {
            return `{${path}} length must be ${length}`;
        }
    }).set({ name: 'equal' });
}
exports.equal = equal;
function minLength(length) {
    return all(some(string(), array()), new ValidationProvider(function (value, path) {
        if (!value || value.length < length) {
            return `{${path}} minLength is ${length}`;
        }
    })).set({ stop: true, name: 'minLength' });
}
exports.minLength = minLength;
function maxLength(length) {
    return all(some(string(), array()), new ValidationProvider(function (value, path) {
        if (!value || value.length > length) {
            return `{${path}} maxLength is ${length}`;
        }
    })).set({ stop: true, name: 'maxLength' });
}
exports.maxLength = maxLength;
function object() {
    return new ValidationProvider(function (value, path) {
        if (!_.isObject(value)) {
            return `{${path}} must be a object`;
        }
    }).set({ name: 'object' });
}
exports.object = object;
function array(schema) {
    return new ValidationProvider(function (value, path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(value)) {
                return `{${path}} must be a array`;
            }
            if (schema) {
                const errors = yield Promise.all(value.map((item, index) => _1.check(schema, item, `${path}[${index}]`)));
                return _.flatMap(errors.filter(utils_2.hasError));
            }
        });
    }).set({ name: 'array', isAsync: true });
}
exports.array = array;
function Enum(...list) {
    return new ValidationProvider(function (value, path) {
        if (!list.find((item) => _.isEqual(item, value))) {
            return `{${path}} must be in [${list
                .map((e) => JSON.stringify(e))
                .join(',')}]`.replace(/\"/g, "'");
        }
    }).set({ name: 'enum' });
}
exports.Enum = Enum;
// Check and return all error
function all(...checks) {
    return new ValidationProvider(function (value, path, req) {
        return __awaiter(this, void 0, void 0, function* () {
            checks.forEach((check) => {
                if (check.convert === undefined) {
                    check.convert = this.convert;
                }
            });
            if (!this.stop) {
                const errors = yield Promise.all(checks.map((check) => {
                    if (!check.isAsync) {
                        return Promise.resolve(check.func(value, path, req));
                    }
                    else {
                        return check.func(value, path, req);
                    }
                }));
                return _.flatMap(errors.filter(utils_2.hasError));
            }
            else {
                try {
                    yield Promise.all(checks.map((check) => __awaiter(this, void 0, void 0, function* () {
                        let error;
                        if (check.isAsync) {
                            error = yield check.func(value, path, req);
                        }
                        else {
                            error = check.func(value, path, req);
                        }
                        if (utils_2.hasError(error)) {
                            const e = new Error();
                            e.data = error;
                            throw e;
                        }
                    })));
                }
                catch (error) {
                    return error.data;
                }
            }
        });
    }).set({ name: 'all', isAsync: true });
}
exports.all = all;
// Check and return first error
function some(...checks) {
    return new ValidationProvider(function (value, path, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield Promise.all(checks.map((check) => {
                if (!check.isAsync) {
                    return Promise.resolve(check.func(value, path, req));
                }
                else {
                    return check.func(value, path, req);
                }
            }));
            if (errors.findIndex((e) => !utils_2.hasError(e)) < 0) {
                return _.flatMap(errors.filter((e) => utils_2.hasError(e))).join(' or ');
            }
        });
    }).set({ name: 'some', isAsync: true });
}
exports.some = some;
// Check and return first error
function custom(func) {
    return new ValidationProvider(func, utils_1.isAsyncFunction(func));
}
exports.custom = custom;
