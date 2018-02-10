const _loglevel = require('./lib/loglevel');
const _simpleCliLogger = require('./lib/cli-logger');
const _defaultBackend = _simpleCliLogger();
const _fancyCliLogger = require('./lib/fancy-cli-logger');

// global set of active logging instances/namespaces
const _loggerInstances = {};

// set of active backends
let _loggingBackends = [];

// utility function to expose logging api
function exposeAPI(log){
    return {
        emerg: log(_loglevel.EMERGENCY),
        emergency: log(_loglevel.EMERGENCY),

        alert: log(_loglevel.ALERT),

        crit: log(_loglevel.CRITICAL),
        critical: log(_loglevel.CRITICAL),

        error: log(_loglevel.ERROR),
        err: log(_loglevel.ERROR),

        warning: log(_loglevel.WARNING),
        warn: log(_loglevel.WARNING),

        notice: log(_loglevel.NOTICE),

        log: log(_loglevel.INFO),
        info: log(_loglevel.INFO),

        debug: log(_loglevel.DEBUG)
    };
}

// generator to create the logging instance
function createLogger(instance){

    // generator
    function log(level){
        return function(...args){

            // logging backend available ?
            if (_loggingBackends.length > 0){

                // trigger backends
                _loggingBackends.forEach(function(backend){
                    backend.apply(backend, [instance, level, args]);
                });

            // use default backend
            }else{
                _defaultBackend.apply(_defaultBackend, [instance, level, args]);
            }
        }
    }
    
    return exposeAPI(log);
}

// utility function to fetch or create loggers by namespace
function getLogger(instance){
    // create new instance if not available
    if (!_loggerInstances[instance]){
        _loggerInstances[instance] = createLogger(instance);
    }

    return _loggerInstances[instance];
}

// add multiple upstream backends
function addLoggingBackend(backend, minLoglevel=99){
    // function or string input supported
    if (typeof backend === 'function'){
        _loggingBackends.push(backend);

    // lookup
    }else{
        if (backend === 'fancy-cli'){
            _loggingBackends.push(_fancyCliLogger(minLoglevel));
        }else if (backend === 'cli'){
            _loggingBackends.push(_simpleCliLogger(minLoglevel));
        }else{
            throw new Error('Unknown backend <' + backend + '>');
        }
    }    
}

// set the upstream backend - for backward compatibility
function setLoggingBackend(backend){
    // clear backend list
    _loggingBackends = [];

    // add new backend
    addLoggingBackend(backend);
}

module.exports = {
    getLogger: getLogger,
    setBackend: setLoggingBackend,
    addBackend: addLoggingBackend,

    // export loglevel constants
    LEVEL: _loglevel,

    // build-in backends/loggers
    LOGGER: {
        FANCY: _fancyCliLogger,
        DEFAULT: _simpleCliLogger,
        CLI: _simpleCliLogger
    }
};