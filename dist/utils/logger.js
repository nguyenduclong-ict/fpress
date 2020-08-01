"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const log = (text, color, ...args) => console.log(chalk_1.default[color](text), ...args);
exports.default = {
    log(...args) {
        console.log(chalk_1.default.white('[LOG]'), ...args);
    },
    info(...args) {
        console.log(chalk_1.default.green('[INFO]'), ...args);
    },
    warning(...args) {
        console.log(chalk_1.default.yellow('[WARN]'), ...args);
    },
    error(...args) {
        console.log(chalk_1.default.red('[ERROR]'), ...args);
    },
    custom: {
        info: (text, ...args) => log(text, 'green', ...args),
        warning: (text, ...args) => log(text, 'yellow', ...args),
        error: (text, ...args) => log(text, 'red', ...args),
    },
    color: (color) => (...args) => {
        console.log(chalk_1.default[color](...args));
    },
};
