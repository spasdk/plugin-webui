/**
 * Main application entry point.
 */

'use strict';

var app   = require('spa-app'),
    Wamp  = require('cjs-wamp'),
    parse = require('cjs-parse-query');


function wamp () {
    app.wamp = new Wamp(
        new WebSocket('ws://localhost:' + parse(document.location.search.substring(1)).port + '/client')
    );

    // ready
    app.wamp.socket.onopen = function () {
        console.log('wamp is ready!');

        // info

        app.wamp.call('getInfo', {}, function ( error, data ) {
            console.log('info', data);
        });

        app.wamp.call('getClients', {}, function ( error, data ) {
            console.log('clients', data);
        });

        app.wamp.call('getTargets', {}, function ( error, data ) {
            console.log('targets', data);
        });

        app.wamp.call('getPlugins', {}, function ( error, data ) {
            console.log('plugins', data);
        });

        // notifications

        app.wamp.addListener('eventTargetOnline', function ( event ) {
            console.log('new target', event);
        });

        app.wamp.addListener('eventTaskStart', function ( event ) {
            console.log('task start', event);
            window[event.id].classList.add('running');
        });

        app.wamp.addListener('eventTaskFinish', function ( event ) {
            console.log('task finish', event);
            window[event.id].classList.remove('running');
        });

        app.wamp.addListener('message', function ( event ) {
            console.log('message', event);
        });

        app.emit('wamp:open');
    };

    // try to reconnect in 5 seconds on disconnect
    app.wamp.socket.onclose = function () {
        setTimeout(wamp, 5000);
    };
}


// public
module.exports = wamp;
