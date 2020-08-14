import fPress from './server';
import CustomError from './error/custom-error';
import logger from './utils/logger';
import { Provider } from './mongo';
import crud from './server/crud';
import CreateValidator, { checks } from './validator/index';
import registerAlias from './alias';
import { getColor, importAll, randomColor } from './utils';
export { CustomError, fPress, logger, Provider, checks, CreateValidator, crud, registerAlias, importAll, randomColor, getColor, };
