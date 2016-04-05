/**
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var TabItem = require('spa-component-tab-item'),
    Console = require('./../modules/console');


/**
 * Target tab.
 *
 * @constructor
 * @extends TabItem
 *
 * @param {Object} config={}        init parameters (all inherited from the parent)
 * @param {Object} config.wamp      link to the server connection
 * @param {Array}  [config.data=[]] component data to visualize
 */
function TabTarget ( config ) {
    // current execution context
    var //self = this,
        codeExec = document.createElement('input');

    // sanitize
    config = config || {};

    // set default className if classList property empty or undefined
    config.className = 'tabTarget ' + (config.className || '');

    // parent constructor call
    TabItem.call(this, config);

    this.wamp = config.wamp;

    this.taskLogsFilters = document.createElement('div');
    this.taskLogsFilters.className = 'taskLogsFilters';
    this.$body.appendChild(this.taskLogsFilters);

    this.logs = new Console({
        parent: this,
        wamp: this.wamp
    });

    codeExec.type = 'text';
    codeExec.placeholder = 'type your code here';
    this.codeExec = document.createElement('div');
    this.codeExec.className = 'codeExec';
    this.codeExec.appendChild(codeExec);
    this.$body.appendChild(this.codeExec);
}


// inheritance
TabTarget.prototype = Object.create(TabItem.prototype);
TabTarget.prototype.constructor = TabTarget;


// TabTarget.prototype.add = function ( data ) {
//
// };


// public
module.exports = TabTarget;
