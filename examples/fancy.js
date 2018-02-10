const _loggingFacility = require('../logging-facility');

// use fancy cli logger
_loggingFacility.addBackend('fancy-cli');

// create new logger
const _logger = _loggingFacility.getLogger('mylogger');

_logger.info("Hello", "World");
_logger.info("Hello", "World2");
_logger.info("Hello", "World", "HELLO");
_logger.error('help me', new Error('fatal error occurred'));
_logger.emergency("we've got some trouble..");