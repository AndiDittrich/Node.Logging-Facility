Logging Facility
================

Logging Abstraction Layer for easy backend switching

```bash
$ npm install logging-facility
```

Features
--------

* **Abstraction Layer/Wrapper to easily exchange your logging backend without breaking your code**
* Common used syslog levels are exposed as functions (emergency, alert, critical, error, warning, notice, info, debug)
* Multiple Loggers identified by name
* All Logging functions are aggregated into **a single** callback

Usage
---------

##### 1. Application Startup/Configuration #####

```js
var _logger = require('logging-facility');

// only required for styling 
var _colors = require('colors/safe');

// set the logging backend/upstream
// every log message is passed to this function
_logger.setBackend(function(facility, level, args){
    // simple console output
    
    // log, info, debug
    if (level > 5){
        console.log(_colors.grey(facility.trim() + '~'), args.join(' '));

    // errors
    }else{
        console.log(_colors.red(facility.trim() + '~'), args.join(' '));
    }
});
```

##### 2. Logging #####

```js
// create/get a logger named "mylogger"
var _logger = require('logging-facility').getLogger('mylogger');

// log something
_logger.info('Initializing module X1', 'Additional Payload');
```


Any Questions ? Report a Bug ? Enhancements ?
---------------------------------------------
Please open a new issue on [GitHub](https://github.com/AndiDittrich/Node.Logging-Facility/issues)

License
-------
Logging-Facility is OpenSource and licensed under the Terms of [The MIT License (X11)](http://opensource.org/licenses/MIT). You're welcome to contribute!