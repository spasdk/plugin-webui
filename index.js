/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Plugin = require('spa-plugin-static/lib/plugin');


// public
module.exports = new Plugin({
    name: 'webui',
    entry: 'serve',
    config: require('./config')
});
