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
// For you (Vin, Nov 8): a YouTube-style recommender that learns each viewer's taste on their own device (no account needed).
// Signals: what they open and how long they watch it, quick skips in swipe mode, favorites, searches and tag taps,
// rolled up into the creators, tags and platforms they like. Old interest fades (halves every 2 weeks).
// Ranking mixes that taste with what's trending, fresh and popular, pushes down things they've already seen,
// avoids the same creator back to back, and reshuffles a little each day so the page doesn't go stale.
var RC={P:load('gc_prof',null),cur:null};
(function(){var P=RC.P;if(!P||!P.c)P=RC.P={c:{},p:{},seen:{},n:0,at:Date.now()};
 var k=Math.pow(0.5,(Date.now()-(P.at||Date.now()))/(14*864e5));if(k<0.999){['c','p'].forEach(function(m){for(var x in P[m]){P[m][x]*=k;if(Math.abs(P[m][x])<0.05)delete P[m][x]}});for(var t in S.hist){S.hist[t]*=k;if(S.hist[t]<0.05)delete S.hist[t]}P.n*=k;store('gc_hist',S.hist)}
 P.at=Date.now()})();
RC.save=function(){var P=RC.P,ks=Object.keys(P.seen);if(ks.length>1500){ks.sort(function(a,b){return P.seen[a][0]-P.seen[b][0]});ks.slice(0,ks.length-1200).forEach(function(x){delete P.seen[x]})}P.at=Date.now();store('gc_prof',P)};
