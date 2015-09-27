# Single Call Function with Timeout

Utility to create functions that can only be called once.

Useful when racing two async flows and you want a common callback to be called ny the winner only once.

## Install

npm install single-call-function-with-timeout

## API

	var callback = once(fn, [context], [timeout-in-millis]);

## Usage

## Function that can only be called once

	var once = require('single-call-function-with-timeout');

	/* create our obj */
	var caller = {
		numCalls: 0,
		incrementCalls: function(){
			this.numCalls++;
		}
	};

	/* create the single call fn */
	caller.callback = once(caller.incrementCalls, caller);

	caller.callback();
	console.log(caller.numCalls); //=> 1

	caller.callback();
	console.log(caller.numCalls); //=> 1

## Function that can only be called once with timeout

	/* create our obj */
	var caller = {
		numCalls: 0,
		incrementCalls: function(){
			this.numCalls++;
		}
	};

	/* create the single call fn */
	caller.callback = once(caller.incrementCalls, caller, 1000);

	//wait 1s
	console.log(caller.numCalls); //=> 1

	caller.callback();
	console.log(caller.numCalls); //=> 1

## Function with additional bound parameters
	
	function fn(boundArg, callerArg){
		console.log(boundArg + callerArg);
	}

	/* create the single call fn */
	var callback = once(caller.incrementCalls, null, null, "Hello ");
	
	callback("World"); // => Hello World
