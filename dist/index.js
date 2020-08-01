"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
const crud_1 = __importDefault(require("./server/crud"));
exports.crud = crud_1.default;
const index_1 = __importStar(require("./validator/index"));
exports.CreateValidator = index_1.default;
exports.checks = index_1.checks;
