module.exports = function logger(minLevel=99){
    // logging
    return function cliLogger(facility, level, args){
        // min logging level reached ?
        if (level > minLevel){
            return;
        }

        // message available ?
        if (args.length < 1){
            return;
        }

        // info, debug
        if (level > 5){
            console.log(facility + '~', args.join(' '));

        // errors, warnings, ..
        }else{
            console.error(facility + '~', args.join(' '));
        }
    }
};