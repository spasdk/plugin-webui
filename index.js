/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Plugin   = require('spasdk/lib/plugin'),
    plugin   = new Plugin({name: 'webui', entry: 'serve', config: require('./config')});


// create tasks for profiles
//plugin.profiles.forEach(function ( profile ) {
//    // main entry task
//    profile.task(plugin.entry, function ( done ) {
//
//    });
//});


// public
module.exports = plugin;
