define("ace/mode/svg",["require","exports","module","ace/lib/oop","ace/mode/xml","ace/mode/javascript","ace/tokenizer","ace/mode/svg_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("./xml").Mode,f=a("./javascript").Mode,g=a("../tokenizer").Tokenizer,h=a("./svg_highlight_rules").SvgHighlightRules,i=function(){e.call(this),this.highlighter=new h,this.$tokenizer=new g(this.highlighter.getRules()),this.$embeds=this.highlighter.getEmbeds(),this.createModeDelegates({"js-":f})};d.inherits(i,e),function(){this.getNextLineIndent=function(a,b,c){return this.$getIndent(b)}}.call(i.prototype),b.Mode=i}),define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./xml_highlight_rules").XmlHighlightRules,h=a("./behaviour/xml").XmlBehaviour,i=a("./folding/xml").FoldMode,j=function(){this.$tokenizer=new f((new g).getRules()),this.$behaviour=new h,this.foldingRules=new i};d.inherits(j,e),function(){this.getNextLineIndent=function(a,b,c){return this.$getIndent(b)}}.call(j.prototype),b.Mode=j}),define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("./xml_util"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:!0,regex:"<\\!--",next:"comment"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"text",regex:"[^<]+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:!0,regex:".+"}]},e.tag(this.$rules,"tag","start")};d.inherits(g,f),b.XmlHighlightRules=g}),define("ace/mode/xml_util",["require","exports","module"],function(a,b,c){function d(a){return[{token:"string",regex:'".*?"'},{token:"string",merge:!0,regex:'["].*',next:a+"-qqstring"},{token:"string",regex:"'.*?'"},{token:"string",merge:!0,regex:"['].*",next:a+"-qstring"}]}function e(a,b){return[{token:"string",merge:!0,regex:".*?"+a,next:b},{token:"string",merge:!0,regex:".+"}]}b.tag=function(a,b,c){a[b]=[{token:"text",regex:"\\s+"},{token:"meta.tag",merge:!0,regex:"[-_a-zA-Z0-9:]+",next:b+"embed-attribute-list"},{token:"empty",regex:"",next:b+"embed-attribute-list"}],a[b+"-qstring"]=e("'",b+"embed-attribute-list"),a[b+"-qqstring"]=e('"',b+"embed-attribute-list"),a[b+"embed-attribute-list"]=[{token:"meta.tag",merge:!0,regex:"/?>",next:c},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(d(b))}}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(a,b,c){var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=a("./cstyle").CstyleBehaviour,g=function(){this.inherit(f,["string_dquotes"]),this.add("brackets","insertion",function(a,b,c,d,e){if(e=="<"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?!1:{text:"<>",selection:[1,1]}}if(e==">"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==">")return{text:"",selection:[1,1]}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),k=i.substring(h.column,h.column+2);if(k=="</"){var l=this.$getIndent(d.doc.getLine(h.row))+d.getTabString(),m=this.$getIndent(d.doc.getLine(h.row));return{text:"\n"+l+"\n"+m,selection:[1,l.length,1,l.length]}}}})};d.inherits(g,e),b.XmlBehaviour=g}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(a,b,c){var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=function(){this.add("braces","insertion",function(a,b,c,d,e){if(e=="{"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"{"+g+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(e=="}"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var k=d.$findOpeningBracket("}",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var l=d.findMatchingBracket({row:h.row,column:h.column+1});if(!l)return null;var m=this.getNextLineIndent(a,i.substring(0,i.length-1),d.getTabString()),n=this.$getIndent(d.doc.getLine(l.row));return{text:"\n"+m+"\n"+n,selection:[1,m.length,1,m.length]}}}}),this.add("braces","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="{"){var g=d.doc.getLine(e.start.row),h=g.substring(e.end.column,e.end.column+1);if(h=="}")return e.end.column++,e}}),this.add("parens","insertion",function(a,b,c,d,e){if(e=="("){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"("+g+")",selection:!1}:{text:"()",selection:[1,1]}}if(e==")"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==")"){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="("){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==")")return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if(e=='"'){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(g!=="")return{text:'"'+g+'"',selection:!1};var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column-1,h.column);if(j=="\\")return null;var k=d.getTokens(f.start.row,f.start.row)[0].tokens,l=0,m,n=-1;for(var o=0;o<k.length;o++){m=k[o],m.type=="string"?n=-1:n<0&&(n=m.value.indexOf('"'));if(m.value.length+l>f.start.column)break;l+=k[o].value.length}if(!m||n<0&&m.type!=="comment"&&(m.type!=="string"||f.start.column!==m.value.length+l-1&&m.value.lastIndexOf('"')===m.value.length-1))return{text:'""',selection:[1,1]};if(m&&m.type==="string"){var p=i.substring(h.column,h.column+1);if(p=='"')return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=='"'){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=='"')return e.end.column++,e}})};d.inherits(f,e),b.CstyleBehaviour=f}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(a,b,c){var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=a("../../token_iterator").TokenIterator,h=b.FoldMode=function(a){f.call(this),this.voidElements=a||{}};d.inherits(h,f),function(){this.getFoldWidget=function(a,b){var c=a.getTokens(b,b)[0].tokens.filter(function(a){return a.type==="meta.tag"}).map(function(a){return a.value}).join("").trim().replace(/^<|>$|\s+/g,"").split("><"),d=c[0];if(!d||this.voidElements[d])return;if(d.charAt(0)=="/")return"end";if(c.indexOf("/"+d)!==-1)return;return"start"},this.getFoldWidgetRange=function(a,b){var c,d,f=[],h=new g(a,b,0),i="stepForward",j=!1;do{var k=h.getCurrentToken(),l=k.value.trim();if(k&&k.type=="meta.tag"&&k.value!==">"){var m=l.replace(/^[<\s]*|[\s*>]$/g,"");if(this.voidElements[m])continue;if(!c)m.charAt(0)=="/"&&(m=m.slice(1),i="stepBackward",j=!0),c={row:b,column:h.getCurrentTokenColumn()+(j?0:l.length+1)},f.push(m);else{var n;m.charAt(0)=="/"?(m=m.slice(1),n=!j):n=j;if(n)if(f[f.length-1]==m){f.pop();if(f.length===0)return d={row:h.getCurrentTokenRow(),column:h.getCurrentTokenColumn()+(j?l.length:0)},j?e.fromPoints(d,c):e.fromPoints(c,d)}else console.error("unmatched tags!",m,f);else f.push(m)}}}while(k=h[i]())}}.call(h.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){var d=a("../../range").Range,e=b.FoldMode=function(){};((function(){this.FOO=12,this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b){return this.foldingStartMarker?this.foldingStopMarker?this.$testBoth(a,b):this.$testStart(a,b):""},this.getFoldWidgetRange=function(a,b){return null},this.indentationBlock=function(a,b){var c=/^\s*/,e=b,f=b,g=a.getLine(b),h=g.length-1,i=g.match(c)[0].length;while(g=a.getLine(++b)){var j=g.match(c)[0].length;if(j==g.length)continue;if(j<=i)break;f=b}if(f>e){var k=a.getLine(f).length;return new d(e,h,f,k)}},this.$testStart=function(a,b){return this.foldingStartMarker.test(a.getLine(b))?"start":""},this.$testBoth=function(a,b){var c=a.getLine(b);return this.foldingStartMarker.test(c)?"start":this.foldingStopMarker.test(c)?"end":""}})).call(e.prototype)}),define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./javascript_highlight_rules").JavaScriptHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("../range").Range,j=a("../worker/worker_client").WorkerClient,k=a("./behaviour/cstyle").CstyleBehaviour,l=a("./folding/cstyle").FoldMode,m=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h,this.$behaviour=new k,this.foldingRules=new l};d.inherits(m,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=/^(\s*)\/\//;for(var g=c;g<=d;g++)if(!f.test(b.getLine(g))){e=!1;break}if(e){var h=new i(0,0,0,0);for(var g=c;g<=d;g++){var j=b.getLine(g),k=j.match(f);h.start.row=g,h.end.row=g,h.end.column=k[0].length,b.replace(h,k[1])}}else b.indentRows(c,d,"//")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"||a=="regex_allowed"){var h=b.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);h&&(d+=c)}else if(a=="doc-start"){if(g=="start"||a=="regex_allowed")return"";var h=b.match(/^\s*(\/?)\*/);h&&(h[1]&&(d+=" "),d+="* ")}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new j(["ace"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");return b.attachToDocument(a.getDocument()),b.on("jslint",function(b){var c=[];for(var d=0;d<b.data.length;d++){var e=b.data[d];e&&c.push({row:e.line-1,column:e.character-1,text:e.reason,type:"warning",lint:e})}a.setAnnotations(c)}),b.on("narcissus",function(b){a.setAnnotations([b.data])}),b.on("terminate",function(){a.clearAnnotations()}),b}}.call(m.prototype),b.Mode=m}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("../unicode"),g=a("./doc_comment_highlight_rules").DocCommentHighlightRules,h=a("./text_highlight_rules").TextHighlightRules,i=function(){var a=e.arrayToMap("Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document".split("|")),b=e.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),c="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield",d=e.arrayToMap("__parent__|__count__|escape|unescape|with|__proto__".split("|")),h=e.arrayToMap("const|let|var|function".split("|")),i=e.arrayToMap("null|Infinity|NaN|undefined".split("|")),j=e.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),k="["+f.packages.L+"\\$_]["+f.packages.L+f.packages.Mn+f.packages.Mc+f.packages.Nd+f.packages.Pc+"\\$_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},(new g).getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:["keyword.definition","text","entity.name.function"],regex:"(function)(\\s+)("+k+")"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"keyword",regex:"(?:"+c+")\\b",next:"regex_allowed"},{token:function(c){return a.hasOwnProperty(c)?"variable.language":d.hasOwnProperty(c)?"invalid.deprecated":h.hasOwnProperty(c)?"keyword.definition":b.hasOwnProperty(c)?"keyword":i.hasOwnProperty(c)?"constant.language":j.hasOwnProperty(c)?"invalid.illegal":c=="debugger"?"invalid.deprecated":"identifier"},regex:k},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)",next:"regex_allowed"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\.",next:"regex_allowed"},{token:"paren.lparen",regex:"[[({]",next:"regex_allowed"},{token:"paren.rparen",regex:"[\\])}]"},{token:"keyword.operator",regex:"\\/=?",next:"regex_allowed"},{token:"comment",regex:"^#!.*$"},{token:"text",regex:"\\s+"}],regex_allowed:[{token:"comment",merge:!0,regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/.*$"},{token:"string.regexp",regex:"\\/(?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*",next:"start"},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],comment_regex_allowed:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"regex_allowed"},{token:"comment",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]},this.embedRules(g,"doc-",[(new g).getEndRule("start")])};d.inherits(i,h),b.JavaScriptHighlightRules=i}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};d.inherits(f,e),function(){this.getStartRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:a}},this.getEndRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:a}}}.call(f.prototype),b.DocCommentHighlightRules=f}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("../range").Range,e=function(){};((function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}})).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/worker/worker_client",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/event_emitter").EventEmitter,f=function(b,c,d,e){this.changeListener=this.changeListener.bind(this);if(window.require.packaged)var f=this.$guessBasePath(),g=this.$worker=new Worker(f+c);else{var h=this.$normalizePath(a.nameToUrl("ace/worker/worker",null,"_")),g=this.$worker=new Worker(h),i={};for(var j=0;j<b.length;j++){var k=b[j],l=this.$normalizePath(a.nameToUrl(k,null,"_").replace(/.js$/,""));i[k]=l}}this.$worker.postMessage({init:!0,tlns:i,module:d,classname:e}),this.callbackId=1,this.callbacks={};var m=this;this.$worker.onerror=function(a){throw window.console&&console.log&&console.log(a),a},this.$worker.onmessage=function(a){var b=a.data;switch(b.type){case"log":window.console&&console.log&&console.log(b.data);break;case"event":m._dispatchEvent(b.name,{data:b.data});break;case"call":var c=m.callbacks[b.id];c&&(c(b.data),delete m.callbacks[b.id])}}};((function(){d.implement(this,e),this.$normalizePath=function(a){return a.match(/^\w+:/)||(a=location.protocol+"//"+location.host+(a.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+a.replace(/^[\/]+/,"")),a},this.$guessBasePath=function(){if(a.aceBaseUrl)return a.aceBaseUrl;var b=document.getElementsByTagName("script");for(var c=0;c<b.length;c++){var d=b[c],e=d.getAttribute("data-ace-base");if(e)return e.replace(/\/*$/,"/");var f=d.src||d.getAttribute("src");if(!f)continue;var g=f.match(/^(?:(.*\/)ace\.js|(.*\/)ace-uncompressed\.js)(?:\?|$)/);if(g)return g[1]||g[2]}return""},this.terminate=function(){this._dispatchEvent("terminate",{}),this.$worker.terminate(),this.$worker=null,this.$doc.removeEventListener("change",this.changeListener),this.$doc=null},this.send=function(a,b){this.$worker.postMessage({command:a,args:b})},this.call=function(a,b,c){if(c){var d=this.callbackId++;this.callbacks[d]=c,b.push(d)}this.send(a,b)},this.emit=function(a,b){try{this.$worker.postMessage({event:a,data:{data:b.data}})}catch(c){}},this.attachToDocument=function(a){this.$doc&&this.terminate(),this.$doc=a,this.call("setValue",[a.getValue()]),a.on("change",this.changeListener)},this.changeListener=function(a){a.range={start:a.data.range.start,end:a.data.range.end},this.emit("change",a)}})).call(f.prototype),b.WorkerClient=f}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(){};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b){var c=a.getLine(b),d=c.match(this.foldingStartMarker);if(d){var f=d.index;if(d[2])return a.getCommentFoldRange(b,f+d[0].length);var g={row:b,column:f+1},h=a.$findClosingBracket(d[1],g);if(h){var i=a.foldWidgets[h.row];i==null&&(i=this.getFoldWidget(a,h.row)),i=="start"&&(h.row--,h.column=a.getLine(h.row).length)}else h={row:a.getLength(),column:0};return e.fromPoints(g,h)}var d=c.match(this.foldingStopMarker);if(d){var f=d.index+d[0].length;if(d[2])return a.getCommentFoldRange(b,f);var h={row:b,column:f},g=a.$findOpeningBracket(d[1],h);return g?(g.column++,h.column--):g={row:0,column:a.getLine(0).length},e.fromPoints(g,h)}}}.call(g.prototype)}),define("ace/mode/svg_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules","ace/mode/xml_util"],function(a,b,c){var d=a("../lib/oop"),e=a("./javascript_highlight_rules").JavaScriptHighlightRules,f=a("./xml_highlight_rules").XmlHighlightRules,g=a("./xml_util"),h=function(){f.call(this),this.$rules.start.splice(3,0,{token:"meta.tag",regex:"<(?=s*script)",next:"script"}),g.tag(this.$rules,"script","js-start"),this.embedRules(e,"js-",[{token:"comment",regex:"\\/\\/.*(?=<\\/script>)",next:"tag"},{token:"meta.tag",regex:"<\\/(?=script)",next:"tag"}])};d.inherits(h,f),b.SvgHighlightRules=h})