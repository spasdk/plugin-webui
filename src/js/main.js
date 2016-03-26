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
            debug.info('wamp open ' + app.wamp.socket.url, app.wamp, {tags: ['open', 'wamp']});
        });

        app.wamp.addListener('connection:close', function () {
            document.body.style.opacity = 0.2;
            debug.info('wamp close ' + app.wamp.socket.url, app.wamp, {tags: ['close', 'wamp']});
        });

        app.wamp.once('connection:open', done);
    }
], function ( error ) {
    if ( error ) {
        debug.fail(error);
    }

    // show the main page
    app.route(app.pages.main);
});
