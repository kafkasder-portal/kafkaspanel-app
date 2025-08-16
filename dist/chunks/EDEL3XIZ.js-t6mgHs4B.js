var e=Object.defineProperty,t=(t,n,r)=>((t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r)(t,"symbol"!=typeof n?n+"":n,r);import{bf as n,bg as r,bh as o,bi as i,bj as l,bk as s,bl as a,bm as d,bn as u,bo as c,bp as g,bq as f,br as p,bs as h,bt as y,bu as v,bv as b,bw as m,bx as w,by as x,bz as k,bA as $,bB as S,bC as C,bD as E,bE as q,bF as M,bG as L,bH as F,bI as D,bJ as T,bK as A,bL as O,bM as I,bN as P,bO as z,bP as K,bQ as R,bR as B,bS as H,bT as G,bU as U,bV as V,bW as j,bX as N,bY as Q,bZ as W,b_ as _,b$ as X,c0 as Z}from"../assets/index-CzvAnh9f.js";var Y,J=e=>null!=e,ee=e=>"function"!=typeof e||e.length?e:e(),te=e=>Array.isArray(e)?e:e?[e]:[],ne=b,re=e=>{if(!e)return"";let t="";for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:"boolean"==typeof r?`; ${n}`:`; ${n}=${r}`}return t},oe=("function"==typeof(Y={_cookies:[globalThis.document,"cookie"],getItem:e=>{var t;return(null==(t=oe._cookies[0][oe._cookies[1]].match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))?void 0:t.pop())??null},setItem:(e,t,n)=>{const r=oe.getItem(e);oe._cookies[0][oe._cookies[1]]=`${e}=${t}${re(n)}`;const o=Object.assign(new Event("storage"),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:oe});window.dispatchEvent(o)},removeItem:e=>{oe._cookies[0][oe._cookies[1]]=`${e}=deleted${re({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return oe._cookies[0][oe._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,o)=>(!t&&o&&n++===e&&(t=o),"")),t},get length(){let e=0;return oe._cookies[0][oe._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=t?1:0,"")),e}}).clear||(Y.clear=()=>{let e;for(;e=Y.key(0);)Y.removeItem(e)}),Y),ie=796,le="bottom",se=Object.keys(m)[0],ae=Object.keys(w)[0],de=n({client:void 0,onlineManager:void 0,queryFlavor:"",version:"",shadowDOMTarget:void 0});function ue(){return v(de)}var ce=n(void 0),ge=e=>{const[t,n]=r(null),o=()=>{const e=t();null!=e&&(e.close(),n(null))},a=(r,o)=>{if(null!=t())return;const i=window.open("","TSQD-Devtools-Panel",`width=${r},height=${o},popup`);if(!i)throw new Error("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");i.document.head.innerHTML="",i.document.body.innerHTML="",h(i.document),i.document.title="TanStack Query Devtools",i.document.body.style.margin="0",i.addEventListener("pagehide",()=>{e.setLocalStore("pip_open","false"),n(null)}),[...(ue().shadowDOMTarget||document).styleSheets].forEach(e=>{try{const t=[...e.cssRules].map(e=>e.cssText).join(""),n=document.createElement("style"),r=e.ownerNode;let o="";r&&"id"in r&&(o=r.id),o&&n.setAttribute("id",o),n.textContent=t,i.document.head.appendChild(n)}catch(t){const n=document.createElement("link");if(null==e.href)return;n.rel="stylesheet",n.type=e.type,n.media=e.media.toString(),n.href=e.href,i.document.head.appendChild(n)}}),y(["focusin","focusout","pointermove","keydown","pointerdown","pointerup","click","mousedown","input"],i.document),e.setLocalStore("pip_open","true"),n(i)};i(()=>{"true"!==(e.localStore.pip_open??"false")||e.disabled||a(Number(window.innerWidth),Number(e.localStore.height||500))}),i(()=>{const e=(ue().shadowDOMTarget||document).querySelector("#_goober"),n=t();if(e&&n){const t=new MutationObserver(()=>{const t=(ue().shadowDOMTarget||n.document).querySelector("#_goober");t&&(t.textContent=e.textContent)});t.observe(e,{childList:!0,subtree:!0,characterDataOldValue:!0}),b(()=>{t.disconnect()})}});const d=l(()=>({pipWindow:t(),requestPipWindow:a,closePipWindow:o,disabled:e.disabled??!1}));return s(ce.Provider,{value:d,get children(){return e.children}})},fe=()=>l(()=>{const e=v(ce);if(!e)throw new Error("usePiPWindow must be used within a PiPProvider");return e()}),pe=n(()=>"dark");function he(){return v(pe)}var ye={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ấ":"A","Ắ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Æ":"AE","Ầ":"A","Ằ":"A","Ȃ":"A","Ç":"C","Ḉ":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ế":"E","Ḗ":"E","Ề":"E","Ḕ":"E","Ḝ":"E","Ȇ":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ḯ":"I","Ȋ":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ố":"O","Ṍ":"O","Ṓ":"O","Ȏ":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ấ":"a","ắ":"a","ẳ":"a","ẵ":"a","ặ":"a","æ":"ae","ầ":"a","ằ":"a","ȃ":"a","ç":"c","ḉ":"c","è":"e","é":"e","ê":"e","ë":"e","ế":"e","ḗ":"e","ề":"e","ḕ":"e","ḝ":"e","ȇ":"e","ì":"i","í":"i","î":"i","ï":"i","ḯ":"i","ȋ":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ố":"o","ṍ":"o","ṓ":"o","ȏ":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Ĉ":"C","ĉ":"c","Ċ":"C","ċ":"c","Č":"C","č":"c","C̆":"C","c̆":"c","Ď":"D","ď":"d","Đ":"D","đ":"d","Ē":"E","ē":"e","Ĕ":"E","ĕ":"e","Ė":"E","ė":"e","Ę":"E","ę":"e","Ě":"E","ě":"e","Ĝ":"G","Ǵ":"G","ĝ":"g","ǵ":"g","Ğ":"G","ğ":"g","Ġ":"G","ġ":"g","Ģ":"G","ģ":"g","Ĥ":"H","ĥ":"h","Ħ":"H","ħ":"h","Ḫ":"H","ḫ":"h","Ĩ":"I","ĩ":"i","Ī":"I","ī":"i","Ĭ":"I","ĭ":"i","Į":"I","į":"i","İ":"I","ı":"i","Ĳ":"IJ","ĳ":"ij","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","Ḱ":"K","ḱ":"k","K̆":"K","k̆":"k","Ĺ":"L","ĺ":"l","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ŀ":"L","ŀ":"l","Ł":"l","ł":"l","Ḿ":"M","ḿ":"m","M̆":"M","m̆":"m","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","ŉ":"n","N̆":"N","n̆":"n","Ō":"O","ō":"o","Ŏ":"O","ŏ":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","P̆":"P","p̆":"p","Ŕ":"R","ŕ":"r","Ŗ":"R","ŗ":"r","Ř":"R","ř":"r","R̆":"R","r̆":"r","Ȓ":"R","ȓ":"r","Ś":"S","ś":"s","Ŝ":"S","ŝ":"s","Ş":"S","Ș":"S","ș":"s","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","ț":"t","Ț":"T","Ť":"T","ť":"t","Ŧ":"T","ŧ":"t","T̆":"T","t̆":"t","Ũ":"U","ũ":"u","Ū":"U","ū":"u","Ŭ":"U","ŭ":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ȗ":"U","ȗ":"u","V̆":"V","v̆":"v","Ŵ":"W","ŵ":"w","Ẃ":"W","ẃ":"w","X̆":"X","x̆":"x","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Y̆":"Y","y̆":"y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ſ":"s","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","Ǎ":"A","ǎ":"a","Ǐ":"I","ǐ":"i","Ǒ":"O","ǒ":"o","Ǔ":"U","ǔ":"u","Ǖ":"U","ǖ":"u","Ǘ":"U","ǘ":"u","Ǚ":"U","ǚ":"u","Ǜ":"U","ǜ":"u","Ứ":"U","ứ":"u","Ṹ":"U","ṹ":"u","Ǻ":"A","ǻ":"a","Ǽ":"AE","ǽ":"ae","Ǿ":"O","ǿ":"o","Þ":"TH","þ":"th","Ṕ":"P","ṕ":"p","Ṥ":"S","ṥ":"s","X́":"X","x́":"x","Ѓ":"Г","ѓ":"г","Ќ":"К","ќ":"к","A̋":"A","a̋":"a","E̋":"E","e̋":"e","I̋":"I","i̋":"i","Ǹ":"N","ǹ":"n","Ồ":"O","ồ":"o","Ṑ":"O","ṑ":"o","Ừ":"U","ừ":"u","Ẁ":"W","ẁ":"w","Ỳ":"Y","ỳ":"y","Ȁ":"A","ȁ":"a","Ȅ":"E","ȅ":"e","Ȉ":"I","ȉ":"i","Ȍ":"O","ȍ":"o","Ȑ":"R","ȑ":"r","Ȕ":"U","ȕ":"u","B̌":"B","b̌":"b","Č̣":"C","č̣":"c","Ê̌":"E","ê̌":"e","F̌":"F","f̌":"f","Ǧ":"G","ǧ":"g","Ȟ":"H","ȟ":"h","J̌":"J","ǰ":"j","Ǩ":"K","ǩ":"k","M̌":"M","m̌":"m","P̌":"P","p̌":"p","Q̌":"Q","q̌":"q","Ř̩":"R","ř̩":"r","Ṧ":"S","ṧ":"s","V̌":"V","v̌":"v","W̌":"W","w̌":"w","X̌":"X","x̌":"x","Y̌":"Y","y̌":"y","A̧":"A","a̧":"a","B̧":"B","b̧":"b","Ḑ":"D","ḑ":"d","Ȩ":"E","ȩ":"e","Ɛ̧":"E","ɛ̧":"e","Ḩ":"H","ḩ":"h","I̧":"I","i̧":"i","Ɨ̧":"I","ɨ̧":"i","M̧":"M","m̧":"m","O̧":"O","o̧":"o","Q̧":"Q","q̧":"q","U̧":"U","u̧":"u","X̧":"X","x̧":"x","Z̧":"Z","z̧":"z"},ve=Object.keys(ye).join("|"),be=new RegExp(ve,"g");function me(e,t,n){var r;if((n=n||{}).threshold=null!=(r=n.threshold)?r:1,!n.accessors){const r=we(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}const o=function(e,t){const n=[];for(let r=0,o=t.length;r<o;r++){const o=t[r],i=Se(o),l=ke(e,o);for(let e=0,t=l.length;e<t;e++)n.push({itemValue:l[e],attributes:i})}return n}(e,n.accessors),i={rankedValue:e,rank:0,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let l=0;l<o.length;l++){const e=o[l];let r=we(e.itemValue,t,n);const{minRanking:s,maxRanking:a,threshold:d=n.threshold}=e.attributes;r<s&&r>=1?r=s:r>a&&(r=a),r=Math.min(r,a),r>=d&&r>i.rank&&(i.rank=r,i.passed=!0,i.accessorIndex=l,i.accessorThreshold=d,i.rankedValue=e.itemValue)}return i}function we(e,t,n){return e=xe(e,n),(t=xe(t,n)).length>e.length?0:e===t?7:(e=e.toLowerCase())===(t=t.toLowerCase())?6:e.startsWith(t)?5:e.includes(` ${t}`)?4:e.includes(t)?3:1===t.length?0:function(e){let t="";return e.split(" ").forEach(e=>{e.split("-").forEach(e=>{t+=e.substr(0,1)})}),t}(e).includes(t)?2:function(e,t){let n=0,r=0;function o(e,t,r){for(let o=r,i=t.length;o<i;o++)if(t[o]===e)return n+=1,o+1;return-1}const i=o(t[0],e,0);if(i<0)return 0;r=i;for(let l=1,s=t.length;l<s;l++)if(r=o(t[l],e,r),!(r>-1))return 0;return function(e){const r=1/e;return 1+n/t.length*r}(r-i)}(e,t)}function xe(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=e.replace(be,e=>ye[e])),e}function ke(e,t){let n=t;"object"==typeof t&&(n=t.accessor);const r=n(e);return null==r?[]:Array.isArray(r)?r:[String(r)]}var $e={maxRanking:1/0,minRanking:-1/0};function Se(e){return"function"==typeof e?$e:{...$e,...e}}var Ce={data:""},Ee=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,qe=/\/\*[^]*?\*\/|  +/g,Me=/\n+/g,Le=(e,t)=>{let n="",r="",o="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?n=i+" "+l+";":r+="f"==i[1]?Le(l,i):i+"{"+Le(l,"k"==i[1]?"":t)+"}":"object"==typeof l?r+=Le(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=Le.p?Le.p(i,l):i+":"+l+";")}return n+(t&&o?t+"{"+o+"}":o)+r},Fe={},De=e=>{if("object"==typeof e){let t="";for(let n in e)t+=n+De(e[n]);return t}return e};function Te(e){let t=this||{},n=e.call?e(t.p):e;return((e,t,n,r,o)=>{let i=De(e),l=Fe[i]||(Fe[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!Fe[l]){let t=i!==e?e:(e=>{let t,n,r=[{}];for(;t=Ee.exec(e.replace(qe,""));)t[4]?r.shift():t[3]?(n=t[3].replace(Me," ").trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(Me," ").trim();return r[0]})(e);Fe[l]=Le(o?{["@keyframes "+l]:t}:t,n?"":"."+l)}let s=n&&Fe.g?Fe.g:null;return n&&(Fe.g=Fe[l]),a=Fe[l],d=t,u=r,(c=s)?d.data=d.data.replace(c,a):-1===d.data.indexOf(a)&&(d.data=u?a+d.data:d.data+a),l;var a,d,u,c})(n.unshift?n.raw?((e,t,n)=>e.reduce((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":Le(e,""):!1===e?"":e}return e+r+(null==i?"":i)},""))(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,(r=t.target,"object"==typeof window?((r?r.querySelector("#_goober"):window._goober)||Object.assign((r||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:r||Ce),t.g,t.o,t.k);var r}function Ae(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=Ae(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function Oe(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=Ae(e))&&(r&&(r+=" "),r+=t);return r}function Ie(...e){return t=e,(...e)=>{for(const n of t)n&&n(...e)};var t}Te.bind({g:1}),Te.bind({k:1});var Pe=e=>e instanceof Element;function ze(e,t){if(t(e))return e;if("function"==typeof e&&!e.length)return ze(e(),t);if(Array.isArray(e)){const n=[];for(const r of e){const e=ze(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function Ke(e,t=Pe,n=Pe){const r=l(e),o=l(()=>ze(r(),t));return o.toArray=()=>{const e=o();return Array.isArray(e)?e:e?[e]:[]},o}function Re(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function Be(e,t,n,r){const{onBeforeEnter:o,onEnter:i,onAfterEnter:l}=t;function s(t){t&&t.target!==n||(n.removeEventListener("transitionend",s),n.removeEventListener("animationend",s),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),null==l||l(n))}null==o||o(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return null==r?void 0:r();null==i||i(n,()=>s())}),Re(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!i||i.length<2)&&(n.addEventListener("transitionend",s),n.addEventListener("animationend",s))})}function He(e,t,n,r){const{onBeforeExit:o,onExit:i,onAfterExit:l}=t;if(!n.parentNode)return null==r?void 0:r();function s(t){t&&t.target!==n||(null==r||r(),n.removeEventListener("transitionend",s),n.removeEventListener("animationend",s),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),null==l||l(n))}null==o||o(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),null==i||i(n,()=>s()),Re(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!i||i.length<2)&&(n.addEventListener("transitionend",s),n.addEventListener("animationend",s))})}var Ge=e=>{const t=function(e){return l(()=>{const t=e.name||"s";return{enterActive:(e.enterActiveClass||t+"-enter-active").split(" "),enter:(e.enterClass||t+"-enter").split(" "),enterTo:(e.enterToClass||t+"-enter-to").split(" "),exitActive:(e.exitActiveClass||t+"-exit-active").split(" "),exit:(e.exitClass||t+"-exit").split(" "),exitTo:(e.exitToClass||t+"-exit-to").split(" "),move:(e.moveClass||t+"-move").split(" ")}})}(e);return function(e,t){const n=O(e),{onChange:o}=t;let i=new Set(t.appear?void 0:n);const s=new WeakSet,[a,d]=r([],{equals:!1}),[u]=P(),c=e=>{d(t=>(t.push.apply(t,e),t));for(const t of e)s.delete(t)},g=(e,t,n)=>e.splice(n,0,t);return l(t=>{const n=a(),r=e();if(r[I],O(u))return u(),t;if(n.length){const e=t.filter(e=>!n.includes(e));return n.length=0,o({list:e,added:[],removed:[],unchanged:e,finishRemoved:c}),e}return O(()=>{const e=new Set(r),n=r.slice(),l=[],a=[],d=[];for(const t of r)(i.has(t)?d:l).push(t);let u=!l.length;for(let r=0;r<t.length;r++){const o=t[r];e.has(o)||(s.has(o)||(a.push(o),s.add(o)),g(n,o,r)),u&&o!==n[r]&&(u=!1)}return!a.length&&u?t:(o({list:n,added:l,removed:a,unchanged:d,finishRemoved:c}),i=e,n)})},t.appear?[]:n.slice())}(Ke(()=>e.children).toArray,{appear:e.appear,onChange({added:n,removed:r,finishRemoved:o,list:i}){const l=t();for(const t of n)Be(l,e,t);const s=[];for(const e of i)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&s.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{const e=[];for(const{el:t,rect:n}of s)if(t.isConnected){const r=t.getBoundingClientRect(),o=n.left-r.left,i=n.top-r.top;(o||i)&&(t.style.transform=`translate(${o}px, ${i}px)`,t.style.transitionDuration="0s",e.push(t))}document.body.offsetHeight;for(const t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener("transitionend",e),t.classList.remove(...l.move))};t.classList.add(...l.move),t.style.transform=t.style.transitionDuration="",t.addEventListener("transitionend",e)}});for(const t of r)He(l,e,t,()=>o([t]))}})},Ue=Symbol("fallback");function Ve(e){for(const t of e)t.dispose()}function je(e){const{by:t}=e;return l(function(e,t,n,o={}){const i=new Map;return b(()=>Ve(i.values())),()=>{const n=e()||[];return n[I],O(()=>{var e,r;if(!n.length)return Ve(i.values()),i.clear(),o.fallback?[R(e=>(i.set(Ue,{dispose:e}),o.fallback()))]:[];const s=new Array(n.length),a=i.get(Ue);if(!i.size||a){null==a||a.dispose(),i.delete(Ue);for(let e=0;e<n.length;e++){const r=n[e];l(s,r,e,t(r,e))}return s}const d=new Set(i.keys());for(let o=0;o<n.length;o++){const r=n[o],a=t(r,o);d.delete(a);const u=i.get(a);u?(s[o]=u.mapped,null==(e=u.setIndex)||e.call(u,o),u.setItem(()=>r)):l(s,r,o,a)}for(const t of d)null==(r=i.get(t))||r.dispose(),i.delete(t);return s})};function l(e,t,o,l){R(s=>{const[a,d]=r(t),u={setItem:d,dispose:s};if(n.length>1){const[e,t]=r(o);u.setIndex=t,u.mapped=n(a,e)}else u.mapped=n(a);i.set(l,u),e[o]=u.mapped})}}(()=>e.each,"function"==typeof t?t:e=>e[t],e.children,"fallback"in e?{fallback:()=>e.fallback}:void 0))}function Ne(e,t,n){const r=new WeakMap,{observe:o,unobserve:l}=function(e,n){const o=new ResizeObserver(e=>{for(const n of e){const{contentRect:e,target:o}=n,i=Math.round(e.width),l=Math.round(e.height),s=r.get(o);s&&s.width===i&&s.height===l||(t(e,o,n),r.set(o,{width:i,height:l}))}});return b(o.disconnect.bind(o)),{observe:e=>o.observe(e,n),unobserve:o.unobserve.bind(o)}}(0,n);i(t=>{const n=te(ee(e)).filter(J);return function(e,t,n,r){const o=e.length,i=t.length;let l,s,a=0;if(i)if(o){for(;a<i&&t[a]===e[a];a++);for(l of(t=t.slice(a),e=e.slice(a),t))e.includes(l)||r(l);for(s of e)t.includes(s)||n(s)}else for(;a<i;a++)r(t[a]);else for(;a<o;a++)n(e[a])}(n,t,o,l),n},[])}var Qe=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function We(e){const t={};let n;for(;n=Qe.exec(e);)t[n[1]]=n[2];return t}function _e(e,t){if("string"==typeof e){if("string"==typeof t)return`${e};${t}`;e=We(e)}else"string"==typeof t&&(t=We(t));return{...e,...t}}function Xe(e,t){const n=[...e],r=n.indexOf(t);return-1!==r&&n.splice(r,1),n}function Ze(e){return"number"==typeof e}function Ye(e){return"[object String]"===Object.prototype.toString.call(e)}function Je(e){return t=>`${e()}-${t}`}function et(e,t){return!!e&&(e===t||e.contains(t))}function tt(e,t=!1){const{activeElement:n}=nt(e);if(!(null==n?void 0:n.nodeName))return null;if(rt(n)&&n.contentDocument)return tt(n.contentDocument.body,t);if(t){const e=n.getAttribute("aria-activedescendant");if(e){const t=nt(n).getElementById(e);if(t)return t}}return n}function nt(e){return e?e.ownerDocument||e:document}function rt(e){return"IFRAME"===e.tagName}var ot=(e=>(e.Escape="Escape",e.Enter="Enter",e.Tab="Tab",e.Space=" ",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.ArrowUp="ArrowUp",e.End="End",e.Home="Home",e.PageDown="PageDown",e.PageUp="PageUp",e))(ot||{});function it(e){var t;return"undefined"!=typeof window&&null!=window.navigator&&e.test((null==(t=window.navigator.userAgentData)?void 0:t.platform)||window.navigator.platform)}function lt(){return it(/^Mac/i)}function st(e,t){return t&&("function"==typeof t?t(e):t[0](t[1],e)),null==e?void 0:e.defaultPrevented}function at(e){return t=>{for(const n of e)st(t,n)}}function dt(e){return lt()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function ut(e){if(e)if(function(){if(null==ct){ct=!1;try{document.createElement("div").focus({get preventScroll(){return ct=!0,!0}})}catch(e){}}return ct}())e.focus({preventScroll:!0});else{const t=function(e){let t=e.parentNode;const n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}(e);e.focus(),function(e){for(const{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}(t)}}var ct=null,gt=["input:not([type='hidden']):not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","a[href]","area[href]","[tabindex]","iframe","object","embed","audio[controls]","video[controls]","[contenteditable]:not([contenteditable='false'])"],ft=[...gt,'[tabindex]:not([tabindex="-1"]):not([disabled])'],pt=gt.join(":not([hidden]),")+",[tabindex]:not([disabled]):not([hidden])",ht=ft.join(':not([hidden]):not([tabindex="-1"]),');function yt(e,t){const n=Array.from(e.querySelectorAll(pt)).filter(vt);return t&&vt(e)&&n.unshift(e),n.forEach((e,t)=>{if(rt(e)&&e.contentDocument){const r=yt(e.contentDocument.body,!1);n.splice(t,1,...r)}}),n}function vt(e){return bt(e)&&!function(e){return parseInt(e.getAttribute("tabindex")||"0",10)<0}(e)}function bt(e){return e.matches(pt)&&mt(e)}function mt(e,t){return"#comment"!==e.nodeName&&function(e){if(!(e instanceof HTMLElement||e instanceof SVGElement))return!1;const{display:t,visibility:n}=e.style;let r="none"!==t&&"hidden"!==n&&"collapse"!==n;if(r){if(!e.ownerDocument.defaultView)return r;const{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:o}=t(e);r="none"!==n&&"hidden"!==o&&"collapse"!==o}return r}(e)&&function(e,t){return!e.hasAttribute("hidden")&&("DETAILS"!==e.nodeName||!t||"SUMMARY"===t.nodeName||e.hasAttribute("open"))}(e,t)&&(!e.parentElement||mt(e.parentElement,e))}function wt(e){for(;e&&!xt(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}function xt(e){const t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function kt(){}function $t(e,t){return K(e,t)}var St=new Map,Ct=new Set;function Et(){if("undefined"==typeof window)return;const e=t=>{if(!t.target)return;const n=St.get(t.target);if(n&&(n.delete(t.propertyName),0===n.size&&(t.target.removeEventListener("transitioncancel",e),St.delete(t.target)),0===St.size)){for(const e of Ct)e();Ct.clear()}};document.body.addEventListener("transitionrun",t=>{if(!t.target)return;let n=St.get(t.target);n||(n=new Set,St.set(t.target,n),t.target.addEventListener("transitioncancel",e)),n.add(t.propertyName)}),document.body.addEventListener("transitionend",e)}function qt(e,t){const n=Mt(e,t,"left"),r=Mt(e,t,"top"),o=t.offsetWidth,i=t.offsetHeight;let l=e.scrollLeft,s=e.scrollTop;const a=l+e.offsetWidth,d=s+e.offsetHeight;n<=l?l=n:n+o>a&&(l+=n+o-a),r<=s?s=r:r+i>d&&(s+=r+i-d),e.scrollLeft=l,e.scrollTop=s}function Mt(e,t,n){const r="left"===n?"offsetLeft":"offsetTop";let o=0;for(;t.offsetParent&&(o+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){o-=e[r];break}t=t.offsetParent}return o}"undefined"!=typeof document&&("loading"!==document.readyState?Et():document.addEventListener("DOMContentLoaded",Et));var Lt={border:"0",clip:"rect(0 0 0 0)","clip-path":"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:"0",position:"absolute",width:"1px","white-space":"nowrap"};function Ft(e){return t=>(e(t),()=>e(void 0))}function Dt(e,t){const[n,o]=r(Tt(null==t?void 0:t()));return i(()=>{var n;o((null==(n=e())?void 0:n.tagName.toLowerCase())||Tt(null==t?void 0:t()))}),n}function Tt(e){return Ye(e)?e:void 0}function At(e){const[t,n]=W(e,["as"]);if(!t.as)throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");return s(_,K(n,{get component(){return t.as}}))}var Ot=["id","name","validationState","required","disabled","readOnly"],It=n();function Pt(){const e=v(It);if(void 0===e)throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function zt(e){const t=Pt(),n=$t({id:t.generateId("description")},e);return i(()=>b(t.registerDescription(n.id))),s(At,K({as:"div"},()=>t.dataset(),n))}function Kt(e){const t=Pt(),n=$t({id:t.generateId("error-message")},e),[r,o]=W(n,["forceMount"]),l=()=>"invalid"===t.validationState();return i(()=>{l()&&b(t.registerErrorMessage(o.id))}),s(u,{get when(){return r.forceMount||l()},get children(){return s(At,K({as:"div"},()=>t.dataset(),o))}})}function Rt(e){let t;const n=Pt(),r=$t({id:n.generateId("label")},e),[o,l]=W(r,["ref"]),a=Dt(()=>t,()=>"label");return i(()=>b(n.registerLabel(l.id))),s(At,K({as:"label",ref(e){const n=Ie(e=>t=e,o.ref);"function"==typeof n&&n(e)},get for(){return d(()=>"label"===a())()?n.fieldId():void 0}},()=>n.dataset(),l))}function Bt(e){var t;const[n,o]=r(null==(t=e.defaultValue)?void 0:t.call(e)),i=l(()=>{var t;return void 0!==(null==(t=e.value)?void 0:t.call(e))}),s=l(()=>{var t;return i()?null==(t=e.value)?void 0:t.call(e):n()});return[s,t=>{O(()=>{var n;const r=function(e,...t){return"function"==typeof e?e(...t):e}(t,s());return Object.is(r,s())||(i()||o(r),null==(n=e.onChange)||n.call(e,r)),r})}]}function Ht(e){const[t,n]=Bt(e);return[()=>t()??!1,n]}var Gt=Object.defineProperty,Ut=(e,t)=>{for(var n in t)Gt(e,n,{get:t[n],enumerable:!0})},Vt=n();function jt(){return v(Vt)}function Nt(e,t){return Boolean(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function Qt(e,t){const n=function(e){const t=e.map((e,t)=>[t,e]);let n=!1;return t.sort(([e,t],[r,o])=>{const i=t.ref(),l=o.ref();return i===l?0:i&&l?Nt(i,l)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1):0}),n?t.map(([e,t])=>t):e}(e);e!==n&&t(n)}function Wt(e={}){const[t,n]=function(e){const[t,n]=Bt(e);return[()=>t()??[],n]}({value:()=>ee(e.items),onChange:t=>{var n;return null==(n=e.onItemsChange)?void 0:n.call(e,t)}});!function(e,t){if("function"!=typeof IntersectionObserver)return void function(e,t){i(()=>{const n=setTimeout(()=>{Qt(e(),t)});b(()=>clearTimeout(n))})}(e,t);let n=[];i(()=>{const r=function(e){var t,n;const r=e[0],o=null==(t=e[e.length-1])?void 0:t.ref();let i=null==(n=null==r?void 0:r.ref())?void 0:n.parentElement;for(;i;){if(o&&i.contains(o))return i;i=i.parentElement}return nt(i).body}(e()),o=new IntersectionObserver(()=>{const r=!!n.length;n=e(),r&&Qt(e(),t)},{root:r});for(const t of e()){const e=t.ref();e&&o.observe(e)}b(()=>o.disconnect())})}(t,n);const r=e=>(n(t=>{const n=function(e,t){var n;const r=t.ref();if(!r)return-1;let o=e.length;if(!o)return-1;for(;o--;){const t=null==(n=e[o])?void 0:n.ref();if(t&&Nt(t,r))return o+1}return 0}(t,e);return function(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}(t,e,n)}),()=>{n(t=>{const n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:e=>s(Vt.Provider,{value:{registerItem:r},get children(){return e.children}})}}function _t(e){let t=e.startIndex??0;const n=e.startLevel??0,r=[],o=t=>{if(null==t)return"";const n=e.getKey??"key",r=Ye(n)?t[n]:n(t);return null!=r?String(r):""},i=t=>{if(null==t)return"";const n=e.getTextValue??"textValue",r=Ye(n)?t[n]:n(t);return null!=r?String(r):""},l=t=>{if(null==t)return!1;const n=e.getDisabled??"disabled";return(Ye(n)?t[n]:n(t))??!1},s=t=>{var n;if(null!=t)return Ye(e.getSectionChildren)?t[e.getSectionChildren]:null==(n=e.getSectionChildren)?void 0:n.call(e,t)};for(const a of e.dataSource)if(Ye(a)||Ze(a))r.push({type:"item",rawValue:a,key:String(a),textValue:String(a),disabled:l(a),level:n,index:t}),t++;else if(null!=s(a)){r.push({type:"section",rawValue:a,key:"",textValue:"",disabled:!1,level:n,index:t}),t++;const o=s(a)??[];if(o.length>0){const i=_t({dataSource:o,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...i),t+=i.length}}else r.push({type:"item",rawValue:a,key:o(a),textValue:i(a),disabled:l(a),level:n,index:t}),t++;return r}function Xt(e,t=[]){return l(()=>{const n=_t({dataSource:ee(e.dataSource),getKey:ee(e.getKey),getTextValue:ee(e.getTextValue),getDisabled:ee(e.getDisabled),getSectionChildren:ee(e.getSectionChildren)});for(let e=0;e<t.length;e++)t[e]();return e.factory(n)})}var Zt=new Set(["Avst","Arab","Armi","Syrc","Samr","Mand","Thaa","Mend","Nkoo","Adlm","Rohg","Hebr"]),Yt=new Set(["ae","ar","arc","bcc","bqi","ckb","dv","fa","glk","he","ku","mzn","nqo","pnb","ps","sd","ug","ur","yi"]);function Jt(e){return function(e){if(Intl.Locale){const t=new Intl.Locale(e).maximize().script??"";return Zt.has(t)}const t=e.split("-")[0];return Yt.has(t)}(e)?"rtl":"ltr"}function en(){let e="undefined"!=typeof navigator&&(navigator.language||navigator.userLanguage)||"en-US";return{locale:e,direction:Jt(e)}}var tn=en(),nn=new Set;function rn(){tn=en();for(const e of nn)e(tn)}var on=n();function ln(){const e=function(){const[e,t]=r(tn),n=l(()=>e());return o(()=>{0===nn.size&&window.addEventListener("languagechange",rn),nn.add(t),b(()=>{nn.delete(t),0===nn.size&&window.removeEventListener("languagechange",rn)})}),{locale:()=>n().locale,direction:()=>n().direction}}();return v(on)||e}var sn=new Map,an=class e extends Set{constructor(n,r,o){super(n),t(this,"anchorKey"),t(this,"currentKey"),n instanceof e?(this.anchorKey=r||n.anchorKey,this.currentKey=o||n.currentKey):(this.anchorKey=r,this.currentKey=o)}};function dn(e){return lt()||it(/^iPhone/i)||it(/^iPad/i)||lt()&&navigator.maxTouchPoints>1?e.altKey:e.ctrlKey}function un(e){return lt()?e.metaKey:e.ctrlKey}function cn(e){return new an(e)}function gn(e,t,n){const s=K({selectOnFocus:()=>"replace"===ee(e.selectionManager).selectionBehavior()},e),a=()=>t(),{direction:d}=ln();let u={top:0,left:0};!function(e,t,n,r){const o=()=>{te(ee(e)).forEach(e=>{e&&te(ee(t)).forEach(t=>function(e,t,n,r){return e.addEventListener(t,n,r),ne(e.removeEventListener.bind(e,t,n,r))}(e,t,n,r))})};"function"==typeof e?i(o):f(o)}(()=>ee(s.isVirtualized)?void 0:a(),"scroll",()=>{const e=a();e&&(u={top:e.scrollTop,left:e.scrollLeft})});const{typeSelectHandlers:c}=function(e){const[t,n]=r(""),[o,i]=r(-1);return{typeSelectHandlers:{onKeyDown:r=>{var l;if(ee(e.isDisabled))return;const s=ee(e.keyboardDelegate),a=ee(e.selectionManager);if(!s.getKeyForSearch)return;const d=function(e){return 1!==e.length&&/^[A-Z]/i.test(e)?"":e}(r.key);if(!d||r.ctrlKey||r.metaKey)return;" "===d&&t().trim().length>0&&(r.preventDefault(),r.stopPropagation());let u=n(e=>e+d),c=s.getKeyForSearch(u,a.focusedKey())??s.getKeyForSearch(u);null==c&&function(e){return e.split("").every(t=>t===e[0])}(u)&&(u=u[0],c=s.getKeyForSearch(u,a.focusedKey())??s.getKeyForSearch(u)),null!=c&&(a.setFocusedKey(c),null==(l=e.onTypeSelect)||l.call(e,c)),clearTimeout(o()),i(window.setTimeout(()=>n(""),500))}}}}({isDisabled:()=>ee(s.disallowTypeAhead),keyboardDelegate:()=>ee(s.keyboardDelegate),selectionManager:()=>ee(s.selectionManager)}),g=()=>ee(s.orientation)??"vertical",p=()=>{var e,n;const r=ee(s.autoFocus);if(!r)return;const o=ee(s.selectionManager),i=ee(s.keyboardDelegate);let l;"first"===r&&(l=null==(e=i.getFirstKey)?void 0:e.call(i)),"last"===r&&(l=null==(n=i.getLastKey)?void 0:n.call(i));const a=o.selectedKeys();a.size&&(l=a.values().next().value),o.setFocused(!0),o.setFocusedKey(l);const d=t();d&&null==l&&!ee(s.shouldUseVirtualFocus)&&ut(d)};return o(()=>{s.deferAutoFocus?setTimeout(p,0):p()}),i(x([a,()=>ee(s.isVirtualized),()=>ee(s.selectionManager).focusedKey()],e=>{var t;const[n,r,o]=e;if(r)o&&(null==(t=s.scrollToKey)||t.call(s,o));else if(o&&n){const e=n.querySelector(`[data-key="${o}"]`);e&&qt(n,e)}})),{tabIndex:l(()=>{if(!ee(s.shouldUseVirtualFocus))return null==ee(s.selectionManager).focusedKey()?0:-1}),onKeyDown:e=>{var n,r,o,i,l,a,u,f;st(e,c.onKeyDown),e.altKey&&"Tab"===e.key&&e.preventDefault();const p=t();if(!(null==p?void 0:p.contains(e.target)))return;const h=ee(s.selectionManager),y=ee(s.selectOnFocus),v=t=>{null!=t&&(h.setFocusedKey(t),e.shiftKey&&"multiple"===h.selectionMode()?h.extendSelection(t):y&&!dn(e)&&h.replaceSelection(t))},b=ee(s.keyboardDelegate),m=ee(s.shouldFocusWrap),w=h.focusedKey();switch(e.key){case"vertical"===g()?"ArrowDown":"ArrowRight":if(b.getKeyBelow){let t;e.preventDefault(),t=null!=w?b.getKeyBelow(w):null==(n=b.getFirstKey)?void 0:n.call(b),null==t&&m&&(t=null==(r=b.getFirstKey)?void 0:r.call(b,w)),v(t)}break;case"vertical"===g()?"ArrowUp":"ArrowLeft":if(b.getKeyAbove){let t;e.preventDefault(),t=null!=w?b.getKeyAbove(w):null==(o=b.getLastKey)?void 0:o.call(b),null==t&&m&&(t=null==(i=b.getLastKey)?void 0:i.call(b,w)),v(t)}break;case"vertical"===g()?"ArrowLeft":"ArrowUp":if(b.getKeyLeftOf){e.preventDefault();const t="rtl"===d();let n;n=null!=w?b.getKeyLeftOf(w):t?null==(l=b.getFirstKey)?void 0:l.call(b):null==(a=b.getLastKey)?void 0:a.call(b),v(n)}break;case"vertical"===g()?"ArrowRight":"ArrowDown":if(b.getKeyRightOf){e.preventDefault();const t="rtl"===d();let n;n=null!=w?b.getKeyRightOf(w):t?null==(u=b.getLastKey)?void 0:u.call(b):null==(f=b.getFirstKey)?void 0:f.call(b),v(n)}break;case"Home":if(b.getFirstKey){e.preventDefault();const t=b.getFirstKey(w,un(e));null!=t&&(h.setFocusedKey(t),un(e)&&e.shiftKey&&"multiple"===h.selectionMode()?h.extendSelection(t):y&&h.replaceSelection(t))}break;case"End":if(b.getLastKey){e.preventDefault();const t=b.getLastKey(w,un(e));null!=t&&(h.setFocusedKey(t),un(e)&&e.shiftKey&&"multiple"===h.selectionMode()?h.extendSelection(t):y&&h.replaceSelection(t))}break;case"PageDown":b.getKeyPageBelow&&null!=w&&(e.preventDefault(),v(b.getKeyPageBelow(w)));break;case"PageUp":b.getKeyPageAbove&&null!=w&&(e.preventDefault(),v(b.getKeyPageAbove(w)));break;case"a":un(e)&&"multiple"===h.selectionMode()&&!0!==ee(s.disallowSelectAll)&&(e.preventDefault(),h.selectAll());break;case"Escape":e.defaultPrevented||(e.preventDefault(),ee(s.disallowEmptySelection)||h.clearSelection());break;case"Tab":if(!ee(s.allowsTabNavigation)){if(e.shiftKey)p.focus();else{const e=function(e,t){const n=(null==t?void 0:t.tabbable)?ht:pt,r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(e){var r;return(null==(r=null==t?void 0:t.from)?void 0:r.contains(e))?NodeFilter.FILTER_REJECT:e.matches(n)&&mt(e)&&(!(null==t?void 0:t.accept)||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return(null==t?void 0:t.from)&&(r.currentNode=t.from),r}(p,{tabbable:!0});let t,n;do{n=e.lastChild(),n&&(t=n)}while(n);t&&!t.contains(document.activeElement)&&ut(t)}break}}},onMouseDown:e=>{a()===e.target&&e.preventDefault()},onFocusIn:e=>{var t,n;const r=ee(s.selectionManager),o=ee(s.keyboardDelegate),i=ee(s.selectOnFocus);if(r.isFocused())e.currentTarget.contains(e.target)||r.setFocused(!1);else if(e.currentTarget.contains(e.target))if(r.setFocused(!0),null==r.focusedKey()){const l=e=>{null!=e&&(r.setFocusedKey(e),i&&r.replaceSelection(e))},s=e.relatedTarget;s&&e.currentTarget.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_FOLLOWING?l(r.lastSelectedKey()??(null==(t=o.getLastKey)?void 0:t.call(o))):l(r.firstSelectedKey()??(null==(n=o.getFirstKey)?void 0:n.call(o)))}else if(!ee(s.isVirtualized)){const e=a();if(e){e.scrollTop=u.top,e.scrollLeft=u.left;const t=e.querySelector(`[data-key="${r.focusedKey()}"]`);t&&(ut(t),qt(e,t))}}},onFocusOut:e=>{const t=ee(s.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)}}}function fn(e,t){const n=()=>ee(e.selectionManager),r=()=>ee(e.key),o=()=>ee(e.shouldUseVirtualFocus),s=e=>{"none"!==n().selectionMode()&&("single"===n().selectionMode()?n().isSelected(r())&&!n().disallowEmptySelection()?n().toggleSelection(r()):n().replaceSelection(r()):(null==e?void 0:e.shiftKey)?n().extendSelection(r()):"toggle"===n().selectionBehavior()||un(e)||"pointerType"in e&&"touch"===e.pointerType?n().toggleSelection(r()):n().replaceSelection(r()))},a=()=>ee(e.disabled)||n().isDisabled(r()),d=()=>!a()&&n().canSelectItem(r());let u=null;const c=l(()=>{if(!o()&&!a())return r()===n().focusedKey()?0:-1}),g=l(()=>ee(e.virtualized)?void 0:r());return i(x([t,r,o,()=>n().focusedKey(),()=>n().isFocused()],([t,n,r,o,i])=>{t&&n===o&&i&&!r&&document.activeElement!==t&&(e.focus?e.focus():ut(t))})),{isSelected:()=>n().isSelected(r()),isDisabled:a,allowsSelection:d,tabIndex:c,dataKey:g,onPointerDown:t=>{d()&&(u=t.pointerType,"mouse"!==t.pointerType||0!==t.button||ee(e.shouldSelectOnPressUp)||s(t))},onPointerUp:t=>{d()&&"mouse"===t.pointerType&&0===t.button&&ee(e.shouldSelectOnPressUp)&&ee(e.allowsDifferentPressOrigin)&&s(t)},onClick:t=>{d()&&(ee(e.shouldSelectOnPressUp)&&!ee(e.allowsDifferentPressOrigin)||"mouse"!==u)&&s(t)},onKeyDown:e=>{d()&&["Enter"," "].includes(e.key)&&(dn(e)?n().toggleSelection(r()):s(e))},onMouseDown:e=>{a()&&e.preventDefault()},onFocus:e=>{const i=t();o()||a()||!i||e.target===i&&n().setFocusedKey(r())}}}var pn,hn=class{constructor(e,n){t(this,"collection"),t(this,"state"),this.collection=e,this.state=n}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(null==e||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if("none"===this.state.selectionMode())return!1;const t=this.getKey(e);return null!=t&&this.state.selectedKeys().has(t)}isEmpty(){return 0===this.state.selectedKeys().size}isSelectAll(){if(this.isEmpty())return!1;const e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=null!=(null==n?void 0:n.index)&&null!=(null==e?void 0:e.index)&&n.index<e.index;e&&!r||(e=n)}return null==e?void 0:e.key}lastSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=null!=(null==n?void 0:n.index)&&null!=(null==e?void 0:e.index)&&n.index>e.index;e&&!r||(e=n)}return null==e?void 0:e.key}extendSelection(e){if("none"===this.selectionMode())return;if("single"===this.selectionMode())return void this.replaceSelection(e);const t=this.getKey(e);if(null==t)return;const n=this.state.selectedKeys(),r=n.anchorKey||t,o=new an(n,r,t);for(const i of this.getKeyRange(r,n.currentKey||t))o.delete(i);for(const i of this.getKeyRange(t,r))this.canSelectItem(i)&&o.add(i);this.state.setSelectedKeys(o)}getKeyRange(e,t){const n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?null!=n.index&&null!=r.index&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){const n=[];let r=e;for(;null!=r;){const e=this.collection().getItem(r);if(e&&"item"===e.type&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){const t=this.collection().getItem(e);return t?t&&"item"===t.type?t.key:null:e}toggleSelection(e){if("none"===this.selectionMode())return;if("single"===this.selectionMode()&&!this.isSelected(e))return void this.replaceSelection(e);const t=this.getKey(e);if(null==t)return;const n=new an(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),this.disallowEmptySelection()&&0===n.size||this.state.setSelectedKeys(n)}replaceSelection(e){if("none"===this.selectionMode())return;const t=this.getKey(e);if(null==t)return;const n=this.canSelectItem(t)?new an([t],t,t):new an;this.state.setSelectedKeys(n)}setSelectedKeys(e){if("none"===this.selectionMode())return;const t=new an;for(const n of e){const e=this.getKey(n);if(null!=e&&(t.add(e),"single"===this.selectionMode()))break}this.state.setSelectedKeys(t)}selectAll(){"multiple"===this.selectionMode()&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){const e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new an)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){"none"!==this.selectionMode()&&("single"===this.selectionMode()?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):"toggle"===this.selectionBehavior()||t&&"touch"===t.pointerType?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;const t=this.selectedKeys();if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;for(const n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if("none"===this.state.selectionMode())return!1;const t=this.collection().getItem(e);return null!=t&&!t.disabled}isDisabled(e){const t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){const e=[];return(t=>{for(;null!=t;){if(this.canSelectItem(t)){const n=this.collection().getItem(t);if(!n)continue;"item"===n.type&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},yn=class{constructor(e){t(this,"keyMap",new Map),t(this,"iterable"),t(this,"firstKey"),t(this,"lastKey"),this.iterable=e;for(const t of e)this.keyMap.set(t.key,t);if(0===this.keyMap.size)return;let n,r=0;for(const[t,o]of this.keyMap)n?(n.nextKey=t,o.prevKey=n.key):(this.firstKey=t,o.prevKey=void 0),"item"===o.type&&(o.index=r++),n=o,n.nextKey=void 0;this.lastKey=n.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){var t;return null==(t=this.keyMap.get(e))?void 0:t.prevKey}getKeyAfter(e){var t;return null==(t=this.keyMap.get(e))?void 0:t.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){const t=[...this.getKeys()];return this.getItem(t[e])}},vn=e=>"function"==typeof e?e():e,bn=e=>{const t=l(()=>{const t=vn(e.element);if(t)return getComputedStyle(t)}),n=()=>{var e;return(null==(e=t())?void 0:e.animationName)??"none"},[o,s]=r(vn(e.show)?"present":"hidden");let a="none";return i(r=>{const o=vn(e.show);return O(()=>{var e;if(r===o)return o;const i=a,l=n();o?s("present"):"none"===l||"none"===(null==(e=t())?void 0:e.display)?s("hidden"):s(!0===r&&i!==l?"hiding":"hidden")}),o}),i(()=>{const t=vn(e.element);if(!t)return;const r=e=>{e.target===t&&(a=n())},i=e=>{const r=n().includes(e.animationName);e.target===t&&r&&"hiding"===o()&&s("hidden")};t.addEventListener("animationstart",r),t.addEventListener("animationcancel",i),t.addEventListener("animationend",i),b(()=>{t.removeEventListener("animationstart",r),t.removeEventListener("animationcancel",i),t.removeEventListener("animationend",i)})}),{present:()=>"present"===o()||"hiding"===o(),state:o}},mn="data-kb-top-layer",wn=!1,xn=[];function kn(e){return xn.findIndex(t=>t.node===e)}function $n(){return xn.filter(e=>e.isPointerBlocking)}function Sn(){return $n().length>0}function Cn(e){var t;const n=kn(null==(t=[...$n()].slice(-1)[0])?void 0:t.node);return kn(e)<n}var En={layers:xn,isTopMostLayer:function(e){return xn[xn.length-1].node===e},hasPointerBlockingLayer:Sn,isBelowPointerBlockingLayer:Cn,addLayer:function(e){xn.push(e)},removeLayer:function(e){const t=kn(e);t<0||xn.splice(t,1)},indexOf:kn,find:function(e){return xn[kn(e)]},assignPointerEventToLayers:function(){for(const{node:e}of xn)e.style.pointerEvents=Cn(e)?"none":"auto"},disableBodyPointerEvents:function(e){if(Sn()&&!wn){const t=nt(e);pn=document.body.style.pointerEvents,t.body.style.pointerEvents="none",wn=!0}},restoreBodyPointerEvents:function(e){if(Sn())return;const t=nt(e);t.body.style.pointerEvents=pn,0===t.body.style.length&&t.body.removeAttribute("style"),wn=!1}};Ut({},{Button:()=>Ln,Root:()=>Mn});var qn=["button","color","file","image","reset","submit"];function Mn(e){let t;const n=$t({type:"button"},e),[r,o]=W(n,["ref","type","disabled"]),i=Dt(()=>t,()=>"button"),a=l(()=>{const e=i();return null!=e&&function(e){const t=e.tagName.toLowerCase();return"button"===t||!("input"!==t||!e.type)&&-1!==qn.indexOf(e.type)}({tagName:e,type:r.type})}),d=l(()=>"input"===i()),u=l(()=>"a"===i()&&null!=(null==t?void 0:t.getAttribute("href")));return s(At,K({as:"button",ref(e){const n=Ie(e=>t=e,r.ref);"function"==typeof n&&n(e)},get type(){return a()||d()?r.type:void 0},get role(){return a()||u()?void 0:"button"},get tabIndex(){return a()||u()||r.disabled?void 0:0},get disabled(){return a()||d()?r.disabled:void 0},get"aria-disabled"(){return!(a()||d()||!r.disabled)||void 0},get"data-disabled"(){return r.disabled?"":void 0}},o))}var Ln=Mn,Fn=["top","right","bottom","left"],Dn=Math.min,Tn=Math.max,An=Math.round,On=Math.floor,In=e=>({x:e,y:e}),Pn={left:"right",right:"left",bottom:"top",top:"bottom"},zn={start:"end",end:"start"};function Kn(e,t,n){return Tn(e,Dn(t,n))}function Rn(e,t){return"function"==typeof e?e(t):e}function Bn(e){return e.split("-")[0]}function Hn(e){return e.split("-")[1]}function Gn(e){return"x"===e?"y":"x"}function Un(e){return"y"===e?"height":"width"}function Vn(e){return["top","bottom"].includes(Bn(e))?"y":"x"}function jn(e){return Gn(Vn(e))}function Nn(e){return e.replace(/start|end/g,e=>zn[e])}function Qn(e){return e.replace(/left|right|bottom|top/g,e=>Pn[e])}function Wn(e){return"number"!=typeof e?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(e):{top:e,right:e,bottom:e,left:e}}function _n(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function Xn(e,t,n){let{reference:r,floating:o}=e;const i=Vn(t),l=jn(t),s=Un(l),a=Bn(t),d="y"===i,u=r.x+r.width/2-o.width/2,c=r.y+r.height/2-o.height/2,g=r[s]/2-o[s]/2;let f;switch(a){case"top":f={x:u,y:r.y-o.height};break;case"bottom":f={x:u,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:c};break;case"left":f={x:r.x-o.width,y:c};break;default:f={x:r.x,y:r.y}}switch(Hn(t)){case"start":f[l]-=g*(n&&d?-1:1);break;case"end":f[l]+=g*(n&&d?-1:1)}return f}async function Zn(e,t){var n;void 0===t&&(t={});const{x:r,y:o,platform:i,rects:l,elements:s,strategy:a}=e,{boundary:d="clippingAncestors",rootBoundary:u="viewport",elementContext:c="floating",altBoundary:g=!1,padding:f=0}=Rn(t,e),p=Wn(f),h=s[g?"floating"===c?"reference":"floating":c],y=_n(await i.getClippingRect({element:null==(n=await(null==i.isElement?void 0:i.isElement(h)))||n?h:h.contextElement||await(null==i.getDocumentElement?void 0:i.getDocumentElement(s.floating)),boundary:d,rootBoundary:u,strategy:a})),v="floating"===c?{x:r,y:o,width:l.floating.width,height:l.floating.height}:l.reference,b=await(null==i.getOffsetParent?void 0:i.getOffsetParent(s.floating)),m=await(null==i.isElement?void 0:i.isElement(b))&&await(null==i.getScale?void 0:i.getScale(b))||{x:1,y:1},w=_n(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:v,offsetParent:b,strategy:a}):v);return{top:(y.top-w.top+p.top)/m.y,bottom:(w.bottom-y.bottom+p.bottom)/m.y,left:(y.left-w.left+p.left)/m.x,right:(w.right-y.right+p.right)/m.x}}function Yn(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function Jn(e){return Fn.some(t=>e[t]>=0)}function er(e){return rr(e)?(e.nodeName||"").toLowerCase():"#document"}function tr(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function nr(e){var t;return null==(t=(rr(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function rr(e){return e instanceof Node||e instanceof tr(e).Node}function or(e){return e instanceof Element||e instanceof tr(e).Element}function ir(e){return e instanceof HTMLElement||e instanceof tr(e).HTMLElement}function lr(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof tr(e).ShadowRoot)}function sr(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=fr(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(o)}function ar(e){return["table","td","th"].includes(er(e))}function dr(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch(n){return!1}})}function ur(e){const t=cr(),n=or(e)?fr(e):e;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some(e=>(n.willChange||"").includes(e))||["paint","layout","strict","content"].some(e=>(n.contain||"").includes(e))}function cr(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function gr(e){return["html","body","#document"].includes(er(e))}function fr(e){return tr(e).getComputedStyle(e)}function pr(e){return or(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function hr(e){if("html"===er(e))return e;const t=e.assignedSlot||e.parentNode||lr(e)&&e.host||nr(e);return lr(t)?t.host:t}function yr(e){const t=hr(e);return gr(t)?e.ownerDocument?e.ownerDocument.body:e.body:ir(t)&&sr(t)?t:yr(t)}function vr(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);const o=yr(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),l=tr(o);return i?t.concat(l,l.visualViewport||[],sr(o)?o:[],l.frameElement&&n?vr(l.frameElement):[]):t.concat(o,vr(o,[],n))}function br(e){const t=fr(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=ir(e),i=o?e.offsetWidth:n,l=o?e.offsetHeight:r,s=An(n)!==i||An(r)!==l;return s&&(n=i,r=l),{width:n,height:r,$:s}}function mr(e){return or(e)?e:e.contextElement}function wr(e){const t=mr(e);if(!ir(t))return In(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:i}=br(t);let l=(i?An(n.width):n.width)/r,s=(i?An(n.height):n.height)/o;return l&&Number.isFinite(l)||(l=1),s&&Number.isFinite(s)||(s=1),{x:l,y:s}}var xr=In(0);function kr(e){const t=tr(e);return cr()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:xr}function $r(e,t,n,r){void 0===t&&(t=!1),void 0===n&&(n=!1);const o=e.getBoundingClientRect(),i=mr(e);let l=In(1);t&&(r?or(r)&&(l=wr(r)):l=wr(e));const s=function(e,t,n){return void 0===t&&(t=!1),!(!n||t&&n!==tr(e))&&t}(i,n,r)?kr(i):In(0);let a=(o.left+s.x)/l.x,d=(o.top+s.y)/l.y,u=o.width/l.x,c=o.height/l.y;if(i){const e=tr(i),t=r&&or(r)?tr(r):r;let n=e,o=n.frameElement;for(;o&&r&&t!==n;){const e=wr(o),t=o.getBoundingClientRect(),r=fr(o),i=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,l=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;a*=e.x,d*=e.y,u*=e.x,c*=e.y,a+=i,d+=l,n=tr(o),o=n.frameElement}}return _n({width:u,height:c,x:a,y:d})}function Sr(e){return $r(nr(e)).left+pr(e).scrollLeft}function Cr(e,t,n){let r;if("viewport"===t)r=function(e,t){const n=tr(e),r=nr(e),o=n.visualViewport;let i=r.clientWidth,l=r.clientHeight,s=0,a=0;if(o){i=o.width,l=o.height;const e=cr();(!e||e&&"fixed"===t)&&(s=o.offsetLeft,a=o.offsetTop)}return{width:i,height:l,x:s,y:a}}(e,n);else if("document"===t)r=function(e){const t=nr(e),n=pr(e),r=e.ownerDocument.body,o=Tn(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=Tn(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let l=-n.scrollLeft+Sr(e);const s=-n.scrollTop;return"rtl"===fr(r).direction&&(l+=Tn(t.clientWidth,r.clientWidth)-o),{width:o,height:i,x:l,y:s}}(nr(e));else if(or(t))r=function(e,t){const n=$r(e,!0,"fixed"===t),r=n.top+e.clientTop,o=n.left+e.clientLeft,i=ir(e)?wr(e):In(1);return{width:e.clientWidth*i.x,height:e.clientHeight*i.y,x:o*i.x,y:r*i.y}}(t,n);else{const n=kr(e);r={...t,x:t.x-n.x,y:t.y-n.y}}return _n(r)}function Er(e,t){const n=hr(e);return!(n===t||!or(n)||gr(n))&&("fixed"===fr(n).position||Er(n,t))}function qr(e,t,n){const r=ir(t),o=nr(t),i="fixed"===n,l=$r(e,!0,i,t);let s={scrollLeft:0,scrollTop:0};const a=In(0);if(r||!r&&!i)if(("body"!==er(t)||sr(o))&&(s=pr(t)),r){const e=$r(t,!0,i,t);a.x=e.x+t.clientLeft,a.y=e.y+t.clientTop}else o&&(a.x=Sr(o));return{x:l.left+s.scrollLeft-a.x,y:l.top+s.scrollTop-a.y,width:l.width,height:l.height}}function Mr(e){return"static"===fr(e).position}function Lr(e,t){return ir(e)&&"fixed"!==fr(e).position?t?t(e):e.offsetParent:null}function Fr(e,t){const n=tr(e);if(dr(e))return n;if(!ir(e)){let t=hr(e);for(;t&&!gr(t);){if(or(t)&&!Mr(t))return t;t=hr(t)}return n}let r=Lr(e,t);for(;r&&ar(r)&&Mr(r);)r=Lr(r,t);return r&&gr(r)&&Mr(r)&&!ur(r)?n:r||function(e){let t=hr(e);for(;ir(t)&&!gr(t);){if(ur(t))return t;if(dr(t))return null;t=hr(t)}return null}(e)||n}var Dr={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const i="fixed"===o,l=nr(r),s=!!t&&dr(t.floating);if(r===l||s&&i)return n;let a={scrollLeft:0,scrollTop:0},d=In(1);const u=In(0),c=ir(r);if((c||!c&&!i)&&(("body"!==er(r)||sr(l))&&(a=pr(r)),ir(r))){const e=$r(r);d=wr(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}return{width:n.width*d.x,height:n.height*d.y,x:n.x*d.x-a.scrollLeft*d.x+u.x,y:n.y*d.y-a.scrollTop*d.y+u.y}},getDocumentElement:nr,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const i=[..."clippingAncestors"===n?dr(t)?[]:function(e,t){const n=t.get(e);if(n)return n;let r=vr(e,[],!1).filter(e=>or(e)&&"body"!==er(e)),o=null;const i="fixed"===fr(e).position;let l=i?hr(e):e;for(;or(l)&&!gr(l);){const t=fr(l),n=ur(l);n||"fixed"!==t.position||(o=null),(i?!n&&!o:!n&&"static"===t.position&&o&&["absolute","fixed"].includes(o.position)||sr(l)&&!n&&Er(e,l))?r=r.filter(e=>e!==l):o=t,l=hr(l)}return t.set(e,r),r}(t,this._c):[].concat(n),r],l=i[0],s=i.reduce((e,n)=>{const r=Cr(t,n,o);return e.top=Tn(r.top,e.top),e.right=Dn(r.right,e.right),e.bottom=Dn(r.bottom,e.bottom),e.left=Tn(r.left,e.left),e},Cr(t,l,o));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}},getOffsetParent:Fr,getElementRects:async function(e){const t=this.getOffsetParent||Fr,n=this.getDimensions,r=await n(e.floating);return{reference:qr(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){const{width:t,height:n}=br(e);return{width:t,height:n}},getScale:wr,isElement:or,isRTL:function(e){return"rtl"===fr(e).direction}};var Tr=n();function Ar(){const e=v(Tr);if(void 0===e)throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var Or=c('<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">'),Ir={top:180,right:-90,bottom:0,left:90};function Pr(e){const t=Ar(),n=$t({size:30},e),[o,l]=W(n,["ref","style","size"]),a=()=>t.currentPlacement().split("-")[0],d=function(e){const[t,n]=r();return i(()=>{const t=e();var r;t&&n((r=t,nt(r).defaultView||window).getComputedStyle(t))}),t}(t.contentRef),u=()=>{var e;return(null==(e=d())?void 0:e.getPropertyValue(`border-${a()}-color`))||"none"},c=()=>{return 2*Number.parseInt((null==(e=d())?void 0:e.getPropertyValue(`border-${a()}-width`))||"0px")*(30/o.size);var e};return s(At,K({as:"div",ref(e){const n=Ie(t.setArrowRef,o.ref);"function"==typeof n&&n(e)},"aria-hidden":"true",get style(){return _e({position:"absolute","font-size":`${o.size}px`,width:"1em",height:"1em","pointer-events":"none",fill:(null==(e=d())?void 0:e.getPropertyValue("background-color"))||"none",stroke:u(),"stroke-width":c()},o.style);var e}},l,{get children(){const e=Or(),t=e.firstChild;return f(()=>k(t,"transform",`rotate(${Ir[a()]} 15 15) translate(0 2)`)),e}}))}function zr(e){const{x:t=0,y:n=0,width:r=0,height:o=0}=e??{};if("function"==typeof DOMRect)return new DOMRect(t,n,r,o);const i={x:t,y:n,width:r,height:o,top:n,right:t+r,bottom:n+o,left:t};return{...i,toJSON:()=>i}}function Kr(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Rr={top:"bottom",right:"left",bottom:"top",left:"right"},Br=Object.assign(function(e){const t=$t({getAnchorRect:e=>null==e?void 0:e.getBoundingClientRect(),placement:"bottom",gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[n,o]=r(),[l,a]=r(),[d,u]=r(t.placement),c=()=>{var e,n,r;return n=null==(e=t.anchorRef)?void 0:e.call(t),r=t.getAnchorRect,{contextElement:n,getBoundingClientRect:()=>{const e=r(n);return e?zr(e):n?n.getBoundingClientRect():zr()}}},{direction:g}=ln();async function f(){var e,r;const o=c(),i=n(),s=l();if(!o||!i)return;const a=((null==s?void 0:s.clientHeight)||0)/2,d="number"==typeof t.gutter?t.gutter+a:t.gutter??a;i.style.setProperty("--kb-popper-content-overflow-padding",`${t.overflowPadding}px`),o.getBoundingClientRect();const f=[(p=({placement:e})=>{const n=!!e.split("-")[1];return{mainAxis:d,crossAxis:n?void 0:t.shift,alignmentAxis:t.shift}},void 0===p&&(p=0),{name:"offset",options:p,async fn(e){var t,n;const{x:r,y:o,placement:i,middlewareData:l}=e,s=await async function(e,t){const{placement:n,platform:r,elements:o}=e,i=await(null==r.isRTL?void 0:r.isRTL(o.floating)),l=Bn(n),s=Hn(n),a="y"===Vn(n),d=["left","top"].includes(l)?-1:1,u=i&&a?-1:1,c=Rn(t,e);let{mainAxis:g,crossAxis:f,alignmentAxis:p}="number"==typeof c?{mainAxis:c,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...c};return s&&"number"==typeof p&&(f="end"===s?-1*p:p),a?{x:f*u,y:g*d}:{x:g*d,y:f*u}}(e,p);return i===(null==(t=l.offset)?void 0:t.placement)&&null!=(n=l.arrow)&&n.alignmentOffset?{}:{x:r+s.x,y:o+s.y,data:{...s,placement:i}}}})];var p;if(!1!==t.flip){const e="string"==typeof t.flip?t.flip.split(" "):void 0;if(void 0!==e&&!e.every(Kr))throw new Error("`flip` expects a spaced-delimited list of placements");f.push(function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:i,rects:l,initialPlacement:s,platform:a,elements:d}=t,{mainAxis:u=!0,crossAxis:c=!0,fallbackPlacements:g,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:p="none",flipAlignment:h=!0,...y}=Rn(e,t);if(null!=(n=i.arrow)&&n.alignmentOffset)return{};const v=Bn(o),b=Vn(s),m=Bn(s)===s,w=await(null==a.isRTL?void 0:a.isRTL(d.floating)),x=g||(m||!h?[Qn(s)]:function(e){const t=Qn(e);return[Nn(e),t,Nn(t)]}(s)),k="none"!==p;!g&&k&&x.push(...function(e,t,n,r){const o=Hn(e);let i=function(e,t,n){const r=["left","right"],o=["right","left"],i=["top","bottom"],l=["bottom","top"];switch(e){case"top":case"bottom":return n?t?o:r:t?r:o;case"left":case"right":return t?i:l;default:return[]}}(Bn(e),"start"===n,r);return o&&(i=i.map(e=>e+"-"+o),t&&(i=i.concat(i.map(Nn)))),i}(s,h,p,w));const $=[s,...x],S=await Zn(t,y),C=[];let E=(null==(r=i.flip)?void 0:r.overflows)||[];if(u&&C.push(S[v]),c){const e=function(e,t,n){void 0===n&&(n=!1);const r=Hn(e),o=jn(e),i=Un(o);let l="x"===o?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[i]>t.floating[i]&&(l=Qn(l)),[l,Qn(l)]}(o,l,w);C.push(S[e[0]],S[e[1]])}if(E=[...E,{placement:o,overflows:C}],!C.every(e=>e<=0)){var q,M;const e=((null==(q=i.flip)?void 0:q.index)||0)+1,t=$[e];if(t)return{data:{index:e,overflows:E},reset:{placement:t}};let n=null==(M=E.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:M.placement;if(!n)switch(f){case"bestFit":{var L;const e=null==(L=E.filter(e=>{if(k){const t=Vn(e.placement);return t===b||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:L[0];e&&(n=e);break}case"initialPlacement":n=s}if(o!==n)return{reset:{placement:n}}}return{}}}}({padding:t.overflowPadding,fallbackPlacements:e}))}(t.slide||t.overlap)&&f.push(function(e){return void 0===e&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o}=t,{mainAxis:i=!0,crossAxis:l=!1,limiter:s={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...a}=Rn(e,t),d={x:n,y:r},u=await Zn(t,a),c=Vn(Bn(o)),g=Gn(c);let f=d[g],p=d[c];if(i){const e="y"===g?"bottom":"right";f=Kn(f+u["y"===g?"top":"left"],f,f-u[e])}if(l){const e="y"===c?"bottom":"right";p=Kn(p+u["y"===c?"top":"left"],p,p-u[e])}const h=s.fn({...t,[g]:f,[c]:p});return{...h,data:{x:h.x-n,y:h.y-r}}}}}({mainAxis:t.slide,crossAxis:t.overlap,padding:t.overflowPadding})),f.push(function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){const{placement:n,rects:r,platform:o,elements:i}=t,{apply:l=()=>{},...s}=Rn(e,t),a=await Zn(t,s),d=Bn(n),u=Hn(n),c="y"===Vn(n),{width:g,height:f}=r.floating;let p,h;"top"===d||"bottom"===d?(p=d,h=u===(await(null==o.isRTL?void 0:o.isRTL(i.floating))?"start":"end")?"left":"right"):(h=d,p="end"===u?"top":"bottom");const y=f-a.top-a.bottom,v=g-a.left-a.right,b=Dn(f-a[p],y),m=Dn(g-a[h],v),w=!t.middlewareData.shift;let x=b,k=m;if(c?k=u||w?Dn(m,v):v:x=u||w?Dn(b,y):y,w&&!u){const e=Tn(a.left,0),t=Tn(a.right,0),n=Tn(a.top,0),r=Tn(a.bottom,0);c?k=g-2*(0!==e||0!==t?e+t:Tn(a.left,a.right)):x=f-2*(0!==n||0!==r?n+r:Tn(a.top,a.bottom))}await l({...t,availableWidth:k,availableHeight:x});const $=await o.getDimensions(i.floating);return g!==$.width||f!==$.height?{reset:{rects:!0}}:{}}}}({padding:t.overflowPadding,apply({availableWidth:e,availableHeight:n,rects:r}){const o=Math.round(r.reference.width);e=Math.floor(e),n=Math.floor(n),i.style.setProperty("--kb-popper-anchor-width",`${o}px`),i.style.setProperty("--kb-popper-content-available-width",`${e}px`),i.style.setProperty("--kb-popper-content-available-height",`${n}px`),t.sameWidth&&(i.style.width=`${o}px`),t.fitViewport&&(i.style.maxWidth=`${e}px`,i.style.maxHeight=`${n}px`)}})),t.hideWhenDetached&&f.push(function(e){return void 0===e&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n}=t,{strategy:r="referenceHidden",...o}=Rn(e,t);switch(r){case"referenceHidden":{const e=Yn(await Zn(t,{...o,elementContext:"reference"}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:Jn(e)}}}case"escaped":{const e=Yn(await Zn(t,{...o,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:Jn(e)}}}default:return{}}}}}({padding:t.detachedPadding})),s&&f.push((e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:i,platform:l,elements:s,middlewareData:a}=t,{element:d,padding:u=0}=Rn(e,t)||{};if(null==d)return{};const c=Wn(u),g={x:n,y:r},f=jn(o),p=Un(f),h=await l.getDimensions(d),y="y"===f,v=y?"top":"left",b=y?"bottom":"right",m=y?"clientHeight":"clientWidth",w=i.reference[p]+i.reference[f]-g[f]-i.floating[p],x=g[f]-i.reference[f],k=await(null==l.getOffsetParent?void 0:l.getOffsetParent(d));let $=k?k[m]:0;$&&await(null==l.isElement?void 0:l.isElement(k))||($=s.floating[m]||i.floating[p]);const S=w/2-x/2,C=$/2-h[p]/2-1,E=Dn(c[v],C),q=Dn(c[b],C),M=E,L=$-h[p]-q,F=$/2-h[p]/2+S,D=Kn(M,F,L),T=!a.arrow&&null!=Hn(o)&&F!==D&&i.reference[p]/2-(F<M?E:q)-h[p]/2<0,A=T?F<M?F-M:F-L:0;return{[f]:g[f]+A,data:{[f]:D,centerOffset:F-D-A,...T&&{alignmentOffset:A}},reset:T}}}))({element:s,padding:t.arrowPadding}));const h=await((e,t,n)=>{const r=new Map,o={platform:Dr,...n},i={...o.platform,_c:r};return(async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:l}=n,s=i.filter(Boolean),a=await(null==l.isRTL?void 0:l.isRTL(t));let d=await l.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:c}=Xn(d,r,a),g=r,f={},p=0;for(let h=0;h<s.length;h++){const{name:n,fn:i}=s[h],{x:y,y:v,data:b,reset:m}=await i({x:u,y:c,initialPlacement:r,placement:g,strategy:o,middlewareData:f,rects:d,platform:l,elements:{reference:e,floating:t}});u=null!=y?y:u,c=null!=v?v:c,f={...f,[n]:{...f[n],...b}},m&&p<=50&&(p++,"object"==typeof m&&(m.placement&&(g=m.placement),m.rects&&(d=!0===m.rects?await l.getElementRects({reference:e,floating:t,strategy:o}):m.rects),({x:u,y:c}=Xn(d,g,a))),h=-1)}return{x:u,y:c,placement:g,strategy:o,middlewareData:f}})(e,t,{...o,platform:i})})(o,i,{placement:t.placement,strategy:"absolute",middleware:f,platform:{...Dr,isRTL:()=>"rtl"===g()}});if(u(h.placement),null==(e=t.onCurrentPlacementChange)||e.call(t,h.placement),!i)return;i.style.setProperty("--kb-popper-content-transform-origin",function(e,t){const[n,r]=e.split("-"),o=Rr[n];return r?"left"===n||"right"===n?`${o} ${"start"===r?"top":"bottom"}`:"start"===r?`${o} ${"rtl"===t?"right":"left"}`:`${o} ${"rtl"===t?"left":"right"}`:`${o} center`}(h.placement,g()));const y=Math.round(h.x),v=Math.round(h.y);let b;if(t.hideWhenDetached&&(b=(null==(r=h.middlewareData.hide)?void 0:r.referenceHidden)?"hidden":"visible"),Object.assign(i.style,{top:"0",left:"0",transform:`translate3d(${y}px, ${v}px, 0)`,visibility:b}),s&&h.middlewareData.arrow){const{x:e,y:t}=h.middlewareData.arrow,n=h.placement.split("-")[0];Object.assign(s.style,{left:null!=e?`${e}px`:"",top:null!=t?`${t}px`:"",[n]:"100%"})}}i(()=>{const e=c(),t=n();if(!e||!t)return;const r=function(e,t,n,r){void 0===r&&(r={});const{ancestorScroll:o=!0,ancestorResize:i=!0,elementResize:l="function"==typeof ResizeObserver,layoutShift:s="function"==typeof IntersectionObserver,animationFrame:a=!1}=r,d=mr(e),u=o||i?[...d?vr(d):[],...vr(t)]:[];u.forEach(e=>{o&&e.addEventListener("scroll",n,{passive:!0}),i&&e.addEventListener("resize",n)});const c=d&&s?function(e,t){let n,r=null;const o=nr(e);function i(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return function l(s,a){void 0===s&&(s=!1),void 0===a&&(a=1),i();const{left:d,top:u,width:c,height:g}=e.getBoundingClientRect();if(s||t(),!c||!g)return;const f={rootMargin:-On(u)+"px "+-On(o.clientWidth-(d+c))+"px "+-On(o.clientHeight-(u+g))+"px "+-On(d)+"px",threshold:Tn(0,Dn(1,a))||1};let p=!0;function h(e){const t=e[0].intersectionRatio;if(t!==a){if(!p)return l();t?l(!1,t):n=setTimeout(()=>{l(!1,1e-7)},1e3)}p=!1}try{r=new IntersectionObserver(h,{...f,root:o.ownerDocument})}catch(y){r=new IntersectionObserver(h,f)}r.observe(e)}(!0),i}(d,n):null;let g,f=-1,p=null;l&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===d&&p&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;null==(e=p)||e.observe(t)})),n()}),d&&!a&&p.observe(d),p.observe(t));let h=a?$r(e):null;return a&&function t(){const r=$r(e);!h||r.x===h.x&&r.y===h.y&&r.width===h.width&&r.height===h.height||n(),h=r,g=requestAnimationFrame(t)}(),n(),()=>{var e;u.forEach(e=>{o&&e.removeEventListener("scroll",n),i&&e.removeEventListener("resize",n)}),null==c||c(),null==(e=p)||e.disconnect(),p=null,a&&cancelAnimationFrame(g)}}(e,t,f,{elementResize:"function"==typeof ResizeObserver});b(r)}),i(()=>{var e;const r=n(),o=null==(e=t.contentRef)?void 0:e.call(t);r&&o&&queueMicrotask(()=>{r.style.zIndex=getComputedStyle(o).zIndex})});const p={currentPlacement:d,contentRef:()=>{var e;return null==(e=t.contentRef)?void 0:e.call(t)},setPositionerRef:o,setArrowRef:a};return s(Tr.Provider,{value:p,get children(){return t.children}})},{Arrow:Pr,Context:Tr,usePopperContext:Ar,Positioner:function(e){const t=Ar(),[n,r]=W(e,["ref","style"]);return s(At,K({as:"div",ref(e){const r=Ie(t.setPositionerRef,n.ref);"function"==typeof r&&r(e)},"data-popper-positioner":"",get style(){return _e({position:"absolute",top:0,left:0,"min-width":"max-content"},n.style)}},r))}}),Hr="interactOutside.pointerDownOutside",Gr="interactOutside.focusOutside",Ur=n();function Vr(e){let t;const n=v(Ur),[r,l]=W(e,["ref","disableOutsidePointerEvents","excludedElements","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","bypassTopMostLayerCheck"]),a=new Set([]);!function(e,t){let n,r=kt;const o=()=>nt(t()),l=t=>{var n;return null==(n=e.onPointerDownOutside)?void 0:n.call(e,t)},s=t=>{var n;return null==(n=e.onFocusOutside)?void 0:n.call(e,t)},a=t=>{var n;return null==(n=e.onInteractOutside)?void 0:n.call(e,t)},d=n=>{var r;const i=n.target;return i instanceof HTMLElement&&!i.closest(`[${mn}]`)&&!!et(o(),i)&&!et(t(),i)&&!(null==(r=e.shouldExcludeElement)?void 0:r.call(e,i))},u=e=>{function n(){const n=t(),r=e.target;if(!n||!r||!d(e))return;const o=at([l,a]);r.addEventListener(Hr,o,{once:!0});const i=new CustomEvent(Hr,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:2===e.button||dt(e)&&0===e.button}});r.dispatchEvent(i)}"touch"===e.pointerType?(o().removeEventListener("click",n),r=n,o().addEventListener("click",n,{once:!0})):n()},c=e=>{const n=t(),r=e.target;if(!n||!r||!d(e))return;const o=at([s,a]);r.addEventListener(Gr,o,{once:!0});const i=new CustomEvent(Gr,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(i)};i(()=>{ee(e.isDisabled)||(n=window.setTimeout(()=>{o().addEventListener("pointerdown",u,!0)},0),o().addEventListener("focusin",c,!0),b(()=>{window.clearTimeout(n),o().removeEventListener("click",r),o().removeEventListener("pointerdown",u,!0),o().removeEventListener("focusin",c,!0)}))})}({shouldExcludeElement:e=>{var n;return!!t&&((null==(n=r.excludedElements)?void 0:n.some(t=>et(t(),e)))||[...a].some(t=>et(t,e)))},onPointerDownOutside:e=>{var n,o,i;t&&!En.isBelowPointerBlockingLayer(t)&&(r.bypassTopMostLayerCheck||En.isTopMostLayer(t))&&(null==(n=r.onPointerDownOutside)||n.call(r,e),null==(o=r.onInteractOutside)||o.call(r,e),e.defaultPrevented||null==(i=r.onDismiss)||i.call(r))},onFocusOutside:e=>{var t,n,o;null==(t=r.onFocusOutside)||t.call(r,e),null==(n=r.onInteractOutside)||n.call(r,e),e.defaultPrevented||null==(o=r.onDismiss)||o.call(r)}},()=>t),function(e){const t=t=>{var n;t.key===ot.Escape&&(null==(n=e.onEscapeKeyDown)||n.call(e,t))};i(()=>{var n;if(ee(e.isDisabled))return;const r=(null==(n=e.ownerDocument)?void 0:n.call(e))??nt();r.addEventListener("keydown",t),b(()=>{r.removeEventListener("keydown",t)})})}({ownerDocument:()=>nt(t),onEscapeKeyDown:e=>{var n;t&&En.isTopMostLayer(t)&&(null==(n=r.onEscapeKeyDown)||n.call(r,e),!e.defaultPrevented&&r.onDismiss&&(e.preventDefault(),r.onDismiss()))}}),o(()=>{if(!t)return;En.addLayer({node:t,isPointerBlocking:r.disableOutsidePointerEvents,dismiss:r.onDismiss});const e=null==n?void 0:n.registerNestedLayer(t);En.assignPointerEventToLayers(),En.disableBodyPointerEvents(t),b(()=>{t&&(En.removeLayer(t),null==e||e(),En.assignPointerEventToLayers(),En.restoreBodyPointerEvents(t))})}),i(x([()=>t,()=>r.disableOutsidePointerEvents],([e,t])=>{if(!e)return;const n=En.find(e);n&&n.isPointerBlocking!==t&&(n.isPointerBlocking=t,En.assignPointerEventToLayers()),t&&En.disableBodyPointerEvents(e),b(()=>{En.restoreBodyPointerEvents(e)})},{defer:!0}));const d={registerNestedLayer:e=>{a.add(e);const t=null==n?void 0:n.registerNestedLayer(e);return()=>{a.delete(e),null==t||t()}}};return s(Ur.Provider,{value:d,get children(){return s(At,K({as:"div",ref(e){const n=Ie(e=>t=e,r.ref);"function"==typeof n&&n(e)}},l))}})}function jr(e={}){const[t,n]=Ht({value:()=>ee(e.open),defaultValue:()=>!!ee(e.defaultOpen),onChange:t=>{var n;return null==(n=e.onOpenChange)?void 0:n.call(e,t)}}),r=()=>{n(!0)},o=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:o,toggle:()=>{t()?o():r()}}}var Nr={};Ut(Nr,{Description:()=>zt,ErrorMessage:()=>Kt,Item:()=>Zr,ItemControl:()=>Yr,ItemDescription:()=>Jr,ItemIndicator:()=>eo,ItemInput:()=>to,ItemLabel:()=>no,Label:()=>ro,RadioGroup:()=>io,Root:()=>oo});var Qr=n();function Wr(){const e=v(Qr);if(void 0===e)throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var _r=n();function Xr(){const e=v(_r);if(void 0===e)throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function Zr(e){const t=Pt(),n=Wr(),o=$t({id:`${t.generateId("item")}-${C()}`},e),[i,a]=W(o,["value","disabled","onPointerDown"]),[d,u]=r(),[c,g]=r(),[f,p]=r(),[h,y]=r(),[v,b]=r(!1),m=l(()=>n.isSelectedValue(i.value)),w=l(()=>i.disabled||t.isDisabled()||!1),x=e=>{st(e,i.onPointerDown),v()&&e.preventDefault()},k=l(()=>({...t.dataset(),"data-disabled":w()?"":void 0,"data-checked":m()?"":void 0})),$={value:()=>i.value,dataset:k,isSelected:m,isDisabled:w,inputId:d,labelId:c,descriptionId:f,inputRef:h,select:()=>n.setSelectedValue(i.value),generateId:Je(()=>a.id),registerInput:Ft(u),registerLabel:Ft(g),registerDescription:Ft(p),setIsFocused:b,setInputRef:y};return s(_r.Provider,{value:$,get children(){return s(At,K({as:"div",role:"group",onPointerDown:x},k,a))}})}function Yr(e){const t=Xr(),n=$t({id:t.generateId("control")},e),[r,o]=W(n,["onClick","onKeyDown"]);return s(At,K({as:"div",onClick:e=>{var n;st(e,r.onClick),t.select(),null==(n=t.inputRef())||n.focus()},onKeyDown:e=>{var n;st(e,r.onKeyDown),e.key===ot.Space&&(t.select(),null==(n=t.inputRef())||n.focus())}},()=>t.dataset(),o))}function Jr(e){const t=Xr(),n=$t({id:t.generateId("description")},e);return i(()=>b(t.registerDescription(n.id))),s(At,K({as:"div"},()=>t.dataset(),n))}function eo(e){const t=Xr(),n=$t({id:t.generateId("indicator")},e),[o,i]=W(n,["ref","forceMount"]),[l,a]=r(),{present:d}=bn({show:()=>o.forceMount||t.isSelected(),element:()=>l()??null});return s(u,{get when(){return d()},get children(){return s(At,K({as:"div",ref(e){const t=Ie(a,o.ref);"function"==typeof t&&t(e)}},()=>t.dataset(),i))}})}function to(e){const t=Pt(),n=Wr(),o=Xr(),l=$t({id:o.generateId("input")},e),[a,d]=W(l,["ref","style","aria-labelledby","aria-describedby","onChange","onFocus","onBlur"]),[u,c]=r(!1);return i(x([()=>o.isSelected(),()=>o.value()],e=>{if(!e[0]&&e[1]===o.value())return;c(!0);const t=o.inputRef();null==t||t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),null==t||t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))},{defer:!0})),i(()=>b(o.registerInput(d.id))),s(At,K({as:"input",ref(e){const t=Ie(o.setInputRef,a.ref);"function"==typeof t&&t(e)},type:"radio",get name(){return t.name()},get value(){return o.value()},get checked(){return o.isSelected()},get required(){return t.isRequired()},get disabled(){return o.isDisabled()},get readonly(){return t.isReadOnly()},get style(){return _e({...Lt},a.style)},get"aria-labelledby"(){return[a["aria-labelledby"],o.labelId(),null!=a["aria-labelledby"]&&null!=d["aria-label"]?d.id:void 0].filter(Boolean).join(" ")||void 0},get"aria-describedby"(){return[a["aria-describedby"],o.descriptionId(),n.ariaDescribedBy()].filter(Boolean).join(" ")||void 0},onChange:e=>{st(e,a.onChange),e.stopPropagation(),u()||(n.setSelectedValue(o.value()),e.target.checked=o.isSelected()),c(!1)},onFocus:e=>{st(e,a.onFocus),o.setIsFocused(!0)},onBlur:e=>{st(e,a.onBlur),o.setIsFocused(!1)}},()=>o.dataset(),d))}function no(e){const t=Xr(),n=$t({id:t.generateId("label")},e);return i(()=>b(t.registerLabel(n.id))),s(At,K({as:"label",get for(){return t.inputId()}},()=>t.dataset(),n))}function ro(e){return s(Rt,K({as:"span"},e))}function oo(e){let t;const n=$t({id:`radiogroup-${C()}`,orientation:"vertical"},e),[o,a,d]=W(n,["ref","value","defaultValue","onChange","orientation","aria-labelledby","aria-describedby"],Ot),[u,c]=Bt({value:()=>o.value,defaultValue:()=>o.defaultValue,onChange:e=>{var t;return null==(t=o.onChange)?void 0:t.call(o,e)}}),{formControlContext:g}=function(e){const t=$t({id:`form-control-${C()}`},e),[n,o]=r(),[i,s]=r(),[a,d]=r(),[u,c]=r();return{formControlContext:{name:()=>ee(t.name)??ee(t.id),dataset:l(()=>({"data-valid":"valid"===ee(t.validationState)?"":void 0,"data-invalid":"invalid"===ee(t.validationState)?"":void 0,"data-required":ee(t.required)?"":void 0,"data-disabled":ee(t.disabled)?"":void 0,"data-readonly":ee(t.readOnly)?"":void 0})),validationState:()=>ee(t.validationState),isRequired:()=>ee(t.required),isDisabled:()=>ee(t.disabled),isReadOnly:()=>ee(t.readOnly),labelId:n,fieldId:i,descriptionId:a,errorMessageId:u,getAriaLabelledBy:(e,t,r)=>{const o=null!=r||null!=n();return[r,n(),o&&null!=t?e:void 0].filter(Boolean).join(" ")||void 0},getAriaDescribedBy:e=>[a(),u(),e].filter(Boolean).join(" ")||void 0,generateId:Je(()=>ee(t.id)),registerLabel:Ft(o),registerField:Ft(s),registerDescription:Ft(d),registerErrorMessage:Ft(c)}}}(a);var f;f=()=>c(o.defaultValue??""),i(x(()=>t,e=>{if(null==e)return;const t=function(e){return function(e){return e.matches("textarea, input, select, button")}(e)?e.form:e.closest("form")}(e);null!=t&&(t.addEventListener("reset",f,{passive:!0}),b(()=>{t.removeEventListener("reset",f)}))}));const p=()=>g.getAriaDescribedBy(o["aria-describedby"]),h=e=>e===u(),y={ariaDescribedBy:p,isSelectedValue:h,setSelectedValue:e=>{if(!g.isReadOnly()&&!g.isDisabled()&&(c(e),t))for(const n of t.querySelectorAll("[type='radio']")){const e=n;e.checked=h(e.value)}}};return s(It.Provider,{value:g,get children(){return s(Qr.Provider,{value:y,get children(){return s(At,K({as:"div",ref(e){const n=Ie(e=>t=e,o.ref);"function"==typeof n&&n(e)},role:"radiogroup",get id(){return ee(a.id)},get"aria-invalid"(){return"invalid"===g.validationState()||void 0},get"aria-required"(){return g.isRequired()||void 0},get"aria-disabled"(){return g.isDisabled()||void 0},get"aria-readonly"(){return g.isReadOnly()||void 0},get"aria-orientation"(){return o.orientation},get"aria-labelledby"(){return g.getAriaLabelledBy(ee(a.id),d["aria-label"],o["aria-labelledby"])},get"aria-describedby"(){return p()}},()=>g.dataset(),d))}})}})}var io=Object.assign(oo,{Description:zt,ErrorMessage:Kt,Item:Zr,ItemControl:Yr,ItemDescription:Jr,ItemIndicator:eo,ItemInput:to,ItemLabel:no,Label:ro}),lo=class{constructor(e,n,r){t(this,"collection"),t(this,"ref"),t(this,"collator"),this.collection=e,this.ref=n,this.collator=r}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;null!=t;){const e=this.collection().getItem(t);if(e&&"item"===e.type&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;null!=t;){const e=this.collection().getItem(t);if(e&&"item"===e.type&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;null!=e;){const t=this.collection().getItem(e);if(t&&"item"===t.type&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;null!=e;){const t=this.collection().getItem(e);if(t&&"item"===t.type&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){var t,n;return(null==(n=null==(t=this.ref)?void 0:t.call(this))?void 0:n.querySelector(`[data-key="${e}"]`))??null}getKeyPageAbove(e){var t;const n=null==(t=this.ref)?void 0:t.call(this);let r=this.getItem(e);if(!n||!r)return;const o=Math.max(0,r.offsetTop+r.offsetHeight-n.offsetHeight);let i=e;for(;i&&r&&r.offsetTop>o;)i=this.getKeyAbove(i),r=null!=i?this.getItem(i):null;return i}getKeyPageBelow(e){var t;const n=null==(t=this.ref)?void 0:t.call(this);let r=this.getItem(e);if(!n||!r)return;const o=Math.min(n.scrollHeight,r.offsetTop-r.offsetHeight+n.offsetHeight);let i=e;for(;i&&r&&r.offsetTop<o;)i=this.getKeyBelow(i),r=null!=i?this.getItem(i):null;return i}getKeyForSearch(e,t){var n;const r=null==(n=this.collator)?void 0:n.call(this);if(!r)return;let o=null!=t?this.getKeyBelow(t):this.getFirstKey();for(;null!=o;){const t=this.collection().getItem(o);if(t){const n=t.textValue.slice(0,e.length);if(t.textValue&&0===r.compare(n,e))return o}o=this.getKeyBelow(o)}}};var so="focusScope.autoFocusOnMount",ao="focusScope.autoFocusOnUnmount",uo={bubbles:!1,cancelable:!0},co={stack:[],active(){return this.stack[0]},add(e){var t;e!==this.active()&&(null==(t=this.active())||t.pause()),this.stack=Xe(this.stack,e),this.stack.unshift(e)},remove(e){var t;this.stack=Xe(this.stack,e),null==(t=this.active())||t.resume()}};function go(e,t){const[n,o]=r(!1),l={pause(){o(!0)},resume(){o(!1)}};let s=null;const a=t=>{var n;return null==(n=e.onMountAutoFocus)?void 0:n.call(e,t)},d=t=>{var n;return null==(n=e.onUnmountAutoFocus)?void 0:n.call(e,t)},u=()=>nt(t()),c=()=>{const e=u().createElement("span");return e.setAttribute("data-focus-trap",""),e.tabIndex=0,Object.assign(e.style,Lt),e},g=()=>{const e=t();return e?yt(e,!0).filter(e=>!e.hasAttribute("data-focus-trap")):[]},f=()=>{const e=g();return e.length>0?e[0]:null};i(()=>{const e=t();if(!e)return;co.add(l);const n=tt(e);if(!et(e,n)){const t=new CustomEvent(so,uo);e.addEventListener(so,a),e.dispatchEvent(t),t.defaultPrevented||setTimeout(()=>{ut(f()),tt(e)===n&&ut(e)},0)}b(()=>{e.removeEventListener(so,a),setTimeout(()=>{const r=new CustomEvent(ao,uo);(()=>{const e=t();if(!e)return!1;const n=tt(e);return!!n&&!et(e,n)&&bt(n)})()&&r.preventDefault(),e.addEventListener(ao,d),e.dispatchEvent(r),r.defaultPrevented||ut(n??u().body),e.removeEventListener(ao,d),co.remove(l)},0)})}),i(()=>{const r=t();if(!r||!ee(e.trapFocus)||n())return;const o=e=>{const t=e.target;(null==t?void 0:t.closest(`[${mn}]`))||(et(r,t)?s=t:ut(s))},i=e=>{const t=e.relatedTarget??tt(r);(null==t?void 0:t.closest(`[${mn}]`))||et(r,t)||ut(s)};u().addEventListener("focusin",o),u().addEventListener("focusout",i),b(()=>{u().removeEventListener("focusin",o),u().removeEventListener("focusout",i)})}),i(()=>{const r=t();if(!r||!ee(e.trapFocus)||n())return;const o=c();r.insertAdjacentElement("afterbegin",o);const i=c();function l(e){const t=f(),n=(()=>{const e=g();return e.length>0?e[e.length-1]:null})();e.relatedTarget===t?ut(n):ut(t)}r.insertAdjacentElement("beforeend",i),o.addEventListener("focusin",l),i.addEventListener("focusin",l);const s=new MutationObserver(e=>{for(const t of e)t.previousSibling===i&&(i.remove(),r.insertAdjacentElement("beforeend",i)),t.nextSibling===o&&(o.remove(),r.insertAdjacentElement("afterbegin",o))});s.observe(r,{childList:!0,subtree:!1}),b(()=>{o.removeEventListener("focusin",l),i.removeEventListener("focusin",l),o.remove(),i.remove(),s.disconnect()})})}var fo=new WeakMap,po=[],ho=new Map,yo=e=>{i(()=>{const t=vn(e.style)??{},n=vn(e.properties)??[],r={};for(const i in t)r[i]=e.element.style[i];const o=ho.get(e.key);o?o.activeCount++:ho.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(e=>e.key)}),Object.assign(e.element.style,e.style);for(const i of n)e.element.style.setProperty(i.key,i.value);b(()=>{var t;const n=ho.get(e.key);if(n)if(1===n.activeCount){ho.delete(e.key);for(const[t,r]of Object.entries(n.originalStyles))e.element.style[t]=r;for(const t of n.properties)e.element.style.removeProperty(t);0===e.element.style.length&&e.element.removeAttribute("style"),null==(t=e.cleanup)||t.call(e)}else n.activeCount--})})},vo=(e,t)=>{switch(t){case"x":return[e.clientWidth,e.scrollLeft,e.scrollWidth];case"y":return[e.clientHeight,e.scrollTop,e.scrollHeight]}},bo=(e,t)=>{const n=getComputedStyle(e),r="x"===t?n.overflowX:n.overflowY;return"auto"===r||"scroll"===r||"HTML"===e.tagName&&"visible"===r},[mo,wo]=r([]),xo=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],ko=(e,t,n,r)=>{const o=null!==r&&$o(r,e),[i,l]=((e,t,n)=>{const r="x"===t&&"rtl"===window.getComputedStyle(e).direction?-1:1;let o=e,i=0,l=0,s=!1;do{const[e,a,d]=vo(o,t),u=d-e-r*a;0===a&&0===u||!bo(o,t)||(i+=u,l+=a),o===(n??document.documentElement)?s=!0:o=o._$host??o.parentElement}while(o&&!s);return[i,l]})(e,t,o?r:void 0);return!(n>0&&Math.abs(i)<=1||n<0&&Math.abs(l)<1)},$o=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},So=n();function Co(){return v(So)}function Eo(){const e=Co();if(void 0===e)throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var qo=n();function Mo(){const e=v(qo);if(void 0===e)throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var Lo=n();function Fo(){const e=v(Lo);if(void 0===e)throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function Do(e){let t;const n=Fo(),o=Eo(),a=$t({id:n.generateId(`item-${C()}`)},e),[d,u]=W(a,["ref","textValue","disabled","closeOnSelect","checked","indeterminate","onSelect","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]),[c,g]=r(),[f,p]=r(),[h,y]=r(),v=()=>o.listState().selectionManager(),m=()=>u.id,w=()=>{var e;null==(e=d.onSelect)||e.call(d),d.closeOnSelect&&setTimeout(()=>{o.close(!0)})};!function(e){const t=function(){const e=jt();if(void 0===e)throw new Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}(),n=$t({shouldRegisterItem:!0},e);i(()=>{if(!n.shouldRegisterItem)return;const e=t.registerItem(n.getItem());b(e)})}({getItem:()=>{var e;return{ref:()=>t,type:"item",key:m(),textValue:d.textValue??(null==(e=h())?void 0:e.textContent)??(null==t?void 0:t.textContent)??"",disabled:d.disabled??!1}}});const x=fn({key:m,selectionManager:v,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>d.disabled},()=>t),k=e=>{st(e,d.onPointerMove),"mouse"===e.pointerType&&(d.disabled?o.onItemLeave(e):(o.onItemEnter(e),e.defaultPrevented||(ut(e.currentTarget),o.listState().selectionManager().setFocused(!0),o.listState().selectionManager().setFocusedKey(m()))))},$=e=>{st(e,d.onPointerLeave),"mouse"===e.pointerType&&o.onItemLeave(e)},S=e=>{st(e,d.onPointerUp),d.disabled||0!==e.button||w()},E=e=>{if(st(e,d.onKeyDown),!e.repeat&&!d.disabled)switch(e.key){case"Enter":case" ":w()}},q=l(()=>d.indeterminate?"mixed":null!=d.checked?d.checked:void 0),M=l(()=>({"data-indeterminate":d.indeterminate?"":void 0,"data-checked":d.checked&&!d.indeterminate?"":void 0,"data-disabled":d.disabled?"":void 0,"data-highlighted":v().focusedKey()===m()?"":void 0})),L={isChecked:()=>d.checked,dataset:M,setLabelRef:y,generateId:Je(()=>u.id),registerLabel:Ft(g),registerDescription:Ft(p)};return s(qo.Provider,{value:L,get children(){return s(At,K({as:"div",ref(e){const n=Ie(e=>t=e,d.ref);"function"==typeof n&&n(e)},get tabIndex(){return x.tabIndex()},get"aria-checked"(){return q()},get"aria-disabled"(){return d.disabled},get"aria-labelledby"(){return c()},get"aria-describedby"(){return f()},get"data-key"(){return x.dataKey()},get onPointerDown(){return at([d.onPointerDown,x.onPointerDown])},get onPointerUp(){return at([S,x.onPointerUp])},get onClick(){return at([d.onClick,x.onClick])},get onKeyDown(){return at([E,x.onKeyDown])},get onMouseDown(){return at([d.onMouseDown,x.onMouseDown])},get onFocus(){return at([d.onFocus,x.onFocus])},onPointerMove:k,onPointerLeave:$},M,u))}})}function To(e){const t=$t({closeOnSelect:!1},e),[n,r]=W(t,["checked","defaultChecked","onChange","onSelect"]),o=function(e={}){const[t,n]=Ht({value:()=>ee(e.isSelected),defaultValue:()=>!!ee(e.defaultIsSelected),onChange:t=>{var n;return null==(n=e.onSelectedChange)?void 0:n.call(e,t)}});return{isSelected:t,setIsSelected:t=>{ee(e.isReadOnly)||ee(e.isDisabled)||n(t)},toggle:()=>{ee(e.isReadOnly)||ee(e.isDisabled)||n(!t())}}}({isSelected:()=>n.checked,defaultIsSelected:()=>n.defaultChecked,onSelectedChange:e=>{var t;return null==(t=n.onChange)?void 0:t.call(n,e)},isDisabled:()=>r.disabled});return s(Do,K({role:"menuitemcheckbox",get checked(){return o.isSelected()},onSelect:()=>{var e;null==(e=n.onSelect)||e.call(n),o.toggle()}},r))}var Ao=n();function Oo(){return v(Ao)}var Io={next:(e,t)=>"ltr"===e?"horizontal"===t?"ArrowRight":"ArrowDown":"horizontal"===t?"ArrowLeft":"ArrowUp",previous:(e,t)=>Io.next("ltr"===e?"rtl":"ltr",t)};function Po(e){const t=Fo(),n=Eo(),r=Oo(),{direction:o}=ln(),a=$t({id:t.generateId("trigger")},e),[u,c]=W(a,["ref","id","disabled","onPointerDown","onClick","onKeyDown","onMouseOver","onFocus"]);let g=()=>t.value();void 0!==r&&(g=()=>t.value()??u.id,void 0===r.lastValue()&&r.setLastValue(g));const f=Dt(()=>n.triggerRef(),()=>"button"),p=l(()=>{var e;return"a"===f()&&null!=(null==(e=n.triggerRef())?void 0:e.getAttribute("href"))});i(x(()=>null==r?void 0:r.value(),e=>{var t;p()&&e===g()&&(null==(t=n.triggerRef())||t.focus())}));const h=()=>{void 0!==r?n.isOpen()?r.value()===g()&&r.closeMenu():(r.autoFocusMenu()||r.setAutoFocusMenu(!0),n.open(!1)):n.toggle(!0)};return i(()=>b(n.registerTriggerId(u.id))),s(Mn,K({ref(e){const t=Ie(n.setTriggerRef,u.ref);"function"==typeof t&&t(e)},get"data-kb-menu-value-trigger"(){return t.value()},get id(){return u.id},get disabled(){return u.disabled},"aria-haspopup":"true",get"aria-expanded"(){return n.isOpen()},get"aria-controls"(){return d(()=>!!n.isOpen())()?n.contentId():void 0},get"data-highlighted"(){return void 0!==g()&&(null==r?void 0:r.value())===g()||void 0},get tabIndex(){return void 0!==r?r.value()===g()||r.lastValue()===g()?0:-1:void 0},onPointerDown:e=>{st(e,u.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,u.disabled||"touch"===e.pointerType||0!==e.button||h()},onMouseOver:e=>{var t;st(e,u.onMouseOver),"touch"!==(null==(t=n.triggerRef())?void 0:t.dataset.pointerType)&&(u.disabled||void 0===r||void 0===r.value()||r.setValue(g))},onClick:e=>{st(e,u.onClick),u.disabled||"touch"===e.currentTarget.dataset.pointerType&&h()},onKeyDown:e=>{if(st(e,u.onKeyDown),!u.disabled){if(p())switch(e.key){case"Enter":case" ":return}switch(e.key){case"Enter":case" ":case"horizontal"===t.orientation()?"ArrowDown":"ArrowRight":e.stopPropagation(),e.preventDefault(),function(e){var t,n;if(document.contains(e)){const r=document.scrollingElement||document.documentElement;if("hidden"===window.getComputedStyle(r).overflow){let t=wt(e);for(;e&&t&&e!==r&&t!==r;)qt(t,e),t=wt(e=t)}else{const{left:r,top:o}=e.getBoundingClientRect();null==(t=null==e?void 0:e.scrollIntoView)||t.call(e,{block:"nearest"});const{left:i,top:l}=e.getBoundingClientRect();(Math.abs(r-i)>1||Math.abs(o-l)>1)&&(null==(n=e.scrollIntoView)||n.call(e,{block:"nearest"}))}}}(e.currentTarget),n.open("first"),null==r||r.setAutoFocusMenu(!0),null==r||r.setValue(g);break;case(e=>"horizontal"===e?"ArrowUp":"ArrowLeft")(t.orientation()):e.stopPropagation(),e.preventDefault(),n.open("last");break;case Io.next(o(),t.orientation()):if(void 0===r)break;e.stopPropagation(),e.preventDefault(),r.nextMenu();break;case Io.previous(o(),t.orientation()):if(void 0===r)break;e.stopPropagation(),e.preventDefault(),r.previousMenu()}}},onFocus:e=>{st(e,u.onFocus),void 0!==r&&"touch"!==e.currentTarget.dataset.pointerType&&r.setValue(g)},role:void 0!==r?"menuitem":void 0},()=>n.dataset(),c))}var zo=n();function Ko(){return v(zo)}function Ro(e){let t;const n=Fo(),r=Eo(),o=Oo(),a=Ko(),{direction:c}=ln(),g=$t({id:n.generateId(`content-${C()}`)},e),[f,p]=W(g,["ref","id","style","onOpenAutoFocus","onCloseAutoFocus","onEscapeKeyDown","onFocusOutside","onPointerEnter","onPointerMove","onKeyDown","onMouseDown","onFocusIn","onFocusOut"]);let h=0;const y=()=>null==r.parentMenuContext()&&void 0===o&&n.isModal(),v=function(e,t){const n=function(e){const{locale:t}=ln(),n=l(()=>t()+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():""));return l(()=>{const r=n();let o;return sn.has(r)&&(o=sn.get(r)),o||(o=new Intl.Collator(t(),e),sn.set(r,o)),o})}({usage:"search",sensitivity:"base"});return gn({selectionManager:()=>ee(e.selectionManager),keyboardDelegate:l(()=>ee(e.keyboardDelegate)||new lo(e.collection,t,n)),autoFocus:()=>ee(e.autoFocus),deferAutoFocus:()=>ee(e.deferAutoFocus),shouldFocusWrap:()=>ee(e.shouldFocusWrap),disallowEmptySelection:()=>ee(e.disallowEmptySelection),selectOnFocus:()=>ee(e.selectOnFocus),disallowTypeAhead:()=>ee(e.disallowTypeAhead),shouldUseVirtualFocus:()=>ee(e.shouldUseVirtualFocus),allowsTabNavigation:()=>ee(e.allowsTabNavigation),isVirtualized:()=>ee(e.isVirtualized),scrollToKey:t=>{var n;return null==(n=ee(e.scrollToKey))?void 0:n(t)},orientation:()=>ee(e.orientation)},t)}({selectionManager:r.listState().selectionManager,collection:r.listState().collection,autoFocus:r.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!r.listState().selectionManager().isFocused(),orientation:()=>"horizontal"===n.orientation()?"vertical":"horizontal"},()=>t);go({trapFocus:()=>y()&&r.isOpen(),onMountAutoFocus:e=>{var t;void 0===o&&(null==(t=f.onOpenAutoFocus)||t.call(f,e))},onUnmountAutoFocus:f.onCloseAutoFocus},()=>t);const m=e=>{var t;null==(t=f.onEscapeKeyDown)||t.call(f,e),null==o||o.setAutoFocusMenu(!1),r.close(!0)},w=e=>{var t;null==(t=f.onFocusOutside)||t.call(f,e),n.isModal()&&e.preventDefault()};i(()=>b(r.registerContentId(f.id)));const x={ref:Ie(e=>{r.setContentRef(e),t=e},f.ref),role:"menu",get id(){return f.id},get tabIndex(){return v.tabIndex()},get"aria-labelledby"(){return r.triggerId()},onKeyDown:at([f.onKeyDown,v.onKeyDown,e=>{if(et(e.currentTarget,e.target)&&("Tab"===e.key&&r.isOpen()&&e.preventDefault(),void 0!==o&&"true"!==e.currentTarget.getAttribute("aria-haspopup")))switch(e.key){case Io.next(c(),n.orientation()):e.stopPropagation(),e.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.nextMenu();break;case Io.previous(c(),n.orientation()):if(e.currentTarget.hasAttribute("data-closed"))break;e.stopPropagation(),e.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.previousMenu()}}]),onMouseDown:at([f.onMouseDown,v.onMouseDown]),onFocusIn:at([f.onFocusIn,v.onFocusIn]),onFocusOut:at([f.onFocusOut,v.onFocusOut]),onPointerEnter:e=>{var t,n;st(e,f.onPointerEnter),r.isOpen()&&(null==(t=r.parentMenuContext())||t.listState().selectionManager().setFocused(!1),null==(n=r.parentMenuContext())||n.listState().selectionManager().setFocusedKey(void 0))},onPointerMove:e=>{if(st(e,f.onPointerMove),"mouse"!==e.pointerType)return;const t=e.target,n=h!==e.clientX;et(e.currentTarget,t)&&n&&(r.setPointerDir(e.clientX>h?"right":"left"),h=e.clientX)},get"data-orientation"(){return n.orientation()}};return s(u,{get when(){return r.contentPresent()},get children(){return s(u,{get when(){return void 0===a||null!=r.parentMenuContext()},get fallback(){return s(At,K({as:"div"},()=>r.dataset(),x,p))},get children(){return s(Br.Positioner,{get children(){return s(Vr,K({get disableOutsidePointerEvents(){return d(()=>!!y())()&&r.isOpen()},get excludedElements(){return[r.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return _e({"--kb-menu-content-transform-origin":"var(--kb-popper-content-transform-origin)",position:"relative"},f.style)},onEscapeKeyDown:m,onFocusOutside:w,get onDismiss(){return r.close}},()=>r.dataset(),x,p))}})}})}})}function Bo(e){let t;const n=Fo(),r=Eo(),[o,l]=W(e,["ref"]);return(e=>{const t=K({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:"padding",restoreScrollPosition:!0,allowPinchZoom:!1},e),n=C();let r=[0,0],o=null,l=null;i(()=>{vn(t.enabled)&&(wo(e=>[...e,n]),b(()=>{wo(e=>e.filter(e=>e!==n))}))}),i(()=>{if(!vn(t.enabled)||!vn(t.hideScrollbar))return;const{body:e}=document,n=window.innerWidth-e.offsetWidth;if(vn(t.preventScrollbarShift)){const r={overflow:"hidden"},o=[];n>0&&("padding"===vn(t.preventScrollbarShiftMode)?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${n}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${n}px)`,o.push({key:"--scrollbar-width",value:`${n}px`}));const i=window.scrollY,l=window.scrollX;yo({key:"prevent-scroll",element:e,style:r,properties:o,cleanup:()=>{vn(t.restoreScrollPosition)&&n>0&&window.scrollTo(l,i)}})}else yo({key:"prevent-scroll",element:e,style:{overflow:"hidden"}})}),i(()=>{var e;e=n,mo().indexOf(e)===mo().length-1&&vn(t.enabled)&&(document.addEventListener("wheel",a,{passive:!1}),document.addEventListener("touchstart",s,{passive:!1}),document.addEventListener("touchmove",d,{passive:!1}),b(()=>{document.removeEventListener("wheel",a),document.removeEventListener("touchstart",s),document.removeEventListener("touchmove",d)}))});const s=e=>{r=xo(e),o=null,l=null},a=e=>{const n=e.target,r=vn(t.element),o=(e=>[e.deltaX,e.deltaY])(e),i=Math.abs(o[0])>Math.abs(o[1])?"x":"y",l="x"===i?o[0]:o[1],s=ko(n,i,l,r);let a;a=!r||!$o(r,n)||!s,a&&e.cancelable&&e.preventDefault()},d=e=>{const n=vn(t.element),i=e.target;let s;if(2===e.touches.length)s=!vn(t.allowPinchZoom);else{if(null==o||null===l){const t=xo(e).map((e,t)=>r[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?"x":"y";o=n,l="x"===n?t[0]:t[1]}if("range"===i.type)s=!1;else{const e=ko(i,o,l,n);s=!n||!$o(n,i)||!e}}s&&e.cancelable&&e.preventDefault()}})({element:()=>t??null,enabled:()=>r.contentPresent()&&n.preventScroll()}),s(Ro,K({ref(e){const n=Ie(e=>{t=e},o.ref);"function"==typeof n&&n(e)}},l))}var Ho=n();function Go(e){const t=$t({id:Fo().generateId(`group-${C()}`)},e),[n,o]=r(),i={generateId:Je(()=>t.id),registerLabelId:Ft(o)};return s(Ho.Provider,{value:i,get children(){return s(At,K({as:"div",role:"group",get"aria-labelledby"(){return n()}},t))}})}function Uo(e){const t=function(){const e=v(Ho);if(void 0===e)throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}(),n=$t({id:t.generateId("label")},e),[r,o]=W(n,["id"]);return i(()=>b(t.registerLabelId(r.id))),s(At,K({as:"span",get id(){return r.id},"aria-hidden":"true"},o))}function Vo(e){const t=Eo(),n=$t({children:"▼"},e);return s(At,K({as:"span","aria-hidden":"true"},()=>t.dataset(),n))}function jo(e){return s(Do,K({role:"menuitem",closeOnSelect:!0},e))}function No(e){const t=Mo(),n=$t({id:t.generateId("description")},e),[r,o]=W(n,["id"]);return i(()=>b(t.registerDescription(r.id))),s(At,K({as:"div",get id(){return r.id}},()=>t.dataset(),o))}function Qo(e){const t=Mo(),n=$t({id:t.generateId("indicator")},e),[r,o]=W(n,["forceMount"]);return s(u,{get when(){return r.forceMount||t.isChecked()},get children(){return s(At,K({as:"div"},()=>t.dataset(),o))}})}function Wo(e){const t=Mo(),n=$t({id:t.generateId("label")},e),[r,o]=W(n,["ref","id"]);return i(()=>b(t.registerLabel(r.id))),s(At,K({as:"div",ref(e){const n=Ie(t.setLabelRef,r.ref);"function"==typeof n&&n(e)},get id(){return r.id}},()=>t.dataset(),o))}function _o(e){const t=Eo();return s(u,{get when(){return t.contentPresent()},get children(){return s(a,e)}})}var Xo=n();function Zo(e){const t=$t({id:Fo().generateId(`radiogroup-${C()}`)},e),[n,r]=W(t,["value","defaultValue","onChange","disabled"]),[o,i]=Bt({value:()=>n.value,defaultValue:()=>n.defaultValue,onChange:e=>{var t;return null==(t=n.onChange)?void 0:t.call(n,e)}}),l={isDisabled:()=>n.disabled,isSelectedValue:e=>e===o(),setSelectedValue:i};return s(Xo.Provider,{value:l,get children(){return s(Go,r)}})}function Yo(e){const t=function(){const e=v(Xo);if(void 0===e)throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}(),n=$t({closeOnSelect:!1},e),[r,o]=W(n,["value","onSelect"]);return s(Do,K({role:"menuitemradio",get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{var e;null==(e=r.onSelect)||e.call(r),t.setSelectedValue(r.value)}},o))}function Jo(e,t,n){const r=e.split("-")[0],o=n.getBoundingClientRect(),i=[],l=t.clientX,s=t.clientY;switch(r){case"top":i.push([l,s+5]),i.push([o.left,o.bottom]),i.push([o.left,o.top]),i.push([o.right,o.top]),i.push([o.right,o.bottom]);break;case"right":i.push([l-5,s]),i.push([o.left,o.top]),i.push([o.right,o.top]),i.push([o.right,o.bottom]),i.push([o.left,o.bottom]);break;case"bottom":i.push([l,s-5]),i.push([o.right,o.top]),i.push([o.right,o.bottom]),i.push([o.left,o.bottom]),i.push([o.left,o.top]);break;case"left":i.push([l+5,s]),i.push([o.right,o.bottom]),i.push([o.left,o.bottom]),i.push([o.left,o.top]),i.push([o.right,o.top])}return i}function ei(e){const t=Fo(),n=jt(),o=Co(),a=Oo(),d=Ko(),c=$t({placement:"horizontal"===t.orientation()?"bottom-start":"right-start"},e),[g,f]=W(c,["open","defaultOpen","onOpenChange"]);let p=0,h=null,y="right";const[v,m]=r(),[w,x]=r(),[k,$]=r(),[S,C]=r(),[E,q]=r(!0),[M,L]=r(f.placement),[F,D]=r([]),[T,A]=r([]),{DomCollectionProvider:O}=Wt({items:T,onItemsChange:A}),I=jr({open:()=>g.open,defaultOpen:()=>g.defaultOpen,onOpenChange:e=>{var t;return null==(t=g.onOpenChange)?void 0:t.call(g,e)}}),{present:P}=bn({show:()=>t.forceMount()||I.isOpen(),element:()=>S()??null}),z=function(e){const t=function(e){const t=$t({selectionMode:"none",selectionBehavior:"toggle"},e),[n,o]=r(!1),[s,a]=r(),d=l(()=>{const e=ee(t.selectedKeys);return null!=e?cn(e):e}),u=l(()=>{const e=ee(t.defaultSelectedKeys);return null!=e?cn(e):new an}),[c,g]=function(e){const[t,n]=Bt(e);return[()=>t()??new an,n]}({value:d,defaultValue:u,onChange:e=>{var n;return null==(n=t.onSelectionChange)?void 0:n.call(t,e)}}),[f,p]=r(ee(t.selectionBehavior));return i(()=>{const e=c();"replace"===ee(t.selectionBehavior)&&"toggle"===f()&&"object"==typeof e&&0===e.size&&p("replace")}),i(()=>{p(ee(t.selectionBehavior)??"toggle")}),{selectionMode:()=>ee(t.selectionMode),disallowEmptySelection:()=>ee(t.disallowEmptySelection)??!1,selectionBehavior:f,setSelectionBehavior:p,isFocused:n,setFocused:o,focusedKey:s,setFocusedKey:a,selectedKeys:c,setSelectedKeys:e=>{!ee(t.allowDuplicateSelectionEvents)&&function(e,t){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}(e,c())||g(e)}}}(e),n=Xt({dataSource:()=>ee(e.dataSource),getKey:()=>ee(e.getKey),getTextValue:()=>ee(e.getTextValue),getDisabled:()=>ee(e.getDisabled),getSectionChildren:()=>ee(e.getSectionChildren),factory:t=>e.filter?new yn(e.filter(t)):new yn(t)},[()=>e.filter]),o=new hn(n,t);return X(()=>{const e=t.focusedKey();null==e||n().getItem(e)||t.setFocusedKey(void 0)}),{collection:n,selectionManager:()=>o}}({selectionMode:"none",dataSource:T}),R=e=>{q(e),I.open()},B=(e=!1)=>{I.close(),e&&o&&o.close(!0)},H=()=>{const e=S();e&&(ut(e),z.selectionManager().setFocused(!0),z.selectionManager().setFocusedKey(void 0))},G=()=>{null!=d?setTimeout(()=>H()):H()},U=e=>{return y===(null==h?void 0:h.side)&&(t=e,!!(n=null==h?void 0:h.area)&&function(e,t){const[n,r]=e;let o=!1;for(let i=t.length,l=0,s=i-1;l<i;s=l++){const[e,a]=t[l],[d,u]=t[s],[,c]=t[0===s?i-1:s-1]||[0,0],g=(a-u)*(n-e)-(e-d)*(r-a);if(u<a){if(r>=u&&r<a){if(0===g)return!0;g>0&&(r===u?r>c&&(o=!o):o=!o)}}else if(a<u){if(r>a&&r<=u){if(0===g)return!0;g<0&&(r===u?r<c&&(o=!o):o=!o)}}else if(r==a&&(n>=d&&n<=e||n>=e&&n<=d))return!0}return o}([t.clientX,t.clientY],n));var t,n};(function(e){i(()=>{ee(e.isDisabled)||b(function(e,t=document.body){const n=new Set(e),r=new Set,o=e=>{for(const r of e.querySelectorAll(`[data-live-announcer], [${mn}]`))n.add(r);const t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&"row"!==e.parentElement.getAttribute("role"))return NodeFilter.FILTER_REJECT;for(const t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),l=t(e);if(l===NodeFilter.FILTER_ACCEPT&&i(e),l!==NodeFilter.FILTER_REJECT){let e=o.nextNode();for(;null!=e;)i(e),e=o.nextNode()}},i=e=>{const t=fo.get(e)??0;"true"===e.getAttribute("aria-hidden")&&0===t||(0===t&&e.setAttribute("aria-hidden","true"),r.add(e),fo.set(e,t+1))};po.length&&po[po.length-1].disconnect(),o(t);const l=new MutationObserver(e=>{for(const t of e)if("childList"===t.type&&0!==t.addedNodes.length&&![...n,...r].some(e=>e.contains(t.target))){for(const e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(const e of t.addedNodes)!(e instanceof HTMLElement||e instanceof SVGElement)||"true"!==e.dataset.liveAnnouncer&&"true"!==e.dataset.reactAriaTopLayer?e instanceof Element&&o(e):n.add(e)}});l.observe(t,{childList:!0,subtree:!0});const s={observe(){l.observe(t,{childList:!0,subtree:!0})},disconnect(){l.disconnect()}};return po.push(s),()=>{l.disconnect();for(const e of r){const t=fo.get(e);if(null==t)return;1===t?(e.removeAttribute("aria-hidden"),fo.delete(e)):fo.set(e,t-1)}s===po[po.length-1]?(po.pop(),po.length&&po[po.length-1].observe()):po.splice(po.indexOf(s),1)}}(ee(e.targets),ee(e.root)))})})({isDisabled:()=>!(null==o&&I.isOpen()&&t.isModal()),targets:()=>[S(),...F()].filter(Boolean)}),i(()=>{const e=S();if(!e||!o)return;const t=o.registerNestedMenu(e);b(()=>{t()})}),i(()=>{void 0===o&&(null==a||a.registerMenu(t.value(),[S(),...F()]))}),i(()=>{var e;void 0===o&&void 0!==a&&(a.value()===t.value()?(null==(e=k())||e.focus(),a.autoFocusMenu()&&R(!0)):B())}),i(()=>{void 0===o&&void 0!==a&&I.isOpen()&&a.setValue(t.value())}),b(()=>{void 0===o&&(null==a||a.unregisterMenu(t.value()))});const V={dataset:l(()=>({"data-expanded":I.isOpen()?"":void 0,"data-closed":I.isOpen()?void 0:""})),isOpen:I.isOpen,contentPresent:P,nestedMenus:F,currentPlacement:M,pointerGraceTimeoutId:()=>p,autoFocus:E,listState:()=>z,parentMenuContext:()=>o,triggerRef:k,contentRef:S,triggerId:v,contentId:w,setTriggerRef:$,setContentRef:C,open:R,close:B,toggle:e=>{q(e),I.toggle()},focusContent:G,onItemEnter:e=>{U(e)&&e.preventDefault()},onItemLeave:e=>{U(e)||G()},onTriggerLeave:e=>{U(e)&&e.preventDefault()},setPointerDir:e=>y=e,setPointerGraceTimeoutId:e=>p=e,setPointerGraceIntent:e=>h=e,registerNestedMenu:e=>{D(t=>[...t,e]);const t=null==o?void 0:o.registerNestedMenu(e);return()=>{D(t=>Xe(t,e)),null==t||t()}},registerItemToParentDomCollection:null==n?void 0:n.registerItem,registerTriggerId:Ft(m),registerContentId:Ft(x)};return s(O,{get children(){return s(So.Provider,{value:V,get children(){return s(u,{when:void 0===d,get fallback(){return f.children},get children(){return s(Br,K({anchorRef:k,contentRef:S,onCurrentPlacementChange:L},f))}})}})}})}function ti(e){const{direction:t}=ln();return s(ei,K({get placement(){return"rtl"===t()?"left-start":"right-start"},flip:!0},e))}function ni(e){const t=Eo(),n=Fo(),[r,o]=W(e,["onFocusOutside","onKeyDown"]),{direction:i}=ln();return s(Ro,K({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{var n;null==(n=r.onFocusOutside)||n.call(r,e);const o=e.target;et(t.triggerRef(),o)||t.close()},onKeyDown:e=>{st(e,r.onKeyDown);const o=et(e.currentTarget,e.target),l=(a=i(),d=n.orientation(),"ltr"===a?["horizontal"===d?"ArrowLeft":"ArrowUp"]:["horizontal"===d?"ArrowRight":"ArrowDown"]).includes(e.key),s=null!=t.parentMenuContext();var a,d;o&&l&&s&&(t.close(),ut(t.triggerRef()))}},o))}var ri=["Enter"," "];function oi(e){let t;const n=Fo(),r=Eo(),o=$t({id:n.generateId(`sub-trigger-${C()}`)},e),[l,a]=W(o,["ref","id","textValue","disabled","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]);let u=null;const c=()=>{u&&window.clearTimeout(u),u=null},{direction:g}=ln(),f=()=>l.id,p=()=>{const e=r.parentMenuContext();if(null==e)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},h=fn({key:f,selectionManager:p,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>l.disabled},()=>t),y=e=>{st(e,l.onClick),r.isOpen()||l.disabled||r.open(!0)},v=e=>{var t,o;st(e,l.onKeyDown),e.repeat||l.disabled||(t=g(),o=n.orientation(),"ltr"===t?[...ri,"horizontal"===o?"ArrowRight":"ArrowDown"]:[...ri,"horizontal"===o?"ArrowLeft":"ArrowUp"]).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),p().setFocused(!1),p().setFocusedKey(void 0),r.isOpen()||r.open("first"),r.focusContent(),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(r.listState().collection().getFirstKey()))};return i(()=>{if(null==r.registerItemToParentDomCollection)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");const e=r.registerItemToParentDomCollection({ref:()=>t,type:"item",key:f(),textValue:l.textValue??(null==t?void 0:t.textContent)??"",disabled:l.disabled??!1});b(e)}),i(x(()=>{var e;return null==(e=r.parentMenuContext())?void 0:e.pointerGraceTimeoutId()},e=>{b(()=>{var t;window.clearTimeout(e),null==(t=r.parentMenuContext())||t.setPointerGraceIntent(null)})})),i(()=>b(r.registerTriggerId(l.id))),b(()=>{c()}),s(At,K({as:"div",ref(e){const n=Ie(e=>{r.setTriggerRef(e),t=e},l.ref);"function"==typeof n&&n(e)},get id(){return l.id},role:"menuitem",get tabIndex(){return h.tabIndex()},"aria-haspopup":"true",get"aria-expanded"(){return r.isOpen()},get"aria-controls"(){return d(()=>!!r.isOpen())()?r.contentId():void 0},get"aria-disabled"(){return l.disabled},get"data-key"(){return h.dataKey()},get"data-highlighted"(){return p().focusedKey()===f()?"":void 0},get"data-disabled"(){return l.disabled?"":void 0},get onPointerDown(){return at([l.onPointerDown,h.onPointerDown])},get onPointerUp(){return at([l.onPointerUp,h.onPointerUp])},get onClick(){return at([y,h.onClick])},get onKeyDown(){return at([v,h.onKeyDown])},get onMouseDown(){return at([l.onMouseDown,h.onMouseDown])},get onFocus(){return at([l.onFocus,h.onFocus])},onPointerMove:e=>{var t;if(st(e,l.onPointerMove),"mouse"!==e.pointerType)return;const n=r.parentMenuContext();null==n||n.onItemEnter(e),e.defaultPrevented||(l.disabled?null==n||n.onItemLeave(e):(r.isOpen()||u||(null==(t=r.parentMenuContext())||t.setPointerGraceIntent(null),u=window.setTimeout(()=>{r.open(!1),c()},100)),null==n||n.onItemEnter(e),e.defaultPrevented||(r.listState().selectionManager().isFocused()&&(r.listState().selectionManager().setFocused(!1),r.listState().selectionManager().setFocusedKey(void 0)),ut(e.currentTarget),null==n||n.listState().selectionManager().setFocused(!0),null==n||n.listState().selectionManager().setFocusedKey(f()))))},onPointerLeave:e=>{if(st(e,l.onPointerLeave),"mouse"!==e.pointerType)return;c();const t=r.parentMenuContext(),n=r.contentRef();if(n){null==t||t.setPointerGraceIntent({area:Jo(r.currentPlacement(),e,n),side:r.currentPlacement().split("-")[0]}),window.clearTimeout(null==t?void 0:t.pointerGraceTimeoutId());const o=window.setTimeout(()=>{null==t||t.setPointerGraceIntent(null)},300);null==t||t.setPointerGraceTimeoutId(o)}else{if(null==t||t.onTriggerLeave(e),e.defaultPrevented)return;null==t||t.setPointerGraceIntent(null)}null==t||t.onItemLeave(e)}},()=>r.dataset(),a))}function ii(e){const t=Oo(),n=$t({id:`menu-${C()}`,modal:!0},e),[r,o]=W(n,["id","modal","preventScroll","forceMount","open","defaultOpen","onOpenChange","value","orientation"]),i=jr({open:()=>r.open,defaultOpen:()=>r.defaultOpen,onOpenChange:e=>{var t;return null==(t=r.onOpenChange)?void 0:t.call(r,e)}}),l={isModal:()=>r.modal??!0,preventScroll:()=>r.preventScroll??l.isModal(),forceMount:()=>r.forceMount??!1,generateId:Je(()=>r.id),value:()=>r.value,orientation:()=>r.orientation??(null==t?void 0:t.orientation())??"horizontal"};return s(Lo.Provider,{value:l,get children(){return s(ei,K({get open(){return i.isOpen()},get onOpenChange(){return i.setIsOpen}},o))}})}function li(e){let t;const n=$t({orientation:"horizontal"},e),[r,o]=W(n,["ref","orientation"]),i=Dt(()=>t,()=>"hr");return s(At,K({as:"hr",ref(e){const n=Ie(e=>t=e,r.ref);"function"==typeof n&&n(e)},get role(){return"hr"!==i()?"separator":void 0},get"aria-orientation"(){return"vertical"===r.orientation?"vertical":void 0},get"data-orientation"(){return r.orientation}},o))}Ut({},{Root:()=>li,Separator:()=>si});var si=li,ai={};function di(e){const t=Fo(),n=Eo(),[r,o]=W(e,["onCloseAutoFocus","onInteractOutside"]);let i=!1;return s(Bo,K({onCloseAutoFocus:e=>{var t;null==(t=r.onCloseAutoFocus)||t.call(r,e),i||ut(n.triggerRef()),i=!1,e.preventDefault()},onInteractOutside:e=>{var n;null==(n=r.onInteractOutside)||n.call(r,e),t.isModal()&&!e.detail.isContextMenu||(i=!0)}},o))}function ui(e){const t=$t({id:`dropdownmenu-${C()}`},e);return s(ii,t)}Ut(ai,{Arrow:()=>Pr,CheckboxItem:()=>To,Content:()=>di,DropdownMenu:()=>ci,Group:()=>Go,GroupLabel:()=>Uo,Icon:()=>Vo,Item:()=>jo,ItemDescription:()=>No,ItemIndicator:()=>Qo,ItemLabel:()=>Wo,Portal:()=>_o,RadioGroup:()=>Zo,RadioItem:()=>Yo,Root:()=>ui,Separator:()=>li,Sub:()=>ti,SubContent:()=>ni,SubTrigger:()=>oi,Trigger:()=>Po});var ci=Object.assign(ui,{Arrow:Pr,CheckboxItem:To,Content:di,Group:Go,GroupLabel:Uo,Icon:Vo,Item:jo,ItemDescription:No,ItemIndicator:Qo,ItemLabel:Wo,Portal:_o,RadioGroup:Zo,RadioItem:Yo,Separator:li,Sub:ti,SubContent:ni,SubTrigger:oi,Trigger:Po}),gi={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{90:"e5",80:"cc"},font:{size:{xs:"calc(var(--tsqd-font-size) * 0.75)",sm:"calc(var(--tsqd-font-size) * 0.875)",md:"var(--tsqd-font-size)"},lineHeight:{xs:"calc(var(--tsqd-font-size) * 1)",sm:"calc(var(--tsqd-font-size) * 1.25)",md:"calc(var(--tsqd-font-size) * 1.5)"},weight:{medium:"500",semibold:"600",bold:"700"}},border:{radius:{xs:"calc(var(--tsqd-font-size) * 0.125)",sm:"calc(var(--tsqd-font-size) * 0.25)",full:"9999px"}},size:{.25:"calc(var(--tsqd-font-size) * 0.0625)",.5:"calc(var(--tsqd-font-size) * 0.125)",1:"calc(var(--tsqd-font-size) * 0.25)",1.5:"calc(var(--tsqd-font-size) * 0.375)",2:"calc(var(--tsqd-font-size) * 0.5)",2.5:"calc(var(--tsqd-font-size) * 0.625)",3:"calc(var(--tsqd-font-size) * 0.75)",3.5:"calc(var(--tsqd-font-size) * 0.875)",4:"calc(var(--tsqd-font-size) * 1)",4.5:"calc(var(--tsqd-font-size) * 1.125)",5:"calc(var(--tsqd-font-size) * 1.25)",6:"calc(var(--tsqd-font-size) * 1.5)",6.5:"calc(var(--tsqd-font-size) * 1.625)",14:"calc(var(--tsqd-font-size) * 3.5)"},shadow:{xs:(e="rgb(0 0 0 / 0.1)")=>"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:(e="rgb(0 0 0 / 0.1)")=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e="rgb(0 0 0 / 0.1)")=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e="rgb(0 0 0 / 0.1)")=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e="rgb(0 0 0 / 0.1)")=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e="rgb(0 0 0 / 0.25)")=>`0 25px 50px -12px ${e}`,inner:(e="rgb(0 0 0 / 0.05)")=>`inset 0 2px 4px 0 ${e}`,none:()=>"none"}},fi=c('<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),pi=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),hi=c('<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),yi=c('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),vi=c('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),bi=c('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),mi=c('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),wi=c('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),xi=c('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">'),ki=c('<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">'),$i=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Si=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Ci=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>'),Ei=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),qi=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Mi=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Li=c('<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>'),Fi=c('<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Di=c('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Ti=c('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>'),Ai=c('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Oi=c('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Ii=c('<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>');function Pi(){return fi()}function zi(){return pi()}function Ki(){return hi()}function Ri(){return yi()}function Bi(){return vi()}function Hi(){return(e=vi()).style.setProperty("transform","rotate(90deg)"),e;var e}function Gi(){return(e=vi()).style.setProperty("transform","rotate(-90deg)"),e;var e}function Ui(){return bi()}function Vi(){return mi()}function ji(){return wi()}function Ni(){return xi()}function Qi(){return ki()}function Wi(){return $i()}function _i(){return Si()}function Xi(){return Ci()}function Zi(){return Ei()}function Yi(e){return t=qi(),n=t.firstChild,f(()=>k(n,"stroke","dark"===e.theme?"#12B76A":"#027A48")),t;var t,n}function Ji(){return Mi()}function el(){return Li()}function tl(e){return[s(u,{get when(){return e.checked},get children(){var t=qi(),n=t.firstChild;return f(()=>k(n,"stroke","dark"===e.theme?"#9B8AFB":"#6938EF")),t}}),s(u,{get when(){return!e.checked},get children(){var t=Fi(),n=t.firstChild;return f(()=>k(n,"stroke","dark"===e.theme?"#9B8AFB":"#6938EF")),t}})]}function nl(){return Di()}function rl(){return Ti()}function ol(){return Ai()}function il(){return Oi()}function ll(){const e=C();return i=(o=(r=(n=(t=Ii()).firstChild).nextSibling).nextSibling).firstChild,s=(l=o.nextSibling).firstChild,u=(d=(a=l.nextSibling).nextSibling).firstChild,g=(c=d.nextSibling).firstChild,h=(p=(f=c.nextSibling).nextSibling).firstChild,v=(y=p.nextSibling).firstChild,w=(m=(b=y.nextSibling).nextSibling).firstChild,$=(x=m.nextSibling).firstChild,q=(E=(S=x.nextSibling).nextSibling).firstChild,L=(M=E.nextSibling).firstChild,T=(D=(F=M.nextSibling).nextSibling).firstChild,O=(A=D.nextSibling).firstChild,z=(P=(I=A.nextSibling).nextSibling).firstChild,R=(K=P.nextSibling).firstChild,G=(H=(B=K.nextSibling).firstChild.nextSibling.nextSibling.nextSibling).nextSibling,V=(U=B.nextSibling).firstChild,N=(j=U.nextSibling).firstChild,se=(le=(ie=(oe=(re=(ne=(te=(ee=(J=(Y=(Z=(X=(_=(W=(Q=j.nextSibling).firstChild).nextSibling).nextSibling.firstChild).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling,de=(ae=Q.nextSibling).firstChild,ce=(ue=ae.nextSibling).firstChild,pe=(fe=(ge=ue.nextSibling).firstChild).nextSibling,ye=(he=ge.nextSibling).firstChild,be=(ve=he.nextSibling).firstChild,ze=(Pe=(Ie=(Oe=(Ae=(Te=(De=(Fe=(Le=(Me=(qe=(Ee=(Ce=(Se=($e=(ke=(xe=(we=(me=ve.nextSibling).firstChild).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling).nextSibling,k(n,"id",`a-${e}`),k(r,"fill",`url(#a-${e})`),k(i,"id",`am-${e}`),k(l,"id",`b-${e}`),k(s,"filter",`url(#am-${e})`),k(a,"mask",`url(#b-${e})`),k(u,"id",`ah-${e}`),k(c,"id",`k-${e}`),k(g,"filter",`url(#ah-${e})`),k(f,"mask",`url(#k-${e})`),k(h,"id",`ae-${e}`),k(y,"id",`j-${e}`),k(v,"filter",`url(#ae-${e})`),k(b,"mask",`url(#j-${e})`),k(w,"id",`ai-${e}`),k(x,"id",`i-${e}`),k($,"filter",`url(#ai-${e})`),k(S,"mask",`url(#i-${e})`),k(q,"id",`aj-${e}`),k(M,"id",`h-${e}`),k(L,"filter",`url(#aj-${e})`),k(F,"mask",`url(#h-${e})`),k(T,"id",`ag-${e}`),k(A,"id",`g-${e}`),k(O,"filter",`url(#ag-${e})`),k(I,"mask",`url(#g-${e})`),k(z,"id",`af-${e}`),k(K,"id",`f-${e}`),k(R,"filter",`url(#af-${e})`),k(B,"mask",`url(#f-${e})`),k(H,"id",`m-${e}`),k(G,"fill",`url(#m-${e})`),k(V,"id",`ak-${e}`),k(j,"id",`e-${e}`),k(N,"filter",`url(#ak-${e})`),k(Q,"mask",`url(#e-${e})`),k(W,"id",`n-${e}`),k(_,"fill",`url(#n-${e})`),k(X,"id",`r-${e}`),k(Z,"fill",`url(#r-${e})`),k(Y,"id",`s-${e}`),k(J,"fill",`url(#s-${e})`),k(ee,"id",`q-${e}`),k(te,"fill",`url(#q-${e})`),k(ne,"id",`p-${e}`),k(re,"fill",`url(#p-${e})`),k(oe,"id",`o-${e}`),k(ie,"fill",`url(#o-${e})`),k(le,"id",`l-${e}`),k(se,"fill",`url(#l-${e})`),k(de,"id",`al-${e}`),k(ue,"id",`d-${e}`),k(ce,"filter",`url(#al-${e})`),k(ge,"mask",`url(#d-${e})`),k(fe,"id",`u-${e}`),k(pe,"fill",`url(#u-${e})`),k(ye,"id",`ad-${e}`),k(ve,"id",`c-${e}`),k(be,"filter",`url(#ad-${e})`),k(me,"mask",`url(#c-${e})`),k(we,"id",`t-${e}`),k(xe,"fill",`url(#t-${e})`),k(ke,"id",`v-${e}`),k($e,"stroke",`url(#v-${e})`),k(Se,"id",`aa-${e}`),k(Ce,"stroke",`url(#aa-${e})`),k(Ee,"id",`w-${e}`),k(qe,"stroke",`url(#w-${e})`),k(Me,"id",`ac-${e}`),k(Le,"stroke",`url(#ac-${e})`),k(Fe,"id",`ab-${e}`),k(De,"stroke",`url(#ab-${e})`),k(Te,"id",`y-${e}`),k(Ae,"stroke",`url(#y-${e})`),k(Oe,"id",`x-${e}`),k(Ie,"stroke",`url(#x-${e})`),k(Pe,"id",`z-${e}`),k(ze,"stroke",`url(#z-${e})`),t;var t,n,r,o,i,l,s,a,d,u,c,g,f,p,h,y,v,b,m,w,x,$,S,E,q,M,L,F,D,T,A,O,I,P,z,K,R,B,H,G,U,V,j,N,Q,W,_,X,Z,Y,J,ee,te,ne,re,oe,ie,le,se,ae,de,ue,ce,ge,fe,pe,he,ye,ve,be,me,we,xe,ke,$e,Se,Ce,Ee,qe,Me,Le,Fe,De,Te,Ae,Oe,Ie,Pe,ze}var sl=c('<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),al=c('<button title="Copy object to clipboard">'),dl=c('<button title="Remove all items"aria-label="Remove all items">'),ul=c('<button title="Delete item"aria-label="Delete item">'),cl=c('<button title="Toggle value"aria-label="Toggle value">'),gl=c('<button title="Bulk Edit Data"aria-label="Bulk Edit Data">'),fl=c("<div>"),pl=c("<div><button> <span></span> <span> "),hl=c("<input>"),yl=c("<span>"),vl=c("<div><span>:"),bl=c("<div><div><button> [<!>...<!>]"),ml=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,r=l(()=>"dark"===t()?Ml(n):ql(n));return o=sl(),f(()=>p(o,Oe(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),o;var o},wl=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,o=l(()=>"dark"===t()?Ml(n):ql(n)),[i,a]=r("NoCopy");return d=al(),U(d,"click","NoCopy"===i()?()=>{navigator.clipboard.writeText(V(e.value)).then(()=>{a("SuccessCopy"),setTimeout(()=>{a("NoCopy")},1500)},e=>{a("ErrorCopy"),setTimeout(()=>{a("NoCopy")},1500)})}:void 0,!0),g(d,s(N,{get children(){return[s(j,{get when(){return"NoCopy"===i()},get children(){return s(Xi,{})}}),s(j,{get when(){return"SuccessCopy"===i()},get children(){return s(Yi,{get theme(){return t()}})}}),s(j,{get when(){return"ErrorCopy"===i()},get children(){return s(Ji,{})}})]}})),f(e=>{var t=o().actionButton,n="NoCopy"===i()?"Copy object to clipboard":"SuccessCopy"===i()?"Object copied to clipboard":"Error copying object to clipboard";return t!==e.e&&p(d,e.e=t),n!==e.t&&k(d,"aria-label",e.t=n),e},{e:void 0,t:void 0}),d;var d},xl=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,r=l(()=>"dark"===t()?Ml(n):ql(n)),o=ue().client;return(i=dl()).$$click=()=>{const t=e.activeQuery.state.data,n=G(t,e.dataPath,[]);o.setQueryData(e.activeQuery.queryKey,n)},g(i,s(el,{})),f(()=>p(i,r().actionButton)),i;var i},kl=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,r=l(()=>"dark"===t()?Ml(n):ql(n)),o=ue().client;return(i=ul()).$$click=()=>{const t=e.activeQuery.state.data,n=Q(t,e.dataPath);o.setQueryData(e.activeQuery.queryKey,n)},g(i,s(zi,{})),f(()=>p(i,Oe(r().actionButton))),i;var i},$l=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,r=l(()=>"dark"===t()?Ml(n):ql(n)),o=ue().client;return(i=cl()).$$click=()=>{const t=e.activeQuery.state.data,n=G(t,e.dataPath,!e.value);o.setQueryData(e.activeQuery.queryKey,n)},g(i,s(tl,{get theme(){return t()},get checked(){return e.value}})),f(()=>p(i,Oe(r().actionButton,n`
          width: ${gi.size[3.5]};
          height: ${gi.size[3.5]};
        `))),i;var i};function Sl(e){return Symbol.iterator in e}function Cl(e){const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,o=l(()=>"dark"===t()?Ml(n):ql(n)),i=ue().client,[a,c]=r((e.defaultExpanded||[]).includes(e.label)),[h,y]=r([]),v=l(()=>Array.isArray(e.value)?e.value.map((e,t)=>({label:t.toString(),value:e})):null!==e.value&&"object"==typeof e.value&&Sl(e.value)&&"function"==typeof e.value[Symbol.iterator]?e.value instanceof Map?Array.from(e.value,([e,t])=>({label:e,value:t})):Array.from(e.value,(e,t)=>({label:t.toString(),value:e})):"object"==typeof e.value&&null!==e.value?Object.entries(e.value).map(([e,t])=>({label:e,value:t})):[]),b=l(()=>Array.isArray(e.value)?"array":null!==e.value&&"object"==typeof e.value&&Sl(e.value)&&"function"==typeof e.value[Symbol.iterator]?"Iterable":"object"==typeof e.value&&null!==e.value?"object":typeof e.value),m=l(()=>function(e){let t=0;const n=[];for(;t<e.length;)n.push(e.slice(t,t+100)),t+=100;return n}(v())),w=e.dataPath??[];return x=fl(),g(x,s(u,{get when(){return m().length},get children(){return[(t=pl(),n=t.firstChild,r=n.firstChild,i=r.nextSibling,l=i.nextSibling.nextSibling,x=l.firstChild,n.$$click=()=>c(e=>!e),g(n,s(ml,{get expanded(){return a()}}),r),g(i,()=>e.label),g(l,()=>"iterable"===String(b()).toLowerCase()?"(Iterable) ":"",x),g(l,()=>v().length,x),g(l,()=>v().length>1?"items":"item",null),g(t,s(u,{get when(){return e.editable},get children(){var t=fl();return g(t,s(wl,{get value(){return e.value}}),null),g(t,s(u,{get when(){return e.itemsDeletable&&void 0!==e.activeQuery},get children(){return s(kl,{get activeQuery(){return e.activeQuery},dataPath:w})}}),null),g(t,s(u,{get when(){return"array"===b()&&void 0!==e.activeQuery},get children(){return s(xl,{get activeQuery(){return e.activeQuery},dataPath:w})}}),null),g(t,s(u,{get when(){return d(()=>!!e.onEdit)()&&!B(e.value).meta},get children(){var t=gl();return t.$$click=()=>{var t;null==(t=e.onEdit)||t.call(e)},g(t,s(Zi,{})),f(()=>p(t,o().actionButton)),t}}),null),f(()=>p(t,o().actions)),t}}),null),f(e=>{var r=o().expanderButtonContainer,i=o().expanderButton,s=o().info;return r!==e.e&&p(t,e.e=r),i!==e.t&&p(n,e.t=i),s!==e.a&&p(l,e.a=s),e},{e:void 0,t:void 0,a:void 0}),t),s(u,{get when(){return a()},get children(){return[s(u,{get when(){return 1===m().length},get children(){var t=fl();return g(t,s(je,{get each(){return v()},by:e=>e.label,children:t=>s(Cl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...w,t().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return"array"===b()||"Iterable"===b()||"object"===b()}})})),f(()=>p(t,o().subEntry)),t}}),s(u,{get when(){return m().length>1},get children(){var t=fl();return g(t,s(H,{get each(){return m()},children:(t,n)=>{return r=bl(),i=r.firstChild,(c=(d=(a=(l=i.firstChild).firstChild).nextSibling).nextSibling.nextSibling).nextSibling,l.$$click=()=>y(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n]),g(l,s(ml,{get expanded(){return h().includes(n)}}),a),g(l,100*n,d),g(l,100*n+100-1,c),g(i,s(u,{get when(){return h().includes(n)},get children(){var n=fl();return g(n,s(je,{get each(){return t()},by:e=>e.label,children:t=>s(Cl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...w,t().label]},get activeQuery(){return e.activeQuery}})})),f(()=>p(n,o().subEntry)),n}}),null),f(e=>{var t=o().entry,n=o().expanderButton;return t!==e.e&&p(i,e.e=t),n!==e.t&&p(l,e.t=n),e},{e:void 0,t:void 0}),r;var r,i,l,a,d,c}})),f(()=>p(t,o().subEntry)),t}})]}})];var t,n,r,i,l,x}}),null),g(x,s(u,{get when(){return 0===m().length},get children(){var t=vl(),n=t.firstChild,r=n.firstChild;return g(n,()=>e.label,r),g(t,s(u,{get when(){return d(()=>!(!e.editable||void 0===e.activeQuery))()&&("string"===b()||"number"===b()||"boolean"===b())},get fallback(){return t=yl(),g(t,()=>D(e.value)),f(()=>p(t,o().value)),t;var t},get children(){return[s(u,{get when(){return d(()=>!(!e.editable||void 0===e.activeQuery))()&&("string"===b()||"number"===b())},get children(){var t=hl();return t.addEventListener("change",t=>{const n=e.activeQuery.state.data,r=G(n,w,"number"===b()?t.target.valueAsNumber:t.target.value);i.setQueryData(e.activeQuery.queryKey,r)}),f(e=>{var n="number"===b()?"number":"text",r=Oe(o().value,o().editableInput);return n!==e.e&&k(t,"type",e.e=n),r!==e.t&&p(t,e.t=r),e},{e:void 0,t:void 0}),f(()=>t.value=e.value),t}}),s(u,{get when(){return"boolean"===b()},get children(){var t=yl();return g(t,s($l,{get activeQuery(){return e.activeQuery},dataPath:w,get value(){return e.value}}),null),g(t,()=>D(e.value),null),f(()=>p(t,Oe(o().value,o().actions,o().editableInput))),t}})]}}),null),g(t,s(u,{get when(){return e.editable&&e.itemsDeletable&&void 0!==e.activeQuery},get children(){return s(kl,{get activeQuery(){return e.activeQuery},dataPath:w})}}),null),f(e=>{var r=o().row,i=o().label;return r!==e.e&&p(t,e.e=r),i!==e.t&&p(n,e.t=i),e},{e:void 0,t:void 0}),t}}),null),f(()=>p(x,o().entry)),x;var x}var El=(e,t)=>{const{colors:n,font:r,size:o,border:i}=gi,l=(t,n)=>"light"===e?t:n;return{entry:t`
      & * {
        font-size: ${r.size.xs};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,subEntry:t`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${l(n.gray[300],n.darkGray[400])};
      /* outline: 1px solid ${n.teal[400]}; */
    `,expander:t`
      & path {
        stroke: ${n.gray[400]};
      }
      & svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${n.blue[400]}; */
    `,expanderButtonContainer:t`
      display: flex;
      align-items: center;
      line-height: ${o[4]};
      min-height: ${o[4]};
      gap: ${o[2]};
    `,expanderButton:t`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${o[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${o[1]};
      position: relative;
      /* outline: 1px solid ${n.green[400]}; */

      &:focus-visible {
        border-radius: ${i.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,info:t`
      color: ${l(n.gray[500],n.gray[500])};
      font-size: ${r.size.xs};
      margin-left: ${o[1]};
      /* outline: 1px solid ${n.yellow[400]}; */
    `,label:t`
      color: ${l(n.gray[700],n.gray[300])};
      white-space: nowrap;
    `,value:t`
      color: ${l(n.purple[600],n.purple[400])};
      flex-grow: 1;
    `,actions:t`
      display: inline-flex;
      gap: ${o[2]};
      align-items: center;
    `,row:t`
      display: inline-flex;
      gap: ${o[2]};
      width: 100%;
      margin: ${o[.25]} 0px;
      line-height: ${o[4.5]};
      align-items: center;
    `,editableInput:t`
      border: none;
      padding: ${o[.5]} ${o[1]} ${o[.5]} ${o[1.5]};
      flex-grow: 1;
      border-radius: ${i.radius.xs};
      background-color: ${l(n.gray[200],n.darkGray[500])};

      &:hover {
        background-color: ${l(n.gray[300],n.darkGray[600])};
      }
    `,actionButton:t`
      background-color: transparent;
      color: ${l(n.gray[500],n.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${o[3]};
      height: ${o[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${l(n.gray[600],n.gray[400])};
      }

      &:focus-visible {
        border-radius: ${i.radius.xs};
        outline: 2px solid ${n.blue[800]};
        outline-offset: 2px;
      }
    `}},ql=e=>El("light",e),Ml=e=>El("dark",e);y(["click"]);var Ll=c('<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>'),Fl=c("<div>"),Dl=c('<aside aria-label="Tanstack query devtools"><div></div><button aria-label="Close tanstack query devtools">'),Tl=c("<select name=tsqd-queries-filter-sort>"),Al=c("<select name=tsqd-mutations-filter-sort>"),Ol=c("<span>Asc"),Il=c("<span>Desc"),Pl=c('<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">'),zl=c("<div>Settings"),Kl=c("<span>Position"),Rl=c("<span>Top"),Bl=c("<span>Bottom"),Hl=c("<span>Left"),Gl=c("<span>Right"),Ul=c("<span>Theme"),Vl=c("<span>Light"),jl=c("<span>Dark"),Nl=c("<span>System"),Ql=c("<span>Disabled Queries"),Wl=c("<span>Show"),_l=c("<span>Hide"),Xl=c("<div><div class=tsqd-queries-container>"),Zl=c("<div><div class=tsqd-mutations-container>"),Yl=c('<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>'),Jl=c("<option>Sort by "),es=c("<div class=tsqd-query-disabled-indicator>disabled"),ts=c("<div class=tsqd-query-static-indicator>static"),ns=c("<button><div></div><code class=tsqd-query-hash>"),rs=c("<div role=tooltip id=tsqd-status-tooltip>"),os=c("<span>"),is=c("<button><span></span><span>"),ls=c("<button><span></span> Error"),ss=c('<div><span></span>Trigger Error<select><option value=""disabled selected>'),as=c('<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">'),ds=c("<form><textarea name=data></textarea><div><span></span><div><button type=button>Cancel</button><button>Save"),us=c('<div><div>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div>Actions</div><div><button><span></span>Refetch</button><button><span></span>Invalidate</button><button><span></span>Reset</button><button><span></span>Remove</button><button><span></span> Loading</button></div><div>Data </div><div>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),cs=c("<option>"),gs=c('<div><div>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),[fs,ps]=r(null),[hs,ys]=r(null),[vs,bs]=r(0),[ms,ws]=r(!1),xs=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,r=l(()=>"dark"===t()?Hs(n):Bs(n)),c=l(()=>ue().onlineManager);o(()=>{const e=c().subscribe(e=>{ws(!e)});b(()=>{e()})});const h=fe(),y=l(()=>ue().buttonPosition||"bottom-right"),v=l(()=>"true"===e.localStore.open||"false"!==e.localStore.open&&(ue().initialIsOpen||!1)),m=l(()=>e.localStore.position||ue().position||le);let w;i(()=>{const t=w.parentElement,n=e.localStore.height||500,r=e.localStore.width||500,o=m();t.style.setProperty("--tsqd-panel-height",`${"top"===o?"-":""}${n}px`),t.style.setProperty("--tsqd-panel-width",`${"left"===o?"-":""}${r}px`)}),o(()=>{const e=()=>{const e=w.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty("--tsqd-font-size",t)};e(),window.addEventListener("focus",e),b(()=>{window.removeEventListener("focus",e)})});const x=l(()=>e.localStore.pip_open??"false");return[s(u,{get when(){return d(()=>!!h().pipWindow)()&&"true"==x()},get children(){return s(a,{get mount(){var e;return null==(e=h().pipWindow)?void 0:e.document.body},get children(){return s(ks,{get children(){return s(Ss,e)}})}})}}),(k=Fl(),"function"==typeof w?S(w,k):w=k,g(k,s(Ge,{name:"tsqd-panel-transition",get children(){return s(u,{get when(){return d(()=>!(!v()||h().pipWindow))()&&"false"==x()},get children(){return s($s,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),g(k,s(Ge,{name:"tsqd-button-transition",get children(){return s(u,{get when(){return!v()},get children(){var t=Ll(),n=t.firstChild,o=n.nextSibling;return g(n,s(ll,{})),o.$$click=()=>e.setLocalStore("open","true"),g(o,s(ll,{})),f(()=>p(t,Oe(r().devtoolsBtn,r()[`devtoolsBtn-position-${y()}`],"tsqd-open-btn-container"))),t}})}}),null),f(()=>p(k,Oe(n`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${"top"===m()||"bottom"===m()?"transform: translateY(var(--tsqd-panel-height));":"transform: translateX(var(--tsqd-panel-width));"}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${"relative"===y()?"none;":"top-left"===y()?"translateX(-72px);":"top-right"===y()?"translateX(72px);":"translateY(72px);"};
              opacity: 0;
            }
          `,"tsqd-transitions-container"))),k)];var k},ks=e=>{const t=fe(),n=he(),r=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,o=l(()=>"dark"===n()?Hs(r):Bs(r));return i(()=>{const e=t().pipWindow,n=()=>{e&&bs(e.innerWidth)};e&&(e.addEventListener("resize",n),n()),b(()=>{e&&e.removeEventListener("resize",n)})}),(s=Fl()).style.setProperty("--tsqd-font-size","16px"),s.style.setProperty("max-height","100vh"),s.style.setProperty("height","100vh"),s.style.setProperty("width","100vw"),g(s,()=>e.children),f(()=>p(s,Oe(o().panel,(()=>{const{colors:e}=gi,t=(e,t)=>"dark"===n()?t:e;return vs()<ie?r`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `})(),{[r`
            min-width: min-content;
          `]:vs()<700},"tsqd-main-panel"))),s;var s},$s=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,a=l(()=>"dark"===t()?Hs(n):Bs(n)),[d,u]=r(!1),c=l(()=>e.localStore.position||ue().position||le);let h;return o(()=>{Ne(h,({width:e},t)=>{t===h&&bs(e)})}),i(()=>{var t,n;const r=null==(n=null==(t=h.parentElement)?void 0:t.parentElement)?void 0:n.parentElement;if(!r)return;const o=e.localStore.position||le,i=$("padding",o),l="left"===e.localStore.position||"right"===e.localStore.position,s=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:o})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:o}))(r.style);r.style[i]=`${l?e.localStore.width:e.localStore.height}px`,b(()=>{Object.entries(s).forEach(([e,t])=>{r.style[e]=t})})}),y=Dl(),v=y.firstChild,m=v.nextSibling,"function"==typeof h?S(h,y):h=y,v.$$mousedown=t=>{const n=t.currentTarget.parentElement;if(!n)return;u(!0);const{height:r,width:o}=n.getBoundingClientRect(),i=t.clientX,l=t.clientY;let s=0;const a=A(3.5),g=A(12),f=t=>{if(t.preventDefault(),"left"===c()||"right"===c()){const r="right"===c()?i-t.clientX:t.clientX-i;s=Math.round(o+r),s<g&&(s=g),e.setLocalStore("width",String(Math.round(s)));const l=n.getBoundingClientRect().width;Number(e.localStore.width)<l&&e.setLocalStore("width",String(l))}else{const n="bottom"===c()?l-t.clientY:t.clientY-l;s=Math.round(r+n),s<a&&(s=a,ps(null)),e.setLocalStore("height",String(Math.round(s)))}},p=()=>{d()&&u(!1),document.removeEventListener("mousemove",f,!1),document.removeEventListener("mouseUp",p,!1)};document.addEventListener("mousemove",f,!1),document.addEventListener("mouseup",p,!1)},m.$$click=()=>e.setLocalStore("open","false"),g(m,s(Ki,{})),g(y,s(Ss,e),null),f(r=>{var o=Oe(a().panel,a()[`panel-position-${c()}`],(()=>{const{colors:e}=gi,r=(e,n)=>"dark"===t()?n:e;return vs()<ie?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `})(),{[n`
            min-width: min-content;
          `]:vs()<700&&("right"===c()||"left"===c())},"tsqd-main-panel"),i="bottom"===c()||"top"===c()?`${e.localStore.height||500}px`:"auto",l="right"===c()||"left"===c()?`${e.localStore.width||500}px`:"auto",s=Oe(a().dragHandle,a()[`dragHandle-position-${c()}`],"tsqd-drag-handle"),d=Oe(a().closeBtn,a()[`closeBtn-position-${c()}`],"tsqd-minimize-btn");return o!==r.e&&p(y,r.e=o),i!==r.t&&(null!=(r.t=i)?y.style.setProperty("height",i):y.style.removeProperty("height")),l!==r.a&&(null!=(r.a=l)?y.style.setProperty("width",l):y.style.removeProperty("width")),s!==r.o&&p(v,r.o=s),d!==r.i&&p(m,r.i=d),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),y;var y,v,m},Ss=e=>{let t;As(),Ps();const n=he(),o=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,i=l(()=>"dark"===n()?Hs(o):Bs(o)),a=fe(),[c,h]=r("queries"),y=l(()=>e.localStore.sort||se),v=l(()=>Number(e.localStore.sortOrder)||1),b=l(()=>e.localStore.mutationSort||ae),$=l(()=>Number(e.localStore.mutationSortOrder)||1),C=l(()=>m[y()]),E=l(()=>w[b()]),q=l(()=>ue().onlineManager),M=l(()=>ue().client.getQueryCache()),L=l(()=>ue().client.getMutationCache()),F=Os(e=>e().getAll().length,!1),D=l(x(()=>[F(),e.localStore.filter,y(),v(),e.localStore.hideDisabledQueries],()=>{const t=M().getAll();let n=e.localStore.filter?t.filter(t=>me(t.queryHash,e.localStore.filter||"").passed):[...t];return"true"===e.localStore.hideDisabledQueries&&(n=n.filter(e=>!e.isDisabled())),C()?n.sort((e,t)=>C()(e,t)*v()):n})),T=zs(e=>e().getAll().length,!1),A=l(x(()=>[T(),e.localStore.mutationFilter,b(),$()],()=>{const t=L().getAll(),n=e.localStore.mutationFilter?t.filter(t=>me(`${t.options.mutationKey?JSON.stringify(t.options.mutationKey)+" - ":""}${new Date(t.state.submittedAt).toLocaleString()}`,e.localStore.mutationFilter||"").passed):[...t];return E()?n.sort((e,t)=>E()(e,t)*$()):n})),O=t=>{e.setLocalStore("position",t)},I=e=>{const n=getComputedStyle(t).getPropertyValue("--tsqd-font-size");e.style.setProperty("--tsqd-font-size",n)};return[(z=Yl(),K=z.firstChild,R=K.firstChild,B=R.firstChild,H=B.firstChild,G=H.nextSibling,U=G.firstChild,V=K.nextSibling,j=V.firstChild,N=j.firstChild,Q=N.firstChild,W=N.nextSibling,_=W.nextSibling,X=j.nextSibling,Z=X.firstChild,Y=Z.nextSibling,"function"==typeof t?S(t,z):t=z,B.$$click=()=>{a().pipWindow||e.showPanelViewOnly?e.onClose&&e.onClose():e.setLocalStore("open","false")},g(G,()=>ue().queryFlavor,U),g(G,()=>ue().version,null),g(R,s(Nr.Root,{get class(){return Oe(i().viewToggle)},get value(){return c()},onChange:e=>{h(e),ps(null),ys(null)},get children(){return[s(Nr.Item,{value:"queries",class:"tsqd-radio-toggle",get children(){return[s(Nr.ItemInput,{}),s(Nr.ItemControl,{get children(){return s(Nr.ItemIndicator,{})}}),s(Nr.ItemLabel,{title:"Toggle Queries View",children:"Queries"})]}}),s(Nr.Item,{value:"mutations",class:"tsqd-radio-toggle",get children(){return[s(Nr.ItemInput,{}),s(Nr.ItemControl,{get children(){return s(Nr.ItemIndicator,{})}}),s(Nr.ItemLabel,{title:"Toggle Mutations View",children:"Mutations"})]}})]}}),null),g(K,s(u,{get when(){return"queries"===c()},get children(){return s(qs,{})}}),null),g(K,s(u,{get when(){return"mutations"===c()},get children(){return s(Ms,{})}}),null),g(N,s(Pi,{}),Q),Q.$$input=t=>{"queries"===c()?e.setLocalStore("filter",t.currentTarget.value):e.setLocalStore("mutationFilter",t.currentTarget.value)},g(W,s(u,{get when(){return"queries"===c()},get children(){var t=Tl();return t.addEventListener("change",t=>{e.setLocalStore("sort",t.currentTarget.value)}),g(t,()=>Object.keys(m).map(e=>{return(t=Jl()).firstChild,t.value=e,g(t,e,null),t;var t})),f(()=>t.value=y()),t}}),null),g(W,s(u,{get when(){return"mutations"===c()},get children(){var t=Al();return t.addEventListener("change",t=>{e.setLocalStore("mutationSort",t.currentTarget.value)}),g(t,()=>Object.keys(w).map(e=>{return(t=Jl()).firstChild,t.value=e,g(t,e,null),t;var t})),f(()=>t.value=b()),t}}),null),g(W,s(Ki,{}),null),_.$$click=()=>{"queries"===c()?e.setLocalStore("sortOrder",String(-1*v())):e.setLocalStore("mutationSortOrder",String(-1*$()))},g(_,s(u,{get when(){return 1===("queries"===c()?v():$())},get children(){return[Ol(),s(Ri,{})]}}),null),g(_,s(u,{get when(){return-1===("queries"===c()?v():$())},get children(){return[Il(),s(Bi,{})]}}),null),Z.$$click=()=>{"queries"===c()?(Ks({type:"CLEAR_QUERY_CACHE"}),M().clear()):(Ks({type:"CLEAR_MUTATION_CACHE"}),L().clear())},g(Z,s(zi,{})),Y.$$click=()=>{q().setOnline(!q().isOnline())},g(Y,(P=d(()=>!!ms()),()=>P()?s(Qi,{}):s(Ni,{}))),g(X,s(u,{get when(){return d(()=>!a().pipWindow)()&&!a().disabled},get children(){var t=Pl();return t.$$click=()=>{a().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},g(t,s(_i,{})),f(()=>p(t,Oe(i().actionsBtn,"tsqd-actions-btn","tsqd-action-open-pip"))),t}}),null),g(X,s(ai.Root,{gutter:4,get children(){return[s(ai.Trigger,{get class(){return Oe(i().actionsBtn,"tsqd-actions-btn","tsqd-action-settings")},get children(){return s(Wi,{})}}),s(ai.Portal,{ref:e=>I(e),get mount(){return d(()=>!!a().pipWindow)()?a().pipWindow.document.body:document.body},get children(){return s(ai.Content,{get class(){return Oe(i().settingsMenu,"tsqd-settings-menu")},get children(){return[(t=zl(),f(()=>p(t,Oe(i().settingsMenuHeader,"tsqd-settings-menu-header"))),t),s(u,{get when(){return!e.showPanelViewOnly},get children(){return s(ai.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[s(ai.SubTrigger,{get class(){return Oe(i().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[Kl(),s(Ki,{})]}}),s(ai.Portal,{ref:e=>I(e),get mount(){return d(()=>!!a().pipWindow)()?a().pipWindow.document.body:document.body},get children(){return s(ai.SubContent,{get class(){return Oe(i().settingsMenu,"tsqd-settings-submenu")},get children(){return[s(ai.Item,{onSelect:()=>{O("top")},as:"button",get class(){return Oe(i().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[Rl(),s(Ri,{})]}}),s(ai.Item,{onSelect:()=>{O("bottom")},as:"button",get class(){return Oe(i().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[Bl(),s(Bi,{})]}}),s(ai.Item,{onSelect:()=>{O("left")},as:"button",get class(){return Oe(i().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[Hl(),s(Hi,{})]}}),s(ai.Item,{onSelect:()=>{O("right")},as:"button",get class(){return Oe(i().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-right")},get children(){return[Gl(),s(Gi,{})]}})]}})}})]}})}}),s(ai.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[s(ai.SubTrigger,{get class(){return Oe(i().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[Ul(),s(Ki,{})]}}),s(ai.Portal,{ref:e=>I(e),get mount(){return d(()=>!!a().pipWindow)()?a().pipWindow.document.body:document.body},get children(){return s(ai.SubContent,{get class(){return Oe(i().settingsMenu,"tsqd-settings-submenu")},get children(){return[s(ai.Item,{onSelect:()=>{e.setLocalStore("theme_preference","light")},as:"button",get class(){return Oe(i().settingsSubButton,"light"===e.localStore.theme_preference&&i().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[Vl(),s(Ui,{})]}}),s(ai.Item,{onSelect:()=>{e.setLocalStore("theme_preference","dark")},as:"button",get class(){return Oe(i().settingsSubButton,"dark"===e.localStore.theme_preference&&i().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[jl(),s(Vi,{})]}}),s(ai.Item,{onSelect:()=>{e.setLocalStore("theme_preference","system")},as:"button",get class(){return Oe(i().settingsSubButton,"system"===e.localStore.theme_preference&&i().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[Nl(),s(ji,{})]}})]}})}})]}}),s(ai.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[s(ai.SubTrigger,{get class(){return Oe(i().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-disabled-queries")},get children(){return[Ql(),s(Ki,{})]}}),s(ai.Portal,{ref:e=>I(e),get mount(){return d(()=>!!a().pipWindow)()?a().pipWindow.document.body:document.body},get children(){return s(ai.SubContent,{get class(){return Oe(i().settingsMenu,"tsqd-settings-submenu")},get children(){return[s(ai.Item,{onSelect:()=>{e.setLocalStore("hideDisabledQueries","false")},as:"button",get class(){return Oe(i().settingsSubButton,"true"!==e.localStore.hideDisabledQueries&&i().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-show")},get children(){return[Wl(),s(u,{get when(){return"true"!==e.localStore.hideDisabledQueries},get children(){return s(nl,{})}})]}}),s(ai.Item,{onSelect:()=>{e.setLocalStore("hideDisabledQueries","true")},as:"button",get class(){return Oe(i().settingsSubButton,"true"===e.localStore.hideDisabledQueries&&i().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-hide")},get children(){return[_l(),s(u,{get when(){return"true"===e.localStore.hideDisabledQueries},get children(){return s(nl,{})}})]}})]}})}})]}})];var t}})}})]}}),null),g(z,s(u,{get when(){return"queries"===c()},get children(){var e=Xl(),t=e.firstChild;return g(t,s(je,{by:e=>e.queryHash,get each(){return D()},children:e=>s(Cs,{get query(){return e()}})})),f(()=>p(e,Oe(i().overflowQueryContainer,"tsqd-queries-overflow-container"))),e}}),null),g(z,s(u,{get when(){return"mutations"===c()},get children(){var e=Zl(),t=e.firstChild;return g(t,s(je,{by:e=>e.mutationId,get each(){return A()},children:e=>s(Es,{get mutation(){return e()}})})),f(()=>p(e,Oe(i().overflowQueryContainer,"tsqd-mutations-overflow-container"))),e}}),null),f(e=>{var t=Oe(i().queriesContainer,vs()<ie&&(fs()||hs())&&o`
              height: 50%;
              max-height: 50%;
            `,vs()<ie&&!(fs()||hs())&&o`
              height: 100%;
              max-height: 100%;
            `,"tsqd-queries-container"),n=Oe(i().row,"tsqd-header"),r=i().logoAndToggleContainer,l=Oe(i().logo,"tsqd-text-logo-container"),s=Oe(i().tanstackLogo,"tsqd-text-logo-tanstack"),a=Oe(i().queryFlavorLogo,"tsqd-text-logo-query-flavor"),d=Oe(i().row,"tsqd-filters-actions-container"),u=Oe(i().filtersContainer,"tsqd-filters-container"),g=Oe(i().filterInput,"tsqd-query-filter-textfield-container"),f=Oe("tsqd-query-filter-textfield"),h=Oe(i().filterSelect,"tsqd-query-filter-sort-container"),y="Sort order "+(-1===("queries"===c()?v():$())?"descending":"ascending"),b=-1===("queries"===c()?v():$()),m=Oe(i().actionsContainer,"tsqd-actions-container"),w=Oe(i().actionsBtn,"tsqd-actions-btn","tsqd-action-clear-cache"),x=`Clear ${c()} cache`,S=Oe(i().actionsBtn,ms()&&i().actionsBtnOffline,"tsqd-actions-btn","tsqd-action-mock-offline-behavior"),C=ms()?"Unset offline mocking behavior":"Mock offline behavior",E=ms(),q=ms()?"Unset offline mocking behavior":"Mock offline behavior";return t!==e.e&&p(z,e.e=t),n!==e.t&&p(K,e.t=n),r!==e.a&&p(R,e.a=r),l!==e.o&&p(B,e.o=l),s!==e.i&&p(H,e.i=s),a!==e.n&&p(G,e.n=a),d!==e.s&&p(V,e.s=d),u!==e.h&&p(j,e.h=u),g!==e.r&&p(N,e.r=g),f!==e.d&&p(Q,e.d=f),h!==e.l&&p(W,e.l=h),y!==e.u&&k(_,"aria-label",e.u=y),b!==e.c&&k(_,"aria-pressed",e.c=b),m!==e.w&&p(X,e.w=m),w!==e.m&&p(Z,e.m=w),x!==e.f&&k(Z,"title",e.f=x),S!==e.y&&p(Y,e.y=S),C!==e.g&&k(Y,"aria-label",e.g=C),E!==e.p&&k(Y,"aria-pressed",e.p=E),q!==e.b&&k(Y,"title",e.b=q),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),f(()=>Q.value="queries"===c()?e.localStore.filter||"":e.localStore.mutationFilter||""),z),s(u,{get when(){return d(()=>"queries"===c())()&&fs()},get children(){return s(Fs,{})}}),s(u,{get when(){return d(()=>"mutations"===c())()&&hs()},get children(){return s(Ds,{})}})];var P,z,K,R,B,H,G,U,V,j,N,Q,W,_,X,Z,Y},Cs=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,r=l(()=>"dark"===t()?Hs(n):Bs(n)),{colors:o,alpha:i}=gi,a=(e,n)=>"dark"===t()?n:e,d=Os(t=>{var n;return null==(n=t().find({queryKey:e.query.queryKey}))?void 0:n.state},!0,t=>t.query.queryHash===e.query.queryHash),c=Os(t=>{var n;return(null==(n=t().find({queryKey:e.query.queryKey}))?void 0:n.isDisabled())??!1},!0,t=>t.query.queryHash===e.query.queryHash),h=Os(t=>{var n;return(null==(n=t().find({queryKey:e.query.queryKey}))?void 0:n.isStatic())??!1},!0,t=>t.query.queryHash===e.query.queryHash),y=Os(t=>{var n;return(null==(n=t().find({queryKey:e.query.queryKey}))?void 0:n.isStale())??!1},!0,t=>t.query.queryHash===e.query.queryHash),v=Os(t=>{var n;return(null==(n=t().find({queryKey:e.query.queryKey}))?void 0:n.getObserversCount())??0},!0,t=>t.query.queryHash===e.query.queryHash),b=l(()=>L({queryState:d(),observerCount:v(),isStale:y()}));return s(u,{get when(){return d()},get children(){var t=ns(),l=t.firstChild,d=l.nextSibling;return t.$$click=()=>ps(e.query.queryHash===fs()?null:e.query.queryHash),g(l,v),g(d,()=>e.query.queryHash),g(t,s(u,{get when(){return c()},get children(){return es()}}),null),g(t,s(u,{get when(){return h()},get children(){return ts()}}),null),f(s=>{var d=Oe(r().queryRow,fs()===e.query.queryHash&&r().selectedQueryRow,"tsqd-query-row"),u=`Query key ${e.query.queryHash}`,c=Oe("gray"===b()?n`
        background-color: ${a(o[b()][200],o[b()][700])};
        color: ${a(o[b()][700],o[b()][300])};
      `:n`
      background-color: ${a(o[b()][200]+i[80],o[b()][900])};
      color: ${a(o[b()][800],o[b()][300])};
    `,"tsqd-query-observer-count");return d!==s.e&&p(t,s.e=d),u!==s.t&&k(t,"aria-label",s.t=u),c!==s.a&&p(l,s.a=c),s},{e:void 0,t:void 0,a:void 0}),t}})},Es=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,r=l(()=>"dark"===t()?Hs(n):Bs(n)),{colors:o,alpha:i}=gi,a=(e,n)=>"dark"===t()?n:e,c=zs(t=>{const n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return null==n?void 0:n.state}),h=zs(t=>{const n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return!!n&&n.state.isPaused}),y=zs(t=>{const n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.status:"idle"}),v=l(()=>M({isPaused:h(),status:y()}));return s(u,{get when(){return c()},get children(){var t=ns(),l=t.firstChild,c=l.nextSibling;return t.$$click=()=>{ys(e.mutation.mutationId===hs()?null:e.mutation.mutationId)},g(l,s(u,{get when(){return"purple"===v()},get children(){return s(il,{})}}),null),g(l,s(u,{get when(){return"green"===v()},get children(){return s(nl,{})}}),null),g(l,s(u,{get when(){return"red"===v()},get children(){return s(ol,{})}}),null),g(l,s(u,{get when(){return"yellow"===v()},get children(){return s(rl,{})}}),null),g(c,s(u,{get when(){return e.mutation.options.mutationKey},get children(){return[d(()=>JSON.stringify(e.mutation.options.mutationKey))," -"," "]}}),null),g(c,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),f(s=>{var d=Oe(r().queryRow,hs()===e.mutation.mutationId&&r().selectedQueryRow,"tsqd-query-row"),u=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,c=Oe("gray"===v()?n`
        background-color: ${a(o[v()][200],o[v()][700])};
        color: ${a(o[v()][700],o[v()][300])};
      `:n`
      background-color: ${a(o[v()][200]+i[80],o[v()][900])};
      color: ${a(o[v()][800],o[v()][300])};
    `,"tsqd-query-observer-count");return d!==s.e&&p(t,s.e=d),u!==s.t&&k(t,"aria-label",s.t=u),c!==s.a&&p(l,s.a=c),s},{e:void 0,t:void 0,a:void 0}),t}})},qs=()=>{const e=Os(e=>e().getAll().filter(e=>"stale"===q(e)).length),t=Os(e=>e().getAll().filter(e=>"fresh"===q(e)).length),n=Os(e=>e().getAll().filter(e=>"fetching"===q(e)).length),r=Os(e=>e().getAll().filter(e=>"paused"===q(e)).length),o=Os(e=>e().getAll().filter(e=>"inactive"===q(e)).length),i=he(),a=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,d=l(()=>"dark"===i()?Hs(a):Bs(a));return u=Fl(),g(u,s(Ls,{label:"Fresh",color:"green",get count(){return t()}}),null),g(u,s(Ls,{label:"Fetching",color:"blue",get count(){return n()}}),null),g(u,s(Ls,{label:"Paused",color:"purple",get count(){return r()}}),null),g(u,s(Ls,{label:"Stale",color:"yellow",get count(){return e()}}),null),g(u,s(Ls,{label:"Inactive",color:"gray",get count(){return o()}}),null),f(()=>p(u,Oe(d().queryStatusContainer,"tsqd-query-status-container"))),u;var u},Ms=()=>{const e=zs(e=>e().getAll().filter(e=>"green"===M({isPaused:e.state.isPaused,status:e.state.status})).length),t=zs(e=>e().getAll().filter(e=>"yellow"===M({isPaused:e.state.isPaused,status:e.state.status})).length),n=zs(e=>e().getAll().filter(e=>"purple"===M({isPaused:e.state.isPaused,status:e.state.status})).length),r=zs(e=>e().getAll().filter(e=>"red"===M({isPaused:e.state.isPaused,status:e.state.status})).length),o=he(),i=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,a=l(()=>"dark"===o()?Hs(i):Bs(i));return d=Fl(),g(d,s(Ls,{label:"Paused",color:"purple",get count(){return n()}}),null),g(d,s(Ls,{label:"Pending",color:"yellow",get count(){return t()}}),null),g(d,s(Ls,{label:"Success",color:"green",get count(){return e()}}),null),g(d,s(Ls,{label:"Error",color:"red",get count(){return r()}}),null),f(()=>p(d,Oe(a().queryStatusContainer,"tsqd-query-status-container"))),d;var d},Ls=e=>{const t=he(),n=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,o=l(()=>"dark"===t()?Hs(n):Bs(n)),{colors:i,alpha:a}=gi,c=(e,n)=>"dark"===t()?n:e;let h;const[y,v]=r(!1),[b,m]=r(!1),w=l(()=>!(fs()&&vs()<1024&&vs()>ie||vs()<ie));return x=is(),k=x.firstChild,$=k.nextSibling,"function"==typeof h?S(h,x):h=x,x.addEventListener("mouseleave",()=>{v(!1),m(!1)}),x.addEventListener("mouseenter",()=>v(!0)),x.addEventListener("blur",()=>m(!1)),x.addEventListener("focus",()=>m(!0)),z(x,K({get disabled(){return w()},get class(){return Oe(o().queryStatusTag,!w()&&n`
            cursor: pointer;
            &:hover {
              background: ${c(i.gray[200],i.darkGray[400])}${a[80]};
            }
          `,"tsqd-query-status-tag",`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>y()||b()?{"aria-describedby":"tsqd-status-tooltip"}:{}),!1,!0),g(x,s(u,{get when(){return d(()=>!w())()&&(y()||b())},get children(){var t=rs();return g(t,()=>e.label),f(()=>p(t,Oe(o().statusTooltip,"tsqd-query-status-tooltip"))),t}}),k),g(x,s(u,{get when(){return w()},get children(){var t=os();return g(t,()=>e.label),f(()=>p(t,Oe(o().queryStatusTagLabel,"tsqd-query-status-tag-label"))),t}}),$),g($,()=>e.count),f(t=>{var r=Oe(n`
            width: ${gi.size[1.5]};
            height: ${gi.size[1.5]};
            border-radius: ${gi.border.radius.full};
            background-color: ${gi.colors[e.color][500]};
          `,"tsqd-query-status-tag-dot"),l=Oe(o().queryStatusCount,e.count>0&&"gray"!==e.color&&n`
              background-color: ${c(i[e.color][100],i[e.color][900])};
              color: ${c(i[e.color][700],i[e.color][300])};
            `,"tsqd-query-status-tag-count");return r!==t.e&&p(k,t.e=r),l!==t.t&&p($,t.t=l),t},{e:void 0,t:void 0}),x;var x,k,$},Fs=()=>{const e=he(),t=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,n=l(()=>"dark"===e()?Hs(t):Bs(t)),{colors:o}=gi,a=(t,n)=>"dark"===e()?n:t,c=ue().client,[h,y]=r(!1),[v,b]=r("view"),[m,w]=r(!1),x=l(()=>ue().errorTypes||[]),$=Os(e=>e().getAll().find(e=>e.queryHash===fs()),!1),S=Os(e=>e().getAll().find(e=>e.queryHash===fs()),!1),C=Os(e=>{var t;return null==(t=e().getAll().find(e=>e.queryHash===fs()))?void 0:t.state},!1),E=Os(e=>{var t;return null==(t=e().getAll().find(e=>e.queryHash===fs()))?void 0:t.state.data},!1),M=Os(e=>{const t=e().getAll().find(e=>e.queryHash===fs());return t?q(t):"inactive"}),L=Os(e=>{const t=e().getAll().find(e=>e.queryHash===fs());return t?t.state.status:"pending"}),A=Os(e=>{var t;return(null==(t=e().getAll().find(e=>e.queryHash===fs()))?void 0:t.getObserversCount())??0}),O=l(()=>F(M())),I=()=>{var e,t;Ks({type:"REFETCH",queryHash:null==(e=$())?void 0:e.queryHash});const n=null==(t=$())?void 0:t.fetch();null==n||n.catch(()=>{})},P=e=>{const t=$();if(!t)return;Ks({type:"TRIGGER_ERROR",queryHash:t.queryHash,metadata:{error:null==e?void 0:e.name}});const n=(null==e?void 0:e.initializer(t))??new Error("Unknown error from devtools"),r=t.options;t.setState({status:"error",error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})};return i(()=>{"fetching"!==M()&&y(!1)}),s(u,{get when(){return d(()=>!!$())()&&C()},get children(){var e=us(),r=e.firstChild,i=r.nextSibling,l=i.firstChild,d=l.firstChild,q=d.firstChild,F=d.nextSibling,z=l.nextSibling,K=z.firstChild.nextSibling,R=z.nextSibling.firstChild.nextSibling,B=i.nextSibling,H=B.nextSibling,G=H.firstChild,U=G.firstChild,V=G.nextSibling,j=V.firstChild,N=V.nextSibling,Q=N.firstChild,W=N.nextSibling,_=W.firstChild,X=W.nextSibling,Z=X.firstChild,Y=Z.nextSibling,J=H.nextSibling;J.firstChild;var ee=J.nextSibling,te=ee.nextSibling;return g(q,()=>D($().queryKey,!0)),g(F,M),g(K,A),g(R,()=>new Date(C().dataUpdatedAt).toLocaleTimeString()),G.$$click=I,V.$$click=()=>{var e;Ks({type:"INVALIDATE",queryHash:null==(e=$())?void 0:e.queryHash}),c.invalidateQueries($())},N.$$click=()=>{var e;Ks({type:"RESET",queryHash:null==(e=$())?void 0:e.queryHash}),c.resetQueries($())},W.$$click=()=>{var e;Ks({type:"REMOVE",queryHash:null==(e=$())?void 0:e.queryHash}),c.removeQueries($()),ps(null)},X.$$click=()=>{var e;if(void 0===(null==(e=$())?void 0:e.state.data))y(!0),(()=>{const e=$();if(!e)return;Ks({type:"RESTORE_LOADING",queryHash:e.queryHash});const t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:"idle",fetchMeta:null}),n&&e.fetch(n)})();else{const e=$();if(!e)return;Ks({type:"TRIGGER_LOADING",queryHash:e.queryHash});const t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:"pending",fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},g(X,()=>"pending"===L()?"Restore":"Trigger",Y),g(H,s(u,{get when(){return 0===x().length||"error"===L()},get children(){var e=ls(),n=e.firstChild,r=n.nextSibling;return e.$$click=()=>{var e;$().state.error?(Ks({type:"RESTORE_ERROR",queryHash:null==(e=$())?void 0:e.queryHash}),c.resetQueries($())):P()},g(e,()=>"error"===L()?"Restore":"Trigger",r),f(r=>{var i=Oe(t`
                  color: ${a(o.red[500],o.red[400])};
                `,"tsqd-query-details-actions-btn","tsqd-query-details-action-error"),l="pending"===L(),s=t`
                  background-color: ${a(o.red[500],o.red[400])};
                `;return i!==r.e&&p(e,r.e=i),l!==r.t&&(e.disabled=r.t=l),s!==r.a&&p(n,r.a=s),r},{e:void 0,t:void 0,a:void 0}),e}}),null),g(H,s(u,{get when(){return!(0===x().length||"error"===L())},get children(){var e=ss(),r=e.firstChild,o=r.nextSibling.nextSibling;return o.firstChild,o.addEventListener("change",e=>{const t=x().find(t=>t.name===e.currentTarget.value);P(t)}),g(o,s(T,{get each(){return x()},children:e=>{return t=cs(),g(t,()=>e.name),f(()=>t.value=e.name),t;var t}}),null),g(e,s(Ki,{}),null),f(i=>{var l=Oe(n().actionsSelect,"tsqd-query-details-actions-btn","tsqd-query-details-action-error-multiple"),s=t`
                  background-color: ${gi.colors.red[400]};
                `,a="pending"===L();return l!==i.e&&p(e,i.e=l),s!==i.t&&p(r,i.t=s),a!==i.a&&(o.disabled=i.a=a),i},{e:void 0,t:void 0,a:void 0}),e}}),null),g(J,()=>"view"===v()?"Explorer":"Editor",null),g(e,s(u,{get when(){return"view"===v()},get children(){var e=as();return g(e,s(Cl,{label:"Data",defaultExpanded:["Data"],get value(){return E()},editable:!0,onEdit:()=>b("edit"),get activeQuery(){return $()}})),f(t=>null!=(t=gi.size[2])?e.style.setProperty("padding",t):e.style.removeProperty("padding")),e}}),ee),g(e,s(u,{get when(){return"edit"===v()},get children(){var e=ds(),r=e.firstChild,i=r.nextSibling,l=i.firstChild,s=l.nextSibling,d=s.firstChild,u=d.nextSibling;return e.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget).get("data");try{const e=JSON.parse(t);$().setState({...$().state,data:e}),b("view")}catch(n){w(!0)}}),r.addEventListener("focus",()=>w(!1)),g(l,()=>m()?"Invalid Value":""),d.$$click=()=>b("view"),f(c=>{var g=Oe(n().devtoolsEditForm,"tsqd-query-details-data-editor"),f=n().devtoolsEditTextarea,h=m(),y=n().devtoolsEditFormActions,v=n().devtoolsEditFormError,b=n().devtoolsEditFormActionContainer,w=Oe(n().devtoolsEditFormAction,t`
                      color: ${a(o.gray[600],o.gray[300])};
                    `),x=Oe(n().devtoolsEditFormAction,t`
                      color: ${a(o.blue[600],o.blue[400])};
                    `);return g!==c.e&&p(e,c.e=g),f!==c.t&&p(r,c.t=f),h!==c.a&&k(r,"data-error",c.a=h),y!==c.o&&p(i,c.o=y),v!==c.i&&p(l,c.i=v),b!==c.n&&p(s,c.n=b),w!==c.s&&p(d,c.s=w),x!==c.h&&p(u,c.h=x),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),f(()=>r.value=JSON.stringify(E(),null,2)),e}}),ee),g(te,s(Cl,{label:"Query",defaultExpanded:["Query","queryKey"],get value(){return S()}})),f(l=>{var s=Oe(n().detailsContainer,"tsqd-query-details-container"),d=Oe(n().detailsHeader,"tsqd-query-details-header"),u=Oe(n().detailsBody,"tsqd-query-details-summary-container"),c=Oe(n().queryDetailsStatus,"gray"===O()?t`
        background-color: ${a(o[O()][200],o[O()][700])};
        color: ${a(o[O()][700],o[O()][300])};
        border-color: ${a(o[O()][400],o[O()][600])};
      `:t`
      background-color: ${a(o[O()][100],o[O()][900])};
      color: ${a(o[O()][700],o[O()][300])};
      border-color: ${a(o[O()][400],o[O()][600])};
    `),g=Oe(n().detailsHeader,"tsqd-query-details-header"),f=Oe(n().actionsBody,"tsqd-query-details-actions-container"),y=Oe(t`
                color: ${a(o.blue[600],o.blue[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-refetch"),v="fetching"===M(),b=t`
                background-color: ${a(o.blue[600],o.blue[400])};
              `,m=Oe(t`
                color: ${a(o.yellow[600],o.yellow[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-invalidate"),w="pending"===L(),x=t`
                background-color: ${a(o.yellow[600],o.yellow[400])};
              `,k=Oe(t`
                color: ${a(o.gray[600],o.gray[300])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-reset"),$="pending"===L(),S=t`
                background-color: ${a(o.gray[600],o.gray[400])};
              `,C=Oe(t`
                color: ${a(o.pink[500],o.pink[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-remove"),E="fetching"===M(),q=t`
                background-color: ${a(o.pink[500],o.pink[400])};
              `,D=Oe(t`
                color: ${a(o.cyan[500],o.cyan[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-loading"),T=h(),A=t`
                background-color: ${a(o.cyan[500],o.cyan[400])};
              `,I=Oe(n().detailsHeader,"tsqd-query-details-header"),P=Oe(n().detailsHeader,"tsqd-query-details-header"),z=gi.size[2];return s!==l.e&&p(e,l.e=s),d!==l.t&&p(r,l.t=d),u!==l.a&&p(i,l.a=u),c!==l.o&&p(F,l.o=c),g!==l.i&&p(B,l.i=g),f!==l.n&&p(H,l.n=f),y!==l.s&&p(G,l.s=y),v!==l.h&&(G.disabled=l.h=v),b!==l.r&&p(U,l.r=b),m!==l.d&&p(V,l.d=m),w!==l.l&&(V.disabled=l.l=w),x!==l.u&&p(j,l.u=x),k!==l.c&&p(N,l.c=k),$!==l.w&&(N.disabled=l.w=$),S!==l.m&&p(Q,l.m=S),C!==l.f&&p(W,l.f=C),E!==l.y&&(W.disabled=l.y=E),q!==l.g&&p(_,l.g=q),D!==l.p&&p(X,l.p=D),T!==l.b&&(X.disabled=l.b=T),A!==l.T&&p(Z,l.T=A),I!==l.A&&p(J,l.A=I),P!==l.O&&p(ee,l.O=P),z!==l.I&&(null!=(l.I=z)?te.style.setProperty("padding",z):te.style.removeProperty("padding")),l},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),e}})},Ds=()=>{const e=he(),t=ue().shadowDOMTarget?Te.bind({target:ue().shadowDOMTarget}):Te,n=l(()=>"dark"===e()?Hs(t):Bs(t)),{colors:r}=gi,o=(t,n)=>"dark"===e()?n:t,i=zs(e=>{const t=e().getAll().find(e=>e.mutationId===hs());return!!t&&t.state.isPaused}),a=zs(e=>{const t=e().getAll().find(e=>e.mutationId===hs());return t?t.state.status:"idle"}),d=l(()=>M({isPaused:i(),status:a()})),c=zs(e=>e().getAll().find(e=>e.mutationId===hs()),!1);return s(u,{get when(){return c()},get children(){var e=gs(),i=e.firstChild,l=i.nextSibling,h=l.firstChild,y=h.firstChild,v=y.firstChild,b=y.nextSibling,m=h.nextSibling.firstChild.nextSibling,w=l.nextSibling,x=w.nextSibling,k=x.nextSibling,$=k.nextSibling,S=$.nextSibling,C=S.nextSibling,E=C.nextSibling,q=E.nextSibling;return g(v,s(u,{get when(){return c().options.mutationKey},fallback:"No mutationKey found",get children(){return D(c().options.mutationKey,!0)}})),g(b,s(u,{get when(){return"purple"===d()},children:"pending"}),null),g(b,s(u,{get when(){return"purple"!==d()},get children(){return a()}}),null),g(m,()=>new Date(c().state.submittedAt).toLocaleTimeString()),g(x,s(Cl,{label:"Variables",defaultExpanded:["Variables"],get value(){return c().state.variables}})),g($,s(Cl,{label:"Context",defaultExpanded:["Context"],get value(){return c().state.context}})),g(C,s(Cl,{label:"Data",defaultExpanded:["Data"],get value(){return c().state.data}})),g(q,s(Cl,{label:"Mutation",defaultExpanded:["Mutation"],get value(){return c()}})),f(s=>{var a=Oe(n().detailsContainer,"tsqd-query-details-container"),u=Oe(n().detailsHeader,"tsqd-query-details-header"),c=Oe(n().detailsBody,"tsqd-query-details-summary-container"),g=Oe(n().queryDetailsStatus,"gray"===d()?t`
        background-color: ${o(r[d()][200],r[d()][700])};
        color: ${o(r[d()][700],r[d()][300])};
        border-color: ${o(r[d()][400],r[d()][600])};
      `:t`
      background-color: ${o(r[d()][100],r[d()][900])};
      color: ${o(r[d()][700],r[d()][300])};
      border-color: ${o(r[d()][400],r[d()][600])};
    `),f=Oe(n().detailsHeader,"tsqd-query-details-header"),h=gi.size[2],y=Oe(n().detailsHeader,"tsqd-query-details-header"),v=gi.size[2],m=Oe(n().detailsHeader,"tsqd-query-details-header"),M=gi.size[2],L=Oe(n().detailsHeader,"tsqd-query-details-header"),F=gi.size[2];return a!==s.e&&p(e,s.e=a),u!==s.t&&p(i,s.t=u),c!==s.a&&p(l,s.a=c),g!==s.o&&p(b,s.o=g),f!==s.i&&p(w,s.i=f),h!==s.n&&(null!=(s.n=h)?x.style.setProperty("padding",h):x.style.removeProperty("padding")),y!==s.s&&p(k,s.s=y),v!==s.h&&(null!=(s.h=v)?$.style.setProperty("padding",v):$.style.removeProperty("padding")),m!==s.r&&p(S,s.r=m),M!==s.d&&(null!=(s.d=M)?C.style.setProperty("padding",M):C.style.removeProperty("padding")),L!==s.l&&p(E,s.l=L),F!==s.u&&(null!=(s.u=F)?q.style.setProperty("padding",F):q.style.removeProperty("padding")),s},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),e}})},Ts=new Map,As=()=>{const e=l(()=>ue().client.getQueryCache()),t=e().subscribe(t=>{E(()=>{for(const[n,r]of Ts.entries())r.shouldUpdate(t)&&r.setter(n(e))})});return b(()=>{Ts.clear(),t()}),t},Os=(e,t=!0,n=()=>!0)=>{const o=l(()=>ue().client.getQueryCache()),[s,a]=r(e(o),t?void 0:{equals:!1});return i(()=>{a(e(o))}),Ts.set(e,{setter:a,shouldUpdate:n}),b(()=>{Ts.delete(e)}),s},Is=new Map,Ps=()=>{const e=l(()=>ue().client.getMutationCache()),t=e().subscribe(()=>{for(const[t,n]of Is.entries())queueMicrotask(()=>{n(t(e))})});return b(()=>{Is.clear(),t()}),t},zs=(e,t=!0)=>{const n=l(()=>ue().client.getMutationCache()),[o,s]=r(e(n),t?void 0:{equals:!1});return i(()=>{s(e(n))}),Is.set(e,s),b(()=>{Is.delete(e)}),o},Ks=({type:e,queryHash:t,metadata:n})=>{const r=new CustomEvent("@tanstack/query-devtools-event",{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},Rs=(e,t)=>{const{colors:n,font:r,size:o,alpha:i,shadow:l,border:s}=gi,a=(t,n)=>"light"===e?t:n;return{devtoolsBtn:t`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${l.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${n.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,panel:t`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${gi.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${a(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${a(n.gray[400],n.darkGray[300])};
      }
    `,parentPanel:t`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${gi.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${a(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${a(n.gray[400],n.darkGray[300])};
      }
    `,"devtoolsBtn-position-bottom-right":t`
      bottom: 12px;
      right: 12px;
    `,"devtoolsBtn-position-bottom-left":t`
      bottom: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-left":t`
      top: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-right":t`
      top: 12px;
      right: 12px;
    `,"devtoolsBtn-position-relative":t`
      position: relative;
    `,"panel-position-top":t`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-bottom: ${a(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-bottom":t`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-top: ${a(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-right":t`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,"panel-position-left":t`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,closeBtn:t`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${a(n.gray[50],n.darkGray[700])};
      &:hover {
        background-color: ${a(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[600]};
      }
      & svg {
        color: ${a(n.gray[600],n.gray[400])};
        width: ${o[2]};
        height: ${o[2]};
      }
    `,"closeBtn-position-top":t`
      bottom: 0;
      right: ${o[2]};
      transform: translate(0, 100%);
      border-right: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${s.radius.sm} ${s.radius.sm};
      padding: ${o[.5]} ${o[1.5]} ${o[1]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,"closeBtn-position-bottom":t`
      top: 0;
      right: ${o[2]};
      transform: translate(0, -100%);
      border-right: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${s.radius.sm} ${s.radius.sm} 0px 0px;
      padding: ${o[1]} ${o[1.5]} ${o[.5]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }
    `,"closeBtn-position-right":t`
      bottom: ${o[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: ${s.radius.sm} 0px 0px ${s.radius.sm};
      padding: ${o[1.5]} ${o[.5]} ${o[1.5]} ${o[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,"closeBtn-position-left":t`
      bottom: ${o[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${a(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px ${s.radius.sm} ${s.radius.sm} 0px;
      padding: ${o[1.5]} ${o[1]} ${o[1.5]} ${o[.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,queriesContainer:t`
      flex: 1 1 700px;
      background-color: ${a(n.gray[50],n.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,dragHandle:t`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${n.purple[400]}${a("",i[90])};
      }
      z-index: 4;
    `,"dragHandle-position-top":t`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-bottom":t`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-right":t`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,"dragHandle-position-left":t`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,row:t`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${gi.size[2]} ${gi.size[2.5]};
      gap: ${gi.size[2.5]};
      border-bottom: ${a(n.gray[300],n.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${o[.5]};
        flex-direction: column;
      }
    `,logoAndToggleContainer:t`
      display: flex;
      gap: ${gi.size[3]};
      align-items: center;
    `,logo:t`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${gi.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,tanstackLogo:t`
      font-size: ${r.size.md};
      font-weight: ${r.weight.bold};
      line-height: ${r.lineHeight.xs};
      white-space: nowrap;
      color: ${a(n.gray[600],n.gray[300])};
    `,queryFlavorLogo:t`
      font-weight: ${r.weight.semibold};
      font-size: ${r.size.xs};
      background: linear-gradient(
        to right,
        ${a("#ea4037, #ff9b11","#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,queryStatusContainer:t`
      display: flex;
      gap: ${gi.size[2]};
      height: min-content;
    `,queryStatusTag:t`
      display: flex;
      gap: ${gi.size[1.5]};
      box-sizing: border-box;
      height: ${gi.size[6.5]};
      background: ${a(n.gray[50],n.darkGray[500])};
      color: ${a(n.gray[700],n.gray[300])};
      border-radius: ${gi.border.radius.sm};
      font-size: ${r.size.sm};
      padding: ${gi.size[1]};
      padding-left: ${gi.size[1.5]};
      align-items: center;
      font-weight: ${r.weight.medium};
      border: ${a("1px solid "+n.gray[300],"1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,queryStatusTagLabel:t`
      font-size: ${r.size.xs};
    `,queryStatusCount:t`
      font-size: ${r.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${a(n.gray[500],n.gray[400])};
      background-color: ${a(n.gray[200],n.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${gi.size[4.5]};
    `,statusTooltip:t`
      position: absolute;
      z-index: 1;
      background-color: ${a(n.gray[50],n.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${gi.size[2]}));
      padding: ${gi.size[.5]} ${gi.size[2]};
      border-radius: ${gi.border.radius.sm};
      font-size: ${r.size.xs};
      border: 1px solid ${a(n.gray[400],n.gray[600])};
      color: ${a(n.gray[600],n.gray[300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${a(n.gray[400],n.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${a(n.gray[100],n.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,filtersContainer:t`
      display: flex;
      gap: ${gi.size[2]};
      & > button {
        cursor: pointer;
        padding: ${gi.size[.5]} ${gi.size[1.5]} ${gi.size[.5]}
          ${gi.size[2]};
        border-radius: ${gi.border.radius.sm};
        background-color: ${a(n.gray[100],n.darkGray[400])};
        border: 1px solid ${a(n.gray[300],n.darkGray[200])};
        color: ${a(n.gray[700],n.gray[300])};
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        line-height: ${r.lineHeight.sm};
        gap: ${gi.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${s.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        & svg {
          width: ${gi.size[3]};
          height: ${gi.size[3]};
          color: ${a(n.gray[500],n.gray[400])};
        }
      }
    `,filterInput:t`
      padding: ${o[.5]} ${o[2]};
      border-radius: ${gi.border.radius.sm};
      background-color: ${a(n.gray[100],n.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${gi.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${a(n.gray[300],n.darkGray[200])};
      height: min-content;
      color: ${a(n.gray[600],n.gray[400])};
      & > svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      & input {
        font-size: ${r.size.xs};
        width: 100%;
        background-color: ${a(n.gray[100],n.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${r.lineHeight.sm};
        color: ${a(n.gray[700],n.gray[300])};
        &::placeholder {
          color: ${a(n.gray[700],n.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,filterSelect:t`
      padding: ${gi.size[.5]} ${gi.size[2]};
      border-radius: ${gi.border.radius.sm};
      background-color: ${a(n.gray[100],n.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${gi.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${a(n.gray[300],n.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${a(n.gray[600],n.gray[400])};
        width: ${gi.size[2]};
        height: ${gi.size[2]};
      }
      & > select {
        appearance: none;
        color: ${a(n.gray[700],n.gray[300])};
        min-width: 100px;
        line-height: ${r.lineHeight.sm};
        font-size: ${r.size.xs};
        background-color: ${a(n.gray[100],n.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsContainer:t`
      display: flex;
      gap: ${gi.size[2]};
    `,actionsBtn:t`
      border-radius: ${gi.border.radius.sm};
      background-color: ${a(n.gray[100],n.darkGray[400])};
      border: 1px solid ${a(n.gray[300],n.darkGray[200])};
      width: ${gi.size[6.5]};
      height: ${gi.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${gi.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${a(n.gray[200],n.darkGray[500])};
      }
      & svg {
        color: ${a(n.gray[700],n.gray[300])};
        width: ${gi.size[3]};
        height: ${gi.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsBtnOffline:t`
      & svg {
        stroke: ${a(n.yellow[700],n.yellow[500])};
        fill: ${a(n.yellow[700],n.yellow[500])};
      }
    `,overflowQueryContainer:t`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,queryRow:t`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${a(n.gray[700],n.gray[300])};
      background-color: ${a(n.gray[50],n.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${a(n.gray[200],n.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${gi.size[1]};
        user-select: none;
        min-width: ${gi.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${r.size.xs};
        font-weight: ${r.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${a(n.gray[300],n.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        min-height: ${gi.size[6]};
        flex: 1;
        padding: ${gi.size[1]} ${gi.size[2]};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${a(n.gray[300],n.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${gi.size[2]};
        color: ${a(n.gray[800],n.gray[300])};
        background-color: ${a(n.gray[300],n.darkGray[600])};
        border-bottom: 1px solid ${a(n.gray[300],n.darkGray[400])};
        font-size: ${r.size.xs};
      }

      & .tsqd-query-static-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${gi.size[2]};
        color: ${a(n.teal[800],n.teal[300])};
        background-color: ${a(n.teal[100],n.teal[900])};
        border-bottom: 1px solid ${a(n.teal[300],n.teal[700])};
        font-size: ${r.size.xs};
      }
    `,selectedQueryRow:t`
      background-color: ${a(n.gray[200],n.darkGray[500])};
    `,detailsContainer:t`
      flex: 1 1 700px;
      background-color: ${a(n.gray[50],n.darkGray[700])};
      color: ${a(n.gray[700],n.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,detailsHeader:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${a(n.gray[200],n.darkGray[600])};
      padding: ${gi.size[1.5]} ${gi.size[2]};
      font-weight: ${r.weight.medium};
      font-size: ${r.size.xs};
      line-height: ${r.lineHeight.xs};
      text-align: left;
    `,detailsBody:t`
      margin: ${gi.size[1.5]} 0px ${gi.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${gi.size[2]};
        line-height: ${r.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${r.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${gi.size[1.5]};
      }

      & code {
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${r.size.xs};
        line-height: ${r.lineHeight.xs};
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,queryDetailsStatus:t`
      border: 1px solid ${n.darkGray[200]};
      border-radius: ${gi.border.radius.sm};
      font-weight: ${r.weight.medium};
      padding: ${gi.size[1]} ${gi.size[2.5]};
    `,actionsBody:t`
      flex-wrap: wrap;
      margin: ${gi.size[2]} 0px ${gi.size[2]} 0px;
      display: flex;
      gap: ${gi.size[2]};
      padding: 0px ${gi.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${r.size.xs};
        padding: ${gi.size[1]} ${gi.size[2]};
        display: flex;
        border-radius: ${gi.border.radius.sm};
        background-color: ${a(n.gray[100],n.darkGray[600])};
        border: 1px solid ${a(n.gray[300],n.darkGray[400])};
        align-items: center;
        gap: ${gi.size[2]};
        font-weight: ${r.weight.medium};
        line-height: ${r.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${s.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        &:hover {
          background-color: ${a(n.gray[200],n.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${o[1.5]};
          height: ${o[1.5]};
          border-radius: ${gi.border.radius.full};
        }
      }
    `,actionsSelect:t`
      font-size: ${r.size.xs};
      padding: ${gi.size[.5]} ${gi.size[2]};
      display: flex;
      border-radius: ${gi.border.radius.sm};
      overflow: hidden;
      background-color: ${a(n.gray[100],n.darkGray[600])};
      border: 1px solid ${a(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${gi.size[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.sm};
      color: ${a(n.red[500],n.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${a(n.gray[200],n.darkGray[500])};
      }
      & > span {
        width: ${o[1.5]};
        height: ${o[1.5]};
        border-radius: ${gi.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${gi.colors.red[400]};
      }
      & svg {
        width: ${gi.size[2]};
        height: ${gi.size[2]};
      }
    `,settingsMenu:t`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${o[.5]};
      border-radius: ${gi.border.radius.sm};
      border: 1px solid ${a(n.gray[300],n.gray[700])};
      background-color: ${a(n.gray[50],n.darkGray[600])};
      font-size: ${r.size.xs};
      color: ${a(n.gray[700],n.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${o[.5]};
    `,settingsSubTrigger:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${gi.border.radius.xs};
      padding: ${gi.size[1]} ${gi.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${a(n.gray[700],n.gray[300])};
      & svg {
        color: ${a(n.gray[600],n.gray[400])};
        transform: rotate(-90deg);
        width: ${gi.size[2]};
        height: ${gi.size[2]};
      }
      &:hover {
        background-color: ${a(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,settingsMenuHeader:t`
      padding: ${gi.size[1]} ${gi.size[1]};
      font-weight: ${r.weight.medium};
      border-bottom: 1px solid ${a(n.gray[300],n.darkGray[400])};
      color: ${a(n.gray[500],n.gray[400])};
      font-size: ${r.size.xs};
    `,settingsSubButton:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${a(n.gray[700],n.gray[300])};
      font-size: ${r.size.xs};
      border-radius: ${gi.border.radius.xs};
      padding: ${gi.size[1]} ${gi.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${a(n.gray[600],n.gray[400])};
      }
      &:hover {
        background-color: ${a(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,themeSelectedButton:t`
      background-color: ${a(n.purple[100],n.purple[900])};
      color: ${a(n.purple[700],n.purple[300])};
      & svg {
        color: ${a(n.purple[700],n.purple[300])};
      }
      &:hover {
        background-color: ${a(n.purple[100],n.purple[900])};
      }
    `,viewToggle:t`
      border-radius: ${gi.border.radius.sm};
      background-color: ${a(n.gray[200],n.darkGray[600])};
      border: 1px solid ${a(n.gray[300],n.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${r.size.xs};
      color: ${a(n.gray[700],n.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${n.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${r.lineHeight.md};
        }

        & label:hover {
          background-color: ${a(n.gray[100],n.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${a(n.gray[100],n.darkGray[400])};
        & label:hover {
          background-color: ${a(n.gray[100],n.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${gi.size[1.5]} 0 ${gi.size[2]};
        }
        border-right: 1px solid ${a(n.gray[300],n.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${gi.size[2]} 0 ${gi.size[1.5]};
        }
      }
    `,devtoolsEditForm:t`
      padding: ${o[2]};
      & > [data-error='true'] {
        outline: 2px solid ${a(n.red[200],n.red[800])};
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
      }
    `,devtoolsEditTextarea:t`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${r.size.xs};
      border-radius: ${s.radius.sm};
      field-sizing: content;
      padding: ${o[2]};
      background-color: ${a(n.gray[100],n.darkGray[800])};
      color: ${a(n.gray[900],n.gray[100])};
      border: 1px solid ${a(n.gray[200],n.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${a(n.blue[200],n.blue[800])};
      }
    `,devtoolsEditFormActions:t`
      display: flex;
      justify-content: space-between;
      gap: ${o[2]};
      align-items: center;
      padding-top: ${o[1]};
      font-size: ${r.size.xs};
    `,devtoolsEditFormError:t`
      color: ${a(n.red[700],n.red[500])};
    `,devtoolsEditFormActionContainer:t`
      display: flex;
      gap: ${o[2]};
    `,devtoolsEditFormAction:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${r.size.xs};
      padding: ${o[1]} ${gi.size[2]};
      display: flex;
      border-radius: ${s.radius.sm};
      background-color: ${a(n.gray[100],n.darkGray[600])};
      border: 1px solid ${a(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${o[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover {
        background-color: ${a(n.gray[200],n.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `}},Bs=e=>Rs("light",e),Hs=e=>Rs("dark",e);y(["click","mousedown","input"]);var Gs=e=>{const[t,n]=function(e){const[t,n]=r(),i=(null==e?void 0:e.throw)?(e,t)=>{throw n(e instanceof Error?e:new Error(t)),e}:(e,t)=>{n(e instanceof Error?e:new Error(t))},l=(null==e?void 0:e.api)?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),s=(null==e?void 0:e.prefix)?`${e.prefix}.`:"",a=new Map,d=new Proxy({},{get(t,n){let o=a.get(n);o||(o=r(void 0,{equals:!1}),a.set(n,o)),o[0]();const d=l.reduce((e,t)=>{if(null!==e||!t)return e;try{return t.getItem(`${s}${n}`)}catch(r){return i(r,`Error reading ${s}${n} from ${t.name}`),null}},null);return null!==d&&(null==e?void 0:e.deserializer)?e.deserializer(d,n,e.options):d}});return!1!==(null==e?void 0:e.sync)&&o(()=>{const e=e=>{var t;let n=!1;l.forEach(t=>{try{t!==e.storageArea&&e.key&&e.newValue!==t.getItem(e.key)&&(e.newValue?t.setItem(e.key,e.newValue):t.removeItem(e.key),n=!0)}catch(r){i(r,`Error synching api ${t.name} from storage event (${e.key}=${e.newValue})`)}}),n&&e.key&&(null==(t=a.get(e.key))||t[1]())};"addEventListener"in globalThis?(globalThis.addEventListener("storage",e),b(()=>globalThis.removeEventListener("storage",e))):(l.forEach(t=>{var n;return null==(n=t.addEventListener)?void 0:n.call(t,"storage",e)}),b(()=>l.forEach(t=>{var n;return null==(n=t.removeEventListener)?void 0:n.call(t,"storage",e)})))}),[d,(t,n,r)=>{const o=(null==e?void 0:e.serializer)?e.serializer(n,t,r??e.options):n,d=`${s}${t}`;l.forEach(e=>{try{e.getItem(d)!==o&&e.setItem(d,o)}catch(n){i(n,`Error setting ${s}${t} to ${o} in ${e.name}`)}});const u=a.get(t);u&&u[1]()},{clear:()=>l.forEach(e=>{try{e.clear()}catch(t){i(t,`Error clearing ${e.name}`)}}),error:t,remove:e=>l.forEach(t=>{try{t.removeItem(`${s}${e}`)}catch(n){i(n,`Error removing ${s}${e} from ${t.name}`)}}),toJSON:()=>{const t={},n=(n,r)=>{if(!t.hasOwnProperty(n)){const o=r&&(null==e?void 0:e.deserializer)?e.deserializer(r,n,e.options):r;o&&(t[n]=o)}};return l.forEach(e=>{if("function"==typeof e.getAll){let t;try{t=e.getAll()}catch(r){i(r,`Error getting all values from in ${e.name}`)}for(const e of t)n(e,t[e])}else{let o,l=0;try{for(;o=e.key(l++);)t.hasOwnProperty(o)||n(o,e.getItem(o))}catch(r){i(r,`Error getting all values from ${e.name}`)}}}),t}}]}({prefix:"TanstackQueryDevtools"}),i=Z(),a=l(()=>{const e=t.theme_preference||"system";return"system"!==e?e:i()});return s(de.Provider,{value:e,get children(){return s(ge,{localStore:t,setLocalStore:n,get children(){return s(pe.Provider,{value:a,get children(){return s(xs,{localStore:t,setLocalStore:n})}})}})}})};export{Gs as default};
