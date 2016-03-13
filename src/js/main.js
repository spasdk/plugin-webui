/**
 * Main application entry point.
 */

'use strict';

var app      = require('spa-app'),
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
        require('./wamp')();
        app.once('wamp:open', done);
    }
], function ( error ) {
    console.log('error', error);

    // show the main page
    app.route(app.pages.main);
});
