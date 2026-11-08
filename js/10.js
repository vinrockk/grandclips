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
function vfall(c){$('player').replaceChildren(h('div',{class:'frame wide vfall'},[logo(srcKey(c),40),h('span',{text:'This clip can’t play here.'}),h('a',{class:'pill solid',href:pageUrl(c),target:'_blank',rel:'noopener',text:'Watch on '+srcName(c)})]))}
// Kick's clip server doesn't allow other sites to load its files, so they go through this site (/kclips/ is passed on to clips.kick.com by vercel.json).
function kurl(u){return String(u).replace(/^https:\/\/clips\.kick\.com\//,'/kclips/')}
function videoPlayer(c){
 if(!c.video){vfall(c);return}
 var v=h('video',{class:'frame wide',controls:'',autoplay:'',playsinline:'',poster:c.thumb||''});v.muted=MOBILE;$('player').replaceChildren(v);
 v.addEventListener('ended',function(){ended(c)});v.addEventListener('error',function(){if(S.open===c)vfall(c)});
 function go(){var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}
 var src=kurl(c.video),m3=/\.m3u8(\?|$)/.test(src);
 if(!m3){v.src=src;go();return}
 hlsScript(function(ok){if(S.open!==c)return;
  if(ok&&window.Hls.isSupported()){var hl=new Hls({xhrSetup:function(x,u){var k=kurl(u);if(k!==u)x.open('GET',k,true)}});hl.on(Hls.Events.ERROR,function(e,d){if(d&&d.fatal&&S.open===c)vfall(c)});hl.loadSource(src);hl.attachMedia(v);hl.on(Hls.Events.MANIFEST_PARSED,go);return}
  if(v.canPlayType('application/vnd.apple.mpegurl')){v.src=src;go();return}
  vfall(c)});
}
$('unm').onclick=function(){var c=S.open;if(!c)return;S.unmuted=true;$('unm').hidden=true;var f=$('player').querySelector('iframe');var vd=$('player').querySelector('video');if(vd){vd.muted=false;vd.play();return}
 if(c.clip&&f){f.src=f.src.replace('muted=true','muted=false');return}
 if(c.p==='YouTube'&&f){['unMute','playVideo'].forEach(function(fn){f.contentWindow.postMessage(JSON.stringify({event:'command',func:fn,args:[],id:'gc',channel:'widget'}),'*')})}
 else if(c.p==='TikTok'&&f){['unMute','play'].forEach(function(t){f.contentWindow.postMessage({'x-tiktok-player':true,type:t},'*')})}
 else if(c.p==='Twitch'&&TW.pl){try{TW.pl.setMuted(false);TW.pl.setVolume(1);TW.pl.play()}catch(x){}}
 else if(c.p==='Kick'&&f){f.src=f.src.replace('muted=true','muted=false')}};
function closeLb(){stopUp();$('player').replaceChildren();if($('lb').open)$('lb').close()}
$('close').onclick=closeLb;
$('lb').addEventListener('close',function(){RC.stop();stopUp();$('player').replaceChildren();stopChat();$('chat').replaceChildren();S.want=null;syncHash()});
$('lbbox').addEventListener('click',function(e){if(e.target===$('lbbox'))closeLb()});
var qt;$('q').addEventListener('input',function(e){S.q=e.target.value;S.qin='all';window.scrollTo(0,0);render();clearTimeout(qt);qt=setTimeout(function(){var m=list().filter(function(c){return c.tags});if(S.q.trim().length>2&&m.length)bump(m[0].tags,0.5)},800)});
$('wl').onclick=function(){go('watchlist')};
$('home').onclick=function(e){e.preventDefault();S.sub.clips='foryou';S.tag='All';go('clips')};
$('signin').onclick=function(){signIn('Sign in')};
$('getfeat').onclick=function(){toast('Featured spots: contact details coming soon.')};
$('plus').onclick=function(e){e.preventDefault();toast('GRANDCLIPS+ is a later phase.')};
$('nl').onsubmit=function(e){e.preventDefault();toast('Thanks! Newsletter signups get connected later.');e.target.reset()};

// Home screen app: register the service worker, and on phones offer to install
// (Android shows Chrome's install prompt; iPhone and iPad get the Share > Add to Home Screen steps).
(function(){
 var standalone=(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
 if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});
 if(standalone||!MOBILE||load('gc_a2hs',0)>Date.now())return;
 var ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),ev=null,box=$('a2hs'),msg=$('a2msg');
 function show(){if(!$('lb').open&&!$('sid').open)box.hidden=false;else setTimeout(show,5000)}
 if(ios){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');sv.setAttribute('width','16');sv.setAttribute('height','16');sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');pa.setAttribute('d','M12 3v12M7.5 7.5L12 3l4.5 4.5M5 11v9h14v-9');pa.setAttribute('fill','none');pa.setAttribute('stroke','currentColor');pa.setAttribute('stroke-width','2');pa.setAttribute('stroke-linecap','round');pa.setAttribute('stroke-linejoin','round');sv.append(pa);
  msg.replaceChildren(document.createTextNode('Tap Share'),sv,document.createTextNode('then “Add to Home Screen” for full-screen clips.'));setTimeout(show,6000)}
 window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();ev=e;msg.textContent='Full-screen clips, one tap away.';$('a2go').hidden=false;setTimeout(show,6000)});
 $('a2go').onclick=function(){if(!ev)return;ev.prompt();ev.userChoice.then(function(){ev=null;box.hidden=true},function(){box.hidden=true})};
 $('a2x').onclick=function(){box.hidden=true;store('gc_a2hs',Date.now()+14*864e5)};
 window.addEventListener('appinstalled',function(){box.hidden=true;store('gc_a2hs',Date.now()+3650*864e5)});
})();

// Live chat beside live streams, above More streams. Twitch and YouTube use their official chat embeds
// (read-only unless the viewer is signed in to that site). Kick has no chat embed, so its public chat feed
// is shown read-only here (unofficial: if Kick changes it, a link to Kick's chat shows instead).
var CHAT={on:load('gc_chat',!MOBILE),ws:null};
