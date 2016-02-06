/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path     = require('path'),
    extend   = require('extend'),
    config   = require('spasdk/config'),
    profiles = {};

//console.log(require.resolve('spa-plugin-webui'));
//console.log(path.join(__dirname, 'app'));

// main
profiles.default = extend(true, {}, config, {
    // directory to serve
    source: path.join(__dirname, 'app'),

    // main entry point to load web page
    target: 'index.html',

    // listening port (0 - random)
    port: 8000,

    // static file server cache activation
    // false to disable or amount of seconds to cache
    cache: 3600,

    // info channels
    notifications: {
        popup: {
            info: {icon: path.join(__dirname, 'media', 'info.png')},
            warn: {icon: path.join(__dirname, 'media', 'warn.png')},
            fail: {icon: path.join(__dirname, 'media', 'fail.png')}
        }
    }
});


// public
module.exports = profiles;
