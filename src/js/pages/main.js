/**
 * Main page implementation.
 */

'use strict';

var app    = require('spa-app'),
    Page   = require('spa-component-page'),
    Button = require('spa-component-button'),
    page   = new Page({$node: window.pageMain});


page.addListener('load', function load () {
    var buttonSystem = new Button({
        value: 'system'
    });

    window.pageMainHeader.appendChild(buttonSystem.$node);
    window.pageMainHeaderLink.href = window.pageMainHeaderLink.innerText = 'http://192.168.1.57:8080/app/develop.html?wampPort=9000';

    app.once('wamp:open', function () {
        app.wamp.call('getTargets', {}, function ( error, data ) {
            Object.keys(data).forEach(function ( id ) {
                var target = data[id];

                console.log('target', target);
                window.pageMainHeader.appendChild(new Button({
                    value: 'target #' + id + ' (' + target.host + ')'
                }).$node);
            });
        });
    });

    app.wamp.addListener('eventTargetOnline', function ( event ) {
        console.log('new target', event);
        window.pageMainHeader.appendChild(new Button({
            value: 'target #' + event.id + ' (' + event.host + ')'
        }).$node);
    });
});

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
                var divTask = document.createElement('div'),
                    parts   = id.split(':');

                divTask.id = id;
                divTask.innerText = parts.slice(1).join(':');
                divTask.className =
                    'button' +
                    (data[id].running ? ' running' : '') +
                    (parts.length === 2 ? ' main' : '') +
                    (parts[2] === 'develop' ? ' develop' : '') +
                    (parts[2] === 'default' ? ' default' : '');
                divTask.addEventListener('click', function () {
                    app.wamp.call('runTask', {id: divTask.id}, function ( error, data ) {
                        //console.log('run task', div.innerText, data);
                    });
                });

                divTasks.appendChild(divTask);
            });
        });

        ['general'].forEach(function ( group ) {
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

            general.sort().forEach(function ( id ) {
                var divTask = document.createElement('div');

                divTask.id = id;
                divTask.innerText = id;
                divTask.className = 'button' + (data[id].running ? ' running' : '');
                divTask.addEventListener('click', function () {
                    app.wamp.call('runTask', {id: divTask.id}, function ( error, data ) {
                        //console.log('run task', div.innerText, data);
                    });
                });

                divTasks.appendChild(divTask);
            });
        });
    });
});


// public
module.exports = page;
