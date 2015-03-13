var Env = Env || {};

Env.config = {
    environments: {
        "dev": "local",
        "preprod": "marceldev",
        "prod": "orange"
    },
    debug: {
        "dev": true,
        "preprod": true,
        "prod": true
    },
    cache: {
        "dev": false,
        "preprod": false,
        "prod": true
    },
    minify: {
        "dev": false,
        "preprod": false,
        "prod":true
    }
};

Env.set = function(){
    for(var index in Env.config.environments) {
        if( document.location.hostname.indexOf( Env.config.environments[index] ) != -1 ) {
            this.config.env = index;
            break;
        }
    }
}
Env.debug = function(isDebug){
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
    isDebug = typeof isDebug === undefined ? false : isDebug;
    window.log=function(){};
    var script = document.createElement("script");
    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (isDebug) {
            if (!console[method]) {
                console[method] = noop;
            }
            script.setAttribute("src", "js/vendors/debug/debug-min.js");
            document.body.appendChild(script);
        // if debug === false - remove all console methods
        } else {
            console[method] = noop;
        }
    }
}

Env.cache = function(isCache){
    isCache = typeof isCache === undefined ? false : isCache;
    if(isCache){
       return this.config.urlArgs = "bust=" +  (new Date()).getTime()
    }
}

Env.load = function(){
    Env.set();
    window.ENV_CONFIG = {
        isCache: this.config.cache[this.config.env],
        minify: this.config.minify[this.config.env],
        debug: this.debug(this.config.debug[this.config.env]),
        urlArgs: this.config.urlArgs || false
    };
}

Env.load();