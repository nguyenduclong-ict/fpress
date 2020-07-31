import files from './files'
import figlet from 'figlet'
import logger from '../utils/logger'

let command = process.argv[2]

async function main() {
    await showLogo()
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
    ]

    const exe = commands.find((cmd) => cmd.keys.includes(command))
    if (exe) {
        exe.callback()
    }
}

function getOptions() {}

function showLogo() {
    return new Promise((resolve) => {
        figlet('FPRESS', function (err, data) {
            if (err) {
                console.log('Something went wrong...')
                console.dir(err)
                return
            }
            console.log(data)
            resolve()
        })
    })
}

// GENERATE
function generate() {
    const type = process.argv[3]
    const name = process.argv[4]
    if (type === 'router') {
        generateRouter(name)
    }
    if (type === 'model') {
        generateModel(name)
    }
}

// GENERATE ROUTER
function generateRouter(name) {
    logger.info('Generate Router', name)
}

// GENERATE ROUTER
function generateModel(name) {
    logger.info('Generate Model', name)
}

// INIT NEW PROJECT
function initProject() {
    const name = process.argv[3]
    logger.info('Init new project', name)
}

main()
