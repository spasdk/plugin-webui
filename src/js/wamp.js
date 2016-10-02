/**
 * Handle wamp init requests.
 */

'use strict';

var app      = require('spa-app'),
    Wamp     = require('spa-wamp'),
    parallel = require('cjs-async/parallel');


// public
module.exports = function ( callback ) {
    var fnNameList = {
            connection: 'getConnectionInfo',
            project:    'getProjectInfo',
            clients:    'getClients',
            targets:    'getTargets',
            plugins:    'getPlugins',
            tasks:      'getTasks'
        },
        fnHashList = [],
        fnBodyList = [];

    app.data = {};

    app.wamp = new Wamp('ws://' + (app.query.wampHost || location.hostname) + ':' + app.query.wampPort + '/client');

    app.wamp.onopen = function () {
        // gather all data
        parallel(fnBodyList, function ( error, list ) {
            if ( error ) {
                debug.fail(error);
            }

            // build data
            list.forEach(function ( data, index ) {
                app.data[fnHashList[index]] = data;
            });

            callback();
        });

        // redefine
        app.wamp.onopen = function () {
            document.body.style.opacity = 1;
            //debug.info('wamp open ' + app.wamp.socket.url, app.wamp, {tags: ['open', 'wamp']});
        };
    };

    app.wamp.onclose = function () {
        document.body.style.opacity = 0.2;
        //debug.info('wamp close ' + app.wamp.socket.url, app.wamp, {tags: ['close', 'wamp']});
    };

    Object.keys(fnNameList).forEach(function ( id ) {
        // prepare async method
        fnBodyList.push(function ( done ) {
            app.wamp.call(fnNameList[id], {}, done);
        });

        // build hash table
        fnHashList.push(id);
    });

};


/*
var app   = require('spa-app'),
    Wamp  = require('cjs-wamp'),
    parse = require('cjs-query').parse;


function wamp () {
    app.wamp = new Wamp(
        new WebSocket('ws://localhost:' + parse(document.location.search.substring(1)).port + '/client')
    );

    // ready
    app.wamp.socket.onopen = function () {
        console.log('wamp is ready!');
        document.body.style.opacity = 1;

        // info

        app.wamp.call('getInfo', {}, function ( error, data ) {
            console.log('info', data);
        });

        app.wamp.call('getMemoryUsage', {}, function ( error, data ) {
            console.log('memory usage', data);
        });

        app.wamp.call('getClients', {}, function ( error, data ) {
            console.log('clients', data);
        });

        /!*app.wamp.call('getTargets', {}, function ( error, data ) {
            console.log('targets', data);
        });*!/

        app.wamp.call('getPlugins', {}, function ( error, data ) {
            console.log('plugins', data);
        });

        // notifications

        //app.wamp.addListener('eventTargetOnline', function ( event ) {
        //    console.log('new target', event);
        //});

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
        document.body.style.opacity = 0.2;
        setTimeout(wamp, 5000);
    };
}


// public
module.exports = wamp;
*/
