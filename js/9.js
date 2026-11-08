function crownSvg(){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');sv.setAttribute('width','18');sv.setAttribute('height','18');sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');sv.setAttribute('class','crown');pa.setAttribute('d','M3 7.5l4.6 4.1L12 4.5l4.4 7.1L21 7.5l-1.9 10.5H4.9z');pa.setAttribute('fill','#FFC23D');pa.setAttribute('stroke','#B8860B');pa.setAttribute('stroke-width','1.2');pa.setAttribute('stroke-linejoin','round');sv.append(pa);return sv}
function starSvg(filled){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');sv.setAttribute('width','16');sv.setAttribute('height','16');sv.setAttribute('viewBox','0 0 16 16');sv.setAttribute('aria-hidden','true');pa.setAttribute('d','M8 1.2l2.05 4.25 4.65.62-3.4 3.22.86 4.61L8 11.65 3.84 13.9l.86-4.61-3.4-3.22 4.65-.62z');pa.setAttribute('fill',filled?'currentColor':'none');pa.setAttribute('stroke','currentColor');pa.setAttribute('stroke-width','1.6');pa.setAttribute('stroke-linejoin','round');sv.append(pa);return sv}
function saveBtn(){var on=!!S.saved[S.open.n];var b=$('save');b.replaceChildren(starSvg(on),document.createTextNode(on?'In favorites':'Add to favorites'));b.setAttribute('aria-pressed',String(on));b.className='pill'+(on?' solid':'')}
function toggleFav(c){var on=!S.saved[c.n];if(on){S.saved[c.n]=Date.now();RC.fav(c)}else delete S.saved[c.n];store('gc_saved',S.saved);if(c.kind==='live'){if(on)S.chans[c.n]={n:c.n,ty:'stream',kind:'live',p:c.p,ch:c.ch,t:c.name,name:c.name,sub:c.name};else delete S.chans[c.n];store('gc_chans',S.chans)}if(typeof accFav==='function')accFav(c,on);if(S.open===c)saveBtn();render();toast(on?'Added to your favorites':'Removed from your favorites')}
$('save').onclick=function(){var c=S.open;if(!S.saved[c.n]&&!S.user){signIn('Sign in to add favorites',null,c);return}toggleFav(c)};
// Sign-in and the profile sheet live in account.js.
function ttSound(){var f=$('player').querySelector('iframe');if(!f||!S.open||S.open.p!=='TikTok')return;(MOBILE&&!S.unmuted?['mute','play']:['play','unMute']).forEach(function(t){f.contentWindow.postMessage({'x-tiktok-player':true,type:t},'*')})}
window.addEventListener('message',function(e){var host='';try{host=new URL(e.origin).hostname}catch(x){}if(!/(^|\.)tiktok\.com$/.test(host))return;var d=e.data;if(typeof d==='string'){try{d=JSON.parse(d)}catch(x){return}}if(d&&d.type==='onPlayerReady')ttSound();if(d&&d.type==='onStateChange'&&d.value===0&&S.open&&S.open.p==='TikTok')ended(S.open)});
window.addEventListener('message',function(e){var host='';try{host=new URL(e.origin).hostname}catch(x){}if(!/(^|\.)youtube(-nocookie)?\.com$/.test(host))return;if(ytEnded(e.data)&&S.open&&S.open.p==='YouTube')ended(S.open)});
// Autoplay: when the open video ends (or a live stream goes offline), count down 5 seconds and play the next one.
// YouTube and TikTok report the end through their player messages, Twitch through its embed script,
// Kick live streams by dropping off the live list (checked every 2 minutes). Kick past broadcasts can't report an end.
var AUTO={on:load('gc_auto',true),t:null,done:null,prevLive:null};
function nextOf(c){
 if(!c||type(c)==='post')return null;
 if(c.kind==='live'){var L=LIVE||[],src=L.some(function(x){return x.n===c.n})?L:(AUTO.prevLive||L);var i=-1;src.forEach(function(x,k){if(x.n===c.n)i=k});
  for(var k=i+1;k<src.length;k++){var y=src[k];if(L.some(function(z){return z.n===y.n}))return L.filter(function(z){return z.n===y.n})[0]}
  return L.filter(function(z){return z.n!==c.n})[0]||null}
 var l=GRID.l||[],j=l.indexOf(c);
 if(j>=0)for(var m=j+1;m<l.length;m++){if(l[m]&&l[m].p&&type(l[m])===type(c))return l[m]}
 return (S.pool||[]).filter(function(x){return type(x)===type(c)})[0]||null;
}
function ended(c){
 if(!c||S.open!==c||AUTO.done===c||!$('lb').open)return;AUTO.done=c;
 var nx=nextOf(c);if(!nx)return;
 $('uptitle').textContent=nx.t;$('upbar').hidden=false;$('upgo').onclick=function(){openItem(nx)};
 if(!AUTO.on){$('upwhen').textContent=c.kind==='live'?'Stream ended. Up next':'Up next';$('upno').textContent='Dismiss';return}
 $('upno').textContent='Cancel';var left=5;
 function tick(){$('upwhen').textContent=(c.kind==='live'?'Stream ended. ':'')+'Up next in '+left+'s';if(left<=0){stopUp();openItem(nx);return}left--;AUTO.t=setTimeout(tick,1000)}
 tick();
}
function stopUp(){clearTimeout(AUTO.t);AUTO.t=null;clearTimeout(AUTO.dt);var b=$('upbar');if(b)b.hidden=true}
$('upno').onclick=function(){stopUp()};
$('nextb').onclick=function(){var nx=nextOf(S.open);if(nx)openItem(nx)};
function autoBtn(){var b=$('autob');b.textContent='Autoplay: '+(AUTO.on?'On':'Off');b.setAttribute('aria-pressed',String(AUTO.on))}
$('autob').onclick=function(){AUTO.on=!AUTO.on;store('gc_auto',AUTO.on);autoBtn();if(!AUTO.on&&AUTO.t){clearTimeout(AUTO.t);AUTO.t=null;$('upwhen').textContent='Up next';$('upno').textContent='Dismiss'}};
function ytEnded(data){var d=data;if(typeof d==='string'){try{d=JSON.parse(d)}catch(x){return false}}if(!d)return false;
 return (d.event==='onStateChange'&&d.info===0)||(d.event==='infoDelivery'&&d.info&&d.info.playerState===0)}
function ytListen(fr){try{fr.contentWindow.postMessage(JSON.stringify({event:'listening',id:'gc',channel:'widget'}),'*');fr.contentWindow.postMessage(JSON.stringify({event:'command',func:'addEventListener',args:['onStateChange'],id:'gc',channel:'widget'}),'*')}catch(x){}}
var TW={state:0,cbs:[]};
function twitchScript(cb){if(window.Twitch&&Twitch.Player)return cb(true);TW.cbs.push(cb);if(TW.state)return;TW.state=1;var sc=document.createElement('script');sc.src='https://player.twitch.tv/js/embed/v1.js';sc.async=true;
 sc.onload=function(){var l=TW.cbs;TW.cbs=[];TW.state=0;l.forEach(function(f){f(!!(window.Twitch&&Twitch.Player))})};sc.onerror=function(){var l=TW.cbs;TW.cbs=[];TW.state=0;l.forEach(function(f){f(false)})};document.head.append(sc)}
function twitchPlayer(c){
 var box=h('div',{class:'frame wide',id:'twp'});$('player').replaceChildren(box);
 twitchScript(function(ok){if(S.open!==c||!document.getElementById('twp'))return;
  if(!ok){$('player').replaceChildren(h('iframe',{class:'frame wide',src:embedUrl(c),allow:'autoplay; encrypted-media; fullscreen; picture-in-picture',allowfullscreen:'',title:c.t}));return}
  var o={width:'100%',height:'100%',parent:[HOST],autoplay:true,muted:MOBILE};if(c.vod)o.video='v'+c.vod;else o.channel=c.ch;
  var pl=TW.pl=new Twitch.Player('twp',o),played=false;
  pl.addEventListener(Twitch.Player.PLAYING,function(){played=true});
  pl.addEventListener(Twitch.Player.ENDED,function(){ended(c)});
  pl.addEventListener(Twitch.Player.OFFLINE,function(){if(played)ended(c)});
 });
}
// Kick clips: Kick's clip files play in a plain video player (HLS through hls.js where the browser can't play it natively).
var HLS={state:0,cbs:[]};
function hlsScript(cb){if(window.Hls)return cb(true);HLS.cbs.push(cb);if(HLS.state)return;HLS.state=1;var sc=document.createElement('script');sc.src='https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js';sc.async=true;sc.onload=function(){var l=HLS.cbs;HLS.cbs=[];HLS.state=0;l.forEach(function(f){f(!!window.Hls)})};sc.onerror=function(){var l=HLS.cbs;HLS.cbs=[];HLS.state=0;l.forEach(function(f){f(false)})};document.head.append(sc)}
