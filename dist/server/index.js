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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _services;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const logger_1 = __importDefault(require("../utils/logger"));
const router_1 = __importDefault(require("./router"));
const import_all_1 = __importDefault(require("../utils/import-all"));
const files_1 = __importDefault(require("../cli/files"));
const custom_error_1 = __importStar(require("../error/custom-error"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class FPress {
    constructor() {
        _services.set(this, []);
    }
    create(server, app) {
        this.app = app || express_1.default();
        this.server = server || http_1.default.createServer(this.app);
        return this;
    }
    registerService(service) {
        __classPrivateFieldGet(this, _services).push(service);
        return this;
    }
    registerAllService(path) {
        path = path || files_1.default.getCurrentDir() + '/services';
        const modules = import_all_1.default(path, /.+.service..+/);
        modules.forEach(({ module }) => this.registerService(module));
        return this;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Service
            yield Promise.all(__classPrivateFieldGet(this, _services).map((s) => s.apply(null, this.server, this.app)));
            logger_1.default.info('Services start complete!');
            // Router
            this.app.use(cors_1.default());
            this.app.use(morgan_1.default('dev'));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            if (process.env.STATIC_PATH) {
                this.app.use(express_1.default.static(process.env.STATIC_PATH));
            }
            // ROUTER
            router_1.default(this.app);
            // Handle Error
            this.app.use((error, req, res, next) => {
                if (error) {
                    logger_1.default.custom.error('[ROUTER ERORR]', error);
                    const code = custom_error_1.formatErrorCode(error.code);
                    if (error instanceof custom_error_1.default) {
                        return res.status(code).json({
                            status: 'error',
                            code,
                            message: error.message,
                            errors: error.data,
                            type: error.type,
                        });
                    }
                    else {
                        return res.status(code).json(Object.assign({ status: 'error', code, message: error.message }, error));
                    }
                }
                next();
            });
            // Start server
            const port = Number(process.env.PORT || Math.floor(Math.random() * 65536));
            const host = process.env.HOST || 'localhost';
            this.server.listen(port, host, () => {
                logger_1.default.info(`Server listen on port ${host}:${port}`);
            });
        });
    }
}
_services = new WeakMap();
exports.default = new FPress();
