import fPress from './server';
import CustomError from './error/custom-error';
import logger from './utils/logger';
import { Provider } from './mongo';
import crud from './server/crud';
import CreateValidator, { checks } from './validator/index';
import registerAlias from './alias';
export { CustomError, fPress, logger, Provider, checks, CreateValidator, crud, registerAlias, };
