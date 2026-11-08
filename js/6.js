function showCreator(o){var t=type(o.top);S.sec=t==='post'?'threads':t==='stream'?'streams':vidSec(o.top);if(t==='video'){S.sub[S.sec]='views';S.tag='All';S.csrc='All'}else if(t==='post')S.filt.threads='All';else{S.sub.streams=o.top.kind==='live'?'live':'vod';S.filt.streams='All'}S.q=o.name.replace(/^@/,'');$('q').value=S.q;render();window.scrollTo(0,0)}
// Your language first: every list puts items in your language on top (then your country's language), keeping the usual order inside each group.
// The language comes from the platform where it exists (YouTube audio language, Twitch and Kick stream language, Bluesky post language), otherwise from the title.
var LANGS=[['en','English'],['es','Español'],['pt','Português'],['fr','Français'],['de','Deutsch'],['it','Italiano'],['tr','Türkçe'],['pl','Polski'],['nl','Nederlands'],['ru','Русский'],['ar','العربية'],['hi','हिन्दी'],['ja','日本語'],['ko','한국어'],['zh','中文'],['th','ไทย'],['id','Bahasa Indonesia']];
var LNAME={english:'en',spanish:'es','español':'es',portuguese:'pt',french:'fr',german:'de',italian:'it',turkish:'tr',polish:'pl',dutch:'nl',russian:'ru',arabic:'ar',hindi:'hi',japanese:'ja',korean:'ko',chinese:'zh',thai:'th',indonesian:'id'};
var CC_LANG={BR:'pt',PT:'pt',AO:'pt',MZ:'pt',ES:'es',MX:'es',AR:'es',CO:'es',CL:'es',PE:'es',VE:'es',EC:'es',GT:'es',CU:'es',BO:'es',DO:'es',HN:'es',PY:'es',SV:'es',NI:'es',CR:'es',PA:'es',UY:'es',FR:'fr',BE:'fr',SN:'fr',CI:'fr',DE:'de',AT:'de',CH:'de',IT:'it',TR:'tr',PL:'pl',NL:'nl',RU:'ru',BY:'ru',KZ:'ru',SA:'ar',AE:'ar',EG:'ar',MA:'ar',DZ:'ar',IQ:'ar',JO:'ar',KW:'ar',QA:'ar',IN:'hi',JP:'ja',KR:'ko',CN:'zh',TW:'zh',HK:'zh',TH:'th',ID:'id'};
var LANG={cc:load('gc_cc',null)};
function normLang(x){x=String(x||'').trim().toLowerCase();if(!x)return '';if(LNAME[x])return LNAME[x];var m=/^([a-z]{2})(?:[-_].*)?$/.exec(x);return m&&m[1]!=='zx'?m[1]:''}
function browserLang(){return normLang((navigator.languages&&navigator.languages[0])||navigator.language||'en')||'en'}
// No language picker (Vin, Nov 8): the visitor's location decides the language shown first, then their browser language.
function myLang(){return (LANG.cc&&CC_LANG[LANG.cc])||browserLang()}
var LWORDS={en:'the and is this of to you what new every how with my it will are was',es:'el la los las que por para con una nuevo nueva todo todos mejor esto es del pero muy ya',pt:'o os que do da dos das não novo nova um uma com você isso é mais tudo pra já',fr:'le les des du est une un pour avec nouveau nouvelle sur pas tout qui dans ce',de:'der die das und ist nicht mit ein eine neue neuer auf für wird alles wie ich',it:'il lo gli che non con una nuovo nuova per della tutto è come sono questo',tr:'ve bir bu için yeni çok ile ne mi oldu geldi',pl:'i w na nie jest się z do nowy nowa wszystko jak to',nl:'de het een en van is niet met nieuwe voor op dit wat'};
var LSETS={};Object.keys(LWORDS).forEach(function(k){LSETS[k]={};LWORDS[k].split(' ').forEach(function(w){LSETS[k][w]=1})});
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
 else l=RC.rank(l);
 return langFirst(l);
}
// Typing in the search bar searches the whole site (clips, videos, live and past streams, posts), not only the open tab.
// Favorites and Rankings keep their own search. Results: best title/creator match first, then most popular.
var CARDTALL=null;
