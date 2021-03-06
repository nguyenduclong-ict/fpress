"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_all_1 = __importDefault(require("../utils/import-all"));
const logger_1 = __importDefault(require("../utils/logger"));
function default_1(app, routerPath) {
    routerPath = routerPath || process.env.ROUTER_PATH;
    if (!routerPath)
        throw new Error('routerPath not found!');
    logger_1.default.custom.info('** Generate Router **');
    const moudles = import_all_1.default(routerPath, /router.js$/);
    moudles.forEach((element) => {
        const alias = element.module.path ||
            element.path
                .replace(routerPath, '')
                .replace(/\.*router.js$/, '') // replace a.router.js to a/
                .replace(/\/*$/, '') // replace a// to a/
                .replace(/^$/, '/'); // replace '' to '/'
        logger_1.default.custom.info('=>', alias);
        app.use(alias, element.module);
    });
    logger_1.default.custom.info('** Generate router success! **');
}
exports.default = default_1;
