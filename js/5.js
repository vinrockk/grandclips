RC.add=function(c,w,tagW){var P=RC.P,cr=creatorOf(c);if(cr)P.c[cr.k]=(P.c[cr.k]||0)+w;var sk=srcKey(c);P.p[sk]=(P.p[sk]||0)+w*0.3;if(tagW)bump(c.tags,tagW);P.n+=Math.abs(w)};
// start: something began playing (opened, or reached in swipe mode). stop: credit the watch time.
RC.start=function(c,how){RC.stop();if(!c||type(c)==='post')return;RC.cur={c:c,t:Date.now(),how:how};var e=RC.P.seen[c.n]||[0,0,0];e[0]=Date.now();if(how==='open'){e[2]++;RC.add(c,1,0)}RC.P.seen[c.n]=e;RC.save()};
RC.stop=function(){var x=RC.cur;RC.cur=null;if(!x)return;var sec=Math.min(180,(Date.now()-x.t)/1000),e=RC.P.seen[x.c.n];if(e)e[1]+=sec;
 if(x.how==='swipe'&&sec<2.5)RC.add(x.c,-0.4,0);else if(sec>=3)RC.add(x.c,Math.min(3,sec/20),Math.min(2,sec/40));RC.save()};
RC.fav=function(c){RC.add(c,5,3);RC.save()};
RC.rank=function(l){if(l.length<2)return l;var P=RC.P,now=Date.now(),day=Math.floor(now/864e5);
 function mx(o){var m=1;for(var x in o)m=Math.max(m,Math.abs(o[x]));return m}
 var mt=mx(S.hist),mc=mx(P.c),mp=mx(P.p),str=Math.min(1,P.n/15);
 var tr=l.slice().sort(function(a,b){return (a.tr||0)-(b.tr||0)}),pct={};tr.forEach(function(c,i){pct[c.n]=i/(tr.length-1)});
 var sc=l.map(function(c){var cr=creatorOf(c),tags=c.tags||[];
  var ta=Math.min(1,tags.reduce(function(s,t){return s+(S.hist[t]||0)},0)/mt),ca=cr&&P.c[cr.k]?Math.max(-1,Math.min(1,P.c[cr.k]/mc)):0,pa=(P.p[srcKey(c)]||0)/mp;
  var pop=Math.log(1+(c.views||c.v||0))/Math.LN10/7,age=c.pub?(now-new Date(c.pub))/36e5:200,fresh=Math.exp(-age/72);
  var v=str*(1.2*ta+1.0*ca+0.3*pa)+(1-0.4*str)*(0.6*pct[c.n]+0.3*fresh+0.3*pop)+0.08*hsh(c.n+':'+day);
  var e=P.seen[c.n];if(e){var since=(now-e[0])/36e5;v-=(e[1]>=15||e[2]>0)?0.5+1.2*Math.exp(-since/72):0.15}
  return {c:c,v:v,k:cr?cr.k:c.n}}).sort(function(a,b){return b.v-a.v});
 var out=[],recent=[];while(sc.length){var bi=0,bv=-1e9;for(var i=0;i<Math.min(15,sc.length);i++){var r=sc[i],n=0;recent.forEach(function(k){if(k===r.k)n++});var v=r.v-0.35*n-(recent[recent.length-1]===r.k?0.3:0);if(v>bv){bv=v;bi=i}}
  var pick=sc.splice(bi,1)[0];out.push(pick.c);recent.push(pick.k);if(recent.length>6)recent.shift()}
 return out};
function thumb(c,rank){
 var u=thumbUrl(c);var img=u?h('img',{alt:'',loading:'lazy',src:u}):null;if(img){img.onerror=function(){img.remove()};if(c.p==='YouTube'&&type(c)==='video')img.onload=function(){if(ytDead(img))markDead(c,img)}}
 var st=type(c)==='stream';
 var sk=srcKey(c);
 return h('div',{class:'thumb '+c.p},[h('span',{class:'init',text:(c.name||c.t||'?').charAt(0).toUpperCase()}),img,c.official&&!st?h('span',{class:'badge off',title:'Official Rockstar Games video',role:'img','aria-label':'Official Rockstar Games video'},[logo(sk,16),h('span',{class:'ot',text:'OFFICIAL'})]):h('span',{class:'badge',title:LABEL[sk]||c.p,role:'img','aria-label':LABEL[sk]||c.p},[logo(sk,16)]),c.kind==='live'&&LIVE&&LIVE.indexOf(c)>=0?h('span',{class:'live',text:c.viewers!=null?'LIVE · '+fmt(c.viewers):'LIVE'}):null,rank?h('span',{class:'rank',text:'#'+rank}):null,S.saved[c.n]?h('span',{class:'saved',text:'★ Favorite'}):null]);
}
function hsh(x){x=String(x);var a=2166136261;for(var i=0;i<x.length;i++){a^=x.charCodeAt(i);a=Math.imul(a,16777619)}return (a>>>0)/4294967296}
// Stand-in favorite counts until accounts and a database exist: seeded from views (or a fixed number for items without views),
// split by how recently the item was posted. Your own favorites are added on top.
function favs(c){
 if(!c._f){var r=hsh(c.n),all=c.views!=null?Math.max(1,Math.round(Math.sqrt(c.views)*(0.5+r*0.6))):c.viewers!=null?Math.max(1,Math.round(Math.sqrt(c.viewers)*12*(0.5+r*0.6))):Math.round(40+r*500);
  var age=c.pub?(Date.now()-new Date(c.pub))/36e5:24+hsh(c.n+'a')*2000;
  function part(hrs,lo,span){return age<=hrs?0.55+0.4*(1-age/hrs):lo+hsh(c.n+hrs)*span}
  var m=Math.min(1,part(720,0.04,0.1)),w=Math.min(m,part(168,0.01,0.04)),d=Math.min(w,part(24,0.001,0.01));
  c._f={d:Math.round(all*d),w:Math.round(all*w),m:Math.round(all*m),a:all}}
 var f={d:c._f.d,w:c._f.w,m:c._f.m,a:c._f.a},ts=S.saved[c.n];
 if(ts){var t=typeof ts==='number'?Date.now()-ts:Infinity;f.a++;if(t<=2592e6)f.m++;if(t<=6048e5)f.w++;if(t<=864e5)f.d++}
 return f;
}
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
