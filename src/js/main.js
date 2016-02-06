/**
 * Main application entry point.
 */

'use strict';

var app    = require('spa-app'),
    Wamp   = require('cjs-wamp'),
    parse  = require('cjs-parse-query'),
    router = require('spa-router');


function wamp () {
    app.wamp = new Wamp(new WebSocket('ws://localhost:' + parse(document.location.search.substring(1)).port + '/client'));

    // ready
    app.wamp.socket.onopen = function () {
        console.log('wamp is ready!');
    };

    // try to reconnect in 5 seconds on disconnect
    app.wamp.socket.onclose = function () {
        setTimeout(wamp, 5000);
    };

    return app.wamp;
}


// main application events
app.addListeners({
    // all resources are loaded
    load: function load () {
        // set pages
        router.init([
            require('./pages/init'),
            require('./pages/main')
        ]);
    },

    // everything is ready
    done: function done () {
        wamp();

        // ready
        app.wamp.socket.onopen = function () {
            app.wamp.call('getClients', {}, function ( error, data ) {
                console.log('clients', data);
            });

            app.wamp.call('getTargets', {}, function ( error, data ) {
                console.log('targets', data);
            });

            app.wamp.call('getPlugins', {}, function ( error, data ) {
                console.log('plugins', data);
            });


            // go to the main page when necessary
            router.navigate('pageMain');
        };
    }
});
