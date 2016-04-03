/**
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('spa-component');


/**
 * Target tab.
 *
 * @constructor
 * @extends Component
 *
 * @param {Object} config={}        init parameters (all inherited from the parent)
 * @param {Object} config.wamp      link to the server connection
 * @param {Array}  [config.data=[]] component data to visualize
 */
function TabTarget ( config ) {
    // current execution context
    var self = this;

    // sanitize
    config = config || {};

    // set default className if classList property empty or undefined
    config.className = 'tabTarget ' + (config.className || '');

    // parent constructor call
    Component.call(this, config);

    this.wamp = config.wamp;
}


// inheritance
TabTarget.prototype = Object.create(Component.prototype);
TabTarget.prototype.constructor = TabTarget;


// TabTarget.prototype.add = function ( data ) {
//
// };


// public
module.exports = TabTarget;
