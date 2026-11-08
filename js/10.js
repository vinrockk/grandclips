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
function stopChat(){if(CHAT.ws){try{CHAT.ws.onclose=null;CHAT.ws.close()}catch(x){}CHAT.ws=null}}
function renderChat(c){var box=$('chat');stopChat();box.replaceChildren();if(!c||c.kind!=='live'||['Twitch','YouTube','Kick'].indexOf(c.p)<0)return;
 var tog=h('button',{type:'button',class:'pill sm','aria-expanded':String(CHAT.on),text:CHAT.on?'Hide chat':'Show chat',onclick:function(){CHAT.on=!CHAT.on;store('gc_chat',CHAT.on);renderChat(c)}});
 box.append(h('div',{class:'chath'},[h('h3',{},[logo(c.p,14),document.createTextNode('Live chat')]),tog]));
 if(!CHAT.on)return;
 if(c.p==='Twitch')box.append(h('iframe',{class:'chatf',title:'Twitch chat for '+(c.name||c.ch),src:'https://www.twitch.tv/embed/'+encodeURIComponent(c.ch)+'/chat?parent='+HOST+'&darkpopout'}));
 else if(c.p==='YouTube')box.append(h('iframe',{class:'chatf',title:'YouTube live chat',src:'https://www.youtube.com/live_chat?v='+encodeURIComponent(c.id)+'&embed_domain='+HOST+'&dark_theme=1'}));
 else kickChat(c,box);
}
function kickChat(c,box){
 var list=h('div',{class:'chatf kchat',role:'log','aria-live':'off','aria-label':'Kick chat for '+(c.name||c.ch)},[h('p',{class:'meta',text:'Connecting to Kick chat…'})]);box.append(list);
 function fail(){if(S.open!==c)return;stopChat();list.replaceChildren(h('p',{class:'meta',text:'Kick chat can’t show here right now.'}),h('a',{class:'pill sm',href:'https://kick.com/'+encodeURIComponent(c.ch)+'/chatroom',target:'_blank',rel:'noopener',text:'Open chat on Kick'}))}
 function add(name,text,color){if(!text)return;var near=list.scrollHeight-list.scrollTop-list.clientHeight<60;var w=list.querySelector('.meta');if(w&&!list.querySelector('.km'))w.remove();
  list.append(h('div',{class:'km'},[h('b',{text:name||'?',style:/^#[0-9a-f]{3,8}$/i.test(color||'')?'color:'+color:''}),document.createTextNode(String(text).replace(/\[emote:\d+:([^\]]+)\]/g,'$1'))]));
  while(list.children.length>150)list.firstChild.remove();if(near)list.scrollTop=list.scrollHeight}
 fetch('/api/kick-chat?ch='+encodeURIComponent(c.ch)).then(function(r){return r.json()}).then(function(j){if(S.open!==c)return;if(!j.id)return fail();
  var ws=CHAT.ws=new WebSocket('wss://ws-'+(/^[a-z0-9-]+$/.test(j.cluster||'')?j.cluster:'us2')+'.pusher.com/app/'+encodeURIComponent(j.key||'34bf7a0ff419a2a775b9')+'?protocol=7&client=js&version=8.4.0&flash=false');
  ws.onopen=function(){ws.send(JSON.stringify({event:'pusher:subscribe',data:{auth:'',channel:'chatrooms.'+j.id+'.v2'}}))};
  ws.onmessage=function(e){var m;try{m=JSON.parse(e.data)}catch(x){return}
   if(m.event==='pusher:error'){fail();return}
   if(m.event==='pusher:ping'){ws.send(JSON.stringify({event:'pusher:pong',data:{}}));return}
   if(m.event==='pusher_internal:subscription_succeeded'){var w=list.querySelector('.meta');if(w)w.textContent='Connected. Waiting for messages…';return}
   if(m.event!=='App\\Events\\ChatMessageEvent')return;var d;try{d=typeof m.data==='string'?JSON.parse(m.data):m.data}catch(x){return}
   add(d.sender&&d.sender.username,d.content,d.sender&&d.sender.identity&&d.sender.identity.color)};
  ws.onerror=fail;ws.onclose=function(){if(CHAT.ws===ws)fail()}}).catch(fail)}

