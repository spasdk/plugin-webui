/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path     = require('path'),
    extend   = require('extend'),
    config   = require('spa-plugin-static/config'),
    profiles = {};

//console.log(require.resolve('spa-plugin-webui'));
//console.log(path.join(__dirname, 'app'));

// main
profiles.default = extend(true, {}, config.default, {
    // directory to serve
    source: path.join(__dirname, 'app'),

    // main entry point to load web page
    target: 'release.html?port=9000',

    // listening port (0 - random)
    port: 8000
});


// public
module.exports = profiles;
