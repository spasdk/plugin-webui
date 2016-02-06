/*! spa-plugin-webui v1.0.0 (webpack: v1.12.13) */
!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var i=n(1),s=n(4),o=n(5),r=n(3);i.addListeners({load:function(){r.init([n(6),n(9)])},done:function(){i.wamp=new s(new WebSocket("ws://localhost:"+o(document.location.search.substring(1)).port+"/client")),i.wamp.socket.on("open",function(){r.navigate("pageMain")})}})},function(t,e,n){"use strict";var i=n(2),s=n(3),o=new i;o.data={time:{init:+new Date,load:0,done:0}},o.defaultEvents={load:function(t){o.data.time.load=t.timeStamp,o.events[t.type]&&o.emit(t.type,t),s.pages.forEach(function(e){e.events[t.type]&&e.emit(t.type,t)}),o.data.time.done=+new Date,o.events.done&&o.emit("done",t)},unload:function(t){o.events[t.type]&&o.emit(t.type,t),s.pages.forEach(function(e){e.events[t.type]&&e.emit(t.type,t)})},error:function(t){},keydown:function(t){var e,n=s.current;0!==t.keyCode&&(t.code=t.keyCode,t.shiftKey&&(t.code+=1e3),t.altKey&&(t.code+=2e3),e=n.activeComponent,e&&e!==n&&(e.events[t.type]&&e.emit(t.type,t),!t.stop&&e.propagate&&e.parent&&e.parent.events[t.type]&&e.parent.emit(t.type,t)),t.stop||(n.events[t.type]&&n.emit(t.type,t),t.stop||o.events[t.type]&&o.emit(t.type,t)))},keypress:function(t){var e=s.current;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t)},click:function(t){},contextmenu:function(t){t.preventDefault()},mousewheel:function(t){var e=s.current;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t),t.stop||e.events[t.type]&&e.emit(t.type,t)}},Object.keys(o.defaultEvents).forEach(function(t){window.addEventListener(t,o.defaultEvents[t])}),t.exports=o},function(t,e,n){"use strict";function i(){this.events={}}i.prototype={addListener:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},once:function(t,e){var n=this;this.events[t]=this.events[t]||[],this.events[t].push(function i(){e.apply(this,arguments),n.removeListener(t,i)})},addListeners:function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.addListener(e,t[e])},removeListener:function(t,e){this.events[t]&&(this.events[t]=this.events[t].filter(function(t){return t!==e}),0===this.events[t].length&&(this.events[t]=void 0))},removeAllListeners:function(t){0===arguments.length?this.events={}:t&&(this.events[t]=void 0)},emit:function(t){var e,n=this.events[t];if(n)for(e=0;e<n.length;e++)n[e].apply(this,Array.prototype.slice.call(arguments,1))}},i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";var i=n(2),s=new i;s.current=null,s.history=[],s.pages=[],s.ids={},s.init=function(t){var e,n,i;if(t){for(this.pages=[],this.pages=t,e=0,n=t.length;n>e;e++)i=t[e],this.ids[i.id]=i,i.active&&(this.current=i);return this.events.init&&this.emit("init",{pages:t}),!0}return!1},s.parse=function(t){var e={name:"",data:[]};return e.data=t.split("/").map(decodeURIComponent),e.name=e.data.shift().slice(1),e},s.stringify=function(t,e){return e=Array.isArray(e)?e:[],t=encodeURIComponent(t),e=e.map(encodeURIComponent),e.unshift(t),e.join("/")},s.show=function(t,e){return t&&!t.active?(t.$node.classList.add("active"),t.active=!0,this.current=t,t.events.show&&t.emit("show",{page:t,data:e}),!0):!1},s.hide=function(t){return t&&t.active?(t.$node.classList.remove("active"),t.active=!1,this.current=null,t.events.hide&&t.emit("hide",{page:t}),!0):!1},s.navigate=function(t,e){var n=this.current,i=this.ids[t];return i&&!i.active?(location.hash=this.stringify(t,e),this.hide(this.current),this.show(i,e),this.events.navigate&&this.emit("navigate",{from:n,to:i}),this.history.push(i),!0):!1},s.back=function(){var t,e;return this.history.length>1&&(t=this.history.pop(),e=this.history[this.history.length-1],e&&!e.active)?(location.hash=e.id,this.hide(this.current),this.show(e),this.events.navigate&&this.emit("navigate",{from:t,to:e}),!0):!1},t.exports=s},function(t,e,n){"use strict";function i(t){var e=this;o.call(this),this.socket=t,"on"in t?t.on("message",function(t){e.router(t)}):"onmessage"in t&&(t.onmessage=function(t){e.router(t.data)})}function s(t,e){1===t.readyState&&(e.jsonrpc="2.0",t.send(JSON.stringify(e)))}var o=n(2),r=0,a={};i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.router=function(t){var e,n=this;try{e=JSON.parse(t)}catch(i){return void s(this.socket,{error:{code:-32700,message:"Parse error"},id:null})}"id"in e&&!("method"in e)?e.id in a&&(a[e.id](e.error,e.result),delete a[e.id]):!("id"in e)&&"method"in e?this.events[e.method]&&this.emit(e.method,e.params):"id"in e&&"method"in e?this.events[e.method]?this.emit(e.method,e.params,function(t,i){s(n.socket,{error:t,result:i,id:e.id})}):s(this.socket,{error:{code:-32601,message:"Method not found"},id:e.id}):s(this.socket,{error:{code:-32600,message:"Invalid Request"},id:null})},i.prototype.call=function(t,e,n){var i={method:t,params:e};"function"==typeof n&&(i.id=++r,a[r]=n),s(this.socket,i)},t.exports=i},function(t,e){"use strict";t.exports=function(t){var e={};return t.split("&").forEach(function(t){t=t.split("="),2===t.length&&(e[t[0]]=decodeURIComponent(t[1]))}),e}},function(t,e,n){"use strict";var i=n(7),s=new i({$node:window.pageInit});t.exports=s},function(t,e,n){"use strict";function i(t){t=t||{},this.active=!1,this.activeComponent=null,t.className="page "+(t.className||""),s.call(this,t),this.active=this.$node.classList.contains("active"),null===this.$node.parentNode&&document.body.appendChild(this.$node),this.page=this}var s=n(8);i.prototype=Object.create(s.prototype),i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";function i(t){var e,n=this;if(t=t||{},this.visible=!0,this.focusable=!0,this.$node=null,this.$body=null,this.parent=null,this.children=[],this.propagate=!!t.propagate,s.call(this,t.data),this.$node=t.$node||document.createElement("div"),this.$body=t.$body||this.$node,this.$node.className+=" component "+(t.className||""),this.id=t.id||this.$node.id||"cid"+r++,t.parent&&t.parent.add(this),t.visible===!1&&this.hide(),t.focusable===!1&&(this.focusable=!1),this.defaultEvents){t.events=t.events||{};for(e in this.defaultEvents)t.events[e]=t.events[e]||this.defaultEvents[e]}t.events&&this.addListeners(t.events),t.children&&this.add.apply(this,t.children),this.$node.addEventListener("click",function(t){0===t.button&&(n.focus(),n.events.click&&n.emit("click",{event:t})),t.stopPropagation()})}var s=n(2),o=n(3),r=0;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.defaultEvents=null,i.prototype.add=function(t){var e;for(e=0;e<arguments.length;e++)t=arguments[e],this.children.push(t),t.parent=this,t.$node&&null===t.$node.parentNode&&this.$body.appendChild(t.$node),this.events.add&&this.emit("add",{item:t})},i.prototype.remove=function(){this.parent&&(o.current.activeComponent===this&&(this.blur(),this.parent.focus()),this.parent.children.splice(this.parent.children.indexOf(this),1)),this.children.forEach(function(t){t.remove()}),this.removeAllListeners(),this.$node.parentNode.removeChild(this.$node),this.events.remove&&this.emit("remove")},i.prototype.focus=function(t){var e=o.current,n=e.activeComponent;return this.focusable&&this!==n?(n&&n.blur(),e.activeComponent=n=this,n.$node.classList.add("focus"),n.events.focus&&n.emit("focus",t),!0):!1},i.prototype.blur=function(){var t=o.current,e=t.activeComponent;return this.$node.classList.remove("focus"),this===e?(t.activeComponent=null,this.events.blur&&this.emit("blur"),!0):!1},i.prototype.show=function(t){return this.visible?!0:(this.$node.classList.remove("hidden"),this.visible=!0,this.events.show&&this.emit("show",t),!0)},i.prototype.hide=function(){return this.visible?(this.$node.classList.add("hidden"),this.visible=!1,this.events.hide&&this.emit("hide"),!0):!0},t.exports=i},function(t,e,n){"use strict";var i=n(7),s=new i({$node:window.pageMain});t.exports=s}]);