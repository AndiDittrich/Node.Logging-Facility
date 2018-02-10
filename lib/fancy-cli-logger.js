const _colors = require('colors/safe');

module.exports = function logger(minLevel=99){
    // logging
    return function fancyCliLogger(facility, level, args){
        // min logging level reached ?
        if (level > minLevel){
            return;
        }

        // message available ?
        if (args.length < 1){
            return;
        }

        // error thrown ?
        const errorIndex = args.reduce((prev, current, index) => {
            if (prev === null && current instanceof Error){
                return index;
            }else{
                return prev;
            }
        }, null);

        // main message
        let message = null;

        // has error ?
        if (errorIndex !== null){
            // extract error object
            const error = args[errorIndex];

            // remove from args
            args.splice(errorIndex, 1);

            // error to message cast
            const errorMessage = error.stack || error.message || 'unknown error';

            // is error object first message ?
            if (errorIndex > 0){
                // prepend trailer
                message = args.shift() + ' - ' + errorMessage;

            }else{
                // just use error message as primary notification
                message = errorMessage;
            }

        // just extract message (first element)
        }else{
            message = args.shift();
        }

        // log prefix - whitespace padding
        const prefix = ('[' + facility.trim() + ']').padEnd(14, ' ') + '~';
        
        // log level colors
        switch (level){
            // emergency, 
            case 0:
                console.error(_colors.magenta.bold(prefix + ' ' + message + ' ' + args.join(' ')));
                break;

            // alert, critical, error
            case 1:
            case 2:
            case 3:
                console.error(_colors.red.bold(prefix + ' ' + message + ' ' + args.join(' ')));
                break;

            // warning
            case 4:
                console.error(_colors.grey(prefix), message, args.join(' '));
                break;

            // notice, info(log)
            case 5:
            case 6:
                console.log(_colors.grey(prefix), message, args.join(' '));
                break;

            default:
                console.log(_colors.grey(prefix + ' ' + message + ' ' + args.join(' ')));
        }
    }
}