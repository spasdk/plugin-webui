/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var Button  = require('spa-component-button'),
    TabItem = require('spa-component-tab'),
    Console = require('./../modules/console'),
    keys    = require('spa-keys');


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
    var self = this,
        $logsInclude = document.createElement('input'),
        $tagsInclude = document.createElement('input'),
        $tagsExclude = document.createElement('input'),
        $codeExec    = document.createElement('input'),
        button;

    // sanitize
    config = config || {};

    // set default className if classList property empty or undefined
    config.className = 'tabTarget ' + (config.className || '');

    // parent constructor call
    TabItem.call(this, config);

    this.wamp = config.wamp;

    this.targetId = config.targetId;

    this.$logsFilters = document.createElement('div');
    this.$logsFilters.className = 'logsFilters';
    this.$body.appendChild(this.$logsFilters);

    button = new Button({
        className: 'clear',
        events: {
            click: function () {
                self.logs.clear();
            }
        }
    });
    this.$logsFilters.appendChild(button.$node);

    button = new Button({
        className: 'reset',
        events: {
            click: function () {
                // $logsInclude.value = '';
                // $tagsInclude.value = '';
                // $tagsExclude.value = '';
				//
                // self.logs.filterText  = '';
                // self.logs.includeTags = [];
                // self.logs.excludeTags = [];
                // self.logs.applyFilter();
                self.logs.resetFilters();
            }
        }
    });
    this.$logsFilters.appendChild(button.$node);

    $logsInclude.type = 'text';
    $logsInclude.placeholder = 'filter text';
    $logsInclude.className = 'logsInclude';
    this.$logsFilters.appendChild($logsInclude);

    $tagsInclude.type = 'text';
    $tagsInclude.placeholder = 'enter include tags';
    $tagsInclude.className = 'tagsInclude';
    this.$logsFilters.appendChild($tagsInclude);

    $tagsExclude.type = 'text';
    $tagsExclude.placeholder = 'enter exclude tags';
    $tagsExclude.className = 'tagsExclude';
    this.$logsFilters.appendChild($tagsExclude);

    // $logsInclude.onkeydown = $tagsInclude.onkeydown = $tagsExclude.onkeydown = function ( event ) {
    //     clearTimeout(timeout);
	//
    //     timeout = setTimeout(function () {
    //         self.logs.filterText  = $logsInclude.value;
    //         self.logs.includeTags = $tagsInclude.value.split(' ');
    //         self.logs.excludeTags = $tagsExclude.value.split(' ');
    //         self.logs.applyFilter();
    //     }, 300);
	//
    //     event.stopPropagation();
    // };

    this.logs = new Console({
        parent: this,
        wamp: this.wamp,
        $logsInclude: $logsInclude,
        $tagsInclude: $tagsInclude,
        $tagsExclude: $tagsExclude
    });

    $codeExec.type = 'text';
    $codeExec.placeholder = 'type JavaScript code to execute';
    $codeExec.onkeydown = function ( event ) {
        var code;

        if ( event.keyCode === keys.enter ) {
            code = $codeExec.value;

            self.wamp.call('evalCode', {targetId: self.targetId, code: code}, function ( error, data ) {
                console.log('eval code', error, data);

                if ( !error ) {
                    self.logs.add({
                        info: code + ' = ' + data.eval,
                        tags: ['eval']
                    });
                }
            });

            // prepare for a new run
            $codeExec.value = '';
        }
    };
    this.codeExec = document.createElement('div');
    this.codeExec.className = 'codeExec';
    this.codeExec.appendChild($codeExec);
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
