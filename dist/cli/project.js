"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const logger_1 = __importDefault(require("../utils/logger"));
const ora_1 = __importDefault(require("ora"));
const EXAMPLE_PROJECT = 'https://github.com/nguyenduclong-ict/fpress-js-example.git';
function default_1(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!projectName) {
            return logger_1.default.error('Missing project name');
        }
        // Save current dir
        const CURRENT_DIR = process.cwd();
        const PROJECT_DIR = path_1.default.join(CURRENT_DIR, projectName);
        const TMP_DIR = path_1.default.join('/tmp', projectName);
        let loading = ora_1.default('Prepare project...').start();
        try {
            yield execPromise(`
            rm -rf ${TMP_DIR}
            git clone ${EXAMPLE_PROJECT} ${TMP_DIR}
            cd ${TMP_DIR} && 
            rm -rf .git && 
            git init && 
            yarn init -y
            `);
            // modify package.json
            const packageJson = require(`/tmp/${projectName}/package.json`);
            packageJson.name = projectName;
            fs_1.default.writeFileSync(`/tmp/${projectName}/package.json`, JSON.stringify(packageJson, null, 4));
            loading.succeed();
            // Install dependencies
            loading.text = 'Install dependencies...';
            loading.start();
            yield execPromise(`cd ${TMP_DIR} && yarn`);
            loading.succeed();
            // Copy project to work dir
            yield execPromise(`mv ${TMP_DIR} ${PROJECT_DIR}`);
        }
        catch (error) {
            loading.color = 'red';
            loading.succeed();
            return logger_1.default.error(error);
        }
        logger_1.default.info('Create Project Success');
    });
}
exports.default = default_1;
function execPromise(command) {
    return new Promise((resolve, reject) => {
        child_process_1.exec(command, (err, stdout) => {
            if (err)
                return reject(err);
            resolve(stdout);
        });
    });
}
