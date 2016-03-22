/**
 * Main application entry point.
 */

'use strict';

var app      = require('spa-app'),
    Wamp     = require('spa-wamp'),
    parallel = require('cjs-async/parallel');


parallel([
    function ( done ) {
        app.once('load', function () {
            console.log('app.once load');

            // load pages
            app.pages = {
                init: require('./pages/init'),
                main: require('./pages/main')
            };

            done();
        });
    },
    function ( done ) {
        app.wamp = new Wamp('ws://' + (app.query.wampHost || location.hostname) + ':' + app.query.wampPort + '/client');

        //require('./wamp')();
        app.wamp.once('wamp:open', done);
        //setTimeout(done, 1000);
    }
], function ( error ) {
    console.log('error', error);

    // show the main page
    app.route(app.pages.main);
});
