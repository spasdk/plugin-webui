/**
 * Main page implementation.
 */

'use strict';

var app  = require('spa-app'),
    Page = require('spa-component-page'),
    page = new Page({$node: window.pageMain});


page.addListener('show', function load () {
    app.wamp.call('getTasks', {}, function ( error, data ) {
        var groups  = {},
            general = [];

        console.log('tasks', data);

        Object.keys(data).forEach(function ( id ) {
            var parts = id.split(':');

            if ( parts.length === 1 ) {
                general.push(id);
            } else {
                groups[parts[0]] = groups[parts[0]] || [];
                groups[parts[0]].push(id);
            }
        });

        console.log(groups, general);

        Object.keys(groups).forEach(function ( group ) {
            var divGroup = document.createElement('div'),
                divTitle = document.createElement('div'),
                divTasks = document.createElement('div');

            divTitle.innerText = group;
            divGroup.className = 'group';
            divTitle.className = 'title';
            divTasks.className = 'tasks';

            page.$body.appendChild(divGroup);
            divGroup.appendChild(divTitle);
            divGroup.appendChild(divTasks);

            groups[group].sort().forEach(function ( id ) {
                var divTask = document.createElement('div');

                divTask.id = id;
                divTask.innerText = id.split(':').slice(1).join(':');
                divTask.className = 'button' + (data[id].running ? ' running' : '');
                divTask.addEventListener('click', function () {
                    app.wamp.call('runTask', {id: divTask.id}, function ( error, data ) {
                        //console.log('run task', div.innerText, data);
                    });
                });

                divTasks.appendChild(divTask);
            });
        });

        //Object.keys(data).forEach(function ( id ) {
        //    var div = document.createElement('div');
		//
        //    div.id = id;
        //    div.innerText = id;
        //    div.className = 'button' + (data[id].running ? ' running' : '');
        //    div.addEventListener('click', function () {
        //        app.wamp.call('runTask', {id: div.innerText}, function ( error, data ) {
        //            //console.log('run task', div.innerText, data);
        //        });
        //    });
		//
        //    page.$body.appendChild(div);
        //});
    });
});


// public
module.exports = page;
