import fPress from './server'
import CustomError from './error/custom-error'
import logger from './utils/logger'
import { Provider } from './mongo'
import crud from './server/crud'
import CreateValidator from './validator'
import registerAlias from './alias'
import { getColor, importAll, randomColor, requireAll } from './utils'

export {
    CustomError,
    fPress,
    logger,
    Provider,
    // Validator
    CreateValidator,
    // End validator
    crud,
    registerAlias,
    importAll,
    randomColor,
    getColor,
    requireAll,
}
