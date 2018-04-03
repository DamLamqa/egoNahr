!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e,r){"use strict";var n=t.exports={},a="Name",i="Marriage",o="Baptism",s="Offspring",u=function(t,e,r,n,a,i){this.ID=""+t,this.fullName=e,this.firstParent=r,this.secondParent=n,this.offSpringList=i,this.spouse=a,this.ID.includes("+")?this.isActor=!1:this.isActor=!0},f=function(t,e,r,n,a){this.source=t,this.target=e,this.tieType=r,this.tieStartYear=n,this.tieEndYear=a},c=[],l=[];function d(t,e){console.log(e);var r=function(t){var e=p(a,t);if(console.log(e),!e)return null;var r=e.data[0][0].text;if(r)return r}(e),n=function(t){var e=p(o,t);if(!e)return null;var r=e.data.parents.data[0]["query-value"],n=e.data.parents.data[0]["query-text"];if(r){var a=new u(r,n);return g(a),a}}(e),c=function(t){var e=p(o,t);if(!e)return null;var r=e.data.parents.data[2]["query-value"],n=e.data.parents.data[2]["query-text"];if(r){var a=new u(r,n);return g(a),a}}(e),d=function(t){var e=p(i,t);if(!e)return null;var r=e.data[0].data.spouse.data[0]["query-value"],n=e.data[0].data.spouse.data[0]["query-text"];if(r){var a=new u(r,n);return g(a),a}}(e),h=function(t){var e=p(s,t);if(!e)return null;var r=e.data.offsprings.data;if(r){for(var n=[],a=0;a<r.length;a++)if("actor"===r[a]["query-type"]){var i=r[a]["query-value"],o=new u(i);if("year"===r[a+2]["query-type"]){var f=r[a]["query-text"];o.fullName=f}n.push(o),g(o)}return n}}(e),y=new u(t,r,n,c,d,h);return(n||c)&&function(t){var e,r,n=v(t.firstParent),a=v(t.secondParent),i=new u(n+"+"+a);g(i),n.length>0&&(e=new f(n,i.ID));a.length>0&&(r=new f(a,i.ID));var o=new f(i.ID,t.ID);l.push(e,r,o)}(y),(h||d)&&function(t){var e=v(t.spouse),r=new u(t.ID+"+"+e);g(r);var n=new f(t.ID,r.ID);if(l.push(n),t.spouse){var a=new f(t.spouse.ID,r.ID);l.push(a)}if(t.offSpringList)for(var i=0;i<t.offSpringList.length;i++){var o=new f(r.ID,t.offSpringList[i].ID);l.push(o)}}(y),g(y),y}function p(t,e){var r=n.search(t,e);return r&&r.data?r:null}function g(t){0===c.filter(function(e){return e.ID===t.ID}).length&&c.push(t)}function v(t){return t?t.ID:""}n.search=function(t,e){for(var r=0;r<e.length;r++)if(e[r].label===t)return e[r];return null},n.checkLabelExistence=p,n.getActorData=function(t){var e=n.getJSON(t);return console.log(e),d(t,e)},n.getJSON=function(t){var e,r=new XMLHttpRequest,n="q="+t+"&s=ALL-SOURCES&w=search-by-option";return r.open("POST","https://projectcornelia.be/source_browser/public/router.php",!1),r.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.onreadystatechange=function(){4==r.readyState&&200==r.status&&(e=JSON.parse(r.responseText))},r.send(n),e},n.Node=u,n.nodeList=c,n.tieList=l},function(t,e,r){"use strict";var n,a=r(0),i=d3.select("svg"),o=+i.attr("width"),s=+i.attr("height");d3.scaleOrdinal(d3.schemeCategory20);function u(t,e){(t.firstParent.ID=e.ID)?t.firstParent=e:(t.secondParent.ID=e.ID)&&(t.secondParent=e)}function f(t){d3.event.active||n.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y}function c(t){t.fx=d3.event.x,t.fy=d3.event.y}function l(t){d3.event.active||n.alphaTarget(0),t.fx=null,t.fy=null}!function(t){var e={},r={},n=a.getActorData(t);if(n.offSpringList)for(var i=0;i<n.offSpringList.length;i++){if((e=a.getActorData(n.offSpringList[i].ID)).offSpringList)for(var o=0;o<e.offSpringList.length;o++)u(r=a.getActorData(e.offSpringList[o].ID),e),e.offSpringList[o]=r;u(e,n),n.offSpringList[i]=e}console.log(n)}("490");console.log(a.nodeList),function(t,e){var r={};r.nodes=t,r.links=e,n=d3.forceSimulation().force("link",d3.forceLink().id(function(t){return""+t.ID})).force("charge",d3.forceManyBody().strength(-250)).force("center",d3.forceCenter(o/2,s/2));var a=i.append("g").attr("class","links").selectAll("line").data(r.links).enter().append("line"),u=i.append("g").attr("class","nodes").selectAll("g").data(r.nodes).enter().append("g");u.append("rect").attr("width",function(t){return t.isActor?60:0}).attr("height",6).attr("x",-15).attr("y",-3).attr("fill","white").attr("stroke","black").call(d3.drag().on("start",f).on("drag",c).on("end",l)),u.append("text").text(function(t){if(t.isActor)return t.fullName}).attr("x",-10).attr("y",-10),n.nodes(r.nodes).on("tick",function(){a.attr("x1",function(t){return t.source.x}).attr("y1",function(t){return t.source.y}).attr("x2",function(t){return t.target.x}).attr("y2",function(t){return t.target.y}),u.attr("transform",function(t){return"translate("+t.x+","+t.y+")"})}),n.force("link").links(r.links)}(a.nodeList,a.tieList)}]);
//# sourceMappingURL=bundle.js.map