import * as loggerModule from './logger.mjs';
import { log, Logger } from './logger.mjs';

log('Hello World');
const logger = new Logger('DEFAULT');
logger.log('Hello world');
console.log(loggerModule);
