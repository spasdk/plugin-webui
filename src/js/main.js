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
            console.log('app.once load');
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
], function ( error ) {
    console.log('error', error);
    router.navigate('pageMain');
});
