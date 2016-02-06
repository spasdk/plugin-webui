/**
 * Main page implementation.
 */

'use strict';

var app  = require('spa-app'),
    Page = require('spa-component-page'),
    page = new Page({$node: window.pageMain});


page.addListener('show', function load () {
    app.wamp.call('getTasks', {}, function ( error, data ) {
        console.log('tasks', data);

        data.forEach(function ( id ) {
            var div = document.createElement('div');

            div.innerText = id;
            div.className = 'button';
            div.addEventListener('click', function () {
                app.wamp.call('runTask', {id: div.innerText}, function ( error, data ) {
                    console.log('run task', div.innerText, data);
                });
            });

            page.$body.appendChild(div);
        });
    });
});


// public
module.exports = page;
