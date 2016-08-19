/**
 * Main page implementation.
 */

'use strict';

var app       = require('spa-app'),
    Page      = require('spa-component-page'),
    //Button    = require('spa-component-button'),
    TabItem   = require('spa-component-tab-item'),
    Console   = require('./../modules/console'),
    TaskList  = require('./../modules/task.list'),
    TabList   = require('./../modules/tab.list'),
    TabSystem = require('./../modules/tab.system'),
    TabTarget = require('./../modules/tab.target'),
    page      = new Page({$node: window.pageMain}),
    targets   = {},
    taskList, taskLogs, devConsole, tabList,
    tabSystem;


function addSystemTab () {
    // var button = new Button({
    //     value: 'system',
    //     events: {
    //         click: function () {
	//
    //         }
    //     }
    // });

    //window.pageMainHeader.appendChild(button.$node);

    // taskList = new TaskList({
    //     $node: window.pageMainTaskList,
    //     wamp: app.wamp
    // });

    // taskLogs = new Console({
    //     $node: window.pageMainTaskLogs,
    //     events: {}
    // });

    tabSystem = new TabSystem({
        parent: page,
        wamp: app.wamp
    });
    /*tabSystem = new TabItem({
        parent: page
    });*/

    tabList.add({
        tab: tabSystem
    });

    tabSystem.show();
}

function addTargetTab ( data ) {
    // data.tab = new TabTarget({
    //     parent: page,
    //     wamp: app.wamp
    // });

    data.tab = new TabTarget({
        targetId: parseInt(data.id, 10),
        parent: page,
        wamp: app.wamp
    });

    tabList.add(data);

    if ( !(data.id in targets) ) {
        // data.button = new Button({
        //     value: 'target #' + data.id,
        //     events: {
        //         click: function () {
		//
        //         }
        //     }
        // });

        //window.pageMainHeader.appendChild(data.button.$node);
        targets[data.id] = data;
    }

    tabList.online(data.id, true);
}

// function removeTargetTab ( data ) {
//     targets[data.id].button.remove();
// }


app.addListener('load', function load () {
    var timeout;

    // var /*buttonSystem = new Button({
    //         //$node: window.pageMainButtonSystem,
    //         value: 'system',
    //         events: {
    //             click: function () {
    //                 window.pageMainTabSystem.style.display = 'block';
    //                 window.pageMainTabTarget.style.display = 'none';
    //             }
    //         }
    //     }),
    //     buttonTarget = new Button({
    //         //$node: window.pageMainButtonTarget,
    //         value: 'target',
    //         events: {
    //             click: function () {
    //                 window.pageMainTabSystem.style.display = 'none';
    //                 window.pageMainTabTarget.style.display = 'block';
    //             }
    //         }
    //     }),*/
    //     devConsole = new Console({
    //         $node: window.pageMainTabConsole,
    //         events: {}
    //     });

    tabList = new TabList({
        $node: window.pageMainTabList,
        wamp: app.wamp
    });

    // devConsole = new Console({
    //     $node: window.pageMainTabConsole,
    //     events: {}
    // });

    addSystemTab();

    // window.pageMainLinkClear.addEventListener('click', function () {
    //     devConsole.clear();
    // });
	//
    // window.pageMainLinkReset.addEventListener('click', function () {
    //     window.pageMainFilterText.value = window.pageMainTagsInclude.value = window.pageMainTagsExclude.value = '';
    //     devConsole.filterText  = '';
    //     devConsole.includeTags = [];
    //     devConsole.excludeTags = [];
    //     devConsole.applyFilter();
    // });

    /*function applyFilter () {
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
    }*/

    // window.pageMainTaskFilter.onkeydown = function ( event ) {
    //     // Clear the timeout if it has already been set.
    //     // This will prevent the previous task from executing
    //     // if it has been less than <MILLISECONDS>
    //     clearTimeout(timeout);
	//
    //     timeout = setTimeout(function () {
    //         //if ( event.keyCode === 13 ) {
    //         taskList.filterText = window.pageMainTaskFilter.value;
    //         taskList.applyFilter();
    //         //}
    //     }, 300);
	//
    //     event.stopPropagation();
    // };

    // window.pageMainFilterText.onkeydown = window.pageMainTagsInclude.onkeydown = window.pageMainTagsExclude.onkeydown = function ( event ) {
    //     event.stopPropagation();
    //     if ( event.keyCode === 13 ) {
    //         devConsole.filterText  = window.pageMainFilterText.value;
    //         devConsole.includeTags = window.pageMainTagsInclude.value.split(' ');
    //         devConsole.excludeTags = window.pageMainTagsExclude.value.split(' ');
    //         devConsole.applyFilter();
    //     }
    // };

    // window.pageMainFilterText.onkeypress = window.pageMainTagsInclude.onkeypress = window.pageMainTagsExclude.onkeypress = function ( event ) {
    //     event.stopPropagation();
    // };

    //app.wamp.once('connection:open', function () {
        // info

        // app.wamp.call('getConnectionInfo', {}, function ( error, data ) {
        //     console.log('connection info', data);
        // });
		//
        // app.wamp.call('getProjectInfo', {}, function ( error, data ) {
        //     console.log('project info', data);
        //     window.pageMainHeaderLink.href = window.pageMainHeaderLink.innerText = 'http://' + data.host + ':8080/app/develop.html?wampPort=' + app.query.wampPort;
        // });
		//
        // app.wamp.call('getMemoryUsage', {}, function ( error, data ) {
        //     //console.log('memory usage', data);
        //     debug.info('memory usage', data, {tags: ['memory']});
        // });
		//
        // app.wamp.call('getClients', {}, function ( error, data ) {
        //     console.log('clients', data);
        // });
		//
        // app.wamp.call('getTargets', {}, function ( error, data ) {
        //     console.log('targets', data);
		//
        //     Object.keys(data).forEach(function ( id ) {
        //         addTargetTab({id: id});
        //     });
        // });
		//
        // app.wamp.call('getPlugins', {}, function ( error, data ) {
        //     console.log('plugins', data);
        // });

        // notifications

        //app.wamp.addListener('eventTargetOnline', function ( event ) {
        //    console.log('new target', event);
        //});

        // app.wamp.addListener('eventTaskStart', function ( event ) {
        //     console.log('task start', event);
        //     window[event.id].classList.add('running');
        // });
		//
        // app.wamp.addListener('eventTaskFinish', function ( event ) {
        //     console.log('task finish', event);
        //     window[event.id].classList.remove('running');
        // });

        //app.wamp.addListener('eventTargetMessage', function ( event ) {
            //console.log(event);

            // if ( event.tags.indexOf('target') === -1 ) {
            //     taskLogs.add(event);
            // } else {
            //     devConsole.add(event);
            // }


            /*var item = document.createElement('div'),
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

                    /!*var length = window.pageMainTabTargetList.children.length,
                        index, node;

                    console.log(tag);

                    for ( index = 0; index < length; index++ ) {
                        node = window.pageMainTabTargetList.children[index];
                        //console.log(index, node);
                        node.style.display = node.tags.indexOf(tag) === -1 ? 'none' : 'block';
                    }*!/
                });
            });
            item.classList.add(event.type);
            item.tags = event.tags;

            info.className = 'info';
            console.log(event.data);
            info.innerText = getTime(event.time) + (event.data && 'link' in  event.data ? ' + ' : ' - ') +
                event.info /!*+ (event.data ? ' :: ' + event.data : '')*!/;

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
            }*/
        //});

        /*app.wamp.addListener('message', function ( event ) {
            console.log('message', event);
        });*/

        // app.wamp.call('getTargets', {}, function ( error, data ) {
        //     Object.keys(data).forEach(function ( id ) {
        //         var target = data[id];
		//
        //         console.log('target', target);
        //         /*window.pageMainHeader.appendChild(new Button({
        //             value: 'target #' + id + ' (' + target.host + ')'
        //         }).$node);*/
        //     });
        // });
    //});

    app.wamp.addListener('eventTargetOffline', function ( target ) {
        console.log('remove target', target);

        //removeTargetTab(target);
        //tabList.data[target.id].$node.classList.remove('online');
        tabList.online(target.id, false);
        //addTargetTab(target);
        /*window.pageMainHeader.appendChild(new Button({
            value: 'target #' + target.id + ' (' + target.host + ')'
        }).$node);*/
    });

    app.wamp.addListener('eventTargetOnline', function ( target ) {
        console.log('new target', target);

        addTargetTab(target);

        //tabList.data[target.id].$node.classList.add('online');
        /*window.pageMainHeader.appendChild(new Button({
            value: 'target #' + target.id + ' (' + target.host + ')'
        }).$node);*/
    });
});


page.addListener('show', function load () {
    //taskList.init({data: app.data.tasks});
    tabSystem.taskList.init({data: app.data.tasks});

    window.pageMainHeaderLink.href = window.pageMainHeaderLink.innerText = 'http://' + app.data.project.host + ':8080/app/develop.html?wampPort=' + app.query.wampPort;

    Object.keys(app.data.targets).forEach(function ( id ) {
        app.data.targets[id].id = id;
        addTargetTab(app.data.targets[id]);
    });

    app.wamp.addListener('eventTargetMessage', function ( event ) {
        console.log(event);

        if ( event.tags.indexOf('target') === -1 ) {
            tabSystem.taskLogs.add(event);
        } else {
            //devConsole.add(event);
            //console.log(event.targetId);
            tabList.data[event.targetId].tab.logs.add(event);
        }
    });

    /*app.wamp.call('getTasks', {}, function ( error, data ) {
        var groups  = {},
            general = [];

        console.log('tasks', data);

        taskList = new TaskList({
            $node: window.pageMainTaskList,
            data: data,
            wamp: app.wamp,
            events: {
                /!*'click:item': function ( event ) {
                    console.log(event.$item);
                    app.wamp.call('runTask', {id: event.$item.innerText}, function ( error, data ) {
                        console.log('run task', error, data);
                    });
                }*!/
            }
        });

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
    });*/
});


// public
module.exports = page;
