/**
 * Main page implementation.
 */

'use strict';

var app    = require('spa-app'),
    Page   = require('spa-component-page'),
    Button = require('spa-component-button'),
    page   = new Page({$node: window.pageMain});


function getTime ( timestamp ) {
    var date   = new Date(timestamp),
        hPart  = date.getHours(),
        mPart  = date.getMinutes(),
        msPart = date.getMilliseconds();

    if ( msPart === 0 ) { msPart = '000'; }
    else if ( msPart < 10  ) { msPart = '00' + msPart; }
    else if ( msPart < 100 ) { msPart = '0'  + msPart; }

    return (hPart > 9 ? '' : '0') + hPart + ':' + (mPart > 9 ? '' : '0') + mPart + '.' + msPart;
}


app.addListener('load', function load () {
    var buttonSystem = new Button({
            $node: window.pageMainButtonSystem,
            value: 'system',
            events: {
                click: function () {
                    window.pageMainTabSystem.style.display = 'block';
                    window.pageMainTabTarget.style.display = 'none';
                }
            }
        }),
        buttonTarget = new Button({
            $node: window.pageMainButtonTarget,
            value: 'target',
            events: {
                click: function () {
                    window.pageMainTabSystem.style.display = 'none';
                    window.pageMainTabTarget.style.display = 'block';
                }
            }
        });

    //window.pageMainHeader.appendChild(buttonSystem.$node);
    window.pageMainHeaderLink.href = window.pageMainHeaderLink.innerText = 'http://192.168.1.57:8080/app/develop.html?wampPort=9000';

    window.pageMainLinkClear.addEventListener('click', function () {
        var node = window.pageMainTabTargetList;

        while ( node.lastChild ) {
            node.removeChild(node.lastChild);
        }
    });

    window.pageMainLinkReset.addEventListener('click', function () {
        /*var node = window.pageMainTabTargetList.children,
            index;

        for ( index = node.length; index--; ) {
            node[index].style.display = 'block';
        }*/
        window.pageMainFilterText.value = window.pageMainTagsInclude.value = window.pageMainTagsExclude.value = '';
        applyFilter();
    });

    function applyFilter () {
        var node        = window.pageMainTabTargetList.children,
            tagsInclude = window.pageMainTagsInclude.value.split(' '),
            tagsExclude = window.pageMainTagsExclude.value.split(' '),
            index, visible, item;

        for ( index = node.length; index--; ) {
            item = node[index];
            visible = true;

            if ( window.pageMainFilterText.value && node[index].innerText.indexOf(window.pageMainFilterText.value) === -1 ) {
                visible = false;
            } else {
                tagsInclude.forEach(function ( tag ) {
                    if ( tag && item.tags.indexOf(tag) === -1 ) {
                        visible = false;
                    }
                });

                if ( visible ) {
                    tagsExclude.forEach(function ( tag ) {
                        if ( tag && item.tags.indexOf(tag) !== -1 ) {
                            visible = false;
                        }
                    });
                }
            }

            item.style.display = visible ? 'block' : 'none';
        }
    }

    window.pageMainFilterText.onkeydown = window.pageMainTagsInclude.onkeydown = window.pageMainTagsExclude.onkeydown = function ( event ) {
        event.stopPropagation();
        if ( event.keyCode === 13 ) {
            applyFilter();
        }
    };

    window.pageMainFilterText.onkeypress = window.pageMainTagsInclude.onkeypress = window.pageMainTagsExclude.onkeypress = function ( event ) {
        event.stopPropagation();
    };

    app.wamp.once('connection:open', function () {
        // info

        app.wamp.call('getInfo', {}, function ( error, data ) {
            console.log('info', data);
        });

        app.wamp.call('getMemoryUsage', {}, function ( error, data ) {
            //console.log('memory usage', data);
            debug.info('memory usage', data, {tags: ['memory']});
        });

        app.wamp.call('getClients', {}, function ( error, data ) {
            console.log('clients', data);
        });

        /*app.wamp.call('getTargets', {}, function ( error, data ) {
         console.log('targets', data);
         });*/

        app.wamp.call('getPlugins', {}, function ( error, data ) {
            console.log('plugins', data);
        });

        // notifications

        //app.wamp.addListener('eventTargetOnline', function ( event ) {
        //    console.log('new target', event);
        //});

        app.wamp.addListener('eventTaskStart', function ( event ) {
            console.log('task start', event);
            window[event.id].classList.add('running');
        });

        app.wamp.addListener('eventTaskFinish', function ( event ) {
            console.log('task finish', event);
            window[event.id].classList.remove('running');
        });

        app.wamp.addListener('eventTargetMessage', function ( event ) {
            var item = document.createElement('div'),
                info = document.createElement('div');

            item.className = 'item';

            event.tags = event.tags || [];
            event.tags.push(event.type);
            event.tags.forEach(function ( tag ) {
                var div = document.createElement('div');

                div.className = 'tag';
                div.innerText = tag;

                item.appendChild(div);

                // if ( ['info', 'warn', 'fail'].indexOf(tag) !== -1 ) {
                //     item.classList.add(tag);
                // }

                div.addEventListener('click', function ( event ) {
                    if ( event.ctrlKey ) {
                        window.pageMainTagsExclude.value = window.pageMainTagsExclude.value + (window.pageMainTagsExclude.value ? ' ' : '') + tag;
                    } else {
                        window.pageMainTagsInclude.value = window.pageMainTagsInclude.value + (window.pageMainTagsInclude.value ? ' ' : '') + tag;
                    }

                    applyFilter();

                    /*var length = window.pageMainTabTargetList.children.length,
                        index, node;

                    console.log(tag);

                    for ( index = 0; index < length; index++ ) {
                        node = window.pageMainTabTargetList.children[index];
                        //console.log(index, node);
                        node.style.display = node.tags.indexOf(tag) === -1 ? 'none' : 'block';
                    }*/
                });
            });
            item.classList.add(event.type);
            item.tags = event.tags;

            info.className = 'info';
            console.log(event.data);
            info.innerText = getTime(event.time) + (event.data && 'link' in  event.data ? ' + ' : ' - ') + event.info /*+ (event.data ? ' :: ' + event.data : '')*/;

            item.addEventListener('click', function () {
                //console.log(event.data.link);
                app.wamp.call('getLinkData', {targetId: 128, linkId: event.data.link}, function ( error, data ) {
                    console.log(error, data);
                });
            });

            item.appendChild(info);

            //console.log('target message', event);

            window.pageMainTabTargetList.appendChild(item);

            if ( window.pageMainTabTargetList.children.length >= 250 ) {
                window.pageMainTabTargetList.removeChild(window.pageMainTabTargetList.firstChild);
            }
        });

        /*app.wamp.addListener('message', function ( event ) {
            console.log('message', event);
        });*/

        app.wamp.call('getTargets', {}, function ( error, data ) {
            Object.keys(data).forEach(function ( id ) {
                var target = data[id];

                console.log('target', target);
                /*window.pageMainHeader.appendChild(new Button({
                    value: 'target #' + id + ' (' + target.host + ')'
                }).$node);*/
            });
        });
    });

    app.wamp.addListener('eventTargetOnline', function ( event ) {
        console.log('new target', event);
        /*window.pageMainHeader.appendChild(new Button({
            value: 'target #' + event.id + ' (' + event.host + ')'
        }).$node);*/
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

            window.pageMainTabSystem.appendChild(divGroup);
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

            window.pageMainTabSystem.appendChild(divGroup);
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
