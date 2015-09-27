#!/bin/env node

/*globals module, require */

(function(module, require){
    'use strict';

    var once = require('../index.js');

    var chai = require('chai');
    var sinon = require('sinon');

    var expect = chai.expect;

    describe('Single call function tests', function(){

        it('should only allow a function to be called once', function(done){

            var numCalls = 0;

            function incrementCalls(){
                numCalls++;
            }

            /* create the single call fn */
            var callback = once(incrementCalls);

            expect(typeof callback).to.equal('function');

            callback();
            expect(numCalls).to.equal(1);

            callback();
            expect(numCalls).to.equal(1);

            done();
        });

        it('should allow an execution context to be bound to function', function(done){

            /* create our obj */
            var caller = {
                numCalls: 0,
                incrementCalls: function(){
                    this.numCalls++;
                }
            };

            /* create the single call fn */
            caller.callback = once(caller.incrementCalls, caller);

            expect(typeof caller.callback).to.equal('function');

            caller.callback();
            expect(caller.numCalls).to.equal(1);

            caller.callback();
            expect(caller.numCalls).to.equal(1);

            done();
        });

        it('should pass on any bound parameters to the function', function(done){

            function test(boundArg1, boundArg2, callerArg){
                return boundArg1 + boundArg2 + callerArg;
            }

            /* create the single call fn */
            var callback = once(test, null, null, "Hello ", "New ");

            var output = callback("World");

            expect(output).to.equal("Hello New World");

            done();
        });

        describe("Single call function test with timeout", function(){

            before(function(){
                this.clock = sinon.useFakeTimers();
            });

            after(function(){
                this.clock.restore();
            });

            it('should timeout the function if not called within the specified time', function(done){

                var numCalls = 0;

                function incrementCalls(){
                    numCalls++;
                }

                /* create the single call fn */
                var callback = once(incrementCalls, null, 250);

                this.clock.tick(300);

                expect(numCalls).to.equal(1);

                done();
            });

        });

    });

})(module, require);
