// Swipe mode (Vin, Nov 8): on phones the Clips tab gets a full-screen vertical feed like TikTok.
// Every short clip from every source in one feed: the clip on screen autoplays on loop, swipe up for the next one.
// Only the clip on screen plays; the others show their thumbnail until you reach them.
// A see-through layer sits over each clip so swipes move the feed instead of going into the player.
// Sound is always on (Vin, Nov 8). Phones only allow sound in an embedded player after a tap, so every YouTube clip
// plays in ONE player that stays loaded for the whole visit: the tap that opens Swipe mode (or, if the phone still
// refuses, one "Tap for sound" tap) unlocks sound in that player, and every clip after it keeps the sound.
// If the phone refuses sound, the clip keeps playing muted instead of stopping. Tapping the video pauses it.
var SW={on:false,l:[],i:-1,off:false,blocked:false,paused:false,chk:null,io:null,pushed:false,box:null,wrap:null,stage:null,pill:null};
function swIcon(d,size,fill){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');size=size||24;sv.setAttribute('width',size);sv.setAttribute('height',size);sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');pa.setAttribute('d',d);if(fill){pa.setAttribute('fill','currentColor')}else{pa.setAttribute('fill','none');pa.setAttribute('stroke','currentColor');pa.setAttribute('stroke-width','2');pa.setAttribute('stroke-linecap','round');pa.setAttribute('stroke-linejoin','round')}sv.append(pa);return sv}
var SWI={close:'M6 6l12 12M18 6L6 18',on:'M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12',off:'M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6',ext:'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5',play:'M7 4.5v15l12-7.5z',star:'M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.6l-5.9 3.2 1.2-6.5L2.5 9.7l6.6-.9z'};
// Swipe mode is vertical short-form only (Vin, Nov 8): TikToks, Reels, YouTube Shorts and other vertical clips.
// Twitch/Kick stream clips, live streams and full-length videos stay out.
function swOk(c){return c.kind!=='live'&&c.kind!=='vod'&&(c.p==='TikTok'||c.p==='Instagram'||(c.p==='YouTube'&&!!c.short)||!!c.vert)}
function swList(){var l=S.sec==='clips'&&!searching()?list():langFirst(VIDEOS.filter(isShort));return l.filter(swOk)}
// Muted only when the person turned sound off, or the phone refused sound and is waiting for a tap.
function swMuted(){return SW.off||SW.blocked}
function swEmbed(c){var m=swMuted();
 if(c.clip)return 'https://clips.twitch.tv/embed?clip='+encodeURIComponent(c.clip)+'&parent='+HOST+'&autoplay=true&muted='+m;
 if(c.p==='YouTube')return 'https://www.youtube-nocookie.com/embed/'+c.id+'?autoplay=1&playsinline=1&rel=0&mute=1&loop=1&playlist='+c.id+'&controls=0&modestbranding=1&enablejsapi=1&origin='+encodeURIComponent(location.origin);
 if(c.p==='TikTok')return 'https://www.tiktok.com/player/v1/'+c.id+'?autoplay=1&loop=1&muted=1&controls=0&progress_bar=1&play_button=0&volume_control=0&fullscreen_button=0&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=0';
 if(c.p==='Medal')return (c.embed||'https://medal.tv/clip/'+c.id)+((c.embed||'').indexOf('?')<0?'?':'&')+'autoplay=1&loop=1'+(m?'&muted=1':'');
 return embedUrl(c)}
// Per-clip YouTube (fallback) and TikTok players load muted so autoplay is never blocked, then get unmuted by message.
function swSound(fr,c,muted){if(!fr||!fr.contentWindow)return;
 if(c.p==='YouTube')[muted?'mute':'unMute','playVideo'].forEach(function(fn){fr.contentWindow.postMessage(JSON.stringify({event:'command',func:fn,args:[],id:'gcsw',channel:'widget'}),'*')});
 else if(c.p==='TikTok')[muted?'mute':'unMute','play'].forEach(function(t){fr.contentWindow.postMessage({'x-tiktok-player':true,type:t},'*')})}

// The screen for Swipe mode is built once and kept (hidden) between visits, so the shared YouTube player inside it
// never reloads and keeps the sound permission it was given.
function swShell(){if(SW.wrap)return SW.wrap;
 SWY.el=h('div');SW.stage=h('div',{class:'swstage'},[SWY.el]);
 SW.box=h('div',{class:'swl',tabindex:'-1'});
 SW.pill=h('button',{type:'button',class:'swtap',hidden:'',onclick:function(e){e.stopPropagation();swUnlock()}},[swIcon(SWI.off,20),h('span',{text:'Tap for sound'})]);
 SW.wrap=h('div',{class:'swipe','aria-hidden':'true',role:'dialog','aria-modal':'true','aria-label':'Swipe through clips'},[SW.stage,SW.box,
  h('div',{class:'swpz'},[swIcon(SWI.play,34,true)]),
  h('div',{class:'swtop'},[h('span'),h('button',{type:'button',class:'swx','aria-label':'Close swipe mode',onclick:swClose},[swIcon(SWI.close,26)])]),SW.pill]);
 SW.box.addEventListener('scroll',swTrack,{passive:true});
 document.body.append(SW.wrap);return SW.wrap}

// One YouTube player for every YouTube clip in Swipe mode (IFrame Player API).
var SWY={p:null,el:null,init:0,ready:false,fail:0,cur:null,idx:-1,loud:false,t:0,k:0,wait:0};
function swUsesYt(c){return !!c&&c.p==='YouTube'&&!SWY.fail}
function swYtInit(){if(SWY.init)return;SWY.init=1;swShell();
 function go(){try{SWY.p=new YT.Player(SWY.el,{width:'100%',height:'100%',host:'https://www.youtube-nocookie.com',
  playerVars:{playsinline:1,controls:0,rel:0,modestbranding:1,disablekb:1,fs:0,iv_load_policy:3,origin:location.origin},
  events:{onReady:function(){SWY.ready=true;var c=SWY.cur;if(!SWY.fail&&c&&SW.on&&SW.l[SW.i]===c)swYtLoad(c)},
   onStateChange:swYtState,onAutoplayBlocked:function(){swYtBlocked()}}})}catch(e){swYtFail()}}
 if(window.YT&&YT.Player)return go();
 var prev=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){if(typeof prev==='function')try{prev()}catch(e){}go()};
 var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';s.async=true;s.onerror=swYtFail;document.head.append(s)}
// If the shared player can't load, YouTube clips fall back to one player per clip.
function swYtFail(){if(SWY.fail)return;SWY.fail=1;var c=SW.l[SW.i];if(SW.on&&c&&c.p==='YouTube')swMount(SW.i)}
function swYtLoad(c){var p=SWY.p;SWY.cur=c;if(!SWY.ready||!p)return;
 SWY.idx=SW.i;swTrack();SW.stage.classList.remove('show');SWY.loud=!swMuted();
 try{if(SWY.loud)p.unMute();else p.mute();p.loadVideoById(c.id);p.playVideo()}catch(e){}
 SWY.t=Date.now();clearTimeout(SWY.k);SWY.k=setTimeout(swYtCheck,3000)}
function swYtOn(c){return SW.on&&!!c&&SWY.cur===c&&SW.l[SW.i]===c}
function swYtState(e){var c=SWY.cur;if(!swYtOn(c))return;var st=e&&e.data;
 if(st===1)SW.stage.classList.add('show');
 else if(st===0){try{SWY.p.seekTo(0,true);SWY.p.playVideo()}catch(x){}}
 else if(st===2&&!SW.paused&&SWY.loud&&Date.now()-SWY.t<5000)swYtBlocked()}
// A few seconds after starting a clip: if it isn't playing, the phone refused sound, so play it muted instead.
function swYtCheck(){var c=SWY.cur;if(!swYtOn(c)||SW.paused||!SWY.p)return;var st=-1;try{st=SWY.p.getPlayerState()}catch(e){}
 if(st===1||st===3)return;if(SWY.loud)swYtBlocked();else try{SWY.p.playVideo()}catch(e){}}
function swYtBlocked(){var c=SWY.cur;if(!swYtOn(c))return;SWY.loud=false;swSetBlocked(true);
 try{SWY.p.mute();SWY.p.playVideo()}catch(e){}SWY.t=Date.now();clearTimeout(SWY.k);SWY.k=setTimeout(swYtCheck,3000)}
// The YouTube player stays still while the feed scrolls, so move it along with its slide during a swipe.
function swTrack(){if(!SW.stage)return;var sl=SWY.idx>=0&&SW.box.children[SWY.idx];
 var y=sl?sl.offsetTop-SW.box.scrollTop:0;SW.stage.style.transform=y?'translateY('+y+'px)':''}

function swSetBlocked(on){SW.blocked=!!on;if(SW.pill)SW.pill.hidden=!on;swSoundBtns()}
function swSoundBtns(){if(SW.box)SW.box.querySelectorAll('.swsnd').forEach(swSoundBtn)}
function swSoundBtn(b){var m=swMuted();b.replaceChildren(swIcon(m?SWI.off:SWI.on,26));b.setAttribute('aria-label',m?'Turn sound on':'Turn sound off');b.setAttribute('aria-pressed',String(!m))}
function swPausedUi(){if(SW.wrap)SW.wrap.classList.toggle('swpaused',SW.paused)}

function swVideo(c,box){var v=h('video',{class:'swv',autoplay:'',loop:'',playsinline:'',poster:c.thumb||''});v.muted=true;box.replaceChildren(v);
 function go(){var pr=v.play();if(pr&&pr.then)pr.then(function(){if(swMuted())return;v.muted=false;
  setTimeout(function(){if(v.paused&&!SW.paused&&SW.l[SW.i]===c){v.muted=true;v.play().catch(function(){});swSetBlocked(true)}},400)}).catch(function(){})}
 function fail(){if(SW.l[SW.i]===c)box.replaceChildren(h('a',{class:'pill solid swfail',href:pageUrl(c),target:'_blank',rel:'noopener',text:'Watch on '+srcName(c)}))}
 v.addEventListener('error',fail);
 var src=kurl(c.video||''),m3=/\.m3u8(\?|$)/.test(src);if(!c.video){fail();return}
 if(!m3){v.src=src;go();return}
 hlsScript(function(ok){if(SW.l[SW.i]!==c)return;
  if(ok&&window.Hls.isSupported()){var hl=new Hls({xhrSetup:function(x,u){var k=kurl(u);if(k!==u)x.open('GET',k,true)}});v._hls=hl;hl.on(Hls.Events.ERROR,function(e,d){if(d&&d.fatal)fail()});hl.loadSource(src);hl.attachMedia(v);hl.on(Hls.Events.MANIFEST_PARSED,go);return}
  if(v.canPlayType('application/vnd.apple.mpegurl')){v.src=src;go();return}
  fail()})}
function swMount(i){var c=SW.l[i],sl=SW.box.children[i];if(!c||!sl)return;var box=sl.querySelector('.swp');
 if(swUsesYt(c)){swYtInit();SWY.cur=c;if(SWY.ready){swYtLoad(c);return}
  clearTimeout(SWY.wait);SWY.wait=setTimeout(function(){if(!SWY.ready&&SW.l[SW.i]===c)swYtFail()},8000);return}
 if(c.kclip){swVideo(c,box);return}
 var fr=h('iframe',{class:'swf',src:swEmbed(c),allow:'autoplay; encrypted-media; picture-in-picture',title:c.t||'Clip'});
 if(!swMuted()&&(c.p==='YouTube'||c.p==='TikTok'))fr.addEventListener('load',function(){setTimeout(function(){if(SW.l[SW.i]!==c)return;swWatch(fr,c);swSound(fr,c,false)},700)});
 box.replaceChildren(fr)}
// Per-clip players: if the clip pauses right after we unmute it, the phone refused sound. Mute it so it keeps
// playing, and show "Tap for sound".
function swWatch(fr,c){SW.chk={fr:fr,c:c,t:Date.now()};if(c.p==='YouTube')try{fr.contentWindow.postMessage(JSON.stringify({event:'listening',id:'gcsw',channel:'widget'}),'*')}catch(e){}}
window.addEventListener('message',function(e){var k=SW.chk;if(!k||!SW.on||!k.fr.contentWindow||e.source!==k.fr.contentWindow)return;
 if(Date.now()-k.t>4000){SW.chk=null;return}
 var d=e.data,paused=false;if(typeof d==='string')try{d=JSON.parse(d)}catch(x){return}if(!d)return;
 if(k.c.p==='YouTube')paused=(d.event==='onStateChange'&&d.info===2)||(d.event==='infoDelivery'&&d.info&&d.info.playerState===2);
 else paused=!!d['x-tiktok-player']&&d.type==='onStateChange'&&(d.value===2||(d.value&&d.value.state===2));
 if(!paused||SW.paused||SW.l[SW.i]!==k.c)return;
 SW.chk=null;swSetBlocked(true);swSound(k.fr,k.c,true)});
function swUnmount(i,next){var sl=SW.box&&SW.box.children[i],c=SW.l[i];if(!sl)return;
 if(swUsesYt(c)){clearTimeout(SWY.k);SW.stage.classList.remove('show');SWY.idx=-1;if(!swUsesYt(SW.l[next]))try{SWY.p&&SWY.ready&&SWY.p.pauseVideo()}catch(e){}return}
 var box=sl.querySelector('.swp');var v=box.querySelector('video');if(v){if(v._hls)try{v._hls.destroy()}catch(x){}v.removeAttribute('src');try{v.load()}catch(x){}}box.replaceChildren()}
function swActive(i){if(i===SW.i)return;var old=SW.i;SW.i=i;SW.chk=null;SW.paused=false;swPausedUi();if(old>=0)swUnmount(old,i);swMount(i);RC.start(SW.l[i],'swipe');
 if(i>=SW.l.length-3&&SW.more){SW.more()}}
// Runs inside a tap, so the phone lets the sound come on.
function swUnlock(){SW.off=false;SW.paused=false;swPausedUi();swSetBlocked(false);var c=SW.l[SW.i],sl=SW.box&&SW.box.children[SW.i];if(!c||!sl)return;
 if(swUsesYt(c)){if(!SWY.p||!SWY.ready)return;SWY.loud=true;try{SWY.p.unMute();SWY.p.playVideo()}catch(e){}SWY.t=Date.now();clearTimeout(SWY.k);SWY.k=setTimeout(swYtCheck,3000);return}
 var v=sl.querySelector('video'),fr=sl.querySelector('iframe');
 if(v){v.muted=false;var pr=v.play();if(pr&&pr.catch)pr.catch(function(){v.muted=true;v.play().catch(function(){});swSetBlocked(true)})}
 else if(fr&&(c.p==='YouTube'||c.p==='TikTok')){swWatch(fr,c);swSound(fr,c,false)}
 else if(fr)fr.src=swEmbed(c)}
function swToggleSound(){if(swMuted()){swUnlock();toast('Sound on');return}
 SW.off=true;swSoundBtns();var c=SW.l[SW.i],sl=SW.box.children[SW.i];if(!c||!sl)return;
 if(swUsesYt(c)){SWY.loud=false;try{SWY.p&&SWY.p.mute()}catch(e){}}
 else{var v=sl.querySelector('video'),fr=sl.querySelector('iframe');
  if(v)v.muted=true;else if(fr&&(c.p==='YouTube'||c.p==='TikTok'))swSound(fr,c,true);else if(fr)fr.src=swEmbed(c)}
 toast('Sound off')}
// Tapping the video pauses and resumes it (like TikTok). While sound is waiting for a tap, the tap turns it on.
function swTap(){if(SW.blocked){swUnlock();return}var c=SW.l[SW.i],sl=SW.box.children[SW.i];if(!c||!sl)return;
 var v=sl.querySelector('video'),fr=sl.querySelector('iframe'),yt=swUsesYt(c);
 if(!yt&&!v&&!(fr&&(c.p==='YouTube'||c.p==='TikTok')))return;
 SW.paused=!SW.paused;swPausedUi();
 if(yt){try{if(SW.paused)SWY.p.pauseVideo();else SWY.p.playVideo()}catch(e){}return}
 if(v){if(SW.paused)v.pause();else{var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}return}
 if(c.p==='YouTube')fr.contentWindow.postMessage(JSON.stringify({event:'command',func:SW.paused?'pauseVideo':'playVideo',args:[],id:'gcsw',channel:'widget'}),'*');
 else fr.contentWindow.postMessage({'x-tiktok-player':true,type:SW.paused?'pause':'play'},'*')}
function swFav(c,b){if(!S.saved[c.n]&&!S.user){signIn('Sign in to add favorites',null,c);return}toggleFav(c);swFavBtn(c,b)}
function swFavBtn(c,b){var on=!!S.saved[c.n];b.replaceChildren(swIcon(SWI.star,28,on),h('span',{text:fmt(favs(c).a)}));b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?'In favorites':'Add to favorites')}
function swSlide(c,i){
 var u=thumbUrl(c),bg=u?h('img',{class:'swbg',alt:'',loading:'lazy',src:u}):null;if(bg)bg.onerror=function(){bg.remove()};
 var snd=h('button',{type:'button',class:'swr swsnd',onclick:function(e){e.stopPropagation();swToggleSound()}});swSoundBtn(snd);
 var fav=h('button',{type:'button',class:'swr swfav',onclick:function(e){e.stopPropagation();swFav(c,fav)}});swFavBtn(c,fav);
 var ext=h('a',{class:'swr',href:pageUrl(c),target:'_blank',rel:'noopener','aria-label':'Open on '+srcName(c),onclick:function(e){e.stopPropagation()}},[logo(srcKey(c),24)]);
 var ov=h('div',{class:'swov',onclick:function(){swTap()}});
 return h('section',{class:'sws','aria-roledescription':'slide','aria-label':(i+1)+' of '+SW.l.length+': '+(c.t||'')},[bg,h('div',{class:'swp'}),ov,
  h('div',{class:'swinfo'},[h('b',{text:who(c)}),h('span',{class:'swt',text:c.t||''}),h('span',{class:'swsrc'},[logo(srcKey(c),14),document.createTextNode(srcName(c)+(c.views!=null?' · '+fmt(c.views)+' views':''))])]),
  h('div',{class:'swrail'},[fav,snd,ext])])}
function swOpen(start){var l=swList();if(!l.length){toast('No Shorts, Reels or TikToks loaded yet. Try again in a moment.');return}
 if($('lb').open)closeLb();
 swShell();var box=SW.box,wrap=SW.wrap;start=start||0;
 SW.l=l;SW.i=-1;SW.on=true;SW.off=false;SW.paused=false;swPausedUi();swSetBlocked(false);var shown=0;
 box.replaceChildren();
 SW.io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>=0.6)swActive(Array.prototype.indexOf.call(box.children,e.target))})},{root:box,threshold:[0.6]});
 SW.more=function(){var end=Math.min(l.length,shown+20);for(var k=shown;k<end;k++){var s=swSlide(l[k],k);box.append(s);SW.io.observe(s)}shown=end;if(shown>=l.length)SW.more=null};
 SW.more();while(SW.more&&shown<=start+1)SW.more();
 wrap.classList.add('open');wrap.removeAttribute('aria-hidden');document.documentElement.classList.add('swon');
 box.scrollTop=start?box.children[start].offsetTop:0;
 box.focus({preventScroll:true});
 try{history.pushState({gcswipe:1},'',location.href);SW.pushed=true}catch(e){SW.pushed=false}
 if(!load('gc_swhint',0)){var hh=h('div',{class:'swhint',text:'Swipe up for the next clip'});wrap.append(hh);setTimeout(function(){store('gc_swhint',1);hh.remove()},3500)}
 // Start the first clip now, inside the tap that opened Swipe mode, so the phone counts that tap as permission for sound.
 swActive(start)}
function swClose(){if(!SW.on)return;if(SW.pushed){SW.pushed=false;history.back();return}swEnd()}
function swEnd(){if(!SW.on)return;SW.on=false;RC.stop();if(SW.io)SW.io.disconnect();if(SW.i>=0)swUnmount(SW.i,-1);
 try{if(SWY.p&&SWY.ready)SWY.p.pauseVideo()}catch(e){}clearTimeout(SWY.k);clearTimeout(SWY.wait);SWY.cur=null;SWY.idx=-1;SW.chk=null;
 SW.wrap.classList.remove('open','swpaused');SW.wrap.setAttribute('aria-hidden','true');SW.box.replaceChildren();SW.stage.classList.remove('show');SW.stage.style.transform='';
 var hh=SW.wrap.querySelector('.swhint');if(hh)hh.remove();swSetBlocked(false);SW.paused=false;
 SW.i=-1;SW.more=null;document.documentElement.classList.remove('swon')}
window.addEventListener('popstate',function(){if(SW.on){SW.pushed=false;swEnd()}});
document.addEventListener('keydown',function(e){if(!SW.on)return;if(e.key==='Escape'){swClose();return}
 if(e.key==='ArrowDown'||e.key==='ArrowUp'||e.key==='j'||e.key==='k'){e.preventDefault();var d=(e.key==='ArrowDown'||e.key==='j')?1:-1,t=SW.box.children[Math.max(0,SW.i+d)];if(t)SW.box.scrollTo({top:t.offsetTop,behavior:'smooth'})}});
// On phones, load the shared YouTube player in the background while the Clips tab is open, so it's ready (and can
// take the opening tap as permission for sound) by the time Swipe mode is opened.
function swPrep(){if(SWY.init||!phone()||typeof S==='undefined'||S.sec!=='clips')return;
 if(window.requestIdleCallback)requestIdleCallback(swYtInit,{timeout:4000});else setTimeout(swYtInit,2500)}
window.addEventListener('load',function(){setTimeout(swPrep,1500)});
window.addEventListener('hashchange',function(){setTimeout(swPrep,800)});
