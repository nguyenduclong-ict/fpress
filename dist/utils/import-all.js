"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 *
 * @param path path to file directory
 */
function importAll(path, regex = /.*/) {
    const modules = [];
    const stats = fs_1.default.statSync(path);
    if (stats.isFile() && regex.test(path_1.default.basename(path))) {
        const ext = path_1.default.extname(path);
        modules.push({
            ext,
            path,
            name: path_1.default.basename(path, ext),
            originName: path_1.default.basename(path),
            module: require(path),
        });
    }
    if (stats.isDirectory()) {
        fs_1.default.readdirSync(path).forEach((f) => {
            modules.push(...importAll(path_1.default.join(path, f), regex));
        });
    }
    return modules;
}
exports.default = importAll;
