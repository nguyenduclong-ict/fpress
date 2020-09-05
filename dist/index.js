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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAll = exports.getColor = exports.randomColor = exports.importAll = exports.registerAlias = exports.crud = exports.CreateValidator = exports.checks = exports.Provider = exports.logger = exports.fPress = exports.CustomError = void 0;
const server_1 = __importDefault(require("./server"));
exports.fPress = server_1.default;
const custom_error_1 = __importDefault(require("./error/custom-error"));
exports.CustomError = custom_error_1.default;
const logger_1 = __importDefault(require("./utils/logger"));
exports.logger = logger_1.default;
const mongo_1 = require("./mongo");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return mongo_1.Provider; } });
const crud_1 = __importDefault(require("./server/crud"));
exports.crud = crud_1.default;
const index_1 = __importStar(require("./validator/index"));
exports.CreateValidator = index_1.default;
Object.defineProperty(exports, "checks", { enumerable: true, get: function () { return index_1.checks; } });
const alias_1 = __importDefault(require("./alias"));
exports.registerAlias = alias_1.default;
const utils_1 = require("./utils");
Object.defineProperty(exports, "getColor", { enumerable: true, get: function () { return utils_1.getColor; } });
Object.defineProperty(exports, "importAll", { enumerable: true, get: function () { return utils_1.importAll; } });
Object.defineProperty(exports, "randomColor", { enumerable: true, get: function () { return utils_1.randomColor; } });
Object.defineProperty(exports, "requireAll", { enumerable: true, get: function () { return utils_1.requireAll; } });
