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
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = exports.any = exports.all = exports.equal = exports.inList = exports.maxLength = exports.minLength = exports.max = exports.min = exports.date = exports.array = exports.object = exports.number = exports.string = exports.required = void 0;
const _ = __importStar(require("lodash"));
function required(v, p) {
    if (!!v) {
        return `{${p}} required`;
    }
    return;
}
exports.required = required;
function string(v, p) {
    if (typeof v !== 'string') {
        return `{${p}} must be a string`;
    }
    return;
}
exports.string = string;
function number(v, p) {
    if (typeof v !== 'number') {
        return `{${p}} must be a number`;
    }
    return;
}
exports.number = number;
function object(v, p) {
    if (!_.isObject(v)) {
        return `{${p}} must be a object`;
    }
    return;
}
exports.object = object;
function array(v, p) {
    if (!_.isArray(v)) {
        return `{${p}} must be an array`;
    }
    return;
}
exports.array = array;
function date(v, p) {
    if (!_.isDate(v)) {
        return `{${p}} must be a date`;
    }
    return;
}
exports.date = date;
function min(minValue) {
    return function (v, p) {
        return [
            number(v, p),
            Number(v) < Number(minValue) ? `{${p}} min is ${minValue}` : null,
        ].filter((e) => !!e);
    };
}
exports.min = min;
function max(maxValue) {
    return function (v, p) {
        return [
            number(v, p),
            Number(v) < Number(maxValue) ? `{${p}} max is ${maxValue}` : null,
        ].filter((e) => !!e);
    };
}
exports.max = max;
function minLength(minValue) {
    return function (v, p) {
        return [
            !(typeof v === 'string' || _.isArray(v))
                ? `{${p}} must be a string or array to check length`
                : null,
            v.length < minValue ? `{${p}} min is ${minValue}` : null,
        ].filter((e) => !!e);
    };
}
exports.minLength = minLength;
function maxLength(maxValue) {
    return function (v, p) {
        return [
            !(typeof v === 'string' || _.isArray(v))
                ? `{${p}} must be a string or array to check length`
                : null,
            v.length > maxValue ? `{${p}} max is ${maxValue}` : null,
        ].filter((e) => !!e);
    };
}
exports.maxLength = maxLength;
function inList(...values) {
    return function (v, p) {
        if (values.every((val) => val !== v)) {
            return `{${p}} not match any value in list`;
        }
    };
}
exports.inList = inList;
function equal(value) {
    return function (v, p) {
        if (value !== v) {
            return `{${p}} must equal to ${value}`;
        }
    };
}
exports.equal = equal;
function all(...checks) {
    return function (v, p) {
        return checks.map((c) => c(v, p)).filter((e) => !!e);
    };
}
exports.all = all;
function any(...checks) {
    return function (v, p) {
        return checks.map((c) => c(v, p)).find((e) => !!e);
    };
}
exports.any = any;
/**
 * check v at leatest is instance of types
 * @param v variable
 * @param types type for check
 */
function is(v, ...types) {
    return types.some((t) => v instanceof t);
}
exports.is = is;
