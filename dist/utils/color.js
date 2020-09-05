"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomColor = exports.getColor = void 0;
const sample_1 = __importDefault(require("lodash/sample"));
const colors_1 = __importDefault(require("./constants/colors"));
function getColor(name, range = '500') {
    return colors_1.default[name][range] || colors_1.default[name];
}
exports.getColor = getColor;
function randomColor() {
    return getColor(sample_1.default(Object.entries(colors_1.default).map((c) => c[0])));
}
exports.randomColor = randomColor;
