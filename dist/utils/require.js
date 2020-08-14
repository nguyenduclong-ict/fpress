"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
class Module {
    constructor() {
        this.dir = '';
        this.path = '';
    }
}
function requireAll(directory, currentDeep = 0, maxDeep = 1) {
    const modules = [];
    if (!path.isAbsolute(directory)) {
        directory = path.resolve(require.main.path, directory);
    }
    const stats = fs.statSync(directory);
    if (stats.isFile()) {
        modules.push({
            path: directory,
            dir: path.dirname(directory),
            exports: require(directory),
        });
    }
    else if (currentDeep < maxDeep) {
        fs.readdirSync(directory).forEach((f) => {
            modules.push(...requireAll(path.resolve(directory, f), currentDeep + 1, maxDeep));
        });
    }
    return modules;
}
exports.requireAll = requireAll;
