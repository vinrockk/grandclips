function go(sec){if(isVid(sec)&&(CSRC_BY[sec]||[]).indexOf(S.csrc)<0)S.csrc='All';if((sec==='streams'||sec==='rankings')&&Date.now()-LIVE_AT>60000)fetchLive();S.sec=sec;S.q='';S.qin='all';$('q').value='';render();window.scrollTo(0,0)}
function card(c,rank){
 if(type(c)==='post')return h('button',{class:'post',type:'button',onclick:function(){openItem(c)}},[h('div',{class:'ph'},[h('span',{class:'src',title:srcName(c),role:'img','aria-label':srcName(c)},[logo(srcKey(c),14)]),h('span',{text:who(c)+(c.pub?' · '+ago(c.pub):'')}),rank?h('span',{class:'rank',style:'position:static;margin-left:auto',text:'#'+rank}):null,S.saved[c.n]?h('span',{class:'saved',style:'position:static',text:'★ Favorite'}):null]),c.p==='News'&&c.thumb?h('img',{class:'ptimg',src:c.thumb,alt:'',loading:'lazy'}):null,h('div',{class:'ptext',text:c.t})]);
 var th=thumb(c,rank);if(CARDTALL===null?S.sec==='clips':CARDTALL)th.classList.add('tall');
 return h('button',{class:'card',type:'button',onclick:function(){openItem(c)}},[th,h('span',{class:'title',text:c.t}),h('span',{class:'meta',text:S.sec==='rankings'?who(c)+' · ★ '+fmt(favs(c)[S.rper])+' favorites '+RNAME[S.rper]:type(c)==='stream'?(c.kind==='live'?[c.name,c.p,c.game].filter(Boolean).join(' · '):c.sub+' · '+c.p):vmeta(c)})]);
}
function render(){
 CARDTALL=null;var SR=searching();
 $('primary').replaceChildren.apply($('primary'),SECS.map(function(s){return h('button',{class:'pri'+(S.sec===s[0]?' on':''),'aria-current':S.sec===s[0]?'page':'false',onclick:function(){go(s[0])}},[s[0]==='streams'?h('span',{class:'dot','aria-hidden':'true'}):s[0]==='rankings'?crownSvg():null,document.createTextNode(s[1])])}));
 var si=$('signin');si.textContent=S.user?'@'+S.user:'Sign in';si.setAttribute('aria-label',S.user?'Signed in as @'+S.user+'. Account options':'Sign in');
 var n=allItems().filter(function(c){return S.saved[c.n]}).length;$('wlc').textContent=n;$('wl').className='pill'+(S.sec==='watchlist'?' on':'');
 $('q').placeholder={clips:'Search anything…',videos:'Search anything…',streams:'Search anything…',threads:'Search anything…',watchlist:'Search your favorites…',rankings:S.sub.rankings==='creators'?'Search creators…':'Search clips…'}[S.sec];
 var subs=SUBS[S.sec]||[];
 $('subnav').replaceChildren.apply($('subnav'),subs.map(function(t){var on=S.sub[S.sec]===t[0];return h('button',{class:'tab'+(on?' on':''),'aria-current':on?'page':'false',text:t[1],onclick:function(){S.sub[S.sec]=t[0];if(t[0]==='live'&&Date.now()-LIVE_AT>60000)fetchLive();render()}})}));
 $('subnav').style.display=subs.length&&!SR?'':'none';
 var tt=topTags(),head,sub=S.sub[S.sec];
 if(S.sec==='clips')head={foryou:['Clips for you',tt.length?'Short clips based on what you have watched and searched: '+tt.join(', '):'Open a few clips and this page learns what you like.'],
  best:[S.period==='d'?'Best clips of today':'Best clips this week','The top short GTA 6 clips from Shorts, TikTok, Twitch, Kick and more in one ranking'],
  trending:['Trending clips','Short clips gaining views fastest right now'],
  views:['Most viewed clips','The biggest short GTA 6 clips across every platform']}[sub];
 else if(S.sec==='videos')head={foryou:['Videos for you',tt.length?'Videos based on what you have watched and searched: '+tt.join(', '):'Open a few videos and this page learns what you like.'],
  best:[S.period==='d'?'Best videos of today':'Best videos this week','The top GTA 6 videos, trailers and breakdowns in one ranking'],
  trending:['Trending videos','Videos gaining views fastest right now'],
  views:['Most viewed videos','The biggest GTA 6 videos and trailers']}[sub];
 else if(S.sec==='streams')head=sub==='live'?['Live now','GTA streams live right now on Twitch, Kick and YouTube, with their latest screenshot']:['Past streams','Recent GTA 6 broadcasts you can watch back'];
 else if(S.sec==='threads')head=sub==='hot'?['Hot today','The hottest GTA 6 posts and news from the last 24 hours on Reddit, Bluesky and news sites']:['Top this week','The biggest GTA 6 posts of the week across X, Reddit, Threads, Bluesky and news sites'];
 else if(S.sec==='rankings')head=sub==='creators'?['Top creators '+RNAME[S.rper],'The creators, streamers and accounts whose GTA content gets the most favorites on GRANDCLIPS']:['Most favorited '+RNAME[S.rper],'The clips, streams and posts GRANDCLIPS members starred most. You need an account to favorite, so every star is one real person.'];
 else head=['Your favorites',n?'Everything you starred':'No favorites yet. Open a clip, stream or post and tap Add to favorites.'];
 if(SR)head=['Search results','Everything on GRANDCLIPS that matches, from every platform: clips, videos, streams and posts'];
 if(SR){$('feat').hidden=true;$('featcta').hidden=true;F.key=''}else{$('feat').hidden=false;renderFeat()}
 viewCtl();
 $('h1').textContent=head[0];$('lead').textContent=head[1];
 var p=$('period');p.replaceChildren();
 if(S.sec==='rankings')RPER.forEach(function(x){p.append(h('button',{class:'chip t'+(S.rper===x[0]?' on':''),'aria-pressed':String(S.rper===x[0]),text:x[1],onclick:function(){S.rper=x[0];render()}}))});
 if(!SR&&isVid(S.sec)&&sub==='best'){[['d','Today'],['w','This week']].forEach(function(x){p.append(h('button',{class:'chip t'+(S.period===x[0]?' on':''),'aria-pressed':String(S.period===x[0]),text:x[1],onclick:function(){S.period=x[0];render()}}))})}
 var chips=$('chips');chips.replaceChildren();var intro=$('intro');intro.replaceChildren();var srow=$('srcrow');srow.replaceChildren();
 function lchip(k,on,click){return h('button',{class:'chip lgc'+(on?' on':''),'aria-pressed':String(on),'aria-label':k==='All'?'All sources':LABEL[k],title:k==='All'?'All sources':LABEL[k],onclick:click},[k==='All'?document.createTextNode('All'):logo(k,18)])}
 if(SR){}
 else if(isVid(S.sec)){
  var tc={},shs=S.sec==='clips';VIDEOS.forEach(function(c){if(isShort(c)!==shs)return;c.tags.forEach(function(t){tc[t]=(tc[t]||0)+1})});var tags=['All'].concat(Object.keys(tc).sort(function(a,b){return tc[b]-tc[a]}));if(S.tag!=='All'&&tags.indexOf(S.tag)<0)tags.push(S.tag);
  tags.forEach(function(t){chips.append(h('button',{class:'chip'+(S.tag===t?' on':''),'aria-pressed':String(S.tag===t),text:t,onclick:function(){S.tag=t;if(t!=='All')bump([t],1);render()}}))});
  if(S.tag!=='All')intro.append(h('div',{class:'intro'},[h('small',{text:'Tag page · grandclips.com/tag/'+S.tag.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-')}),document.createTextNode(INTRO[S.tag]||'')]));
 } else if(FILTERS[S.sec]){
  if(S.sec==='streams'&&sub==='live')intro.append(h('div',{class:'outs'},[document.createTextNode('Also live:'),h('a',{href:'https://www.tiktok.com/search/live?q=gta',target:'_blank',rel:'noopener'},[logo('TikTok',16),document.createTextNode('TikTok LIVE')]),h('a',{href:'https://www.facebook.com/search/videos/?q=gta%20live',target:'_blank',rel:'noopener'},[logo('Facebook',16),document.createTextNode('Facebook Gaming')])]));
 }
 if(S.sec==='rankings')intro.append(h('p',{class:'meta',style:'margin:0 0 16px',text:'Test numbers: rankings use stand-in counts until real accounts are connected. Your own favorites are added on top.'}));
 if(S.sec==='rankings'){var g0=$('grid');g0.className='grid';g0.replaceChildren(renderRank());var hs0=toHash();if(location.hash!==hs0){try{history.replaceState(null,'',hs0)}catch(e){}}return}
 if(SR){renderSearch();var hs1=toHash();if(location.hash!==hs1){try{history.replaceState(null,'',hs1)}catch(e){}}return}
 var l=list(),all0=l.length;
 // Items already showing in the featured slider at the top aren't repeated in the grid (unless searching or filtering).
 if(((isVid(S.sec)&&S.csrc==='All'&&S.tag==='All')||(S.sec==='streams'&&S.filt.streams==='All'))&&!S.q.trim()){var fs={};featItems().forEach(function(c){fs[c.n]=1});l=l.filter(function(c){return !fs[c.n]})}
 var ranked=(isVid(S.sec)&&sub!=='foryou')||S.sec==='rankings';
 var noun={clips:['clip','clips'],videos:['video','videos'],streams:['stream','streams'],threads:['post','posts'],watchlist:['favorite','favorites'],rankings:sub==='creators'?['creator','creators']:['clip','clips']}[S.sec];
 $('cnt').textContent=l.length.toLocaleString()+' '+noun[l.length===1?0:1]+(isVid(S.sec)&&S.csrc!=='All'?' from '+LABEL[S.csrc]:'')+(isVid(S.sec)&&S.tag!=='All'?' tagged '+S.tag:'')+(S.q?' matching "'+S.q+'"':'');
 var g=$('grid');g.replaceChildren();g.className='grid'+(S.sec==='threads'?' posts mason':'')+(S.sec==='clips'?' tallg':'');g.style.gridTemplateColumns='';applyView(g);
 if(!l.length)g.append(h('div',{class:'empty',text:all0?'Everything here is in the featured slider above.':S.sec==='streams'&&S.sub.streams==='live'?(LIVE===null?'Checking who is live…':LIVE_ERR?'Couldn’t check live streams right now. Try again in a minute.':'None of the GTA channels on our list are live right now. Check back soon, or see Past streams.'):isVid(S.sec)&&S.csrc!=='All'&&SRCNOTE[S.csrc]&&!S.q?SRCNOTE[S.csrc]:S.sec==='threads'&&SRCNOTE[S.filt.threads]&&!S.q?SRCNOTE[S.filt.threads]:S.sec==='threads'&&S.sub.threads==='hot'&&!S.q?(S.filt.threads==='X'||S.filt.threads==='Threads'?S.filt.threads+' posts are hand-picked until its API is connected, so they show in Top this week.':'No posts from the last 24 hours yet. See Top this week.'):S.sec==='streams'&&S.sub.streams==='vod'&&!S.q?(VODS===null?'Loading past broadcasts…':VOD_LOG.twitch&&/not set/.test(VOD_LOG.twitch)?'Past broadcasts show up once the Twitch keys are added in Vercel.':'No past GTA broadcasts found right now.'):S.sec==='streams'&&S.filt.streams==='YouTube'&&!S.q?SRCNOTE.YouTube:S.sec==='watchlist'&&!S.q?'You have no favorites yet.':'Nothing matches. Try another filter or clear the search.'}));
 if(S.sec==='rankings'&&sub==='creators'){if(l.length){var box=h('div',{class:'crl'});l.slice(0,100).forEach(function(o,i){box.append(crRow(o,i+1))});g.append(box)}}
 else if(S.sec==='watchlist'){
  [['clips','Clips'],['videos','Videos'],['stream','Streams'],['post','Threads']].forEach(function(gr){var items=l.filter(function(c){var t=type(c);return t==='video'?vidSec(c)===gr[0]:t===gr[0]});if(items.length){g.append(h('h2',{class:'wlh',text:gr[1]}));items.forEach(function(c){g.append(card(c,0))})}});
 } else {var vk=[S.sec,S.sub[S.sec],S.tag,S.csrc,S.period,S.rper,S.filt[S.sec],S.q].join('|');if(vk!==VIEWKEY){VIEWKEY=vk;SHOW=PAGE}GRID={l:l,ranked:ranked,shown:0};moreGrid(SHOW)}
 var hs=toHash();if(location.hash!==hs){try{history.replaceState(null,'',hs)}catch(e){}}
}

