/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('spa-component');


/**
 * Development task list implementation.
 *
 * @constructor
 * @extends Component
 *
 * @param {Object} config={}        init parameters (all inherited from the parent)
 * @param {Object} config.wamp      link to the server connection
 * @param {Array}  [config.data=[]] component data to visualize
 */
function TabList ( config ) {
    // current execution context
    var self = this;

    // sanitize
    config = config || {};

    console.assert(typeof this === 'object', 'must be constructed via new');

    if ( DEVELOP ) {
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
        // init parameters checks
        if ( config.className && typeof config.className !== 'string' ) { throw new Error(__filename + ': wrong or empty config.className'); }
        if ( !config.wamp ) { throw new Error(__filename + ': config.wamp must be given'); }
    }

    // set default className if classList property empty or undefined
    config.className = 'tabList ' + (config.className || '');

    // parent constructor call
    Component.call(this, config);

    //this.filterText = '';
    this.wamp = config.wamp;

    this.data = {};

    this.$focus = null;

    // component setup
    //this.init(config);

    // forward click to the specific item
    this.addListener('click', function ( event ) {
        var data = self.data[event.target.tabId];

        // there are some listeners
        /*if ( self.events['click:item'] ) {
            // notify listeners
            self.emit('click:item', {$item: event.target});
        }*/
        //console.log(event);

        if ( event.button === 0 ) {
            // left mouse button
            /*self.wamp.call('runTask', {id: event.target.taskId}, function ( error, data ) {
             console.log('run task', error, data);
             });*/
            self.$focus.classList.remove('active');
            self.$focus = event.target;
            self.$focus.classList.add('active');
            //console.log(self.data[event.target.tabId]);
            data.tab.show();
        } else if ( event.button === 1 && !data.online ) {
            // middle mouse button
            console.log('close');
            if ( event.target.tabId ) {
                //console.log(self.data[event.target.tabId]);
                self.close(event.target.tabId);
            }
        }
    });

    // this.wamp.addListener('eventTargetOnline', function ( target ) {
    //     //self.data[target.id].$node.classList.add('active');
    // });
	//
    // this.wamp.addListener('eventTargetOffline', function ( target ) {
    //     //self.data[target.id].$node.classList.remove('active');
    // });

    /*this.wamp.addListener('eventTaskStart', function ( event ) {
        console.log('task start', event);
        //window[event.id].classList.add('running');
        self.data[event.id].$node.classList.add('running');
    });

    this.wamp.addListener('eventTaskFinish', function ( event ) {
        console.log('task finish', event);
        //window[event.id].classList.remove('running');
        self.data[event.id].$node.classList.remove('running');
    });*/
}


// inheritance
TabList.prototype = Object.create(Component.prototype);
TabList.prototype.constructor = TabList;


/**
 * List of all default event callbacks.
 *
 * @type {Object.<string, function>}
 */
// TabList.prototype.defaultEvents = {
//
// };


/**
 * Init or re-init of the component inner structures and HTML.
 *
 * @param {Object} config init parameters (subset of constructor config params)
 */
/*TabList.prototype.init = function ( config ) {
    var self = this;

    if ( DEVELOP ) {
        if ( arguments.length !== 1 ) { throw new Error(__filename + ': wrong arguments number'); }
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
    }

    // save
    this.data = config.data || {};

    // apply
    Object.keys(this.data).forEach(function ( id ) {
        var item = document.createElement('div'),
            data = self.data[id];

        item.innerText = item.taskId = id;
        item.className = 'item' + (data.running ? ' running' : '');

        data.$node = item;

        self.$node.appendChild(item);
    });
};*/


// TabList.prototype.matchFilter = function ( node ) {
//     return !(this.filterText && node.innerText.indexOf(this.filterText) === -1);
// };


// TabList.prototype.applyFilter = function () {
//     var nodes = this.$body.children,
//         length, item;
//
//     // prepare
//     length = nodes.length - 1;
//     // check
//     while ( length-- ) {
//         item = nodes[length];
//
//         item.style.display = this.matchFilter(item) ? 'block' : 'none';
//     }
// };


TabList.prototype.online = function ( id, state ) {
    var data = this.data[id];

    if ( data ) {
        data.online = state;

        if ( state ) {
            data.$node.classList.add('online');
        } else {
            data.$node.classList.remove('online');
        }
    }
};


TabList.prototype.add = function ( data ) {
    var //self = this,
        item;
        //info = document.createElement('div');

    data = data || {};

    if ( !(data.id in this.data) ) {
        item = document.createElement('div');
        item.className = 'item online';
        item.tabId = data.id;

        if ( data.id ) {
            // target
            //item.innerText = 'target #' + data.id;
            item.innerText = data.host || 'n/a';
            //item.title = data.host || 'localhost';
            item.title = 'id: ' + data.id;
        } else {
            // system
            item.innerText = 'system';
            item.className += ' active';
            this.$focus = item;
        }

        data.$node  = item;
        data.online = true;
        this.data[data.id] = data;

        this.$body.appendChild(item);
    }


    // data.tags = data.tags || [];
    // data.tags.push(data.type);
    // data.tags.forEach(function ( tag ) {
    //     var div = document.createElement('div');
	//
    //     div.className = 'tag';
    //     div.innerText = tag;
	//
    //     item.appendChild(div);
	//
    //     // if ( ['info', 'warn', 'fail'].indexOf(tag) !== -1 ) {
    //     //     item.classList.add(tag);
    //     // }
	//
    //     div.addEventListener('click', function ( event ) {
    //         if ( event.ctrlKey ) {
    //             self.excludeTags.push(tag);
    //             window.pageMainTagsExclude.value = window.pageMainTagsExclude.value + (window.pageMainTagsExclude.value ? ' ' : '') + tag;
    //         } else {
    //             self.includeTags.push(tag);
    //             window.pageMainTagsInclude.value = window.pageMainTagsInclude.value + (window.pageMainTagsInclude.value ? ' ' : '') + tag;
    //         }
	//
    //         self.applyFilter();
	//
    //         /*var length = window.pageMainTabTargetList.children.length,
    //          index, node;
	//
    //          console.log(tag);
	//
    //          for ( index = 0; index < length; index++ ) {
    //          node = window.pageMainTabTargetList.children[index];
    //          //console.log(index, node);
    //          node.style.display = node.tags.indexOf(tag) === -1 ? 'none' : 'block';
    //          }*/
    //     });
    // });

    //item.classList.add(data.type);
    //item.tags = data.tags;

    // info.className = 'info';
    // console.log(data.data);
    // info.innerText = (data.data && 'link' in  data.data ? '+ ' : '- ') + getTime(data.time) + ' :: ' + data.info /*+ (data.data ? ' :: ' + data.data : '')*/;

    // item.addEventListener('click', function () {
    //     //console.log(data.data.link);
    //     app.wamp.call('getLinkData', {targetId: 128, linkId: data.data.link}, function ( error, data ) {
    //         console.log(error, data);
    //     });
    // });

    //item.appendChild(info);

    //console.log('target message', data);

    // if ( !this.matchFilter(item) ) {
    //     item.style.display = 'none';
    // }


};


TabList.prototype.close = function ( id ) {
    var data = this.data[id];

    if ( data ) {
        data.$node.parentNode.removeChild(data.$node);
        data.tab.remove();
        delete this.data[id];
    }
};


// public
module.exports = TabList;
