/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('spa-component');


/**
 * Development console implementation.
 *
 * @constructor
 * @extends Component
 *
 * @param {Object}   [config={}]          init parameters (all inherited from the parent)
 * @param {Array}    [config.data=[]]     component data to visualize
 * @param {function} [config.render]      method to build each grid cell content
 * @param {function} [config.navigate]    method to move focus according to pressed keys
 * @param {number}   [config.size=5]      amount of visible items on a page
 * @param {number}   [config.viewIndex=0] move view window to this position on init
 * @param {number}   [config.focusIndex]  list item index to make item focused (move view window to this position)
 * @param {boolean}  [config.cycle=true]  allow or not to jump to the opposite side of a list when there is nowhere to go next
 * @param {boolean}  [config.scroll=null] associated ScrollBar component link
 */
function Console ( config ) {
    var self = this,
        timeout;

    // sanitize
    config = config || {};

    console.assert(typeof this === 'object', 'must be constructed via new');

    if ( DEVELOP ) {
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
        // init parameters checks
        if ( config.className && typeof config.className !== 'string' ) { throw new Error(__filename + ': wrong or empty config.className'); }
        if ( config.type      && Number(config.type) !== config.type  ) { throw new Error(__filename + ': config.type must be a number'); }
    }

    // set default className if classList property empty or undefined
    config.className = 'console ' + (config.className || '');

    // parent constructor call
    Component.call(this, config);

    this.$logsInclude = config.$logsInclude;
    this.$tagsInclude = config.$tagsInclude;
    this.$tagsExclude = config.$tagsExclude;

    config.$logsInclude.onkeydown = config.$tagsInclude.onkeydown = config.$tagsExclude.onkeydown = function ( event ) {
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            self.filterText  = config.$logsInclude.value;
            self.includeTags = config.$tagsInclude.value.split(' ');
            self.excludeTags = config.$tagsExclude.value.split(' ');
            self.applyFilter();
        }, 300);

        event.stopPropagation();
    };

    this.filterText = '';
    this.includeTags = [];
    this.excludeTags = [];
}


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


// inheritance
Console.prototype = Object.create(Component.prototype);
Console.prototype.constructor = Console;


/**
 * List of all default event callbacks.
 *
 * @type {Object.<string, function>}
 */
Console.prototype.defaultEvents = {

};


Console.prototype.matchFilter = function ( node ) {
    var length, tag;

    if ( this.filterText && node.innerText.indexOf(this.filterText) === -1 ) {
        return false;
    }

    // prepare
    length = this.includeTags.length;
    // check
    while ( length-- ) {
        tag = this.includeTags[length];

        if ( tag && node.tags.indexOf(tag) === -1 ) {
            return false;
        }
    }

    // prepare
    length = this.excludeTags.length;
    // check
    while ( length-- ) {
        tag = this.excludeTags[length];

        if ( tag && node.tags.indexOf(tag) !== -1 ) {
            return false;
        }
    }

    return true;
};


Console.prototype.applyFilter = function () {
    var nodes = this.$body.children,
        length, item;

    // prepare
    length = nodes.length;
    // check
    while ( length-- ) {
        item = nodes[length];

        item.style.display = this.matchFilter(item) ? 'block' : 'none';
    }
};


Console.prototype.add = function ( data ) {
    var self = this,
        item = document.createElement('div'),
        time = document.createElement('div'),
        info = document.createElement('div');

    item.className = 'item';

    data.time = data.time || Date.now();
    data.tags = data.tags || [];
    data.type = data.type || 'info';
    data.tags.push(data.type);
    data.tags.forEach(function ( tag ) {
        var div = document.createElement('div');

        div.className = 'tag';
        div.innerText = tag;

        item.appendChild(div);

        // if ( ['info', 'warn', 'fail'].indexOf(tag) !== -1 ) {
        //     item.classList.add(tag);
        // }

        div.addEventListener('click', function ( event ) {
            if ( event.ctrlKey ) {
                self.excludeTags.push(tag);
                self.$tagsExclude.value = self.$tagsExclude.value + (self.$tagsExclude.value ? ' ' : '') + tag;
            } else {
                self.includeTags.push(tag);
                self.$tagsInclude.value = self.$tagsInclude.value + (self.$tagsInclude.value ? ' ' : '') + tag;
            }

            self.applyFilter();

            event.stopPropagation();

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
    item.classList.add(data.type);
    item.tags = data.tags;

    time.className = 'time';
    info.className = 'info';

    //console.log(data.data);
    // data.data can be a string which can give:
    // Uncaught TypeError: Cannot use 'in' operator to search for 'link' in ENOENT: no such file or directory, unlink 'app/css/develop.css'
    /*if ( data.data && 'link' in data.data ) {
        item.classList.add('data');
    }*/

    time.innerText = getTime(data.time);

    info.innerText = /*(data.data && 'link' in  data.data ? '+ ' : '- ') + getTime(data.time) + ' :: ' +*/ data.info /*+ (data.data ? ' :: ' + data.data : '')*/;

    item.addEventListener('click', function () {
        //console.log(data.data.link);
        app.wamp.call('getLinkData', {targetId: 128, linkId: data.data.link}, function ( error, data ) {
            console.log(error, data);
        });
    });

    item.appendChild(time);
    item.appendChild(info);

    //console.log('target message', data);

    if ( !this.matchFilter(item) ) {
        item.style.display = 'none';
    }

    //this.$node.insertBefore(item, this.$input);
    this.$body.appendChild(item);

    if ( this.$body.children.length >= 250 ) {
        this.$body.removeChild(this.$body.firstChild);
    }

    this.$body.scrollTop = this.$body.scrollHeight;
};


Console.prototype.clear = function () {
    var body = this.$body;

    while ( body.lastChild ) {
        body.removeChild(body.lastChild);
    }
};


Console.prototype.resetFilters = function () {
    this.$logsInclude.value = '';
    this.$tagsInclude.value = '';
    this.$tagsExclude.value = '';

    this.filterText  = '';
    this.includeTags = [];
    this.excludeTags = [];

    this.applyFilter();
};


// public
module.exports = Console;
