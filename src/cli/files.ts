const fs = require('fs')
const path = require('path')

export default {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd())
    },

    getCurrentDir() {
        return process.cwd()
    },

    directoryExists: (filePath) => {
        return fs.existsSync(filePath)
    },
}
