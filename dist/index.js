"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
exports.fPress = server_1.default;
const custom_error_1 = __importDefault(require("./error/custom-error"));
exports.CustomError = custom_error_1.default;
const logger_1 = __importDefault(require("./utils/logger"));
exports.logger = logger_1.default;
const mongo_1 = require("./mongo");
exports.Provider = mongo_1.Provider;
