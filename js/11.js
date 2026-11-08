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

fetchGeo();
fromHash();
// The layout toggle sits at the far right of the category chips row, to save vertical space (Vin, Nov 8).
(function(){var cr=h('div',{class:'chiprow'});$('chips').before(cr);cr.append($('chips'),$('view'))})();
render();
tryOpen();
fetchVods();
if(S.want&&/^(twitch|kick|youtube):/.test(S.want))fetchLive();
fetchVideos();
fetchClips();
fetchPosts();
if(S.sec==='streams'||S.sec==='rankings')fetchLive();
