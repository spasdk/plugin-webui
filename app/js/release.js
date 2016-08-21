/*! spa-webui v1.0.0 (webpack: v1.13.2) */
!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var i=n(1),s=n(7);s([function(t){i.once("load",function(){i.pages={init:n(8),main:n(11)},t()})},n(19)],function(t){t&&debug.fail(t),i.route(i.pages.main)})},function(t,e,n){"use strict";var i=n(2),s=n(6);Object.keys(s).forEach(function(t){window.addEventListener(t,s[t])}),t.exports=i},function(t,e,n){"use strict";function i(t,e){return!(!t||t.active)&&(t.$node.classList.add("active"),t.active=!0,c.activePage=t,t.events.show&&t.emit("show",{page:t,data:e}),!0)}function s(t){return!(!t||!t.active)&&(t.$node.classList.remove("active"),t.active=!1,c.activePage=null,t.events.hide&&t.emit("hide",{page:t}),!0)}var a=n(3),o=n(4).parse,c=new a;c.query=o(document.location.search.substring(1)),c.config=n(5),c.activePage=null,c.route=function(t,e){var n=c.activePage;return t&&!t.active?(s(c.activePage),i(t,e),this.events.route&&this.emit("route",{from:n,to:t}),!0):(debug.warn("invalid page to route: "+t.id,null,{tags:["route","page",t.id]}),!1)},t.exports=c},function(t,e,n){"use strict";function i(){this.events={}}i.prototype={addListener:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},once:function(t,e){var n=this;this.events[t]=this.events[t]||[],this.events[t].push(function i(){e.apply(n,arguments),n.removeListener(t,i)})},addListeners:function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.addListener(e,t[e])},removeListener:function(t,e){this.events[t]&&(this.events[t]=this.events[t].filter(function(t){return t!==e}),0===this.events[t].length&&(this.events[t]=void 0))},emit:function(t){var e,n=this.events[t];if(n)for(e=0;e<n.length;e++)n[e].apply(this,Array.prototype.slice.call(arguments,1))}},i.prototype.constructor=i,t.exports=i},function(t,e){"use strict";t.exports={parse:function(t){var e={};return t.split("&").forEach(function(t){t=t.split("="),2===t.length&&(e[t[0]]=decodeURIComponent(t[1]))}),e},stringify:function(t){var e=[];return Object.keys(t).forEach(function(n){e.push(n+"="+encodeURIComponent(t[n]))}),e.join("&")}}},function(t,e){"use strict";t.exports={}},function(t,e,n){"use strict";var i=n(2);t.exports={DOMContentLoaded:function(t){i.events.dom&&i.emit("dom",t)},load:function(t){i.events[t.type]&&i.emit(t.type,t)},unload:function(t){i.events[t.type]&&i.emit(t.type,t)},error:function(t){debug.fail("app event: "+t.message,t,{tags:[t.type,"event"]})},keydown:function(t){var e,n=i.activePage;e=n.activeComponent,e&&e!==n&&e.events[t.type]&&e.emit(t.type,t),t.stop||(n.events[t.type]&&n.emit(t.type,t),t.stop||i.events[t.type]&&i.emit(t.type,t))},keypress:function(t){var e=i.activePage;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t)},mousewheel:function(t){var e=i.activePage;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t),t.stop||e.events[t.type]&&e.emit(t.type,t)}}},function(t,e){"use strict";t.exports=function(t,e){function n(n,o){var c=function(n,c){if(n)return i=!0,void("function"==typeof e&&e(n));if(a[o]=c,s++,s===t.length&&"function"==typeof e)e(null,a);else if(s>t.length)throw Error("done callback invoked more than one time in function with "+o+" position in tasks array")};i||(0===n.length?c(null,n()):n(c))}var i=!1,s=0,a=[];t=Array.isArray(t)?t:[],0===t.length?"function"==typeof e&&e(null,a):t.forEach(n)}},function(t,e,n){"use strict";var i=n(9),s=new i({$node:window.pageInit});t.exports=s},function(t,e,n){"use strict";function i(t){t=t||{},this.active=!1,this.activeComponent=null,t.className="page "+(t.className||""),s.call(this,t),this.active=this.$node.classList.contains("active"),null===this.$node.parentNode&&document.body.appendChild(this.$node),this.page=this}var s=n(10);i.prototype=Object.create(s.prototype),i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";function i(t){var e,n=this;if(t=t||{},this.visible=!0,this.focusable=!0,this.$node=null,this.$body=null,this.parent=null,this.children=[],this.propagate=!!t.propagate,a.call(this,t.data),this.$node=t.$node||document.createElement("div"),this.$body=t.$body||this.$node,this.$node.className+=" component "+(t.className||""),this.id=t.id||this.$node.id||"cid"+o++,t.parent&&t.parent.add(this),t.visible===!1&&this.hide(),t.focusable===!1&&(this.focusable=!1),this.defaultEvents){t.events=t.events||{};for(e in this.defaultEvents)t.events[e]=t.events[e]||this.defaultEvents[e]}t.events&&Object.keys(t.events).forEach(function(e){n.addListener(e,t.events[e])}),t.children&&this.add.apply(this,t.children),this.$node.addEventListener("click",function(t){n.focus(),n.events.click&&n.emit("click",t),t.stopPropagation()})}var s=n(2),a=n(3),o=0;i.prototype=Object.create(a.prototype),i.prototype.constructor=i,i.prototype.defaultEvents=null,i.prototype.add=function(t){var e;for(e=0;e<arguments.length;e++)t=arguments[e],this.children.push(t),t.parent=this,t.$node&&null===t.$node.parentNode&&this.$body.appendChild(t.$node),this.events.add&&this.emit("add",{item:t})},i.prototype.remove=function(){this.parent&&(s.activePage.activeComponent===this&&(this.blur(),this.parent.focus()),this.parent.children.splice(this.parent.children.indexOf(this),1)),this.children.forEach(function(t){t.remove()}),this.events={},this.$node.parentNode.removeChild(this.$node),this.events.remove&&this.emit("remove")},i.prototype.focus=function(t){var e=s.activePage,n=e.activeComponent;return!(!this.focusable||this===n)&&(n&&n.blur(),e.activeComponent=n=this,n.$node.classList.add("focus"),n.events.focus&&n.emit("focus",t),!0)},i.prototype.blur=function(){var t=s.activePage,e=t.activeComponent;return this.$node.classList.remove("focus"),this===e?(t.activeComponent=null,this.events.blur&&this.emit("blur"),!0):(debug.warn("component "+this.constructor.name+"#"+this.id+" attempt to blur without link to a page",null,{tags:["blur","component",this.constructor.name,this.id]}),!1)},i.prototype.show=function(t){return!!this.visible||(this.$node.classList.remove("hidden"),this.visible=!0,this.events.show&&this.emit("show",t),!0)},i.prototype.hide=function(){return!this.visible||(this.$node.classList.add("hidden"),this.visible=!1,this.events.hide&&this.emit("hide"),!0)},t.exports=i},function(t,e,n){"use strict";function i(){o=new d({parent:u,wamp:c.wamp}),a.add({tab:o}),o.show()}function s(t){t.tab=new p({targetId:parseInt(t.id,10),parent:u,wamp:c.wamp}),a.add(t),t.id in h||(h[t.id]=t),a.online(t.id,!0)}var a,o,c=n(1),r=n(9),l=(n(12),n(13),n(14),n(15)),d=n(16),p=n(18),u=new r({$node:window.pageMain}),h={};c.addListener("load",function(){a=new l({$node:window.pageMainTabList,wamp:c.wamp}),i(),c.wamp.addListener("eventTargetOffline",function(t){a.online(t.id,!1)}),c.wamp.addListener("eventTargetOnline",function(t){s(t)})}),u.addListener("show",function(){o.taskList.init({data:c.data.tasks}),window.pageMainHeaderLink.href=window.pageMainHeaderLink.innerText="http://"+c.data.project.host+":8080/app/develop.html?wampPort="+c.query.wampPort,Object.keys(c.data.targets).forEach(function(t){c.data.targets[t].id=t,s(c.data.targets[t])}),c.wamp.addListener("eventTargetMessage",function(t){t.tags.indexOf("target")===-1?o.taskLogs.add(t):a.data[t.targetId].tab.logs.add(t)})}),t.exports=u},function(t,e,n){"use strict";function i(t){t=t||{},t.focusable=t.focusable||!1,t.className="tabItem hidden "+(t.className||""),t.visible=null,s.call(this,t),this.visible=!1}var s=n(10);i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.show=function(t){var e=null;return!!this.visible||(this.parent.currentTabItem&&(e=this.parent.currentTabItem,e.hide(t)),s.prototype.show.call(this,t),this.parent.currentTabItem=this,!0)},i.prototype.hide=function(){return!s.prototype.hide.call(this)||(this.parent.currentTabItem=null,!0)},t.exports=i},function(t,e,n){"use strict";function i(t){var e,n=this;t=t||{},t.className="console "+(t.className||""),a.call(this,t),this.$logsInclude=t.$logsInclude,this.$tagsInclude=t.$tagsInclude,this.$tagsExclude=t.$tagsExclude,t.$logsInclude.onkeydown=t.$tagsInclude.onkeydown=t.$tagsExclude.onkeydown=function(i){clearTimeout(e),e=setTimeout(function(){n.filterText=t.$logsInclude.value,n.includeTags=t.$tagsInclude.value.split(" "),n.excludeTags=t.$tagsExclude.value.split(" "),n.applyFilter()},300),i.stopPropagation()},this.filterText="",this.includeTags=[],this.excludeTags=[]}function s(t){var e=new Date(t),n=e.getHours(),i=e.getMinutes(),s=e.getMilliseconds();return 0===s?s="000":s<10?s="00"+s:s<100&&(s="0"+s),(n>9?"":"0")+n+":"+(i>9?"":"0")+i+"."+s}var a=n(10);i.prototype=Object.create(a.prototype),i.prototype.constructor=i,i.prototype.defaultEvents={},i.prototype.matchFilter=function(t){var e,n;if(this.filterText&&t.innerText.indexOf(this.filterText)===-1)return!1;for(e=this.includeTags.length;e--;)if(n=this.includeTags[e],n&&t.tags.indexOf(n)===-1)return!1;for(e=this.excludeTags.length;e--;)if(n=this.excludeTags[e],n&&t.tags.indexOf(n)!==-1)return!1;return!0},i.prototype.applyFilter=function(){var t,e,n=this.$body.children;for(t=n.length;t--;)e=n[t],e.style.display=this.matchFilter(e)?"block":"none"},i.prototype.add=function(t){var e=this,n=document.createElement("div"),i=document.createElement("div"),a=document.createElement("div");n.className="item",t.time=t.time||Date.now(),t.tags=t.tags||[],t.type=t.type||"info",t.tags.push(t.type),t.tags.forEach(function(t){var i=document.createElement("div");i.className="tag",i.innerText=t,n.appendChild(i),i.addEventListener("click",function(n){n.ctrlKey?(e.excludeTags.push(t),e.$tagsExclude.value=e.$tagsExclude.value+(e.$tagsExclude.value?" ":"")+t):(e.includeTags.push(t),e.$tagsInclude.value=e.$tagsInclude.value+(e.$tagsInclude.value?" ":"")+t),e.applyFilter(),n.stopPropagation()})}),n.classList.add(t.type),n.tags=t.tags,i.className="time",a.className="info",i.innerText=s(t.time),a.innerText=t.info,n.addEventListener("click",function(){app.wamp.call("getLinkData",{targetId:128,linkId:t.data.link},function(t,e){})}),n.appendChild(i),n.appendChild(a),this.matchFilter(n)||(n.style.display="none"),this.$body.appendChild(n),this.$body.children.length>=250&&this.$body.removeChild(this.$body.firstChild),this.$body.scrollTop=this.$body.scrollHeight},i.prototype.clear=function(){for(var t=this.$body;t.lastChild;)t.removeChild(t.lastChild)},i.prototype.resetFilters=function(){this.$logsInclude.value="",this.$tagsInclude.value="",this.$tagsExclude.value="",this.filterText="",this.includeTags=[],this.excludeTags=[],this.applyFilter()},t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;t=t||{},t.className="taskList "+(t.className||""),s.call(this,t),this.filterText="",this.wamp=t.wamp,this.init(t),this.addListener("click",function(t){e.wamp.call("runTask",{id:t.target.taskId},function(t,e){})}),this.wamp.addListener("eventTaskStart",function(t){e.data[t.id].$node.classList.add("running")}),this.wamp.addListener("eventTaskFinish",function(t){e.data[t.id].$node.classList.remove("running"),e.data[t.id].$node.classList.add("ok")})}var s=n(10);i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.defaultEvents={},i.prototype.init=function(t){var e=this;this.data=t.data||{},Object.keys(this.data).forEach(function(t){var n=document.createElement("div"),i=e.data[t];n.innerText=n.taskId=t,n.className="item"+(i.running?" running":""),i.$node=n,e.$node.appendChild(n)})},i.prototype.matchFilter=function(t){return!(this.filterText&&t.innerText.indexOf(this.filterText)===-1)},i.prototype.applyFilter=function(){var t,e,n=this.$body.children;for(t=n.length;t--;)e=n[t],e.style.display=this.matchFilter(e)?"block":"none"},i.prototype.add=function(t){var e=this,n=document.createElement("div"),i=document.createElement("div");n.className="item",t.tags=t.tags||[],t.tags.push(t.type),t.tags.forEach(function(t){var i=document.createElement("div");i.className="tag",i.innerText=t,n.appendChild(i),i.addEventListener("click",function(n){n.ctrlKey?(e.excludeTags.push(t),window.pageMainTagsExclude.value=window.pageMainTagsExclude.value+(window.pageMainTagsExclude.value?" ":"")+t):(e.includeTags.push(t),window.pageMainTagsInclude.value=window.pageMainTagsInclude.value+(window.pageMainTagsInclude.value?" ":"")+t),e.applyFilter()})}),n.classList.add(t.type),n.tags=t.tags,i.className="info",i.innerText=(t.data&&"link"in t.data?"+ ":"- ")+getTime(t.time)+" :: "+t.info,n.addEventListener("click",function(){app.wamp.call("getLinkData",{targetId:128,linkId:t.data.link},function(t,e){})}),n.appendChild(i),this.matchFilter(n)||(n.style.display="none"),this.$body.appendChild(n)},t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;t=t||{},t.className="tabList "+(t.className||""),s.call(this,t),this.wamp=t.wamp,this.data={},this.$focus=null,this.addListener("click",function(t){var n=e.data[t.target.tabId];0===t.button?(e.$focus.classList.remove("active"),e.$focus=t.target,e.$focus.classList.add("active"),n.tab.show()):1!==t.button||n.online||t.target.tabId&&e.close(t.target.tabId)})}var s=n(10);i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.online=function(t,e){var n=this.data[t];n&&(n.online=e,e?n.$node.classList.add("online"):n.$node.classList.remove("online"))},i.prototype.add=function(t){var e;t=t||{},t.id in this.data||(e=document.createElement("div"),e.className="item online",e.tabId=t.id,t.id?(e.innerText=t.host||"n/a",e.title="id: "+t.id):(e.innerText="system",e.className+=" active",this.$focus=e),t.$node=e,t.online=!0,this.data[t.id]=t,this.$body.appendChild(e))},i.prototype.close=function(t){var e=this.data[t];e&&(e.$node.parentNode.removeChild(e.$node),e.tab.remove(),delete this.data[t])},t.exports=i},function(t,e,n){"use strict";function i(t){var e,n,i=this,r=document.createElement("input"),l=document.createElement("input"),d=document.createElement("input"),p=document.createElement("input"),u=document.createElement("input");t=t||{},t.className="tabSystem "+(t.className||""),a.call(this,t),this.wamp=t.wamp,r.type="text",r.placeholder="filter tasks by name",this.$taskListFilters=document.createElement("div"),this.$taskListFilters.className="taskListFilters",this.$taskListFilters.appendChild(r),this.$body.appendChild(this.$taskListFilters),this.taskList=new o({parent:this,wamp:this.wamp}),r.onkeydown=function(t){clearTimeout(e),e=setTimeout(function(){i.taskList.filterText=r.value,i.taskList.applyFilter()},300),t.stopPropagation()},this.$taskLogsFilters=document.createElement("div"),this.$taskLogsFilters.className="taskLogsFilters",this.$body.appendChild(this.$taskLogsFilters),n=new s({className:"side",events:{click:function(){i.$node.classList.toggle("full")}}}),this.$taskLogsFilters.appendChild(n.$node),n=new s({className:"clear",events:{click:function(){i.taskLogs.clear()}}}),this.$taskLogsFilters.appendChild(n.$node),n=new s({className:"reset",events:{click:function(){i.taskLogs.resetFilters()}}}),this.$taskLogsFilters.appendChild(n.$node),l.type="text",l.placeholder="filter text",l.className="logsInclude",this.$taskLogsFilters.appendChild(l),d.type="text",d.placeholder="enter include tags",d.className="tagsInclude",this.$taskLogsFilters.appendChild(d),p.type="text",p.placeholder="enter exclude tags",p.className="tagsExclude",this.$taskLogsFilters.appendChild(p),this.taskLogs=new c({parent:this,wamp:this.wamp,$logsInclude:l,$tagsInclude:d,$tagsExclude:p}),u.type="text",u.placeholder="type task name to execute",u.onkeydown=function(t){13===t.keyCode&&(i.wamp.call("runTask",{id:u.value},function(t,e){}),u.value="")},this.taskExec=document.createElement("div"),this.taskExec.className="taskExec",this.taskExec.appendChild(u),this.$body.appendChild(this.taskExec)}var s=n(17),a=n(12),o=n(14),c=n(13);i.prototype=Object.create(a.prototype),i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";function i(t){t=t||{},t.className="button "+(t.className||""),s.call(this,t),t.icon&&(this.$icon=this.$body.appendChild(document.createElement("div")),this.$icon.className="icon "+t.icon),this.$text=this.$body.appendChild(document.createElement("div")),this.$text.classList.add("text"),t.value&&(this.$text.innerText=t.value)}var s=n(10);i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.clickDuration=200,i.prototype.defaultEvents={click:function(){var t=this;this.$node.classList.add("click"),setTimeout(function(){t.$node.classList.remove("click")},this.clickDuration)},keydown:function(t){13===t.keyCode&&this.events.click&&this.emit("click",{event:t})}},t.exports=i},function(t,e,n){"use strict";function i(t){var e,n=this,i=document.createElement("input"),c=document.createElement("input"),r=document.createElement("input"),l=document.createElement("input");t=t||{},t.className="tabTarget "+(t.className||""),a.call(this,t),this.wamp=t.wamp,this.targetId=t.targetId,this.$logsFilters=document.createElement("div"),this.$logsFilters.className="logsFilters",this.$body.appendChild(this.$logsFilters),e=new s({className:"clear",events:{click:function(){n.logs.clear()}}}),this.$logsFilters.appendChild(e.$node),e=new s({className:"reset",events:{click:function(){n.logs.resetFilters()}}}),this.$logsFilters.appendChild(e.$node),i.type="text",i.placeholder="filter text",i.className="logsInclude",this.$logsFilters.appendChild(i),c.type="text",c.placeholder="enter include tags",c.className="tagsInclude",this.$logsFilters.appendChild(c),r.type="text",r.placeholder="enter exclude tags",r.className="tagsExclude",this.$logsFilters.appendChild(r),this.logs=new o({parent:this,wamp:this.wamp,$logsInclude:i,$tagsInclude:c,$tagsExclude:r}),l.type="text",l.placeholder="type JavaScript code to execute",l.onkeydown=function(t){var e;13===t.keyCode&&(e=l.value,n.wamp.call("evalCode",{targetId:n.targetId,code:e},function(t,i){t||n.logs.add({info:e+" = "+i.eval,tags:["eval"]})}),l.value="")},this.codeExec=document.createElement("div"),this.codeExec.className="codeExec",this.codeExec.appendChild(l),this.$body.appendChild(this.codeExec)}var s=n(17),a=n(12),o=n(13);i.prototype=Object.create(a.prototype),i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";var i=n(1),s=n(20),a=n(7);t.exports=function(t){var e={connection:"getConnectionInfo",project:"getProjectInfo",clients:"getClients",targets:"getTargets",plugins:"getPlugins",tasks:"getTasks"},n=[],o=[];i.data={},i.wamp=new s("ws://"+(i.query.wampHost||location.hostname)+":"+i.query.wampPort+"/client"),i.wamp.addListener("connection:open",function(){document.body.style.opacity=1}),i.wamp.addListener("connection:close",function(){document.body.style.opacity=.2}),Object.keys(e).forEach(function(t){o.push(function(n){i.wamp.call(e[t],{},n)}),n.push(t)}),i.wamp.once("connection:open",function(){a(o,function(e,s){e&&debug.fail(e),s.forEach(function(t,e){i.data[n[e]]=t}),t()})})}},function(t,e,n){"use strict";function i(t){function e(){var i=new WebSocket(t);return i.onopen=function(){n.events[o.open]&&n.emit(o.open),n.open=!0},i.onclose=function(){n.events[o.close]&&n.open&&n.emit(o.close),n.open=!1,setTimeout(function(){n.socket=e(),n.socket.onmessage=function(t){n.router(t.data)}},a)},i}var n=this;this.open=!1,s.call(this,e())}var s=n(21),a=5e3,o={open:"connection:open",close:"connection:close"};i.prototype=Object.create(s.prototype),i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;a.call(this),this.socket=t,"on"in t?t.on("message",function(t){e.router(t)}):"onmessage"in t&&(t.onmessage=function(t){e.router(t.data)})}function s(t,e){1===t.readyState&&(e.jsonrpc="2.0",t.send(JSON.stringify(e)))}var a=n(3),o=0,c={};i.prototype=Object.create(a.prototype),i.prototype.constructor=i,i.prototype.router=function(t){var e,n=this;try{e=JSON.parse(t)}catch(i){return void s(this.socket,{error:{code:-32700,message:"Parse error"},id:null})}"id"in e&&!("method"in e)?e.id in c&&(c[e.id](e.error,e.result),delete c[e.id]):!("id"in e)&&"method"in e?this.events[e.method]&&this.emit(e.method,e.params):"id"in e&&"method"in e?this.events[e.method]?this.emit(e.method,e.params,function(t,i){s(n.socket,{error:t,result:i,id:e.id})}):s(this.socket,{error:{code:-32601,message:"Method not found"},id:e.id}):s(this.socket,{error:{code:-32600,message:"Invalid Request"},id:null})},i.prototype.call=function(t,e,n){var i={method:t,params:e};"function"==typeof n&&(i.id=++o,c[o]=n),s(this.socket,i)},t.exports=i}]);
//# sourceMappingURL=release.map