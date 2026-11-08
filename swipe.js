// Swipe mode (Vin, Nov 8): on phones the Clips tab gets a full-screen vertical feed like TikTok.
// Every short clip from every source in one feed: the clip on screen autoplays on loop, swipe up for the next one.
// Only the clip on screen has a player; the others show their thumbnail until you reach them.
// A see-through layer sits over each player so swipes move the feed instead of going into the embed.
// Sound starts on (Vin, Nov 8). Turning it off is remembered on this device.
var SW={on:false,l:[],i:-1,muted:!!load('gc_swmute',false),chk:null,io:null,pushed:false,box:null};
function swIcon(d,size,fill){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');size=size||24;sv.setAttribute('width',size);sv.setAttribute('height',size);sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');pa.setAttribute('d',d);if(fill){pa.setAttribute('fill','currentColor')}else{pa.setAttribute('fill','none');pa.setAttribute('stroke','currentColor');pa.setAttribute('stroke-width','2');pa.setAttribute('stroke-linecap','round');pa.setAttribute('stroke-linejoin','round')}sv.append(pa);return sv}
var SWI={close:'M6 6l12 12M18 6L6 18',on:'M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12',off:'M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6',ext:'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5',play:'M7 4.5v15l12-7.5z',star:'M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.6l-5.9 3.2 1.2-6.5L2.5 9.7l6.6-.9z'};
// Swipe mode is vertical short-form only (Vin, Nov 8): TikToks, Reels, YouTube Shorts and other vertical clips.
// Twitch/Kick stream clips, live streams and full-length videos stay out.
function swOk(c){return c.kind!=='live'&&c.kind!=='vod'&&(c.p==='TikTok'||c.p==='Instagram'||(c.p==='YouTube'&&!!c.short)||!!c.vert)}
function swList(){var l=S.sec==='clips'&&!searching()?list():langFirst(VIDEOS.filter(isShort));return l.filter(swOk)}
function swEmbed(c){var m=SW.muted;
 if(c.clip)return 'https://clips.twitch.tv/embed?clip='+encodeURIComponent(c.clip)+'&parent='+HOST+'&autoplay=true&muted='+m;
 if(c.p==='YouTube')return 'https://www.youtube-nocookie.com/embed/'+c.id+'?autoplay=1&playsinline=1&rel=0&mute=1&loop=1&playlist='+c.id+'&controls=0&modestbranding=1&enablejsapi=1&origin='+encodeURIComponent(location.origin);
 if(c.p==='TikTok')return 'https://www.tiktok.com/player/v1/'+c.id+'?autoplay=1&loop=1&muted=1&controls=0&progress_bar=1&play_button=0&volume_control=0&fullscreen_button=0&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=0';
 if(c.p==='Medal')return (c.embed||'https://medal.tv/clip/'+c.id)+((c.embed||'').indexOf('?')<0?'?':'&')+'autoplay=1&loop=1'+(m?'&muted=1':'');
 return embedUrl(c)}
// YouTube and TikTok players load muted so autoplay is never blocked, then get unmuted by message once loaded.
function swSound(fr,c,muted){if(!fr||!fr.contentWindow)return;
 if(c.p==='YouTube')[muted?'mute':'unMute','playVideo'].forEach(function(fn){fr.contentWindow.postMessage(JSON.stringify({event:'command',func:fn,args:[],id:'gcsw',channel:'widget'}),'*')});
 else if(c.p==='TikTok')[muted?'mute':'unMute','play'].forEach(function(t){fr.contentWindow.postMessage({'x-tiktok-player':true,type:t},'*')})}
function swVideo(c,box){var v=h('video',{class:'swv',autoplay:'',loop:'',playsinline:'',poster:c.thumb||''});v.muted=true;box.replaceChildren(v);
 function go(){var pr=v.play();if(pr&&pr.then)pr.then(function(){if(!SW.muted)v.muted=false}).catch(function(){})}
 function fail(){if(SW.l[SW.i]===c)box.replaceChildren(h('a',{class:'pill solid swfail',href:pageUrl(c),target:'_blank',rel:'noopener',text:'Watch on '+srcName(c)}))}
 v.addEventListener('error',fail);
 var src=kurl(c.video||''),m3=/\.m3u8(\?|$)/.test(src);if(!c.video){fail();return}
 if(!m3){v.src=src;go();return}
 hlsScript(function(ok){if(SW.l[SW.i]!==c)return;
  if(ok&&window.Hls.isSupported()){var hl=new Hls({xhrSetup:function(x,u){var k=kurl(u);if(k!==u)x.open('GET',k,true)}});v._hls=hl;hl.on(Hls.Events.ERROR,function(e,d){if(d&&d.fatal)fail()});hl.loadSource(src);hl.attachMedia(v);hl.on(Hls.Events.MANIFEST_PARSED,go);return}
  if(v.canPlayType('application/vnd.apple.mpegurl')){v.src=src;go();return}
  fail()})}
function swMount(i){var c=SW.l[i],sl=SW.box.children[i];if(!c||!sl)return;var box=sl.querySelector('.swp');
 if(c.kclip){swVideo(c,box);return}
 var fr=h('iframe',{class:'swf',src:swEmbed(c),allow:'autoplay; encrypted-media; picture-in-picture',title:c.t||'Clip'});
 if(!SW.muted&&(c.p==='YouTube'||c.p==='TikTok'))fr.addEventListener('load',function(){setTimeout(function(){if(SW.l[SW.i]!==c)return;swWatch(fr,c);swSound(fr,c,false)},700)});
 box.replaceChildren(fr)}
// Some phones (iPhone Safari) pause a player that is unmuted without a tap inside it. If the clip pauses right after
// we unmute it, mute it again so it keeps playing, and ask for a tap to turn the sound on.
function swWatch(fr,c){SW.chk={fr:fr,c:c,t:Date.now()};if(c.p==='YouTube')try{fr.contentWindow.postMessage(JSON.stringify({event:'listening',id:'gcsw',channel:'widget'}),'*')}catch(e){}}
window.addEventListener('message',function(e){var k=SW.chk;if(!k||!SW.on||!k.fr.contentWindow||e.source!==k.fr.contentWindow)return;
 if(Date.now()-k.t>4000){SW.chk=null;return}
 var d=e.data,paused=false;if(typeof d==='string')try{d=JSON.parse(d)}catch(x){return}if(!d)return;
 if(k.c.p==='YouTube')paused=(d.event==='onStateChange'&&d.info===2)||(d.event==='infoDelivery'&&d.info&&d.info.playerState===2);
 else paused=!!d['x-tiktok-player']&&d.type==='onStateChange'&&(d.value===2||(d.value&&d.value.state===2));
 if(!paused||SW.l[SW.i]!==k.c)return;
 SW.chk=null;SW.muted=true;swSound(k.fr,k.c,true);if(SW.box)SW.box.querySelectorAll('.swsnd').forEach(swSoundBtn);if(!SW.told){SW.told=1;toast('Tap the video for sound')}});
function swUnmount(i){var sl=SW.box&&SW.box.children[i];if(!sl)return;var box=sl.querySelector('.swp');var v=box.querySelector('video');if(v){if(v._hls)try{v._hls.destroy()}catch(x){}v.removeAttribute('src');try{v.load()}catch(x){}}box.replaceChildren()}
function swActive(i){if(i===SW.i)return;var old=SW.i;SW.i=i;if(old>=0)swUnmount(old);swMount(i);RC.start(SW.l[i],'swipe');
 if(i>=SW.l.length-3&&SW.more){SW.more()}}
function swSoundBtn(b){b.replaceChildren(swIcon(SW.muted?SWI.off:SWI.on,26));b.setAttribute('aria-label',SW.muted?'Turn sound on':'Turn sound off');b.setAttribute('aria-pressed',String(!SW.muted))}
function swToggleSound(){SW.muted=!SW.muted;SW.chk=null;store('gc_swmute',SW.muted);SW.box.querySelectorAll('.swsnd').forEach(swSoundBtn);
 var c=SW.l[SW.i],sl=SW.box.children[SW.i];if(!c||!sl)return;var v=sl.querySelector('video'),fr=sl.querySelector('iframe');
 if(v){v.muted=SW.muted;if(!SW.muted){var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}}
 else if(fr&&(c.p==='YouTube'||c.p==='TikTok'))swSound(fr,c,SW.muted);
 else if(fr)fr.src=swEmbed(c);
 toast(SW.muted?'Sound off':'Sound on')}
function swFav(c,b){if(!S.saved[c.n]&&!S.user){signIn('Sign in to add favorites',null,c);return}toggleFav(c);swFavBtn(c,b)}
function swFavBtn(c,b){var on=!!S.saved[c.n];b.replaceChildren(swIcon(SWI.star,28,on),h('span',{text:fmt(favs(c).a)}));b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?'In favorites':'Add to favorites')}
function swSlide(c,i){
 var u=thumbUrl(c),bg=u?h('img',{class:'swbg',alt:'',loading:'lazy',src:u}):null;if(bg)bg.onerror=function(){bg.remove()};
 var snd=h('button',{type:'button',class:'swr swsnd',onclick:function(e){e.stopPropagation();swToggleSound()}});swSoundBtn(snd);
 var fav=h('button',{type:'button',class:'swr swfav',onclick:function(e){e.stopPropagation();swFav(c,fav)}});swFavBtn(c,fav);
 var ext=h('a',{class:'swr',href:pageUrl(c),target:'_blank',rel:'noopener','aria-label':'Open on '+srcName(c),onclick:function(e){e.stopPropagation()}},[logo(srcKey(c),24)]);
 var ov=h('div',{class:'swov',onclick:function(){swToggleSound()}});
 return h('section',{class:'sws','aria-roledescription':'slide','aria-label':(i+1)+' of '+SW.l.length+': '+(c.t||'')},[bg,h('div',{class:'swp'}),ov,
  h('div',{class:'swinfo'},[h('b',{text:who(c)}),h('span',{class:'swt',text:c.t||''}),h('span',{class:'swsrc'},[logo(srcKey(c),14),document.createTextNode(srcName(c)+(c.views!=null?' · '+fmt(c.views)+' views':''))])]),
  h('div',{class:'swrail'},[fav,snd,ext])])}
function swOpen(start){var l=swList();if(!l.length){toast('No Shorts, Reels or TikToks loaded yet. Try again in a moment.');return}
 if($('lb').open)closeLb();
 SW.l=l;SW.i=-1;SW.on=true;var shown=0;
 var box=SW.box=h('div',{class:'swl',tabindex:'-1'});
 var wrap=h('div',{class:'swipe',role:'dialog','aria-modal':'true','aria-label':'Swipe through clips'},[box,
  h('div',{class:'swtop'},[h('span'),h('button',{type:'button',class:'swx','aria-label':'Close swipe mode',onclick:swClose},[swIcon(SWI.close,26)])]),
  load('gc_swhint',0)?null:h('div',{class:'swhint',text:'Swipe up for the next clip'})]);
 SW.io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>=0.6)swActive(Array.prototype.indexOf.call(box.children,e.target))})},{root:box,threshold:[0.6]});
 SW.more=function(){var end=Math.min(l.length,shown+20);for(var k=shown;k<end;k++){var s=swSlide(l[k],k);box.append(s);SW.io.observe(s)}shown=end;if(shown>=l.length)SW.more=null};
 SW.more();while(SW.more&&shown<=(start||0)+1)SW.more();
 document.body.append(wrap);document.documentElement.classList.add('swon');SW.wrap=wrap;
 if(start)box.scrollTop=start*box.clientHeight;
 box.focus({preventScroll:true});
 try{history.pushState({gcswipe:1},'',location.href);SW.pushed=true}catch(e){SW.pushed=false}
 if(!load('gc_swhint',0))setTimeout(function(){store('gc_swhint',1);var hh=wrap.querySelector('.swhint');if(hh)hh.remove()},3500)}
function swClose(){if(!SW.on)return;if(SW.pushed){SW.pushed=false;history.back();return}swEnd()}
function swEnd(){if(!SW.on)return;SW.on=false;RC.stop();if(SW.io)SW.io.disconnect();if(SW.i>=0)swUnmount(SW.i);if(SW.wrap)SW.wrap.remove();SW.wrap=SW.box=null;SW.i=-1;SW.more=null;document.documentElement.classList.remove('swon')}
window.addEventListener('popstate',function(){if(SW.on){SW.pushed=false;swEnd()}});
document.addEventListener('keydown',function(e){if(!SW.on)return;if(e.key==='Escape'){swClose();return}
 if(e.key==='ArrowDown'||e.key==='ArrowUp'||e.key==='j'||e.key==='k'){e.preventDefault();var d=(e.key==='ArrowDown'||e.key==='j')?1:-1;SW.box.scrollTo({top:Math.max(0,SW.i+d)*SW.box.clientHeight,behavior:'smooth'})}});
