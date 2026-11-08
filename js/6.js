var LMARK=[['es',/[ñ¿¡]/],['pt',/[ãõ]/],['de',/[ßäöü]/],['tr',/[ğşıİ]/],['pl',/[ąęłśżźń]/]];
function titleLang(t){t=String(t||'');
 if(/[가-힯]/.test(t))return 'ko';if(/[぀-ヿ]/.test(t))return 'ja';if(/[一-鿿]/.test(t))return 'zh';if(/[Ѐ-ӿ]/.test(t))return 'ru';if(/[؀-ۿ]/.test(t))return 'ar';if(/[ऀ-ॿ]/.test(t))return 'hi';if(/[฀-๿]/.test(t))return 'th';
 var sc={},words=t.toLowerCase().replace(/https?:\S+|#\S+|@\S+/g,' ').match(/[a-zÀ-ɏ']+/g)||[];
 words.forEach(function(w){for(var k in LSETS)if(LSETS[k][w])sc[k]=(sc[k]||0)+1});LMARK.forEach(function(m){if(m[1].test(t))sc[m[0]]=(sc[m[0]]||0)+2});
 var best='',b=0,second=0;for(var k in sc){if(sc[k]>b){second=b;b=sc[k];best=k}else if(sc[k]>second)second=sc[k]}
 return b>=2&&b>second?best:''}
function langOf(c){if(c._lg===undefined)c._lg=normLang(c.lang)||titleLang(c.t+' '+(c.desc||''));return c._lg}
function langRank(c){var l=langOf(c),a=myLang(),b=browserLang();if(l&&l===a)return 0;if(l&&b!==a&&l===b)return 1;return 2}
function langFirst(l){return l.map(function(c,i){return [langRank(c),i,c]}).sort(function(x,y){return x[0]-y[0]||x[1]-y[1]}).map(function(x){return x[2]})}
function fetchGeo(){fetch('/api/geo').then(function(r){return r.json()}).then(function(j){if(j.country&&j.country!==LANG.cc){LANG.cc=j.country;store('gc_cc',j.country);F.key='';render()}}).catch(function(){})}
// Search looks at everything we know about an item: title, creator, channel, platform, game, subreddit, news site, our tags,
// the creator's own tags (YouTube tags and #hashtags, Twitch and Kick stream tags) and descriptions. Accents are ignored (espanol finds Español).
function fold(s){s=String(s||'').toLowerCase();return s.normalize?s.normalize('NFD').replace(/[̀-ͯ]/g,''):s}
// Words match from their start, so leon finds Leonida but ign does not find sign.
function qWords(q){return fold(q).replace(/[^\p{L}\p{N}]+/gu,' ').split(' ').filter(Boolean)}
function match(c,q){if(!q)return true;if(c._s===undefined)c._s=' '+fold([c.t,who(c),c.name,c.u,c.p,LABEL[srcKey(c)],c.ch,c.sub,c.site,c.game,(c.tags||[]).join(' '),c.kw,c.desc,c.kind==='live'?'live now':c.kind==='vod'?'past stream vod':'',c.official?'official rockstar':''].join(' ')).replace(/[^\p{L}\p{N}]+/gu,' ');return qWords(q).every(function(w){return c._s.indexOf(' '+w)>=0})}
function csMatch(c){var f=S.csrc;if(f==='All')return true;if(f==='YouTube')return c.p==='YouTube'&&!c.short;if(f==='Shorts')return c.p==='YouTube'&&!!c.short;if(f==='Rockstar')return !!c.official;return c.p===f}
function list(){
 var q=S.q.trim().toLowerCase();
 if(S.sec==='rankings'){if(S.sub.rankings==='creators')return creators(S.rper).filter(function(o){return !q||(o.name+' '+o.p+' '+o.top.t).toLowerCase().indexOf(q)>=0});var pr=S.rper;return VIDEOS.filter(function(c){return match(c,q)&&favs(c)[pr]>0}).sort(function(a,b){return favs(b)[pr]-favs(a)[pr]})}
 if(S.sec==='watchlist')return allItems().filter(function(c){return S.saved[c.n]&&match(c,q)});
 if(S.sec==='streams')return langFirst((S.sub.streams==='live'?(LIVE||[]):STREAMS).filter(function(c){return c.kind===S.sub.streams&&(S.filt.streams==='All'||c.p===S.filt.streams)&&match(c,q)}));
 if(S.sec==='threads'){var k=S.sub.threads,now=Date.now();return langFirst(POSTS.filter(function(c){return (S.filt.threads==='All'||c.p===S.filt.threads)&&match(c,q)&&(k!=='hot'||(c.pub&&now-new Date(c.pub)<=864e5))}).sort(function(a,b){return b[k]-a[k]}))}
 var sh=S.sec==='clips';var l=VIDEOS.filter(function(c){return isShort(c)===sh&&(S.tag==='All'||c.tags.indexOf(S.tag)>=0)&&csMatch(c)&&match(c,q)});
 var key={best:S.period,trending:'tr',views:'v'}[S.sub[S.sec]];
 if(S.sub[S.sec]==='best')l=l.filter(function(c){return c[S.period]>0});
 if(key)l.sort(function(a,b){return b[key]-a[key]});
 else l.sort(function(a,b){function sc(c){return c.tags.reduce(function(s,t){return s+(S.hist[t]||0)},0)}return (sc(b)-sc(a))||(b.tr-a.tr)});
 return langFirst(l);
}
// Typing in the search bar searches the whole site (clips, videos, live and past streams, posts), not only the open tab.
// Favorites and Rankings keep their own search. Results: best title/creator match first, then most popular.
var CARDTALL=null;
function searching(){return !!S.q.trim()&&['clips','videos','streams','threads'].indexOf(S.sec)>=0}
function searchGroups(){var q=S.q.trim(),w=qWords(q);
 function strong(c){var t=' '+fold((c.t||'')+' '+who(c)+' '+(c.name||'')).replace(/[^\p{L}\p{N}]+/gu,' ');return w.every(function(x){return t.indexOf(' '+x)>=0})?1:0}
 function pop(c){return (c.viewers||0)*50+(c.views||c.v||0)+(c.score||0)*20}
 function rank(l,liveFirst){return l.map(function(c){return [c,(liveFirst&&c.kind==='live'?2:0)+strong(c),pop(c)]}).sort(function(a,b){return (b[1]-a[1])||(b[2]-a[2])}).map(function(x){return x[0]})}
 var seen={},st=(LIVE||[]).concat(STREAMS).filter(function(c){if(seen[c.n])return false;seen[c.n]=1;return true});
 return [['clips','Clips',rank(VIDEOS.filter(function(c){return isShort(c)&&match(c,q)})),12],
  ['videos','Videos',rank(VIDEOS.filter(function(c){return !isShort(c)&&match(c,q)})),8],
  ['streams','Streams',rank(st.filter(function(c){return match(c,q)}),true),8],
  ['threads','Threads',rank(POSTS.filter(function(c){return match(c,q)})),6]]}
function renderSearch(){
 if(Date.now()-LIVE_AT>60000&&!fetchLive.busy){fetchLive.busy=1;setTimeout(function(){fetchLive.busy=0},60000);fetchLive()}
 var gs=searchGroups(),tot=gs.reduce(function(s,x){return s+x[2].length},0),q=S.q.trim();
 if(S.qin!=='all'&&!gs.some(function(x){return x[0]===S.qin}))S.qin='all';
 var chips=$('chips');chips.replaceChildren();
 [['all','All',tot]].concat(gs.map(function(x){return [x[0],x[1],x[2].length]})).forEach(function(x){var on=S.qin===x[0];chips.append(h('button',{class:'chip'+(on?' on':''),'aria-pressed':String(on),text:x[1]+' '+x[2].toLocaleString(),onclick:function(){S.qin=x[0];render();window.scrollTo(0,0)}}))});
 var g=$('grid');g.replaceChildren();g.style.gridTemplateColumns='';
 if(S.qin==='all'){
  $('cnt').textContent=tot.toLocaleString()+(tot===1?' result':' results')+' for “'+q+'”';
  g.className='sres';
  if(!tot){g.append(h('div',{class:'empty',text:'Nothing matches “'+q+'” yet. Try fewer words or a different spelling.'}));return}
  gs.forEach(function(x){if(!x[2].length)return;
   var more=x[2].length>x[3];
   g.append(h('div',{class:'sgh'},[h('h2',{class:'wlh',text:x[1]+' · '+x[2].length.toLocaleString()}),more?h('button',{class:'chip',type:'button',text:'See all',onclick:function(){S.qin=x[0];render();window.scrollTo(0,0)}}):null]));
   var sg=h('div',{class:'grid'+(x[0]==='clips'?' tallg':'')+(x[0]==='threads'?' posts':'')});if(x[0]!=='threads')applyView(sg,true);
   CARDTALL=x[0]==='clips';x[2].slice(0,x[3]).forEach(function(c){sg.append(card(c,0))});g.append(sg)});
  CARDTALL=null;return}
 var grp=gs.filter(function(x){return x[0]===S.qin})[0],l=grp[2];
 $('cnt').textContent=l.length.toLocaleString()+' '+{clips:'clip',videos:'video',streams:'stream',threads:'post'}[S.qin]+' result'+(l.length===1?'':'s')+' for “'+q+'”';
 g.className='grid'+(S.qin==='clips'?' tallg':'')+(S.qin==='threads'?' posts mason':'');if(S.qin!=='threads')applyView(g,true);
 CARDTALL=S.qin==='clips';
 if(!l.length){g.append(h('div',{class:'empty',text:'No '+grp[1].toLowerCase()+' match “'+q+'”.'}));return}
 var vk='search|'+S.qin+'|'+q;if(vk!==VIEWKEY){VIEWKEY=vk;SHOW=PAGE}GRID={l:l,ranked:false,shown:0};moreGrid(SHOW)}
