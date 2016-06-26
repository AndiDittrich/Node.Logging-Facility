// global set of active logging instances/namespaces
var _loggerInstances = {};

// set of active backends
var _loggingBackends = [];

// the default logging backend (upstream)
_loggingBackends.push(function(instance, level, args){
    if (level > 5){
        console.log(instance + '~', args.join(' '));
    }else{
        console.error(instance + '~', args.join(' '));
    }
});

// list of syslog levels
var LOGLEVEL = {
    emergency: 0,
    alert: 1,
    critical: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
};

// generator to create the logging instance
var createLogger = function(instance){

    // generator
    function log(level){
        return function(){
            // extract args
            var args = Array.prototype.slice.call(arguments);

            // default logging
            if (_loggingBackends.length > 0){

                // trigger backends
                _loggingBackends.forEach(function(backend){
                    backend.apply(backend, [instance, level, args]);
                });
            }else{
                throw new Error('No Logging Backend defined');
            }
        }
    }
    
    return {
        emerg: log(LOGLEVEL.emergency),
        emergency: log(LOGLEVEL.emergency),

        alert: log(LOGLEVEL.alert),

        crit: log(LOGLEVEL.critical),
        critical: log(LOGLEVEL.critical),

        error: log(LOGLEVEL.error),
        err: log(LOGLEVEL.error),

        warning: log(LOGLEVEL.warning),
        warn: log(LOGLEVEL.warning),

        notice: log(LOGLEVEL.notice),

        log: log(LOGLEVEL.info),
        info: log(LOGLEVEL.info),

        debug: log(LOGLEVEL.debug)
    };
};

// utility function to fetch or create loggers by namespace
function getLogger(instance){
    // create new instance if not available
    if (!_loggerInstances[instance]){
        _loggerInstances[instance] = createLogger(instance);
    }

    return _loggerInstances[instance];
}

// set the upstream backend - for backward compatibility
function setLoggingBackend(backend){
    _loggingBackends = [backend];
}

// add multiple upstream backends
function addLoggingBackend(backend){
    _loggingBackends.push(backend);
}

module.exports = {
    getLogger: getLogger,
    setBackend: setLoggingBackend,
    addBackend: addLoggingBackend
};