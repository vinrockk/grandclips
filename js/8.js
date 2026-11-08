var F={key:'',i:0,n:0,paused:false};
function featItems(){
 if(isVid(S.sec))return langFirst(VIDEOS.filter(function(c){return isShort(c)===(S.sec==='clips')}).sort(function(a,b){return (b.w-a.w)||(b.v-a.v)})).slice(0,5);
 if(S.sec==='streams')return langFirst(LIVE||[]).slice(0,5);
 return [];
}
function featGo(i){if(!F.n)return;F.i=(i+F.n)%F.n;var tr=$('feat').querySelector('.ftrack');if(tr)tr.style.transform='translateX('+(-100*F.i)+'%)';$('feat').querySelectorAll('.dotb').forEach(function(d,k){d.classList.toggle('on',k===F.i);d.setAttribute('aria-current',k===F.i?'true':'false')});$('feat').querySelectorAll('.fslide').forEach(function(sl,k){sl.setAttribute('aria-hidden',k===F.i?'false':'true');sl.tabIndex=k===F.i?0:-1})}
function renderFeat(){
 var items=featItems(),box=$('feat');
 var key=S.sec+'|'+items.map(function(c){return c.n}).join(',')+'|'+LIVE_AT+'|'+myLang()+LANG.cc;
 if(key===F.key)return;F.key=key;
 box.replaceChildren();F.n=items.length;if(F.i>=F.n)F.i=0;
 $('featcta').hidden=!items.length;
 if(!items.length)return;
 var isStream=S.sec==='streams';
 var track=h('div',{class:'ftrack'},items.map(function(c,k){
  var u=thumbUrl(c);
  if(c.p==='YouTube')u='https://i.ytimg.com/vi/'+c.id+'/maxresdefault.jpg';
  var kids=[];
  if(u){var bg=h('img',{class:'fbg',alt:'',src:u}),fg=h('img',{class:'ffg',alt:'',src:u});
   [bg,fg].forEach(function(im){im.onerror=function(){if(c.p==='YouTube'&&im.src.indexOf('maxres')>0)im.src='https://i.ytimg.com/vi/'+c.id+'/hqdefault.jpg';else im.remove()};if(c.p==='YouTube'&&!isStream)im.onload=function(){if(!ytDead(im))return;if(im.src.indexOf('maxres')>0)im.src='https://i.ytimg.com/vi/'+c.id+'/hqdefault.jpg';else markDead(c,im)}});kids.push(bg,fg)}
  else kids.push(h('span',{class:'init',text:(c.name||c.t).charAt(0).toUpperCase()}));
  kids.push(h('span',{class:'fshade'}));
  var kick=h('span',{class:'fkick'},[isStream?h('span',{class:'live',text:c.viewers!=null?'LIVE · '+fmt(c.viewers):'LIVE'}):null,document.createTextNode(isStream?'Featured stream':S.sec==='videos'?'Featured video':'Featured clip')]);
  var meta=isStream?[c.name,c.p,c.game].filter(Boolean).join(' · '):who(c)+' on '+srcName(c);
  kids.push(h('span',{class:'finfo'},[kick,h('h2',{text:c.t}),h('span',{class:'meta',text:meta})]));
  return h('button',{class:'fslide '+c.p,type:'button','aria-roledescription':'slide','aria-label':(k+1)+' of '+items.length+': '+c.t,onclick:function(){openItem(c)}},kids);
 }));
 var dots=h('div',{class:'dots'},items.map(function(c,k){return h('button',{class:'dotb',type:'button','aria-label':'Show featured '+(k+1),onclick:function(e){e.stopPropagation();featGo(k)}},[h('span')])}));
 box.append(track,dots);featGo(F.i);
}
(function(){var box=$('feat'),x0=null;
 box.addEventListener('mouseenter',function(){F.paused=true});box.addEventListener('mouseleave',function(){F.paused=false});
 box.addEventListener('focusin',function(){F.paused=true});box.addEventListener('focusout',function(){F.paused=false});
 box.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;F.paused=true},{passive:true});
 box.addEventListener('touchend',function(e){if(x0!==null){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)featGo(F.i+(dx<0?1:-1))}x0=null;F.paused=false},{passive:true});
 setInterval(function(){if(!F.paused&&F.n>1&&!document.hidden&&!$('lb').open)featGo(F.i+1)},3000);
})();

var SLUG={clips:'clips',videos:'videos',streams:'streams',threads:'threads',watchlist:'favorites',foryou:'for-you',best:'best-of',trending:'trending',views:'most-viewed',live:'live',vod:'past',hot:'hot',top:'top-week',rankings:'rankings',favs:'most-favorited',creators:'top-creators'};
var RSLUG={d:'today',w:'week',m:'month',a:'all-time'};
function unslug(x){if(x==='watchlist')return 'watchlist';for(var k in SLUG)if(SLUG[k]===x)return k;return null}
function toHash(){
 var q=[];
 if(isVid(S.sec)&&S.csrc!=='All')q.push('from='+encodeURIComponent(S.csrc.toLowerCase()));
 if(isVid(S.sec)&&S.tag!=='All')q.push('tag='+encodeURIComponent(S.tag));
 if(isVid(S.sec)&&S.sub[S.sec]==='best'&&S.period==='w')q.push('period=week');
 if(S.sec==='rankings')q.push('period='+RSLUG[S.rper]);
 if(FILTERS[S.sec]&&S.filt[S.sec]!=='All')q.push('source='+encodeURIComponent(S.filt[S.sec]));
 if(searching()){q.push('q='+encodeURIComponent(S.q.trim()));if(S.qin!=='all')q.push('in='+S.qin)}
 var on=$('lb').open&&S.open?S.open.n:S.want;if(on!=null)q.push('open='+encodeURIComponent(String(on)));
 return '#/'+SLUG[S.sec]+(SUBS[S.sec]?'/'+SLUG[S.sub[S.sec]]:'')+(q.length?'?'+q.join('&'):'');
}
function fromHash(){
 var m=location.hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?(?:\?(.*))?$/);if(!m)return;
 var sec=unslug(m[1]);if(!sec||['clips','videos','streams','threads','watchlist','rankings'].indexOf(sec)<0)return;
 S.sec=sec;var sub=m[2]&&unslug(m[2]);
 if(SUBS[sec]&&sub&&SUBS[sec].some(function(t){return t[0]===sub}))S.sub[sec]=sub;
 var params={};(m[3]||'').split('&').forEach(function(kv){var i=kv.indexOf('=');if(i>0)params[kv.slice(0,i)]=decodeURIComponent(kv.slice(i+1))});
 if(isVid(sec)){S.csrc='All';CSRC_BY[sec].forEach(function(k){if(k.toLowerCase()===params.from)S.csrc=k});S.tag=params.tag||'All';S.period=params.period==='week'?'w':'d'}
 if(sec==='rankings'){S.rper='w';for(var rk in RSLUG)if(RSLUG[rk]===params.period)S.rper=rk}
 if(FILTERS[sec])S.filt[sec]=FILTERS[sec].indexOf(params.source)>=0?params.source:'All';
 S.q=params.q||'';S.qin=['clips','videos','streams','threads'].indexOf(params.in)>=0?params.in:'all';if($('q'))$('q').value=S.q;
 S.want=params.open||null;if(S.want){clearTimeout(tryOpen.t);tryOpen.t=setTimeout(function(){tryOpen(true)},8000)}
}
window.addEventListener('hashchange',function(){if(location.hash===toHash())return;fromHash();if((S.sec==='streams'||S.sec==='rankings')&&Date.now()-LIVE_AT>60000)fetchLive();if(!S.want&&$('lb').open)closeLb();render()});
// Reopens the item named in the link once its feed has loaded. If it never shows up, a YouTube video or live channel is rebuilt from its id.
function tryOpen(last){var w=S.want;if(!w)return;if($('lb').open&&S.open&&String(S.open.n)===w){S.want=null;return}
 var c=allItems().filter(function(x){return String(x.n)===w})[0];
 if(!c&&last){var m=/^(yt|youtube|twitch|kick):(.+)$/.exec(w);if(m)c=m[1]==='yt'?{n:w,ty:'video',p:'YouTube',id:m[2],t:'YouTube video',tags:[]}:m[1]==='youtube'?{n:w,ty:'stream',kind:'live',p:'YouTube',id:m[2],t:'YouTube live stream',sub:'YouTube'}:{n:w,ty:'stream',kind:'live',p:m[1]==='twitch'?'Twitch':'Kick',ch:m[2],t:m[2],name:m[2],sub:m[2]}}
 if(c){S.want=null;clearTimeout(tryOpen.t);openItem(c)}else if(last){S.want=null;syncHash()}}
function syncHash(){var hs=toHash();if(location.hash!==hs){try{history.replaceState(null,'',hs)}catch(e){}}}
function openItem(c){
 if(c.p==='News'){window.open(c.url,'_blank','noopener');return}
 S.open=c;S.unmuted=false;TW.pl=null;bump(c.tags,2);var t=type(c);$('unm').hidden=!(MOBILE&&t!=='post'&&['YouTube','TikTok','Twitch','Kick'].indexOf(c.p)>=0);
 var cls=t==='post'?'post':(t==='video'&&(c.p==='TikTok'||c.short||c.vert))?'tall':'wide';
 stopUp();AUTO.done=null;
 if(c.clip&&c.dur){var dc=c;AUTO.dt=setTimeout(function(){ended(dc)},(c.dur+3)*1000)}
 if(c.p==='Twitch'&&!c.clip)twitchPlayer(c);else if(c.kclip)videoPlayer(c);else{var fr=h('iframe',{class:'frame '+cls,src:embedUrl(c),allow:'autoplay; encrypted-media; fullscreen; picture-in-picture',allowfullscreen:'',title:c.t});$('player').replaceChildren(fr);if(c.p==='YouTube')fr.addEventListener('load',function(){ytListen(fr)})}
 if(c.p==='TikTok'){setTimeout(ttSound,1200);setTimeout(ttSound,2500)}
 $('lt').textContent=t==='post'?'Post by '+who(c):c.t;
 $('lm').textContent=t==='stream'?(c.kind==='live'?[c.name,'Live on '+c.p,c.viewers!=null?fmt(c.viewers)+' watching':'',c.game].filter(Boolean).join(' · '):'Past broadcast on '+c.p+' · '+c.sub):t==='post'?'On '+srcName(c)+(c.pub?' · '+ago(c.pub):''):vmeta(c)+' · '+srcName(c);
 var s=$('src');s.href=pageUrl(c);s.replaceChildren(logo(srcKey(c),16),document.createTextNode('Open on '+(srcKey(c)==='Rockstar'?'YouTube':srcName(c))));
 saveBtn();
 $('ltags').replaceChildren.apply($('ltags'),(c.tags||[]).map(function(x){return h('button',{text:x,onclick:function(){S.sec=vidSec(c);S.tag=x;S.csrc='All';bump([x],1);closeLb();render();window.scrollTo(0,0)}})}));
 var pool=S.pool=t==='stream'?(c.kind==='live'?(LIVE||[]):STREAMS).filter(function(x){return x!==c}):t==='post'?POSTS.filter(function(x){return x!==c}):VIDEOS.filter(function(x){return x!==c&&isShort(x)===isShort(c)&&x.tags.some(function(y){return c.tags.indexOf(y)>=0})});
 $('nextb').hidden=!nextOf(c);autoBtn();
 renderChat(c);
 $('nexth').textContent=t==='stream'?'More streams':t==='post'?'More posts':'Up next';
 $('upnext').replaceChildren.apply($('upnext'),pool.slice(0,5).map(function(x){return t==='post'?card(x,0):h('button',{class:'ni',type:'button',onclick:function(){openItem(x)}},[thumb(x,0),h('div',{},[h('div',{class:'title',text:x.t,style:'font-size:14px'}),h('div',{class:'meta',text:who(x)+' · '+srcName(x)})])])}));
 $('lbbox').scrollTop=0;
 if(!$('lb').open)$('lb').showModal();
 syncHash();
}
