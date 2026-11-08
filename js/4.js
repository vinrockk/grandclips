var HOST=location.hostname||'localhost';
// Phones and tablets only allow videos inside embeds to start on their own when muted, so they start muted with a Tap to unmute button.
var MOBILE=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches);
var S={sec:'clips',sub:{clips:'foryou',videos:'foryou',streams:'live',threads:'hot',rankings:'favs'},filt:{streams:'All',threads:'All'},csrc:'All',period:'d',rper:'w',user:load('gc_user',null),tag:'All',q:'',qin:'all',saved:load('gc_saved',{}),chans:load('gc_chans',{}),hist:load('gc_hist',{}),open:null};
function $(id){return document.getElementById(id)}
function h(tag,props,kids){var e=document.createElement(tag);props=props||{};for(var k in props){var v=props[k];if(k==='class')e.className=v;else if(k==='text')e.textContent=v;else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),v);else e.setAttribute(k,v)}(kids||[]).forEach(function(c){if(c)e.append(c)});return e}
function type(c){return c.ty||(c.n>300?'post':c.n>100?'stream':'video')}
function fmt(n){return n>=1e6?(n/1e6).toFixed(1).replace(/\.0$/,'')+'M':n>=1e3?(n/1e3).toFixed(1).replace(/\.0$/,'')+'K':String(n)}
function fetchYtLive(){fetch('/api/ytlive').then(function(r){return r.json()}).then(function(j){YTLIVE=(j.streams||[]).map(function(x){return {n:'youtube:'+x.id,ty:'stream',kind:'live',lang:x.lang,kw:x.kw||'',p:'YouTube',id:x.id,ch:x.ch,t:x.title||x.name,name:x.name,viewers:x.viewers,game:x.game,shot:x.thumb,sub:x.name}});if(LIVE){var keep=LIVE.filter(function(c){return c.p!=='YouTube'});LIVE=keep.concat(YTLIVE).sort(function(a,b){return (b.viewers||0)-(a.viewers||0)});if(S.sec==='streams'||S.sec==='rankings')render()}}).catch(function(){})}
function fetchLive(){if(Date.now()-(fetchYtLive.at||0)>6e5){fetchYtLive.at=Date.now();fetchYtLive()}fetch('/api/live',{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){LIVE_ERR=false;LIVE_AT=Date.now();var prev=LIVE||[];LIVE=(j.streams||[]).map(function(x){return {n:x.p.toLowerCase()+':'+x.ch,ty:'stream',kind:'live',lang:x.lang,kw:x.kw||'',p:x.p,ch:x.ch,t:x.title||x.name,name:x.name,viewers:x.viewers,game:x.game,shot:x.thumb,sub:x.name}}).concat(YTLIVE).sort(function(a,b){return (b.viewers||0)-(a.viewers||0)});var o=S.open;if(o&&o.kind==='live'&&$('lb').open&&!LIVE.some(function(x){return x.n===o.n})){AUTO.prevLive=prev;ended(o)}if(S.sec==='streams'||S.sec==='watchlist'||S.sec==='rankings'||searching())render();tryOpen()}).catch(function(){LIVE_ERR=true;if(!LIVE)LIVE=[];if(S.sec==='streams')render()})}
setInterval(function(){if(!document.hidden&&((S.sec==='streams'&&S.sub.streams==='live')||(S.open&&S.open.kind==='live'&&$('lb').open)))fetchLive()},120000);
function pageUrl(c){
 if(c.url)return c.url;
 if(c.clip)return 'https://clips.twitch.tv/'+c.clip;
 if(c.p==='YouTube')return (c.short?'https://www.youtube.com/shorts/':'https://www.youtube.com/watch?v=')+c.id;
 if(c.p==='TikTok')return 'https://www.tiktok.com/'+c.u+'/video/'+c.id;
 if(c.p==='Twitch')return c.vod?'https://www.twitch.tv/videos/'+c.vod:'https://www.twitch.tv/'+c.ch;
 if(c.p==='Kick')return c.vod?'https://kick.com/'+c.ch+'/videos/'+c.vod:'https://kick.com/'+c.ch;
 if(c.p==='X')return 'https://x.com/'+c.u+'/status/'+c.id;
 if(c.p==='Threads')return 'https://www.threads.com/@'+c.u+'/post/'+c.id;
 return '#';
}
function thumbUrl(c){
 if(c.shot&&LIVE&&LIVE.indexOf(c)>=0)return c.shot+(c.shot.indexOf('?')<0?'?':'&')+'t='+Math.floor(LIVE_AT/60000);
 if(c.thumb)return c.thumb;
 if(c.p==='YouTube')return 'https://i.ytimg.com/vi/'+c.id+'/hqdefault.jpg';
 if(c.p==='TikTok')return '/api/tiktok-thumb?url='+encodeURIComponent(pageUrl(c));
 if(c.shot&&LIVE&&LIVE.indexOf(c)>=0)return c.shot+(c.shot.indexOf('?')<0?'?':'&')+'t='+Math.floor(LIVE_AT/60000);
 return '';
}
function embedUrl(c){
 if(c.clip)return 'https://clips.twitch.tv/embed?clip='+encodeURIComponent(c.clip)+'&parent='+HOST+'&autoplay=true&muted='+MOBILE;
 if(c.p==='Reddit')return 'https://embed.reddit.com'+c.permalink+'?embed=true&theme=dark&showmedia=true&showmore=false';
 if(c.p==='Medal')return (c.embed||'https://medal.tv/clip/'+c.id)+((c.embed||'').indexOf('?')<0?'?':'&')+'autoplay=1&loop=0'+(MOBILE?'&muted=1':'');
 if(c.p==='Bluesky')return 'https://embed.bsky.app/embed/'+c.did+'/app.bsky.feed.post/'+c.id+'?colorMode=dark';
 if(c.p==='YouTube')return 'https://www.youtube-nocookie.com/embed/'+c.id+'?autoplay=1&playsinline=1&rel=0'+(MOBILE?'&mute=1':'')+'&enablejsapi=1&origin='+encodeURIComponent(location.origin);
 if(c.p==='TikTok')return 'https://www.tiktok.com/player/v1/'+c.id+'?autoplay=1&loop=0'+(MOBILE?'&muted=1':'')+'&volume_control=1&music_info=0&description=0&rel=0';
 if(c.p==='Twitch')return 'https://player.twitch.tv/?'+(c.vod?'video=v'+c.vod:'channel='+c.ch)+'&parent='+HOST+'&autoplay=true&muted='+MOBILE;
 if(c.p==='Kick')return 'https://player.kick.com/'+(c.vod?'video/'+c.vod:c.ch)+'?autoplay=true&muted='+MOBILE;
 if(c.p==='X')return 'https://platform.twitter.com/embed/Tweet.html?id='+c.id+'&theme=dark&dnt=true';
 if(c.p==='Threads')return 'https://www.threads.com/@'+c.u+'/post/'+c.id+'/embed';
 return '';
}
function who(c){var t=type(c);if(t==='stream')return c.sub;if(c.p==='News')return c.site;if(c.p==='Reddit')return t==='post'?'r/'+c.sub+' · u/'+c.u:c.u;return t==='post'?'@'+c.u:(c.u||'YouTube')}
function vmeta(c){var a=[who(c)];if(c.views!=null)a.push(fmt(c.views)+' views');else if(c.score!=null)a.push('▲ '+fmt(c.score));if(c.pub)a.push(ago(c.pub));else if(c.tags)a.push(c.tags.join(', '));return a.join(' · ')}
function toast(m){var t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.k);toast.k=setTimeout(function(){t.classList.remove('show')},2600)}
function bump(tags,w){(tags||[]).forEach(function(t){S.hist[t]=(S.hist[t]||0)+w});store('gc_hist',S.hist)}
function topTags(){return Object.keys(S.hist).sort(function(a,b){return S.hist[b]-S.hist[a]}).slice(0,3)}
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
