/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var extend   = require('extend'),
    config   = require('spasdk/config'),
    profiles = {};


// main
profiles.default = extend(true, {}, config, {

});


// public
module.exports = profiles;
