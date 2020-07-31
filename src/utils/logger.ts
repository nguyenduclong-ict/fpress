import chalk from 'chalk'
const log = (text, color, ...args) => console.log(chalk[color](text), ...args)

export default {
    log(...args) {
        console.log(chalk.white('[LOG]'), ...args)
    },
    info(...args) {
        console.log(chalk.green('[INFO]'), ...args)
    },
    warning(...args) {
        console.log(chalk.yellow('[WARN]'), ...args)
    },
    error(...args) {
        console.log(chalk.red('[ERROR]'), ...args)
    },
    custom: {
        info: (text, ...args) => log(text, 'green', ...args),
        warning: (text, ...args) => log(text, 'yellow', ...args),
        error: (text, ...args) => log(text, 'red', ...args),
    },
}
