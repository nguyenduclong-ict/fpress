const fs = require('fs')
const Path = require('path')
import logger from '../utils/logger'
import files from './files'

const ROUTER_FILE = `
const express = require('express')
const router = express.Router()
const validator = require("./validator");
// ------- Declare router -------

// ------------------------------
module.exports = router;
`.trim()

const VALIDATOR_FILE = `
const { CreateValidator, checks } = require("fpress");
module.exports.ValidateBody = CreateValidator({}, "body");
`.trim()

export function generateRouter(path = '') {
    const routerPath = Path.join(files.getCurrentDir(), 'routes', path)
    if (fs.existsSync(routerPath)) {
        logger.error('router', routerPath, 'exists')
        return
    }

    fs.mkdirSync(routerPath, { recursive: true })
    fs.writeFileSync(routerPath + '/router.js', ROUTER_FILE)
    fs.writeFileSync(routerPath + '/validator.js', VALIDATOR_FILE)
}
