"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRouter = void 0;
const fs = require('fs');
const Path = require('path');
const logger_1 = __importDefault(require("../utils/logger"));
const files_1 = __importDefault(require("./files"));
const ROUTER_FILE = `
const express = require('express')
const router = express.Router()
const validator = require("./validator");
// ------- Declare router -------

// ------------------------------
module.exports = router;
`.trim();
const VALIDATOR_FILE = `
const { CreateValidator, checks: c } = require("fpress");
module.exports.ValidateBody = CreateValidator({}, "body");
`.trim();
function generateRouter(path = '') {
    const routerPath = Path.join(files_1.default.getCurrentDir(), 'routes', path);
    if (fs.existsSync(routerPath)) {
        logger_1.default.error('router', routerPath, 'exists');
        return;
    }
    fs.mkdirSync(routerPath, { recursive: true });
    fs.writeFileSync(routerPath + '/router.js', ROUTER_FILE);
    fs.writeFileSync(routerPath + '/validator.js', VALIDATOR_FILE);
}
exports.generateRouter = generateRouter;
