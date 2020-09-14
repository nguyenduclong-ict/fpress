const Module = require('module');
const path = require('path');
const originalRequire = Module.prototype.require;
module.exports = function registerAlias(alias = packageJson._alias, root) {
    root = root || require.main.path;
    let packageJson;
    try {
        packageJson = require(path.resolve(root, 'package.json'));
    }
    catch (error) { }
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
