/**
 * Main application entry point.
 */

'use strict';

var app      = require('spa-app'),
    parallel = require('cjs-async/parallel'),
    router   = require('spa-router');


parallel([
    function () {
        app.once('load', function () {
            // set pages
            router.init([
                require('./pages/init'),
                require('./pages/main')
            ]);
        });
    },
    function ( done ) {
        require('./wamp')();
        app.once('wamp:open', done);
    }
], function () {
    router.navigate('pageMain');
});
