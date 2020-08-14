const path = require('path')
const fs = require('fs')
class Module {
    dir = ''
    path = ''
    exports
}

export function requireAll(directory, currentDeep = 0, maxDeep = 1) {
    const modules: Module[] = []
    if (!path.isAbsolute(directory)) {
        directory = path.resolve(require.main.path, directory)
    }
    const stats = fs.statSync(directory)
    if (stats.isFile()) {
        modules.push({
            path: directory,
            dir: path.dirname(directory),
            exports: require(directory),
        })
    } else if (currentDeep < maxDeep) {
        fs.readdirSync(directory).forEach((f) => {
            modules.push(
                ...requireAll(
                    path.resolve(directory, f),
                    currentDeep + 1,
                    maxDeep
                )
            )
        })
    }
    return modules
}
