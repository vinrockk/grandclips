function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
// Layout for clip and stream thumbnails: 4 per row (default) or 6 per row (Vin, Nov 8; List view removed; icons only, no text). Remembered on this device.
var VIEW=load('gc_view',{m:'cols'});if(['grid','cols'].indexOf(VIEW.m)<0)VIEW={m:'cols'};
var VIEWSECS=['clips','videos','streams','watchlist'];
// Fixed counts on wide screens; on narrow screens each mode keeps a minimum thumbnail width (phones: 2 and 3 per row).
// Clips (tall thumbnails) use 6 and 10 per row instead, and exactly 2 and 4 per row on phones (Vin, Nov 8).
function tallView(){return searching()?S.qin==='clips':S.sec==='clips'}
function phone(){return window.innerWidth<=640}
function viewCols(tall){var w=(document.querySelector('main').clientWidth||window.innerWidth),c=VIEW.m==='cols';if(phone())return tall?2:1;var n=tall?(c?6:10):(c?4:6),min=tall?(c?150:100):(c?160:110);return Math.max(1,Math.min(n,Math.floor((w+12)/(min+12))))}
function viewIcon(k){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg');sv.setAttribute('width','16');sv.setAttribute('height','16');sv.setAttribute('viewBox','0 0 16 16');sv.setAttribute('aria-hidden','true');
 var r={swipe:[[4.5,1,7,14]],list:[[1,2,5,4],[7,2.5,8,1.2],[7,4.6,5,1.2],[1,10,5,4],[7,10.5,8,1.2],[7,12.6,5,1.2]],cols:[[1,1,6,6],[9,1,6,6],[1,9,6,6],[9,9,6,6]],grid:[[1,3,3,4],[5,3,2.6,4],[8.4,3,2.6,4],[12,3,3,4],[1,9,3,4],[5,9,2.6,4],[8.4,9,2.6,4],[12,9,3,4]]}[k];
 r.forEach(function(a){var e=document.createElementNS(ns,'rect');e.setAttribute('x',a[0]);e.setAttribute('y',a[1]);e.setAttribute('width',a[2]);e.setAttribute('height',a[3]);e.setAttribute('rx','1');e.setAttribute('fill','currentColor');sv.append(e)});return sv}
// Phones: Clips offers Swipe mode or a 2-per-row grid; other tabs are one per row with no toggle.
function viewOn(){return phone()?S.sec==='clips'&&!searching():VIEWSECS.indexOf(S.sec)>=0||searching()}
function viewCtl(){var box=$('view');var on=viewOn();box.hidden=!on;if(!on)return;
 function seg(k,label){var act=VIEW.m===k;return h('button',{type:'button',class:'vbtn'+(act?' on':''),'aria-pressed':String(act),title:label,'aria-label':label,onclick:function(){if(VIEW.m===k)return;VIEW.m=k;store('gc_view',VIEW);render()}},[viewIcon(k)])}
 var kids=[h('div',{class:'vseg',role:'group','aria-label':'Layout'},tallView()?(phone()?[h('button',{type:'button',class:'vbtn',title:'Swipe mode','aria-label':'Swipe mode',onclick:function(){if(window.swOpen)swOpen(0)}},[viewIcon('swipe')]),h('button',{type:'button',class:'vbtn on','aria-pressed':'true',title:'Grid, 2 per row','aria-label':'Grid, 2 per row'},[viewIcon('cols')])]:[seg('cols','6 per row'),seg('grid','10 per row')]):[seg('cols','4 per row'),seg('grid','6 per row')])];
 box.replaceChildren.apply(box,kids)}
function applyView(g,force){if(!force&&VIEWSECS.indexOf(S.sec)<0)return;g.classList.add('cols');var n=viewCols(g.classList.contains('tallg'));g.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';g.style.setProperty('--n',n)}
window.addEventListener('resize',function(){clearTimeout(applyView.t);applyView.t=setTimeout(function(){var g=$('grid');if(g.classList.contains('cols')){var n=viewCols(g.classList.contains('tallg'));if(g.style.getPropertyValue('--n')!==String(n)||$('view').hidden!==!viewOn())render()}},200)});
function moreGrid(upto){var g=$('grid');var old=g.querySelector('.more');if(old)old.remove();if(IO)IO.disconnect();var end=Math.min(upto,GRID.l.length);for(var i=GRID.shown;i<end;i++)slot(g).append(card(GRID.l[i],GRID.ranked?i+1:0));GRID.shown=end;SHOW=Math.max(SHOW,end);
 if(end<GRID.l.length){var m=h('button',{class:'more',type:'button',text:'Show more ('+(GRID.l.length-end).toLocaleString()+' left)',onclick:function(){moreGrid(GRID.shown+PAGE)}});g.append(m);if('IntersectionObserver' in window){if(!IO)IO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)moreGrid(GRID.shown+PAGE)})},{rootMargin:'600px'});IO.observe(m)}}}
function allItems(){var seen={};var l=VIDEOS.concat(STREAMS,POSTS,LIVE||[]);l.forEach(function(c){seen[c.n]=1});Object.keys(S.chans).forEach(function(k){if(!seen[k])l.push(S.chans[k])});return l}
var INTRO={
 'Leaks':'Every leaked GTA 6 gameplay clip and breakdown from YouTube and TikTok in one place.',
 'Trailers':'The official GTA 6 trailers plus the best breakdowns, reuploads and reactions across platforms.',
 'Vice City':'Clips showing Vice City: beaches, streets, nightlife and everything spotted in the trailers.',
 'Lucia & Jason':'Clips about the two lead characters, from trailer moments to story theories.',
 'Theories':'Predictions and theories about GTA 6 features, map and story, ranked by how much people are watching.',
 'Funny':'The funniest GTA 6 clips and memes from every platform.',
 'GTA Online':'What GTA 6 might bring to online play: activities, heists and features.',
 'Gameplay':'GTA 6 gameplay footage and breakdowns from across YouTube.',
 'Map':'Everything about the GTA 6 map: Vice City, Leonida, size comparisons and locations.',
 'News':'The latest GTA 6 news: release date, price, pre-orders and announcements.',
 'Reactions':'Creators reacting to GTA 6 trailers, leaks and news.',
 'Graphics':'GTA 6 graphics, physics and detail breakdowns and comparisons.'
};
// Clips = short form (Shorts, TikTok, Twitch/Kick/Medal clips, Reddit videos, anything 60 seconds or less or vertical), shown with tall thumbnails.
// Videos = long form (YouTube videos, Rockstar trailers).
function isShort(c){return !!(c.short||c.vert||c.clip||c.kclip||c.p==='TikTok'||c.p==='Medal'||c.p==='Reddit'||c.p==='Instagram'||(c.dur>0&&c.dur<=60))}
function isVid(sec){return sec==='clips'||sec==='videos'}
function vidSec(c){return isShort(c)?'clips':'videos'}
// Rankings is hidden until the site has enough traction (Vin, Nov 12). Set RANKINGS_ON=true to bring the tab back.
var RANKINGS_ON=false;
var SECS=[['clips','Clips'],['videos','Videos'],['streams','Streams'],['threads','Threads'],['rankings','Rankings']].filter(function(s){return RANKINGS_ON||s[0]!=='rankings'});
var SUBS={clips:[['foryou','For you'],['best','Best of'],['trending','Trending'],['views','Most viewed']],videos:[['foryou','For you'],['best','Best of'],['trending','Trending'],['views','Most viewed']],streams:[['live','Live now'],['vod','Past streams']],threads:[['hot','Hot today'],['top','Top this week']],rankings:[['favs','Most favorited'],['creators','Top creators']]};
var FILTERS={streams:['All'],threads:['All']};
var CSRC=['All','YouTube','Shorts','TikTok','Twitch','Kick','Reddit','Medal','Rockstar'];
// No source filters (Vin, Nov 8): the site mixes every platform together, so every list shows all sources.
var CSRC_BY={clips:['All'],videos:['All']};
var SRCNOTE={Twitch:'Twitch clips show up once the Twitch keys are added in Vercel.',Medal:'Medal clips show up once a Medal API key is added in Vercel.',Kick:'No Kick clips came through yet. Kick sometimes blocks servers; the real build may need Kick’s API key.',Reddit:'No Reddit videos came through yet. If Reddit blocks the server, it needs a free Reddit app key.',Bluesky:'No Bluesky posts yet. Bluesky search may need a Bluesky app password added in Vercel.',News:'No GTA news stories came through from IGN, Rockstar Intel or GTAForums yet.',Rockstar:'Rockstar’s official videos come from YouTube and show up once the YouTube feed loads.',YouTube:'YouTube live streams are checked once an hour.'};
