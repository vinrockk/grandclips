function creatorOf(c){var t=type(c);if(t==='stream')return {k:c.p+':'+c.ch,name:c.name||c.ch,p:c.p};if(t==='post')return {k:c.p+':'+(c.site||c.u),name:c.p==='News'?c.site:c.p==='Reddit'?'u/'+c.u:'@'+c.u,p:c.p};if(t==='video'&&c.u)return {k:c.p+':'+c.u,name:c.u,p:c.p};return null}
function creators(per,src){
 var m={};(src||VIDEOS.concat(POSTS)).forEach(function(c){var cr=creatorOf(c);if(!cr)return;var f=favs(c)[per];var o=m[cr.k]||(m[cr.k]={k:cr.k,name:cr.name,p:cr.p,f:0,n:0,top:null,tf:-1});o.f+=f;o.n++;if(f>o.tf){o.tf=f;o.top=c}});
 return Object.keys(m).map(function(k){return m[k]}).filter(function(o){return o.f>0}).sort(function(a,b){return b.f-a.f});
}
function crRow(o,rank){
 var t=type(o.top)==='post'?'post':'clip';
 return h('button',{class:'cr',type:'button','aria-label':'#'+rank+' '+o.name+', '+o.f.toLocaleString()+' favorites. Show their '+(t==='post'?'posts':'clips'),onclick:function(){showCreator(o)}},[
  h('span',{class:'rank',text:'#'+rank}),h('span',{class:'av '+o.p,'aria-hidden':'true',text:o.name.replace('@','').charAt(0).toUpperCase()}),
  h('span',{class:'cri'},[h('b',{text:o.name}),h('span',{class:'meta',text:o.p+' · '+o.n+' '+(t==='post'?(o.n===1?'post':'posts'):(o.n===1?'clip':'clips'))+' · Top: '+o.top.t})]),
  h('span',{class:'crf'},[document.createTextNode('★ '+fmt(o.f)),h('small',{text:'favorites'})])]);
}
var RK={key:'',n:{}};
function rkRow(c,i){
 var t=type(c),f=favs(c)[S.rper],kids=[h('span',{class:'rnum r'+(i+1),text:String(i+1)})];
 if(t!=='post')kids.push(thumb(c,0));
 kids.push(h('span',{class:'rinfo'},[h('span',{class:t==='post'?'ptx':'title',text:c.t}),h('span',{class:'meta',text:'★ '+fmt(f)+' · '+(t==='stream'?(c.name||c.ch)+' on '+c.p+(c.kind==='live'?' · live':''):who(c)+(t==='post'?' on '+c.p:''))})]));
 return h('button',{class:'rrow',type:'button','aria-label':'#'+(i+1)+': '+c.t+', '+f.toLocaleString()+' favorites',onclick:function(){openItem(c)}},kids);
}
function rkCreator(o,i){
 return h('button',{class:'rrow',type:'button','aria-label':'#'+(i+1)+': '+o.name+', '+o.f.toLocaleString()+' favorites',onclick:function(){showCreator(o)}},[
  h('span',{class:'rnum r'+(i+1),text:String(i+1)}),h('span',{class:'av '+o.p,'aria-hidden':'true',text:o.name.replace('@','').charAt(0).toUpperCase()}),
  h('span',{class:'rinfo'},[h('b',{text:o.name,style:'overflow:hidden;text-overflow:ellipsis;white-space:nowrap'}),h('span',{class:'meta',text:'★ '+fmt(o.f)+' · '+o.p+' · '+o.n+' '+(type(o.top)==='post'?(o.n===1?'post':'posts'):type(o.top)==='stream'?(o.n===1?'stream':'streams'):(o.n===1?'clip':'clips'))})])]);
}
function renderRank(){
 var per=S.rper,q=S.q.trim().toLowerCase(),cr=S.sub.rankings==='creators';
 var key=[S.sub.rankings,per,q].join('|');if(key!==RK.key){RK.key=key;RK.n={}}
 var cols=[['clip','Clips',VIDEOS.filter(isShort)],['video','Videos',VIDEOS.filter(function(c){return !isShort(c)})],['stream','Streams',(LIVE||[]).concat(STREAMS)],['post','Threads',POSTS]];
 var total=0,wrap=h('div',{class:'rk3'});
 cols.forEach(function(col){
  var items=cr?creators(per,col[2]).filter(function(o){return !q||(o.name+' '+o.p+' '+o.top.t).toLowerCase().indexOf(q)>=0})
   :col[2].filter(function(c){return match(c,q)&&favs(c)[per]>0}).sort(function(a,b){return favs(b)[per]-favs(a)[per]});
  total+=items.length;var n=RK.n[col[0]]||10;
  var box=h('section',{class:'rcol','aria-label':col[1]+' ranking'},[h('h2',{},[col[0]==='stream'?h('span',{class:'dot','aria-hidden':'true'}):null,document.createTextNode(col[1]),h('span',{class:'meta',text:items.length.toLocaleString()+' ranked'})])]);
  if(!items.length)box.append(h('div',{class:'empty',text:col[0]==='stream'&&LIVE===null?'Checking who is live…':'Nothing ranked yet.'}));
  items.slice(0,n).forEach(function(x,i){box.append(cr?rkCreator(x,i):rkRow(x,i))});
  if(items.length>n)box.append(h('button',{class:'more',type:'button',text:'Show more',onclick:function(){RK.n[col[0]]=n+10;render()}}));
  wrap.append(box);
 });
 $('cnt').textContent='';
 return wrap;
}
function showCreator(o){var t=type(o.top);S.sec=t==='post'?'threads':t==='stream'?'streams':vidSec(o.top);if(t==='video'){S.sub[S.sec]='views';S.tag='All';S.csrc='All'}else if(t==='post')S.filt.threads='All';else{S.sub.streams=o.top.kind==='live'?'live':'vod';S.filt.streams='All'}S.q=o.name.replace(/^@/,'');$('q').value=S.q;render();window.scrollTo(0,0)}
// Your language first: every list puts items in your language on top (then your country's language), keeping the usual order inside each group.
// The language comes from the platform where it exists (YouTube audio language, Twitch and Kick stream language, Bluesky post language), otherwise from the title.
var LANGS=[['en','English'],['es','Español'],['pt','Português'],['fr','Français'],['de','Deutsch'],['it','Italiano'],['tr','Türkçe'],['pl','Polski'],['nl','Nederlands'],['ru','Русский'],['ar','العربية'],['hi','हिन्दी'],['ja','日本語'],['ko','한국어'],['zh','中文'],['th','ไทย'],['id','Bahasa Indonesia']];
var LNAME={english:'en',spanish:'es','español':'es',portuguese:'pt',french:'fr',german:'de',italian:'it',turkish:'tr',polish:'pl',dutch:'nl',russian:'ru',arabic:'ar',hindi:'hi',japanese:'ja',korean:'ko',chinese:'zh',thai:'th',indonesian:'id'};
var CC_LANG={BR:'pt',PT:'pt',AO:'pt',MZ:'pt',ES:'es',MX:'es',AR:'es',CO:'es',CL:'es',PE:'es',VE:'es',EC:'es',GT:'es',CU:'es',BO:'es',DO:'es',HN:'es',PY:'es',SV:'es',NI:'es',CR:'es',PA:'es',UY:'es',FR:'fr',BE:'fr',SN:'fr',CI:'fr',DE:'de',AT:'de',CH:'de',IT:'it',TR:'tr',PL:'pl',NL:'nl',RU:'ru',BY:'ru',KZ:'ru',SA:'ar',AE:'ar',EG:'ar',MA:'ar',DZ:'ar',IQ:'ar',JO:'ar',KW:'ar',QA:'ar',IN:'hi',JP:'ja',KR:'ko',CN:'zh',TW:'zh',HK:'zh',TH:'th',ID:'id'};
var LANG={cc:load('gc_cc',null)};
function normLang(x){x=String(x||'').trim().toLowerCase();if(!x)return '';if(LNAME[x])return LNAME[x];var m=/^([a-z]{2})(?:[-_].*)?$/.exec(x);return m&&m[1]!=='zx'?m[1]:''}
function browserLang(){return normLang((navigator.languages&&navigator.languages[0])||navigator.language||'en')||'en'}
// No language picker (Vin, Nov 8): the visitor's location decides the language shown first, then their browser language.
function myLang(){return (LANG.cc&&CC_LANG[LANG.cc])||browserLang()}
var LWORDS={en:'the and is this of to you what new every how with my it will are was',es:'el la los las que por para con una nuevo nueva todo todos mejor esto es del pero muy ya',pt:'o os que do da dos das não novo nova um uma com você isso é mais tudo pra já',fr:'le les des du est une un pour avec nouveau nouvelle sur pas tout qui dans ce',de:'der die das und ist nicht mit ein eine neue neuer auf für wird alles wie ich',it:'il lo gli che non con una nuovo nuova per della tutto è come sono questo',tr:'ve bir bu için yeni çok ile ne mi oldu geldi',pl:'i w na nie jest się z do nowy nowa wszystko jak to',nl:'de het een en van is niet met nieuwe voor op dit wat'};
var LSETS={};Object.keys(LWORDS).forEach(function(k){LSETS[k]={};LWORDS[k].split(' ').forEach(function(w){LSETS[k][w]=1})});
