import files from './files'

const fs = require('fs')
const Path = require('path')

const MODEL_FILE = `
const { Schema, model } = require("mongoose");
const { Types } = Schema;

const schema = new Schema({
  createdAt: { type: Types.Date, default: Date.now },
});

// HOOKS

// END HOOKS
module.exports = model("{name}", schema);
`.trim()

const PROVIDER_FILE = `
import { Provider } from 'fpress'
import {name} from './{filename}.model'

class {name}Provider extends Provider {}

module.exports = new {name}Provider({name})
`.trim()

const INDEX_FILE = `
const {name} = require("./{filename}.model");
const {name}Provider = require("./{filename}.provider");
export { {name}, {name}Provider };
`

export function generateModel(path, ...args) {
    path = path.split('/')
    let name = path.pop()
    const filename = name.toLowerCase()
    name = name.charAt(0).toUpperCase() + name.slice(1)
    path.push(name)
    path = path.join('/')

    const modelPath = Path.join(files.getCurrentDir(), 'data', path)

    if (fs.existsSync(modelPath)) {
        console.error(new Error('model ' + modelPath + ' exists'))
        return
    }

    fs.mkdirSync(modelPath, { recursive: true })

    fs.writeFileSync(
        modelPath + `/${filename}.model.js`,
        MODEL_FILE.replace(/{name}/g, name).replace(/{filename}/g, filename)
    )
    fs.writeFileSync(
        modelPath + `/${filename}.provider.js`,
        PROVIDER_FILE.replace(/{name}/g, name).replace(/{filename}/g, filename)
    )
    fs.writeFileSync(
        modelPath + '/index.js',
        INDEX_FILE.replace(/{name}/g, name).replace(/{filename}/g, filename)
    )
}
