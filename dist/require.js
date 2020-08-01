"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = __importDefault(require("module"));
const path_1 = __importDefault(require("path"));
const packageJson = require(path_1.default.resolve(require.main.path, 'package.json'));
const originalRequire = module_1.default.prototype.require;
function registerAlias(alias = packageJson._alias) {
    module_1.default.prototype.require = function () {
        for (const key in alias) {
            if (alias.hasOwnProperty(key)) {
                const from = key;
                const to = alias[key];
                const rg = new RegExp('^' + from);
                if (rg.test(arguments[0])) {
                    arguments[0] = arguments[0].replace(rg, path_1.default.resolve(process.env.ROOT || require.main.path, to));
                    break;
                }
            }
        }
        return originalRequire.apply(this, arguments);
    };
}
exports.registerAlias = registerAlias;
