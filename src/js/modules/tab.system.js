/**
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var TabItem  = require('spa-component-tab-item'),
    TaskList = require('./../modules/task.list'),
    Console  = require('./../modules/console');


/**
 * System tab.
 *
 * @constructor
 * @extends TabItem
 *
 * @param {Object} config={}        init parameters (all inherited from the parent)
 * @param {Object} config.wamp      link to the server connection
 * @param {Array}  [config.data=[]] component data to visualize
 */
function TabSystem ( config ) {
    // current execution context
    var self  = this,
        table = document.createElement('table'),
        taskFilter = document.createElement('input'),
        taskExec   = document.createElement('input'),
        row, cell, timeout;

    // sanitize
    config = config || {};

    // set default className if classList property empty or undefined
    config.className = 'tabSystem ' + (config.className || '');

    //config.$node = table;

    // parent constructor call
    TabItem.call(this, config);

    this.wamp = config.wamp;

    taskFilter.type = 'text';
    taskFilter.placeholder = 'filter tasks by name';
    this.taskListFilters = document.createElement('div');
    this.taskListFilters.className = 'taskListFilters';
    this.taskListFilters.appendChild(taskFilter);
    this.$body.appendChild(this.taskListFilters);

    this.taskList = new TaskList({
        parent: this,
        wamp: this.wamp
    });

    taskFilter.onkeydown = function ( event ) {
        clearTimeout(timeout);
        
        timeout = setTimeout(function () {
            self.taskList.filterText = taskFilter.value;
            self.taskList.applyFilter();
        }, 300);

        event.stopPropagation();
    };

    this.taskLogsFilters = document.createElement('div');
    this.taskLogsFilters.className = 'taskLogsFilters';
    this.$body.appendChild(this.taskLogsFilters);

    this.taskLogs = new Console({
        parent: this,
        wamp: this.wamp
    });

    taskExec.type = 'text';
    taskExec.placeholder = 'type your code here';
    this.taskExec = document.createElement('div');
    this.taskExec.className = 'taskExec';
    this.taskExec.appendChild(taskExec);
    this.$body.appendChild(this.taskExec);

    // first
    // row = table.insertRow();
	//
    // cell = row.insertCell();
    // cell.className = 'line';
	//
    // cell = row.insertCell();
    // cell.className = 'line';
	//
    // // second
    // row = table.insertRow();
	//
    // cell = row.insertCell();
    // cell.className = 'list';
    // cell.rowSpan = 2;
    // cell.appendChild(this.taskList.$node);
	//
    // cell = row.insertCell();
    // cell.className = 'logs';
	//
    // // third
    // row = table.insertRow();
	//
    // cell = row.insertCell();
    // cell.className = 'code';


    // this.$side = document.createElement('div');
    // this.$side.className = 'side';
	//
    // this.$content = document.createElement('div');
    // this.$content.className = 'content';
	//
    // this.taskList = new TaskList({
    //     wamp: this.wamp
    // });
    // this.$side.appendChild(this.taskList.$node);
	//
    // this.$body.appendChild(this.$side);
    // this.$body.appendChild(this.$content);

    //this.$body.appendChild(table);
}


// inheritance
TabSystem.prototype = Object.create(TabItem.prototype);
TabSystem.prototype.constructor = TabSystem;


// TabSystem.prototype.add = function ( data ) {
//
// };


// public
module.exports = TabSystem;
