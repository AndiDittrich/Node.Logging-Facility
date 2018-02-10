Logging Facility
================

Application Logging Abstraction Layer

```bash
$ yarn add logging-facility
$ npm install logging-facility --save
```

Features
--------

* **Abstraction Layer/Wrapper to easily exchange your logging backend without breaking your code**
* Common used syslog levels are exposed as functions (emergency, alert, critical, error, warning, notice, info, debug)
* Multiple Loggers identified by name
* Ability to use multiple Backends
* All Logging functions are aggregated into **a single** callback

Usage
---------

#### 1. Application Startup/Configuration ####

This code sets up the logging-backend and should be executed within the application bootstrap

```js
const _loggingFacility = require('logging-facility');

// use fancy colored cli output
_loggingFacility.addBackend('fancy-cli');
```

### 2. Logging ###

Within each of your application files you can access the global named loggers

```js
// create/get a logger named "mylogger"
const _logger = require('logging-facility').getLogger('mylogger');

// log something
_logger.info('Initializing module X1', 'Additional Payload');
_logger.emergency('fatal error');
```

### 3. Custom Logging Backend ###

```js
const _loggingFacility = require('logging-facility');

// only required for styling 
const _colors = require('colors/safe');

// set the logging backend/upstream
// every log message is passed to this function
_loggingFacility.setBackend(function(facility, level, args){
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

Multiple Backends
-----------------------------
```js
const _loggingFacility = require('logging-facility');

// add logging backend for fatal errors
_loggingFacility.addBackend(function(facility, level, args){
   
   // send a e-mail on fatal errors occured
   if (level > 3){
        Mailer.notify(args[0]);
   }
});

// add fancy console output
_loggingFacility.addBackend('fancy-cli');
```

Methods/Syntax
------------------------------

### ::getLogger() ###

**Description:** Create a new logger

**Syntax:** `logger:object = getLogger(name)`

**Arguments:**

 * name:string - the instance name of the logger, passed as first argument to the backend function

**Returns:**

An object with the following logging-functions

 * emerg(...messages),
 * emergency(...messages),
 * alert(...messages),
 * crit(...messages),
 * critical(...messages),
 * error(...messages),
 * err(...messages),
 * warning(...messages),
 * warn(...messages),
 * notice(...messages),
 * log(...messages),
 * info(...messages),
 * debug(...messages),

**Example:**

```js
// create/get a logger named "mylogger"
const _logger = require('logging-facility').getLogger('mylogger');

// log something
_logger.info('Initializing module X1', 'Additional Payload');
_logger.emergency('fatal error');
```

### ::addBackend() ###

**Description:** Adds a new backend logger to the stack

**Syntax:** `setBackend(backend:function|string, [minLogLevel:int=99])`

**Arguments:**

 * backend:(function|string) - a callback function which will receive all log messages. all default loggers can be accessed by name (allowed values: `fancy-cli`, `cli`).
 * minLogLevel:int=99 (optional) - the minimum log-level of the backend in case it's initialized by name not function

**Example:**
```js
const _loggingFacility = require('logging-facility');

// add logging backend for fatal errors
_loggingFacility.addBackend(function(facility, level, args){
   
   // send a e-mail on fatal errors occured
   if (level > 3){
        Mailer.notify(args[0]);
   }
});

// add fancy console output
_loggingFacility.addBackend('fancy-cli');

// add simple cli output
_loggingFacility.addBackend('cli');
```

### ::setBackend() ###

**DEPRECATED**

**Description:** Removes all exsiting backends and add a new one to the stack

**Syntax:** `setBackend(backend:function|string)`

**Arguments:**

 * backend:(function|string) - a callback function which will receive all log messages. all default loggers can be accessed by name.

 **Example:**
```js
const _loggingFacility = require('logging-facility');

// add fancy console output
_loggingFacility.addBackend('fancy-cli');

// add logging backend for fatal errors - WILL REMOVE the fancy-cli backend added previously!
_loggingFacility.setBackend(function(facility, level, args){
   
   // send a e-mail on fatal errors occured
   if (level > 3){
        Mailer.notify(args[0]);
   }
});
```

### ::LEVEL ###

**Description:** Constants used for different log-levels `@see lib/loglevel.js`

```
EMERGENCY: 0
ALERT: 1
CRITICAL: 2
ERROR: 3
WARNING: 4
NOTICE: 5
INFO: 6
DEBUG: 7
```

**Example:**

```js
const _loggingFacility = require('logging-facility');

// get warning log-level
console.log(_loggingFacility.LEVEL.WARNING);
```

### ::LOGGER ###

**Description:** Build-In logging backends

```
CLI - simple cli logging
FANCY - colorized cli output
DEFAULT - alias of CLI
```

**Example:**

```js
const _loggingFacility = require('logging-facility');

// add logging function with min-loglevel of 5
_loggingFacility.addBackend(_loggingFacility.LOGGER.CLI(_loggingFacility.LEVEL.NOTICE));
```

Any Questions ? Report a Bug ? Enhancements ?
---------------------------------------------
Please open a new issue on [GitHub](https://github.com/AndiDittrich/Node.Logging-Facility/issues)

License
-------
Logging-Facility is OpenSource and licensed under the Terms of [The MIT License (X11)](http://opensource.org/licenses/MIT). You're welcome to contribute!