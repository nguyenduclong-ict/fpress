const Module = require('module');
const path = require('path');
let packageJson;
try {
    packageJson = require(path.resolve(require.main.path, 'package.json'));
}
catch (error) { }
const originalRequire = Module.prototype.require;
module.exports = function registerAlias(alias = packageJson._alias) {
    Module.prototype.require = function () {
        for (const key in alias) {
            if (alias.hasOwnProperty(key)) {
                const from = key;
                const to = alias[key];
                const rg = new RegExp('^' + from);
                if (rg.test(arguments[0])) {
                    arguments[0] = arguments[0].replace(rg, path.resolve(process.env.ROOT || require.main.path, to));
                    break;
                }
            }
        }
        return originalRequire.apply(this, arguments);
    };
};
