"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
exports.default = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    getCurrentDir() {
        return process.cwd();
    },
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },
};
