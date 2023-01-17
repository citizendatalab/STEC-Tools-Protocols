(function(t){function e(e){for(var r,s,i=e[0],c=e[1],l=e[2],d=0,p=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0074":function(t,e,n){},"034f":function(t,e,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("f9e3");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],s=(n("034f"),n("2877")),i={},c=Object(s["a"])(i,o,a,!1,null,null,null),l=c.exports,u=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("my-header"),t._m(0),n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12"},[n("span",{staticClass:"settingsHeader"},[t._v("Add your text below")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.rawtext,expression:"rawtext"}],attrs:{cols:"50",rows:"10",placeholder:"raw text is fine"},domProps:{value:t.rawtext},on:{input:function(e){e.target.composing||(t.rawtext=e.target.value)}}})])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-6"},[n("p",[n("span",{staticClass:"settingsHeader"},[t._v("Text Settings:")]),n("br"),t._v(" Language: "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.language,expression:"language"}],attrs:{id:"langugage"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.language=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"dutch"}},[t._v("Dutch")]),n("option",{attrs:{value:"english"}},[t._v("English")])]),n("br"),t._v(" Min number of word occurences: "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.min_num_occ,expression:"min_num_occ"}],attrs:{type:"number",min:"1",value:"2"},domProps:{value:t.min_num_occ},on:{input:function(e){e.target.composing||(t.min_num_occ=e.target.value)}}}),t._v(" "),n("br"),t._v(" Min word length "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.min_word_length,expression:"min_word_length"}],attrs:{type:"number",min:"1",value:"3"},domProps:{value:t.min_word_length},on:{input:function(e){e.target.composing||(t.min_word_length=e.target.value)}}}),t._v(" character (s)"),n("br")]),n("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button"},on:{click:function(e){return t.sendData()}}},[t._v("Retrieve word counts")])]),n("div",{staticClass:"col-sm-6"},[n("span",{staticClass:"settingsHeader"},[t._v("Poster Settings:")]),n("br"),n("p",[t._v(" Number of columns: "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.columns,expression:"columns"}],attrs:{id:"columns"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.columns=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"1"}},[t._v("1")]),n("option",{attrs:{value:"2"}},[t._v("2")]),n("option",{attrs:{value:"3"}},[t._v("3")])]),n("br"),t._v(" Title/Source: "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.title_source,expression:"title_source"}],attrs:{type:"text"},domProps:{value:t.title_source},on:{input:function(e){e.target.composing||(t.title_source=e.target.value)}}}),t._v(" "),n("br")]),n("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button",disabled:0==t.words.length},on:{click:function(e){return t.createPDF()}}},[t._v("Generate PDF")])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12"},[n("table",{staticClass:"table table-hover"},[n("thead",[n("tr",{directives:[{name:"show",rawName:"v-show",value:0!=t.words.length,expression:"words.length != 0"}]},[n("th",{attrs:{scope:"col"}},[t._v("Word")]),n("th",{attrs:{scope:"col"}},[t._v("Count")]),n("th",[n("button",{staticClass:"btn btn-success btn-sm",attrs:{type:"button",disabled:0==t.words.length},on:{click:function(e){return t.csvExport()}}},[t._v("Download CSV")])])])]),n("tbody",t._l(t.words,(function(e,r){return n("tr",{key:r},[n("td",{class:{hidewordclass:e[2]}},[t._v(t._s(e[0]))]),n("td",{class:{hidewordclass:e[2]}},[t._v(t._s(e[1]))]),n("td",{class:{hidewordclass:e[2]}},[n("div",{staticClass:"btn-group",attrs:{role:"group"}},[n("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button",disabled:!e[2]},on:{click:function(e){return t.unhideWord(r)}}},[t._v("Hide")]),n("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button",disabled:e[2]},on:{click:function(e){return t.hideWord(r)}}},[t._v("Show")])])])])})),0)])])])],1)},p=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-8"},[n("hr"),n("p",[t._v("This tool allows you to convert raw text to a sorted list of word counts which can then be plotted on an A3 poster for use in workshops as explained "),n("a",{attrs:{target:"_blank",href:"https://visualmethodologies.org/Workshop-at-AMFI-Talk-back-to-the-map"}},[t._v("here")]),t._v(".")])]),n("div",{staticClass:"col-sm-4"})])}],v=(n("99af"),n("a15b"),n("d81d"),n("b64b"),n("d3b7"),n("07ac"),n("ac1f"),n("3ca3"),n("5319"),n("ddb0"),n("2b3d"),n("2909")),m=n("bc3a"),f=n.n(m),h=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},_=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-sm-8"},[r("h1",{attrs:{id:"titleHeader"}},[t._v("Text to Poster ")])]),r("div",{staticClass:"col-sm-4"},[r("img",{attrs:{src:n("cf05")}})])])}],b=(n("8baf"),{}),g=Object(s["a"])(b,h,_,!1,null,null,null),w=g.exports,y={name:"Main",components:{"my-header":w},data:function(){return{rawtext:"",min_num_occ:2,min_word_length:3,language:"dutch",words:[],columns:2,title_source:""}},methods:{getText:function(t){var e=this,n="http://vmc-genposter.herokuapp.com/text";f.a.post(n,t).then((function(t){e.words=t.data})).catch((function(t){console.error(t)}))},sendData:function(){var t={text:this.rawtext,min_num_occ:this.min_num_occ,min_word_length:this.min_word_length,language:this.language};this.getText(t)},hideWord:function(t){r["a"].set(this.words[t],2,!0)},unhideWord:function(t){r["a"].set(this.words[t],2,!1)},csvExport:function(){var t=this.words,e="data:text/csv;charset=utf-8,";e+=[Object.keys(t[0]).join(";")].concat(Object(v["a"])(t.map((function(t){return Object.values(t).join(";")})))).join("\n").replace(/(^\[)|(\]$)/gm,"");var n=encodeURI(e),r=document.createElement("a");r.setAttribute("href",n),r.setAttribute("download","export.csv"),r.click()},createPDF:function(){var t={wordlist:this.words,columns:this.columns,title_source:this.title_source};console.log(t);var e="http://vmc-genposter.herokuapp.com/pdf";f()({method:"post",url:e,responseType:"arraybuffer",data:t}).then((function(t){var e=new Blob([t.data],{type:"application/pdf"}),n=document.createElement("a");n.href=window.URL.createObjectURL(e),n.download="Report.pdf",n.click()}))}},created:function(){}},x=y,C=(n("d969"),Object(s["a"])(x,d,p,!1,null,null,null)),j=C.exports;r["a"].use(u["a"]);var k=[{path:"/",name:"main",component:j}],O=new u["a"]({mode:"history",base:"/",routes:k}),P=O;r["a"].config.productionTip=!1,new r["a"]({router:P,render:function(t){return t(l)}}).$mount("#app")},6860:function(t,e,n){},"85ec":function(t,e,n){},"8baf":function(t,e,n){"use strict";var r=n("6860"),o=n.n(r);o.a},cf05:function(t,e,n){t.exports=n.p+"img/logo.1dc3ad46.png"},d969:function(t,e,n){"use strict";var r=n("0074"),o=n.n(r);o.a}});
//# sourceMappingURL=app.660baf4a.js.map