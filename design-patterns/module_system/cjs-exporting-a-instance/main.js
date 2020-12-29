const dbLogger = require('./logger');

dbLogger.info('This is an informational message');

const customLogger = new dbLogger.constructor('CUSTOM');

customLogger.verbose('this is informational message');
