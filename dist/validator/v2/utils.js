"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasError = void 0;
function hasError(data) {
    return Array.isArray(data) ? data.length : !!data;
}
exports.hasError = hasError;
