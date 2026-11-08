var LABEL={YouTube:'YouTube',Shorts:'YouTube Shorts',TikTok:'TikTok',Twitch:'Twitch',Kick:'Kick',X:'X',Reddit:'Reddit',Threads:'Threads',Bluesky:'Bluesky',Facebook:'Facebook Gaming',Rockstar:'Rockstar Games',Discord:'Discord',IGN:'IGN',Medal:'Medal',News:'News'};
// Black and white source logos (Simple Icons, CC0) in place of platform names.
function logo(k,size){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');size=size||16;sv.setAttribute('width',size);sv.setAttribute('height',size);sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');sv.setAttribute('class','lg');pa.setAttribute('d',LOGO[k]||LOGO.News);pa.setAttribute('fill-rule','evenodd');sv.append(pa);return sv}
function srcKey(c){if(c.official)return 'Rockstar';if(c.p==='YouTube'&&c.short)return 'Shorts';if(c.p==='News')return c.site==='IGN'?'IGN':'News';return c.p}
function srcName(c){return c.p==='News'?c.site:LABEL[srcKey(c)]||c.p}
var TAGRX=[['Trailers',/trailer/i],['Leaks',/leak/i],['Gameplay',/gameplay/i],['Theories',/theor|predict|everything we know|rumou?r|secret|hidden|easter egg/i],['Funny',/funny|meme|\blol\b|troll|fail|lmao|\u{1F602}|\u{1F923}/iu],['Vice City',/vice city|leonida|miami|\bkeys\b/i],['Lucia & Jason',/lucia|jason/i],['Map',/\bmap\b/i],['News',/news|release date|delay|price|pre-?order|launch|confirmed|announce/i],['Reactions',/react/i],['Graphics',/graphic|physics|realis|comparison|\bvs\.?\b|details/i],['GTA Online',/gta ?online|\brp\b|roleplay/i]];
function tagsOf(t){var l=TAGRX.filter(function(x){return x[1].test(t||'')}).map(function(x){return x[0]});return l.length?l:['GTA 6']}
function scoreTimes(o,amount){var hrs=o.pub?Math.max(0,(Date.now()-new Date(o.pub))/36e5):9999;o.v=amount;o.tr=amount/Math.pow(hrs+2,1.5);o.d=hrs<=24?amount:0;o.w=hrs<=168?amount:0;return o}
var SAMPLE=VIDEOS,YTV=null,XCL=[],CL_LOG={},SAMPLE_POSTS=POSTS,XPO=[],PO_LOG={},YTLIVE=[];
function mergeVideos(){
 var base=YTV||SAMPLE.filter(function(c){return c.p==='YouTube'});
 var tt=SAMPLE.filter(function(c){return c.p==='TikTok'});if(YTV)tt.forEach(function(c){c.d=0;c.w=0;c.v=0;c.tr=0});
 var by={},out=[];base.concat(XCL,tt).forEach(function(c){var o=by[c.n];if(o){if(c.official)o.official=true;return}by[c.n]=c;out.push(c)});
 VIDEOS=out.filter(function(c){return !DEAD[c.n]});
}
function fetchClips(){fetch('/api/clips').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){CL_LOG=j.log||{};
 XCL=(j.clips||[]).map(function(x){var o={ty:'video',lang:x.lang,kw:x.kw||'',t:x.t||'',u:x.u,pub:x.pub,thumb:x.thumb||'',url:x.url,dur:x.dur,tags:tagsOf(x.t)};
  if(x.src==='Rockstar'){o.n='yt:'+x.id;o.p='YouTube';o.id=x.id;o.official=true;o.short=x.short;o.views=x.views;o.thumb='';o.url=null}
  else if(x.src==='Twitch'){o.n='twc:'+x.id;o.p='Twitch';o.clip=x.id;o.ch=x.ch;o.views=x.views}
  else if(x.src==='Kick'){o.n='kc:'+x.id;o.p='Kick';o.kclip=x.id;o.ch=x.ch;o.video=x.video;o.views=x.views}
  else if(x.src==='Reddit'){o.n='rv:'+x.id;o.p='Reddit';o.id=x.id;o.permalink=x.permalink;o.sub=x.sub;o.score=x.score;o.vert=x.vert;o.u='r/'+x.sub}
  else if(x.src==='Medal'){o.n='md:'+x.id;o.p='Medal';o.id=x.id;o.embed=x.embed;o.views=x.views}
  else return null;
  return scoreTimes(o,o.views!=null?o.views:(o.score||0)*20)}).filter(Boolean);
 mergeVideos();render();tryOpen()}).catch(function(){})}
function fetchPosts(){fetch('/api/posts').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){PO_LOG=j.log||{};
 XPO=(j.posts||[]).map(function(x){var hrs=x.pub?Math.max(0,(Date.now()-new Date(x.pub))/36e5):999,sc=x.score!=null?x.score:60;
  var o={ty:'post',lang:x.lang,p:x.src,id:x.id,u:x.u,t:x.t,pub:x.pub,url:x.url,thumb:x.thumb||'',score:x.score,hot:sc/Math.pow(hrs+2,1.2),top:hrs<=168?sc:0};
  if(x.src==='Reddit'){o.n='rp:'+x.id;o.permalink=x.permalink;o.sub=x.sub}
  else if(x.src==='Bluesky'){o.n='bs:'+x.id;o.did=x.did;o.name=x.name}
  else if(x.src==='News'){o.n='nw:'+x.url;o.site=x.site;o.desc=x.desc}
  else return null;return o}).filter(Boolean);
 POSTS=SAMPLE_POSTS.concat(XPO);render();tryOpen()}).catch(function(){})}
var LIVE=null,LIVE_ERR=false,LIVE_AT=0,DEAD={},VODS=null,VOD_LOG={};
// YouTube serves a tiny 120px grey placeholder instead of a thumbnail when a video was deleted or made private: drop those.
function markDead(c,el){if(DEAD[c.n])return;DEAD[c.n]=1;VIDEOS=VIDEOS.filter(function(x){return x!==c});var i=GRID.l.indexOf(c);if(i>=0){GRID.l.splice(i,1);if(i<GRID.shown)GRID.shown--}
 var box=el&&el.closest&&el.closest('.card,.ni,.rrow');if(box)box.remove();if(featItems().length||(el&&el.closest&&el.closest('.fslide'))){clearTimeout(markDead.t);markDead.t=setTimeout(function(){F.key='';render()},300)}}
function ytDead(img){return img.naturalWidth>0&&img.naturalWidth<=120}
function fetchVods(){fetch('/api/vods').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){VOD_LOG=j.log||{};VODS=(j.vods||[]).map(function(x){return {n:'twv:'+x.id,ty:'stream',kind:'vod',lang:x.lang,p:'Twitch',vod:x.id,ch:x.ch,name:x.name,t:x.t,sub:x.name,views:x.views,pub:x.pub,thumb:x.thumb,url:x.url,dur:x.dur}});STREAMS=VODS;if(S.sec==='streams'||S.sec==='rankings'||searching())render();tryOpen()}).catch(function(){VODS=[];if(S.sec==='streams')render()})}
var PAGE=48,SHOW=PAGE,VIEWKEY='',GRID={l:[],ranked:false,shown:0},IO=null;
function ago(iso){var s=(Date.now()-new Date(iso))/1000;if(s<3600)return Math.max(1,Math.round(s/60))+' min ago';if(s<86400)return Math.round(s/3600)+' h ago';var d=Math.round(s/86400);if(d<30)return d+(d===1?' day ago':' days ago');var m=Math.round(d/30.4);if(m<12)return m+(m===1?' month ago':' months ago');var y=Math.round(d/365);return y+(y===1?' year ago':' years ago')}
function fetchVideos(){fetch('/api/videos').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){var vs=j.videos||[];if(!vs.length)return;var now=Date.now();
 var yt=vs.map(function(x){var hrs=Math.max(0,(now-new Date(x.pub))/36e5);return {n:'yt:'+x.id,ty:'video',p:'YouTube',lang:x.lang,kw:x.kw||'',id:x.id,t:x.t,u:x.ch,tags:x.tags.length?x.tags:['GTA 6'],short:x.short,views:x.views,pub:x.pub,v:x.views,tr:x.views/Math.pow(hrs+2,1.5),d:hrs<=24?x.views:0,w:hrs<=168?x.views:0}});
 YTV=yt;mergeVideos();render();tryOpen()}).catch(function(){})}
// Threads cards are as tall as their text: each card goes into whichever column is currently shortest.
function masonCols(g){return Math.max(1,Math.floor(((g.clientWidth||960)+16)/316))}
function slot(g){if(!g.classList.contains('mason'))return g;var cols=g.querySelectorAll(':scope>.mcol');if(!cols.length){var n=masonCols(g);g.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';for(var i=0;i<n;i++)g.append(h('div',{class:'mcol'}));cols=g.querySelectorAll(':scope>.mcol')}var best=cols[0];cols.forEach(function(c){if(c.offsetHeight<best.offsetHeight)best=c});return best}
window.addEventListener('resize',function(){clearTimeout(slot.t);slot.t=setTimeout(function(){var g=$('grid');if(g.classList.contains('mason')&&g.querySelectorAll(':scope>.mcol').length!==masonCols(g))render()},200)});
