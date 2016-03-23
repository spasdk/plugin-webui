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

        app.wamp.addListener('connection:open', function () {
            document.body.style.opacity = 1;
            console.log('wamp open ' + app.wamp.socket.url);
        });

        app.wamp.addListener('connection:close', function () {
            document.body.style.opacity = 0.2;
            console.log('wamp close ' + app.wamp.socket.url);
        });

        app.wamp.once('connection:open', done);
    }
], function ( error ) {
    console.log('error', error);

    // show the main page
    app.route(app.pages.main);
});
