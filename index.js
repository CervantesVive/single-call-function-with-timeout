#!/bin/env node

/*globals module */

(function(module){
    'use strict';

    /**
     * Creates a function that can only be called once.
     * Any additional params passed into the function will be passed to the caller
     *
     * @param {Function} fn
     * @param {Object=} [context]
     * @param {Object[]=} [args]
     * @returns {Function}
     */
    function getSingleCallFunctionWithArguments(fn, context, args){
        args = args || [];
        context = context || null;

        var called = false;
        return function(){
            if(called){
                return;
            }
            /* mix additional arguments into the bound args */
            args = args.concat(Array.prototype.slice.call(arguments));
            called = true;
            return fn.apply(context, args);
        };
    }

    /**
     * Creates a function that can only be called once.
     * Any additional params passed into the function will be passed to the caller
     *
     * @param {Function} fn
     * @param {Object=} [context]
     * @param {Number=} [timeout]
     * @returns {Function}
     */
    module.exports = function(fn, context, timeout){
        context = context || null;
        var args = [];
        if(arguments.length > 3){
            /* we have additional arguments we want to bind */
            args = Array.prototype.slice.call(arguments, 3);
        }

        timeout = parseInt(timeout, 10);
        timeout = timeout || null;

        var once = getSingleCallFunctionWithArguments(fn, context, args);

        if(timeout){
            setTimeout(once, timeout);
        }

        return once;
    };

})(module);
