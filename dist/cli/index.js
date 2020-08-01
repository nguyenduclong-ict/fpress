#!/usr/bin/env node
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
const figlet_1 = __importDefault(require("figlet"));
const logger_1 = __importDefault(require("../utils/logger"));
const router_1 = require("./router");
const model_1 = require("./model");
const project_1 = __importDefault(require("./project"));
let command = process.argv[2];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield showLogo();
        const commands = [
            {
                name: 'generate',
                keys: ['g', 'generate'],
                callback: generate,
            },
            {
                name: 'init',
                keys: ['init'],
                callback: initProject,
            },
        ];
        const exe = commands.find((cmd) => cmd.keys.includes(command));
        if (exe) {
            exe.callback();
        }
    });
}
function showLogo() {
    return new Promise((resolve) => {
        figlet_1.default('FPRESS', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data);
            resolve();
        });
    });
}
// GENERATE
function generate() {
    const type = process.argv[3];
    const name = process.argv[4];
    if (type === 'router') {
        router_1.generateRouter(name);
    }
    if (type === 'model') {
        model_1.generateModel(name);
    }
}
// INIT NEW PROJECT
function initProject() {
    const name = process.argv[3];
    logger_1.default.info('Init new project', name);
    project_1.default(name);
}
main();
