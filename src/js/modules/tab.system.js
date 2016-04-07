/**
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var Button   = require('spa-component-button'),
    TabItem  = require('spa-component-tab-item'),
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
    var self  = this,
        $taskFilter  = document.createElement('input'),
        $logsInclude = document.createElement('input'),
        $tagsInclude = document.createElement('input'),
        $tagsExclude = document.createElement('input'),
        $taskExec    = document.createElement('input'),
        timeout, button;

    // sanitize
    config = config || {};

    // set default className if classList property empty or undefined
    config.className = 'tabSystem ' + (config.className || '');

    //config.$node = table;

    // parent constructor call
    TabItem.call(this, config);

    this.wamp = config.wamp;

    $taskFilter.type = 'text';
    $taskFilter.placeholder = 'filter tasks by name';
    this.$taskListFilters = document.createElement('div');
    this.$taskListFilters.className = 'taskListFilters';
    this.$taskListFilters.appendChild($taskFilter);
    this.$body.appendChild(this.$taskListFilters);

    this.taskList = new TaskList({
        parent: this,
        wamp: this.wamp
    });

    $taskFilter.onkeydown = function ( event ) {
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            self.taskList.filterText = $taskFilter.value;
            self.taskList.applyFilter();
        }, 300);

        event.stopPropagation();
    };

    this.$taskLogsFilters = document.createElement('div');
    this.$taskLogsFilters.className = 'taskLogsFilters';
    this.$body.appendChild(this.$taskLogsFilters);

    button = new Button({
        className: 'side',
        events: {
            click: function () {
                self.$node.classList.toggle('full');
            }
        }
    });
    this.$taskLogsFilters.appendChild(button.$node);

    button = new Button({
        className: 'clear',
        events: {
            click: function () {
                self.taskLogs.clear();
            }
        }
    });
    this.$taskLogsFilters.appendChild(button.$node);

    button = new Button({
        className: 'reset',
        events: {
            click: function () {
                // $logsInclude.value = '';
                // $tagsInclude.value = '';
                // $tagsExclude.value = '';
				//
                // self.taskLogs.filterText  = '';
                // self.taskLogs.includeTags = [];
                // self.taskLogs.excludeTags = [];
                // self.taskLogs.applyFilter();
                self.taskLogs.resetFilters();
            }
        }
    });
    this.$taskLogsFilters.appendChild(button.$node);

    $logsInclude.type = 'text';
    $logsInclude.placeholder = 'filter text';
    $logsInclude.className = 'logsInclude';
    this.$taskLogsFilters.appendChild($logsInclude);

    $tagsInclude.type = 'text';
    $tagsInclude.placeholder = 'enter include tags';
    $tagsInclude.className = 'tagsInclude';
    this.$taskLogsFilters.appendChild($tagsInclude);

    $tagsExclude.type = 'text';
    $tagsExclude.placeholder = 'enter exclude tags';
    $tagsExclude.className = 'tagsExclude';
    this.$taskLogsFilters.appendChild($tagsExclude);

    // $logsInclude.onkeydown = $tagsInclude.onkeydown = $tagsExclude.onkeydown = function ( event ) {
    //     clearTimeout(timeout);
	//
    //     timeout = setTimeout(function () {
    //         self.taskLogs.filterText  = $logsInclude.value;
    //         self.taskLogs.includeTags = $tagsInclude.value.split(' ');
    //         self.taskLogs.excludeTags = $tagsExclude.value.split(' ');
    //         self.taskLogs.applyFilter();
    //     }, 300);
	//
    //     event.stopPropagation();
    // };

    this.taskLogs = new Console({
        parent: this,
        wamp: this.wamp,
        $logsInclude: $logsInclude,
        $tagsInclude: $tagsInclude,
        $tagsExclude: $tagsExclude
    });

    $taskExec.type = 'text';
    $taskExec.placeholder = 'type your code here';
    this.taskExec = document.createElement('div');
    this.taskExec.className = 'taskExec';
    this.taskExec.appendChild($taskExec);
    this.$body.appendChild(this.taskExec);
}


// inheritance
TabSystem.prototype = Object.create(TabItem.prototype);
TabSystem.prototype.constructor = TabSystem;


// public
module.exports = TabSystem;
