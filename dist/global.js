const Module = require('module');
const originalRequire = Module.prototype.require;
// Require
Module.prototype.require = function () {
    arguments[0] = arguments[0].replace(/^@/g, process.env.ROOT);
    return originalRequire.apply(this, arguments);
};
// Lodash
global._ = require('lodash');
