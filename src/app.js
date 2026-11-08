var VIDEOS=[
 {n:1,p:'YouTube',id:'l6RRdTFuepk',t:'Grand Theft Auto VI - Trailer 2',tags:['Trailers','Vice City','Lucia & Jason'],v:12,d:6,w:11,tr:9},
 {n:2,p:'TikTok',id:'7679255084114496782',u:'@rockstargames',t:'Grand Theft Auto VI: An Extended Look',tags:['Trailers','Vice City'],v:10,d:12,w:12,tr:12},
 {n:3,p:'TikTok',id:'7676220660502269215',u:'@tridzoid',t:'Over 8 minutes of GTA 6 gameplay has leaked!',tags:['Leaks'],v:7,d:11,w:9,tr:11},
 {n:4,p:'YouTube',id:'VBzZktkzHb4',t:'The Insane Technology Behind GTA 6 - Trailer 2',tags:['Trailers','Theories'],v:6,d:3,w:5,tr:5},
 {n:5,p:'YouTube',id:'iS1MPIgcLT0',t:'This new GTA 6 gameplay leak has gone viral!',tags:['Leaks'],v:5,d:9,w:8,tr:10},
 {n:6,p:'YouTube',id:'GngdDIlOtVc',t:'Every Grand Theft Auto VI (GTA 6) Trailer',tags:['Trailers','Lucia & Jason'],v:9,d:2,w:4,tr:3},
 {n:7,p:'TikTok',id:'7502175479718284586',u:'@rockstargames',t:'Grand Theft Auto VI Trailer 2: explore Vice City and beyond',tags:['Trailers','Vice City'],v:11,d:4,w:7,tr:6},
 {n:8,p:'TikTok',id:'7504303321897848094',u:'@themakeshiftproject',t:'The 13 side activities in GTA 6',tags:['Theories','GTA Online'],v:4,d:5,w:3,tr:4},
 {n:10,p:'TikTok',id:'7678891727620476162',u:'@danirepclips',t:'Paco el Taco en GTA 6',tags:['Funny'],v:2,d:10,w:10,tr:7},
 {n:11,p:'YouTube',id:'bXX6gpwh5TQ',t:'A third GTA 6 gameplay clip has leaked with lots of new info',tags:['Leaks'],v:8,d:1,w:2,tr:2},
 {n:12,p:'YouTube',id:'GY80v-q2Jfg',t:'GTA 6 could change everything with one feature',tags:['Theories'],short:true,v:1,d:7,w:1,tr:1}
];
var STREAMS=[];
var POSTS=[
 {n:301,p:'X',u:'Dexerto',id:'2108150815915413750',t:'GTA 6 leaker “Cyberleek” has returned and posted more footage of the game. It is over 20 minutes long, called “Extended Leek”.',hot:9,top:10},
 {n:302,p:'X',u:'GTAVI_Countdown',id:'2110350398976368750',t:'Cyberleek announces the end of GTA 6 leaks after posting the 20th clip, but says story spoilers including the ending will be published if Take-Two catches him.',hot:10,top:9},
 {n:303,p:'X',u:'Dexerto',id:'2097066139574579684',t:'A Grand Theft Auto fan has gone viral over his girlfriend’s “VIP treatment” for GTA 6’s release. She has paid for the game and will cover all of his chores.',hot:6,top:8},
 {n:304,p:'X',u:'VaraDark30',id:'2106772533987230165',t:'A gamer went viral after creating a “GTA VI Contract Agreement” for his girlfriend to sign before the November 19 release: 10 days of uninterrupted gaming.',hot:7,top:7},
 {n:305,p:'X',u:'Dexerto',id:'2108920505025565006',t:'Rockstar sent a GTA 6 fan a poster after he emailed asking for one. He bought the Ultimate Edition with his first paycheck.',hot:5,top:6},
 {n:306,p:'X',u:'gtasix_',id:'2080676010501001373',t:'Rockstar Games and Take-Two are taking down viral AI-generated GTA 6 videos.',hot:3,top:5},
 {n:311,p:'Threads',u:'gtaleaks',id:'Db3G84aCP3k',t:'GTA 6 releases in days.',hot:8,top:4},
 {n:312,p:'Threads',u:'gta6.only',id:'DeovelHm3hL',t:'GTA 6 officially launches in ONE MONTH. After years of waiting, we’re finally closer than ever to playing the biggest game of all time.',hot:4,top:3},
 {n:313,p:'Threads',u:'controller',id:'Da27GrlDjZw',t:'Users are hyped for GTA 6: nearly 4,000 5-star reviews on the Xbox store (97%), a score of 4.9/5.',hot:2,top:2},
 {n:314,p:'Threads',u:'gtasixhub',id:'Db3UjDejnQG',t:'100 DAYS UNTIL GTA 6! We’re officially just 100 days away from the launch of Grand Theft Auto VI on November 19.',hot:1,top:1}
];
var LOGO={"YouTube":"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z","Shorts":"m18.931 9.99-1.441-.601 1.717-.913a4.48 4.48 0 0 0 1.874-6.078 4.506 4.506 0 0 0-6.09-1.874L4.792 5.929a4.504 4.504 0 0 0-2.402 4.193 4.521 4.521 0 0 0 2.666 3.904c.036.012 1.442.6 1.442.6l-1.706.901a4.51 4.51 0 0 0-2.369 3.967A4.528 4.528 0 0 0 6.93 24c.725 0 1.437-.174 2.08-.508l10.21-5.406a4.494 4.494 0 0 0 2.39-4.192 4.525 4.525 0 0 0-2.678-3.904ZM9.597 15.19V8.824l6.007 3.184z","TikTok":"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z","Twitch":"M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z","Kick":"M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z","X":"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z","Reddit":"M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z","Threads":"M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z","Bluesky":"M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026","Facebook":"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z","Rockstar":"M5.971 6.816h3.241c1.469 0 2.741-.448 2.741-2.084 0-1.3-1.117-1.576-2.19-1.576H6.748l-.777 3.66Zm12.834 8.753h5.168l-4.664 3.228.755 5.087-4.041-3.07L10.599 24l2.536-5.392s-2.95-3.075-2.947-3.075c-.198-.262-.265-.936-.265-1.226 0-.367.024-.739.049-1.134.028-.451.058-.933.058-1.476 0-1.338-.59-2.038-2.036-2.038H5.283l-1.18 5.525H.026L3.269 0h7.672c2.852 0 5.027.702 5.027 3.936 0 2.276-1.12 3.894-3.592 4.233v.045c1.162.276 1.598 1.062 1.598 2.527 0 .585-.018 1.098-.034 1.581-.015.428-.03.834-.03 1.243 0 .525.137 1.382.48 1.968h.567l3.028-5.06.82 5.096Zm-1.233-2.948-2.187 3.654h-3.457l2.103 2.189-1.73 3.672 3.777-2.218 2.976 2.263-.553-3.731 3.093-2.139h-3.43l-.592-3.69Z","Discord":"M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z","IGN":"M5.38 7.66c.59-.9 1.359-1.67 2.26-2.26.13-1.18.31-2.26.52-3.21a10.602 10.602 0 0 0-6 6c.95-.22 2.03-.39 3.21-.52m10.97-2.3v.02c.9.59 1.67 1.37 2.27 2.27 1.18.13 2.26.31 3.21.52a10.632 10.632 0 0 0-6.02-6.01c.22.95.4 2.02.54 3.2m-8.7 13.26c-.9-.59-1.67-1.37-2.27-2.27h-.03c-1.19-.14-2.26-.32-3.19-.54 1.07 2.75 3.26 4.95 6.01 6.02-.22-.95-.39-2.03-.52-3.21m11-2.27h-.03c-.59.9-1.37 1.67-2.27 2.27v.03c-.14 1.17-.32 2.25-.54 3.19a10.593 10.593 0 0 0 6.03-6.03c-.94.22-2 .4-3.19.54M10.04.01h3.9c.85 1.85 1.2 4.59 1.3 5.52.04.22.06.43.06.63L12 9.12 8.7 6.16c0-.17.02-.35.05-.55.1-.95.43-3.75 1.29-5.61M8.7 17.84c0 .17.02.35.05.55.1.95.43 3.75 1.29 5.61h3.9c.85-1.84 1.2-4.59 1.3-5.52.04-.22.06-.43.06-.64L12 14.88l-3.3 2.96ZM6.16 8.69c-.17 0-.35.02-.55.05-.95.12-3.75.45-5.61 1.31v3.9c1.84.85 4.59 1.19 5.52 1.3.22.04.43.06.64.06l2.95-3.3-2.95-3.3v-.02ZM24 10.03c-1.86-.86-4.66-1.19-5.61-1.29-.2-.03-.38-.05-.55-.05l-2.96 3.3 2.96 3.3c.2 0 .41-.02.64-.06.93-.11 3.68-.45 5.52-1.3v-3.9Z","Medal":"M6 2h4.2L12 6.1 13.8 2H18l-3.3 6.4a7 7 0 1 1-5.4 0zM12 10.2a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 1.6 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.2-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z","News":"M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a2 2 0 0 0 2 2H4a2 2 0 0 1-2-2zm3 2v4h5V7zm7 0v1.5h3V7zm0 2.5V11h3V9.5zM5 13v1.5h10V13zm0 3v1.5h10V16zm15-8h2v10.5a1.5 1.5 0 0 1-3 0V8z"};
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
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
// Layout for clip and stream thumbnails: 4 per row (default) or 6 per row (Vin, Nov 8; List view removed; icons only, no text). Remembered on this device.
var VIEW=load('gc_view',{m:'cols'});if(['grid','cols'].indexOf(VIEW.m)<0)VIEW={m:'cols'};
var VIEWSECS=['clips','videos','streams','watchlist'];
// Fixed counts on wide screens; on narrow screens each mode keeps a minimum thumbnail width (phones: 2 and 3 per row).
// Clips (tall thumbnails) use 6 and 10 per row instead, and exactly 2 and 4 per row on phones (Vin, Nov 8).
function tallView(){return searching()?S.qin==='clips':S.sec==='clips'}
function phone(){return window.innerWidth<=640}
function viewCols(tall){var w=(document.querySelector('main').clientWidth||window.innerWidth),c=VIEW.m==='cols';if(tall&&phone())return c?2:4;var n=tall?(c?6:10):(c?4:6),min=tall?(c?150:100):(c?160:110);return Math.max(1,Math.min(n,Math.floor((w+12)/(min+12))))}
function viewIcon(k){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg');sv.setAttribute('width','16');sv.setAttribute('height','16');sv.setAttribute('viewBox','0 0 16 16');sv.setAttribute('aria-hidden','true');
 var r={list:[[1,2,5,4],[7,2.5,8,1.2],[7,4.6,5,1.2],[1,10,5,4],[7,10.5,8,1.2],[7,12.6,5,1.2]],cols:[[1,1,6,6],[9,1,6,6],[1,9,6,6],[9,9,6,6]],grid:[[1,3,3,4],[5,3,2.6,4],[8.4,3,2.6,4],[12,3,3,4],[1,9,3,4],[5,9,2.6,4],[8.4,9,2.6,4],[12,9,3,4]]}[k];
 r.forEach(function(a){var e=document.createElementNS(ns,'rect');e.setAttribute('x',a[0]);e.setAttribute('y',a[1]);e.setAttribute('width',a[2]);e.setAttribute('height',a[3]);e.setAttribute('rx','1');e.setAttribute('fill','currentColor');sv.append(e)});return sv}
function viewCtl(){var box=$('view');var on=VIEWSECS.indexOf(S.sec)>=0||searching();box.hidden=!on;if(!on)return;
 function seg(k,label){var act=VIEW.m===k;return h('button',{type:'button',class:'vbtn'+(act?' on':''),'aria-pressed':String(act),title:label,'aria-label':label,onclick:function(){if(VIEW.m===k)return;VIEW.m=k;store('gc_view',VIEW);render()}},[viewIcon(k)])}
 var kids=[h('div',{class:'vseg',role:'group','aria-label':'Layout'},tallView()?(phone()?[seg('cols','2 per row'),seg('grid','4 per row')]:[seg('cols','6 per row'),seg('grid','10 per row')]):[seg('cols','4 per row'),seg('grid','6 per row')])];
 box.replaceChildren.apply(box,kids)}
function applyView(g,force){if(!force&&VIEWSECS.indexOf(S.sec)<0)return;g.classList.add('cols');var n=viewCols(g.classList.contains('tallg'));g.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';g.style.setProperty('--n',n)}
window.addEventListener('resize',function(){clearTimeout(applyView.t);applyView.t=setTimeout(function(){var g=$('grid');if(g.classList.contains('cols')){var n=viewCols(g.classList.contains('tallg'));if(g.style.getPropertyValue('--n')!==String(n))render()}},200)});
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
var SECS=[['clips','Clips'],['videos','Videos'],['streams','Streams'],['threads','Threads'],['rankings','Rankings']];
var SUBS={clips:[['foryou','For you'],['best','Best of'],['trending','Trending'],['views','Most viewed']],videos:[['foryou','For you'],['best','Best of'],['trending','Trending'],['views','Most viewed']],streams:[['live','Live now'],['vod','Past streams']],threads:[['hot','Hot today'],['top','Top this week']],rankings:[['favs','Most favorited'],['creators','Top creators']]};
var FILTERS={streams:['All'],threads:['All']};
var CSRC=['All','YouTube','Shorts','TikTok','Twitch','Kick','Reddit','Medal','Rockstar'];
// No source filters (Vin, Nov 8): the site mixes every platform together, so every list shows all sources.
var CSRC_BY={clips:['All'],videos:['All']};
var SRCNOTE={Twitch:'Twitch clips show up once the Twitch keys are added in Vercel.',Medal:'Medal clips show up once a Medal API key is added in Vercel.',Kick:'No Kick clips came through yet. Kick sometimes blocks servers; the real build may need Kick’s API key.',Reddit:'No Reddit videos came through yet. If Reddit blocks the server, it needs a free Reddit app key.',Bluesky:'No Bluesky posts yet. Bluesky search may need a Bluesky app password added in Vercel.',News:'No GTA news stories came through from IGN, Rockstar Intel or GTAForums yet.',Rockstar:'Rockstar’s official videos come from YouTube and show up once the YouTube feed loads.',YouTube:'YouTube live streams are checked once an hour.'};
var RPER=[['d','Today'],['w','This week'],['m','This month'],['a','All time']];
var RNAME={d:'today',w:'this week',m:'this month',a:'of all time'};
var HOST=location.hostname||'localhost';
// Phones and tablets only allow videos inside embeds to start on their own when muted, so they start muted with a Tap to unmute button.
var MOBILE=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches);
var S={sec:'clips',sub:{clips:'foryou',videos:'foryou',streams:'live',threads:'hot',rankings:'favs'},filt:{streams:'All',threads:'All'},csrc:'All',period:'d',rper:'w',user:load('gc_user',null),tag:'All',q:'',qin:'all',saved:load('gc_saved',{}),chans:load('gc_chans',{}),hist:load('gc_hist',{}),open:null};
function $(id){return document.getElementById(id)}
function h(tag,props,kids){var e=document.createElement(tag);props=props||{};for(var k in props){var v=props[k];if(k==='class')e.className=v;else if(k==='text')e.textContent=v;else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),v);else e.setAttribute(k,v)}(kids||[]).forEach(function(c){if(c)e.append(c)});return e}
function type(c){return c.ty||(c.n>300?'post':c.n>100?'stream':'video')}
function fmt(n){return n>=1e6?(n/1e6).toFixed(1).replace(/\.0$/,'')+'M':n>=1e3?(n/1e3).toFixed(1).replace(/\.0$/,'')+'K':String(n)}
function fetchYtLive(){fetch('/api/ytlive').then(function(r){return r.json()}).then(function(j){YTLIVE=(j.streams||[]).map(function(x){return {n:'youtube:'+x.id,ty:'stream',kind:'live',lang:x.lang,kw:x.kw||'',p:'YouTube',id:x.id,ch:x.ch,t:x.title||x.name,name:x.name,viewers:x.viewers,game:x.game,shot:x.thumb,sub:x.name}});if(LIVE){var keep=LIVE.filter(function(c){return c.p!=='YouTube'});LIVE=keep.concat(YTLIVE).sort(function(a,b){return (b.viewers||0)-(a.viewers||0)});if(S.sec==='streams'||S.sec==='rankings')render()}}).catch(function(){})}
function fetchLive(){if(Date.now()-(fetchYtLive.at||0)>6e5){fetchYtLive.at=Date.now();fetchYtLive()}fetch('/api/live',{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){LIVE_ERR=false;LIVE_AT=Date.now();var prev=LIVE||[];LIVE=(j.streams||[]).map(function(x){return {n:x.p.toLowerCase()+':'+x.ch,ty:'stream',kind:'live',lang:x.lang,kw:x.kw||'',p:x.p,ch:x.ch,t:x.title||x.name,name:x.name,viewers:x.viewers,game:x.game,shot:x.thumb,sub:x.name}}).concat(YTLIVE).sort(function(a,b){return (b.viewers||0)-(a.viewers||0)});var o=S.open;if(o&&o.kind==='live'&&$('lb').open&&!LIVE.some(function(x){return x.n===o.n})){AUTO.prevLive=prev;ended(o)}if(S.sec==='streams'||S.sec==='watchlist'||S.sec==='rankings'||searching())render();tryOpen()}).catch(function(){LIVE_ERR=true;if(!LIVE)LIVE=[];if(S.sec==='streams')render()})}
setInterval(function(){if(!document.hidden&&((S.sec==='streams'&&S.sub.streams==='live')||(S.open&&S.open.kind==='live'&&$('lb').open)))fetchLive()},120000);
function pageUrl(c){
 if(c.url)return c.url;
 if(c.clip)return 'https://clips.twitch.tv/'+c.clip;
 if(c.p==='YouTube')return (c.short?'https://www.youtube.com/shorts/':'https://www.youtube.com/watch?v=')+c.id;
 if(c.p==='TikTok')return 'https://www.tiktok.com/'+c.u+'/video/'+c.id;
 if(c.p==='Twitch')return c.vod?'https://www.twitch.tv/videos/'+c.vod:'https://www.twitch.tv/'+c.ch;
 if(c.p==='Kick')return c.vod?'https://kick.com/'+c.ch+'/videos/'+c.vod:'https://kick.com/'+c.ch;
 if(c.p==='X')return 'https://x.com/'+c.u+'/status/'+c.id;
 if(c.p==='Threads')return 'https://www.threads.com/@'+c.u+'/post/'+c.id;
 return '#';
}
function thumbUrl(c){
 if(c.shot&&LIVE&&LIVE.indexOf(c)>=0)return c.shot+(c.shot.indexOf('?')<0?'?':'&')+'t='+Math.floor(LIVE_AT/60000);
 if(c.thumb)return c.thumb;
 if(c.p==='YouTube')return 'https://i.ytimg.com/vi/'+c.id+'/hqdefault.jpg';
 if(c.p==='TikTok')return '/api/tiktok-thumb?url='+encodeURIComponent(pageUrl(c));
 if(c.shot&&LIVE&&LIVE.indexOf(c)>=0)return c.shot+(c.shot.indexOf('?')<0?'?':'&')+'t='+Math.floor(LIVE_AT/60000);
 return '';
}
function embedUrl(c){
 if(c.clip)return 'https://clips.twitch.tv/embed?clip='+encodeURIComponent(c.clip)+'&parent='+HOST+'&autoplay=true&muted='+MOBILE;
 if(c.p==='Reddit')return 'https://embed.reddit.com'+c.permalink+'?embed=true&theme=dark&showmedia=true&showmore=false';
 if(c.p==='Medal')return (c.embed||'https://medal.tv/clip/'+c.id)+((c.embed||'').indexOf('?')<0?'?':'&')+'autoplay=1&loop=0'+(MOBILE?'&muted=1':'');
 if(c.p==='Bluesky')return 'https://embed.bsky.app/embed/'+c.did+'/app.bsky.feed.post/'+c.id+'?colorMode=dark';
 if(c.p==='YouTube')return 'https://www.youtube-nocookie.com/embed/'+c.id+'?autoplay=1&playsinline=1&rel=0'+(MOBILE?'&mute=1':'')+'&enablejsapi=1&origin='+encodeURIComponent(location.origin);
 if(c.p==='TikTok')return 'https://www.tiktok.com/player/v1/'+c.id+'?autoplay=1&loop=0'+(MOBILE?'&muted=1':'')+'&volume_control=1&music_info=0&description=0&rel=0';
 if(c.p==='Twitch')return 'https://player.twitch.tv/?'+(c.vod?'video=v'+c.vod:'channel='+c.ch)+'&parent='+HOST+'&autoplay=true&muted='+MOBILE;
 if(c.p==='Kick')return 'https://player.kick.com/'+(c.vod?'video/'+c.vod:c.ch)+'?autoplay=true&muted='+MOBILE;
 if(c.p==='X')return 'https://platform.twitter.com/embed/Tweet.html?id='+c.id+'&theme=dark&dnt=true';
 if(c.p==='Threads')return 'https://www.threads.com/@'+c.u+'/post/'+c.id+'/embed';
 return '';
}
function who(c){var t=type(c);if(t==='stream')return c.sub;if(c.p==='News')return c.site;if(c.p==='Reddit')return t==='post'?'r/'+c.sub+' · u/'+c.u:c.u;return t==='post'?'@'+c.u:(c.u||'YouTube')}
function vmeta(c){var a=[who(c)];if(c.views!=null)a.push(fmt(c.views)+' views');else if(c.score!=null)a.push('▲ '+fmt(c.score));if(c.pub)a.push(ago(c.pub));else if(c.tags)a.push(c.tags.join(', '));return a.join(' · ')}
function toast(m){var t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.k);toast.k=setTimeout(function(){t.classList.remove('show')},2600)}
function bump(tags,w){(tags||[]).forEach(function(t){S.hist[t]=(S.hist[t]||0)+w});store('gc_hist',S.hist)}
function topTags(){return Object.keys(S.hist).sort(function(a,b){return S.hist[b]-S.hist[a]}).slice(0,3)}
// For you (Vin, Nov 8): a YouTube-style recommender that learns each viewer's taste on their own device (no account needed).
// Signals: what they open and how long they watch it, quick skips in swipe mode, favorites, searches and tag taps,
// rolled up into the creators, tags and platforms they like. Old interest fades (halves every 2 weeks).
// Ranking mixes that taste with what's trending, fresh and popular, pushes down things they've already seen,
// avoids the same creator back to back, and reshuffles a little each day so the page doesn't go stale.
var RC={P:load('gc_prof',null),cur:null};
(function(){var P=RC.P;if(!P||!P.c)P=RC.P={c:{},p:{},seen:{},n:0,at:Date.now()};
 var k=Math.pow(0.5,(Date.now()-(P.at||Date.now()))/(14*864e5));if(k<0.999){['c','p'].forEach(function(m){for(var x in P[m]){P[m][x]*=k;if(Math.abs(P[m][x])<0.05)delete P[m][x]}});for(var t in S.hist){S.hist[t]*=k;if(S.hist[t]<0.05)delete S.hist[t]}P.n*=k;store('gc_hist',S.hist)}
 P.at=Date.now()})();
RC.save=function(){var P=RC.P,ks=Object.keys(P.seen);if(ks.length>1500){ks.sort(function(a,b){return P.seen[a][0]-P.seen[b][0]});ks.slice(0,ks.length-1200).forEach(function(x){delete P.seen[x]})}P.at=Date.now();store('gc_prof',P)};
RC.add=function(c,w,tagW){var P=RC.P,cr=creatorOf(c);if(cr)P.c[cr.k]=(P.c[cr.k]||0)+w;var sk=srcKey(c);P.p[sk]=(P.p[sk]||0)+w*0.3;if(tagW)bump(c.tags,tagW);P.n+=Math.abs(w)};
// start: something began playing (opened, or reached in swipe mode). stop: credit the watch time.
RC.start=function(c,how){RC.stop();if(!c||type(c)==='post')return;RC.cur={c:c,t:Date.now(),how:how};var e=RC.P.seen[c.n]||[0,0,0];e[0]=Date.now();if(how==='open'){e[2]++;RC.add(c,1,0)}RC.P.seen[c.n]=e;RC.save()};
RC.stop=function(){var x=RC.cur;RC.cur=null;if(!x)return;var sec=Math.min(180,(Date.now()-x.t)/1000),e=RC.P.seen[x.c.n];if(e)e[1]+=sec;
 if(x.how==='swipe'&&sec<2.5)RC.add(x.c,-0.4,0);else if(sec>=3)RC.add(x.c,Math.min(3,sec/20),Math.min(2,sec/40));RC.save()};
RC.fav=function(c){RC.add(c,5,3);RC.save()};
RC.rank=function(l){if(l.length<2)return l;var P=RC.P,now=Date.now(),day=Math.floor(now/864e5);
 function mx(o){var m=1;for(var x in o)m=Math.max(m,Math.abs(o[x]));return m}
 var mt=mx(S.hist),mc=mx(P.c),mp=mx(P.p),str=Math.min(1,P.n/15);
 var tr=l.slice().sort(function(a,b){return (a.tr||0)-(b.tr||0)}),pct={};tr.forEach(function(c,i){pct[c.n]=i/(tr.length-1)});
 var sc=l.map(function(c){var cr=creatorOf(c),tags=c.tags||[];
  var ta=Math.min(1,tags.reduce(function(s,t){return s+(S.hist[t]||0)},0)/mt),ca=cr&&P.c[cr.k]?Math.max(-1,Math.min(1,P.c[cr.k]/mc)):0,pa=(P.p[srcKey(c)]||0)/mp;
  var pop=Math.log(1+(c.views||c.v||0))/Math.LN10/7,age=c.pub?(now-new Date(c.pub))/36e5:200,fresh=Math.exp(-age/72);
  var v=str*(1.2*ta+1.0*ca+0.3*pa)+(1-0.4*str)*(0.6*pct[c.n]+0.3*fresh+0.3*pop)+0.08*hsh(c.n+':'+day);
  var e=P.seen[c.n];if(e){var since=(now-e[0])/36e5;v-=(e[1]>=15||e[2]>0)?0.5+1.2*Math.exp(-since/72):0.15}
  return {c:c,v:v,k:cr?cr.k:c.n}}).sort(function(a,b){return b.v-a.v});
 var out=[],recent=[];while(sc.length){var bi=0,bv=-1e9;for(var i=0;i<Math.min(15,sc.length);i++){var r=sc[i],n=0;recent.forEach(function(k){if(k===r.k)n++});var v=r.v-0.35*n-(recent[recent.length-1]===r.k?0.3:0);if(v>bv){bv=v;bi=i}}
  var pick=sc.splice(bi,1)[0];out.push(pick.c);recent.push(pick.k);if(recent.length>6)recent.shift()}
 return out};
function thumb(c,rank){
 var u=thumbUrl(c);var img=u?h('img',{alt:'',loading:'lazy',src:u}):null;if(img){img.onerror=function(){img.remove()};if(c.p==='YouTube'&&type(c)==='video')img.onload=function(){if(ytDead(img))markDead(c,img)}}
 var st=type(c)==='stream';
 var sk=srcKey(c);
 return h('div',{class:'thumb '+c.p},[h('span',{class:'init',text:(c.name||c.t||'?').charAt(0).toUpperCase()}),img,c.official&&!st?h('span',{class:'badge off',title:'Official Rockstar Games video',role:'img','aria-label':'Official Rockstar Games video'},[logo(sk,16),h('span',{class:'ot',text:'OFFICIAL'})]):h('span',{class:'badge',title:LABEL[sk]||c.p,role:'img','aria-label':LABEL[sk]||c.p},[logo(sk,16)]),c.kind==='live'&&LIVE&&LIVE.indexOf(c)>=0?h('span',{class:'live',text:c.viewers!=null?'LIVE · '+fmt(c.viewers):'LIVE'}):null,rank?h('span',{class:'rank',text:'#'+rank}):null,S.saved[c.n]?h('span',{class:'saved',text:'★ Favorite'}):null]);
}
function hsh(x){x=String(x);var a=2166136261;for(var i=0;i<x.length;i++){a^=x.charCodeAt(i);a=Math.imul(a,16777619)}return (a>>>0)/4294967296}
// Stand-in favorite counts until accounts and a database exist: seeded from views (or a fixed number for items without views),
// split by how recently the item was posted. Your own favorites are added on top.
function favs(c){
 if(!c._f){var r=hsh(c.n),all=c.views!=null?Math.max(1,Math.round(Math.sqrt(c.views)*(0.5+r*0.6))):c.viewers!=null?Math.max(1,Math.round(Math.sqrt(c.viewers)*12*(0.5+r*0.6))):Math.round(40+r*500);
  var age=c.pub?(Date.now()-new Date(c.pub))/36e5:24+hsh(c.n+'a')*2000;
  function part(hrs,lo,span){return age<=hrs?0.55+0.4*(1-age/hrs):lo+hsh(c.n+hrs)*span}
  var m=Math.min(1,part(720,0.04,0.1)),w=Math.min(m,part(168,0.01,0.04)),d=Math.min(w,part(24,0.001,0.01));
  c._f={d:Math.round(all*d),w:Math.round(all*w),m:Math.round(all*m),a:all}}
 var f={d:c._f.d,w:c._f.w,m:c._f.m,a:c._f.a},ts=S.saved[c.n];
 if(ts){var t=typeof ts==='number'?Date.now()-ts:Infinity;f.a++;if(t<=2592e6)f.m++;if(t<=6048e5)f.w++;if(t<=864e5)f.d++}
 return f;
}
function creatorOf(c){var t=type(c);if(t==='stream')return {k:c.p+':'+c.ch,name:c.name||c.ch,p:c.p};if(t==='post')return {k:c.p+':'+(c.site||c.u),name:c.p==='News'?c.site:c.p==='Reddit'?'u/'+c.u:'@'+c.u,p:c.p};if(t==='video'&&c.u)return {k:c.p+':'+c.u,name:c.u,p:c.p};return null}
function creators(per,src){
 var m={};(src||VIDEOS.concat(POSTS)).forEach(function(c){var cr=creatorOf(c);if(!cr)return;var f=favs(c)[per];var o=m[cr.k]||(m[cr.k]={k:cr.k,name:cr.name,p:cr.p,f:0,n:0,top:null,tf:-1});o.f+=f;o.n++;if(f>o.tf){o.tf=f;o.top=c}});
 return Object.keys(m).map(function(k){return m[k]}).filter(function(o){return o.f>0}).sort(function(a,b){return b.f-a.f});
}
function crRow(o,rank){
 var t=type(o.top)==='post'?'post':'clip';
 return h('button',{class:'cr',type:'button','aria-label':'#'+rank+' '+o.name+', '+o.f.toLocaleString()+' favorites. Show their '+(t==='post'?'posts':'clips'),onclick:function(){showCreator(o)}},[
  h('span',{class:'rank',text:'#'+rank}),h('span',{class:'av '+o.p,'aria-hidden':'true',text:o.name.replace('@','').charAt(0).toUpperCase()}),
  h('span',{class:'cri'},[h('b',{text:o.name}),h('span',{class:'meta',text:o.p+' · '+o.n+' '+(t==='post'?(o.n===1?'post':'posts'):(o.n===1?'clip':'clips'))+' · Top: '+o.top.t})]),
  h('span',{class:'crf'},[document.createTextNode('★ '+fmt(o.f)),h('small',{text:'favorites'})])]);
}
var RK={key:'',n:{}};
function rkRow(c,i){
 var t=type(c),f=favs(c)[S.rper],kids=[h('span',{class:'rnum r'+(i+1),text:String(i+1)})];
 if(t!=='post')kids.push(thumb(c,0));
 kids.push(h('span',{class:'rinfo'},[h('span',{class:t==='post'?'ptx':'title',text:c.t}),h('span',{class:'meta',text:'★ '+fmt(f)+' · '+(t==='stream'?(c.name||c.ch)+' on '+c.p+(c.kind==='live'?' · live':''):who(c)+(t==='post'?' on '+c.p:''))})]));
 return h('button',{class:'rrow',type:'button','aria-label':'#'+(i+1)+': '+c.t+', '+f.toLocaleString()+' favorites',onclick:function(){openItem(c)}},kids);
}
function rkCreator(o,i){
 return h('button',{class:'rrow',type:'button','aria-label':'#'+(i+1)+': '+o.name+', '+o.f.toLocaleString()+' favorites',onclick:function(){showCreator(o)}},[
  h('span',{class:'rnum r'+(i+1),text:String(i+1)}),h('span',{class:'av '+o.p,'aria-hidden':'true',text:o.name.replace('@','').charAt(0).toUpperCase()}),
  h('span',{class:'rinfo'},[h('b',{text:o.name,style:'overflow:hidden;text-overflow:ellipsis;white-space:nowrap'}),h('span',{class:'meta',text:'★ '+fmt(o.f)+' · '+o.p+' · '+o.n+' '+(type(o.top)==='post'?(o.n===1?'post':'posts'):type(o.top)==='stream'?(o.n===1?'stream':'streams'):(o.n===1?'clip':'clips'))})])]);
}
function renderRank(){
 var per=S.rper,q=S.q.trim().toLowerCase(),cr=S.sub.rankings==='creators';
 var key=[S.sub.rankings,per,q].join('|');if(key!==RK.key){RK.key=key;RK.n={}}
 var cols=[['clip','Clips',VIDEOS.filter(isShort)],['video','Videos',VIDEOS.filter(function(c){return !isShort(c)})],['stream','Streams',(LIVE||[]).concat(STREAMS)],['post','Threads',POSTS]];
 var total=0,wrap=h('div',{class:'rk3'});
 cols.forEach(function(col){
  var items=cr?creators(per,col[2]).filter(function(o){return !q||(o.name+' '+o.p+' '+o.top.t).toLowerCase().indexOf(q)>=0})
   :col[2].filter(function(c){return match(c,q)&&favs(c)[per]>0}).sort(function(a,b){return favs(b)[per]-favs(a)[per]});
  total+=items.length;var n=RK.n[col[0]]||10;
  var box=h('section',{class:'rcol','aria-label':col[1]+' ranking'},[h('h2',{},[col[0]==='stream'?h('span',{class:'dot','aria-hidden':'true'}):null,document.createTextNode(col[1]),h('span',{class:'meta',text:items.length.toLocaleString()+' ranked'})])]);
  if(!items.length)box.append(h('div',{class:'empty',text:col[0]==='stream'&&LIVE===null?'Checking who is live…':'Nothing ranked yet.'}));
  items.slice(0,n).forEach(function(x,i){box.append(cr?rkCreator(x,i):rkRow(x,i))});
  if(items.length>n)box.append(h('button',{class:'more',type:'button',text:'Show more',onclick:function(){RK.n[col[0]]=n+10;render()}}));
  wrap.append(box);
 });
 $('cnt').textContent='';
 return wrap;
}
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

var F={key:'',i:0,n:0,paused:false};
function featItems(){
 if(isVid(S.sec))return langFirst(VIDEOS.filter(function(c){return isShort(c)===(S.sec==='clips')}).sort(function(a,b){return (b.w-a.w)||(b.v-a.v)})).slice(0,5);
 if(S.sec==='streams')return langFirst(LIVE||[]).slice(0,5);
 return [];
}
function featGo(i){if(!F.n)return;F.i=(i+F.n)%F.n;var tr=$('feat').querySelector('.ftrack');if(tr)tr.style.transform='translateX('+(-100*F.i)+'%)';$('feat').querySelectorAll('.dotb').forEach(function(d,k){d.classList.toggle('on',k===F.i);d.setAttribute('aria-current',k===F.i?'true':'false')});$('feat').querySelectorAll('.fslide').forEach(function(sl,k){sl.setAttribute('aria-hidden',k===F.i?'false':'true');sl.tabIndex=k===F.i?0:-1})}
function renderFeat(){
 var items=featItems(),box=$('feat');
 var key=S.sec+'|'+items.map(function(c){return c.n}).join(',')+'|'+LIVE_AT+'|'+myLang()+LANG.cc;
 if(key===F.key)return;F.key=key;
 box.replaceChildren();F.n=items.length;if(F.i>=F.n)F.i=0;
 $('featcta').hidden=!items.length;
 if(!items.length)return;
 var isStream=S.sec==='streams';
 var track=h('div',{class:'ftrack'},items.map(function(c,k){
  var u=thumbUrl(c);
  if(c.p==='YouTube')u='https://i.ytimg.com/vi/'+c.id+'/maxresdefault.jpg';
  var kids=[];
  if(u){var bg=h('img',{class:'fbg',alt:'',src:u}),fg=h('img',{class:'ffg',alt:'',src:u});
   [bg,fg].forEach(function(im){im.onerror=function(){if(c.p==='YouTube'&&im.src.indexOf('maxres')>0)im.src='https://i.ytimg.com/vi/'+c.id+'/hqdefault.jpg';else im.remove()};if(c.p==='YouTube'&&!isStream)im.onload=function(){if(!ytDead(im))return;if(im.src.indexOf('maxres')>0)im.src='https://i.ytimg.com/vi/'+c.id+'/hqdefault.jpg';else markDead(c,im)}});kids.push(bg,fg)}
  else kids.push(h('span',{class:'init',text:(c.name||c.t).charAt(0).toUpperCase()}));
  kids.push(h('span',{class:'fshade'}));
  var kick=h('span',{class:'fkick'},[isStream?h('span',{class:'live',text:c.viewers!=null?'LIVE · '+fmt(c.viewers):'LIVE'}):null,document.createTextNode(isStream?'Featured stream':S.sec==='videos'?'Featured video':'Featured clip')]);
  var meta=isStream?[c.name,c.p,c.game].filter(Boolean).join(' · '):who(c)+' on '+srcName(c);
  kids.push(h('span',{class:'finfo'},[kick,h('h2',{text:c.t}),h('span',{class:'meta',text:meta})]));
  return h('button',{class:'fslide '+c.p,type:'button','aria-roledescription':'slide','aria-label':(k+1)+' of '+items.length+': '+c.t,onclick:function(){openItem(c)}},kids);
 }));
 var dots=h('div',{class:'dots'},items.map(function(c,k){return h('button',{class:'dotb',type:'button','aria-label':'Show featured '+(k+1),onclick:function(e){e.stopPropagation();featGo(k)}},[h('span')])}));
 box.append(track,dots);featGo(F.i);
}
(function(){var box=$('feat'),x0=null;
 box.addEventListener('mouseenter',function(){F.paused=true});box.addEventListener('mouseleave',function(){F.paused=false});
 box.addEventListener('focusin',function(){F.paused=true});box.addEventListener('focusout',function(){F.paused=false});
 box.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;F.paused=true},{passive:true});
 box.addEventListener('touchend',function(e){if(x0!==null){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)featGo(F.i+(dx<0?1:-1))}x0=null;F.paused=false},{passive:true});
 setInterval(function(){if(!F.paused&&F.n>1&&!document.hidden&&!$('lb').open)featGo(F.i+1)},3000);
})();

var SLUG={clips:'clips',videos:'videos',streams:'streams',threads:'threads',watchlist:'favorites',foryou:'for-you',best:'best-of',trending:'trending',views:'most-viewed',live:'live',vod:'past',hot:'hot',top:'top-week',rankings:'rankings',favs:'most-favorited',creators:'top-creators'};
var RSLUG={d:'today',w:'week',m:'month',a:'all-time'};
function unslug(x){if(x==='watchlist')return 'watchlist';for(var k in SLUG)if(SLUG[k]===x)return k;return null}
function toHash(){
 var q=[];
 if(isVid(S.sec)&&S.csrc!=='All')q.push('from='+encodeURIComponent(S.csrc.toLowerCase()));
 if(isVid(S.sec)&&S.tag!=='All')q.push('tag='+encodeURIComponent(S.tag));
 if(isVid(S.sec)&&S.sub[S.sec]==='best'&&S.period==='w')q.push('period=week');
 if(S.sec==='rankings')q.push('period='+RSLUG[S.rper]);
 if(FILTERS[S.sec]&&S.filt[S.sec]!=='All')q.push('source='+encodeURIComponent(S.filt[S.sec]));
 if(searching()){q.push('q='+encodeURIComponent(S.q.trim()));if(S.qin!=='all')q.push('in='+S.qin)}
 var on=$('lb').open&&S.open?S.open.n:S.want;if(on!=null)q.push('open='+encodeURIComponent(String(on)));
 return '#/'+SLUG[S.sec]+(SUBS[S.sec]?'/'+SLUG[S.sub[S.sec]]:'')+(q.length?'?'+q.join('&'):'');
}
function fromHash(){
 var m=location.hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?(?:\?(.*))?$/);if(!m)return;
 var sec=unslug(m[1]);if(!sec||['clips','videos','streams','threads','watchlist','rankings'].indexOf(sec)<0)return;
 S.sec=sec;var sub=m[2]&&unslug(m[2]);
 if(SUBS[sec]&&sub&&SUBS[sec].some(function(t){return t[0]===sub}))S.sub[sec]=sub;
 var params={};(m[3]||'').split('&').forEach(function(kv){var i=kv.indexOf('=');if(i>0)params[kv.slice(0,i)]=decodeURIComponent(kv.slice(i+1))});
 if(isVid(sec)){S.csrc='All';CSRC_BY[sec].forEach(function(k){if(k.toLowerCase()===params.from)S.csrc=k});S.tag=params.tag||'All';S.period=params.period==='week'?'w':'d'}
 if(sec==='rankings'){S.rper='w';for(var rk in RSLUG)if(RSLUG[rk]===params.period)S.rper=rk}
 if(FILTERS[sec])S.filt[sec]=FILTERS[sec].indexOf(params.source)>=0?params.source:'All';
 S.q=params.q||'';S.qin=['clips','videos','streams','threads'].indexOf(params.in)>=0?params.in:'all';if($('q'))$('q').value=S.q;
 S.want=params.open||null;if(S.want){clearTimeout(tryOpen.t);tryOpen.t=setTimeout(function(){tryOpen(true)},8000)}
}
window.addEventListener('hashchange',function(){if(location.hash===toHash())return;fromHash();if((S.sec==='streams'||S.sec==='rankings')&&Date.now()-LIVE_AT>60000)fetchLive();if(!S.want&&$('lb').open)closeLb();render()});
// Reopens the item named in the link once its feed has loaded. If it never shows up, a YouTube video or live channel is rebuilt from its id.
function tryOpen(last){var w=S.want;if(!w)return;if($('lb').open&&S.open&&String(S.open.n)===w){S.want=null;return}
 var c=allItems().filter(function(x){return String(x.n)===w})[0];
 if(!c&&last){var m=/^(yt|youtube|twitch|kick):(.+)$/.exec(w);if(m)c=m[1]==='yt'?{n:w,ty:'video',p:'YouTube',id:m[2],t:'YouTube video',tags:[]}:m[1]==='youtube'?{n:w,ty:'stream',kind:'live',p:'YouTube',id:m[2],t:'YouTube live stream',sub:'YouTube'}:{n:w,ty:'stream',kind:'live',p:m[1]==='twitch'?'Twitch':'Kick',ch:m[2],t:m[2],name:m[2],sub:m[2]}}
 if(c){S.want=null;clearTimeout(tryOpen.t);openItem(c)}else if(last){S.want=null;syncHash()}}
function syncHash(){var hs=toHash();if(location.hash!==hs){try{history.replaceState(null,'',hs)}catch(e){}}}
function openItem(c){
 if(c.p==='News'){window.open(c.url,'_blank','noopener');return}
 S.open=c;S.unmuted=false;TW.pl=null;bump(c.tags,2);RC.start(c,'open');var t=type(c);$('unm').hidden=!(MOBILE&&t!=='post'&&['YouTube','TikTok','Twitch','Kick'].indexOf(c.p)>=0);
 var cls=t==='post'?'post':(t==='video'&&(c.p==='TikTok'||c.short||c.vert))?'tall':'wide';
 stopUp();AUTO.done=null;
 if(c.clip&&c.dur){var dc=c;AUTO.dt=setTimeout(function(){ended(dc)},(c.dur+3)*1000)}
 if(c.p==='Twitch'&&!c.clip)twitchPlayer(c);else if(c.kclip)videoPlayer(c);else{var fr=h('iframe',{class:'frame '+cls,src:embedUrl(c),allow:'autoplay; encrypted-media; fullscreen; picture-in-picture',allowfullscreen:'',title:c.t});$('player').replaceChildren(fr);if(c.p==='YouTube')fr.addEventListener('load',function(){ytListen(fr)})}
 if(c.p==='TikTok'){setTimeout(ttSound,1200);setTimeout(ttSound,2500)}
 $('lt').textContent=t==='post'?'Post by '+who(c):c.t;
 $('lm').textContent=t==='stream'?(c.kind==='live'?[c.name,'Live on '+c.p,c.viewers!=null?fmt(c.viewers)+' watching':'',c.game].filter(Boolean).join(' · '):'Past broadcast on '+c.p+' · '+c.sub):t==='post'?'On '+srcName(c)+(c.pub?' · '+ago(c.pub):''):vmeta(c)+' · '+srcName(c);
 var s=$('src');s.href=pageUrl(c);s.replaceChildren(logo(srcKey(c),16),document.createTextNode('Open on '+(srcKey(c)==='Rockstar'?'YouTube':srcName(c))));
 saveBtn();
 $('ltags').replaceChildren.apply($('ltags'),(c.tags||[]).map(function(x){return h('button',{text:x,onclick:function(){S.sec=vidSec(c);S.tag=x;S.csrc='All';bump([x],1);closeLb();render();window.scrollTo(0,0)}})}));
 var pool=S.pool=t==='stream'?(c.kind==='live'?(LIVE||[]):STREAMS).filter(function(x){return x!==c}):t==='post'?POSTS.filter(function(x){return x!==c}):VIDEOS.filter(function(x){return x!==c&&isShort(x)===isShort(c)&&x.tags.some(function(y){return c.tags.indexOf(y)>=0})});
 $('nextb').hidden=!nextOf(c);autoBtn();
 renderChat(c);
 $('nexth').textContent=t==='stream'?'More streams':t==='post'?'More posts':'Up next';
 $('upnext').replaceChildren.apply($('upnext'),pool.slice(0,5).map(function(x){return t==='post'?card(x,0):h('button',{class:'ni',type:'button',onclick:function(){openItem(x)}},[thumb(x,0),h('div',{},[h('div',{class:'title',text:x.t,style:'font-size:14px'}),h('div',{class:'meta',text:who(x)+' · '+srcName(x)})])])}));
 $('lbbox').scrollTop=0;
 if(!$('lb').open)$('lb').showModal();
 syncHash();
}
function crownSvg(){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');sv.setAttribute('width','18');sv.setAttribute('height','18');sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');sv.setAttribute('class','crown');pa.setAttribute('d','M3 7.5l4.6 4.1L12 4.5l4.4 7.1L21 7.5l-1.9 10.5H4.9z');pa.setAttribute('fill','#FFC23D');pa.setAttribute('stroke','#B8860B');pa.setAttribute('stroke-width','1.2');pa.setAttribute('stroke-linejoin','round');sv.append(pa);return sv}
function starSvg(filled){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg'),pa=document.createElementNS(ns,'path');sv.setAttribute('width','16');sv.setAttribute('height','16');sv.setAttribute('viewBox','0 0 16 16');sv.setAttribute('aria-hidden','true');pa.setAttribute('d','M8 1.2l2.05 4.25 4.65.62-3.4 3.22.86 4.61L8 11.65 3.84 13.9l.86-4.61-3.4-3.22 4.65-.62z');pa.setAttribute('fill',filled?'currentColor':'none');pa.setAttribute('stroke','currentColor');pa.setAttribute('stroke-width','1.6');pa.setAttribute('stroke-linejoin','round');sv.append(pa);return sv}
function saveBtn(){var on=!!S.saved[S.open.n];var b=$('save');b.replaceChildren(starSvg(on),document.createTextNode(on?'In favorites':'Add to favorites'));b.setAttribute('aria-pressed',String(on));b.className='pill'+(on?' solid':'')}
function toggleFav(c){var on=!S.saved[c.n];if(on){S.saved[c.n]=Date.now();RC.fav(c)}else delete S.saved[c.n];store('gc_saved',S.saved);if(c.kind==='live'){if(on)S.chans[c.n]={n:c.n,ty:'stream',kind:'live',p:c.p,ch:c.ch,t:c.name,name:c.name,sub:c.name};else delete S.chans[c.n];store('gc_chans',S.chans)}if(S.open===c)saveBtn();render();toast(on?'Added to your favorites':'Removed from your favorites')}
$('save').onclick=function(){var c=S.open;if(!S.saved[c.n]&&!S.user){signIn('Sign in to add favorites',function(){if(!S.saved[c.n])toggleFav(c)});return}toggleFav(c)};
var SID={then:null};
function signIn(why,then){SID.then=then||null;var d=$('sid');
 if(S.user){$('sidh').textContent='Signed in as @'+S.user;$('sidp').textContent='Your favorites count toward the Rankings. Test accounts are saved on this device until real accounts are connected.';$('sidin').hidden=true;$('sidok').textContent='Sign out';$('sidx').textContent='Close'}
 else{$('sidh').textContent=why||'Sign in';$('sidp').textContent='You need an account to favorite, so the rankings can’t be spammed. For this test, just pick a username.';$('sidin').hidden=false;$('sidok').textContent='Sign in';$('sidx').textContent='Cancel';$('sidu').value='';$('siderr').textContent=''}
 d.showModal();if(!S.user)$('sidu').focus()}
$('sidf').addEventListener('submit',function(e){e.preventDefault();
 if(S.user){S.user=null;try{localStorage.removeItem('gc_user')}catch(x){}$('sid').close();render();toast('Signed out');return}
 var u=$('sidu').value.trim().replace(/^@/,'');if(!/^[A-Za-z0-9_]{3,20}$/.test(u)){$('siderr').textContent='Use 3 to 20 letters, numbers or underscores.';$('sidu').focus();return}
 S.user=u;store('gc_user',u);$('sid').close();render();toast('Signed in as @'+u);var t=SID.then;SID.then=null;if(t)t()});
$('sidx').onclick=function(){SID.then=null;$('sid').close()};
function ttSound(){var f=$('player').querySelector('iframe');if(!f||!S.open||S.open.p!=='TikTok')return;(MOBILE&&!S.unmuted?['mute','play']:['play','unMute']).forEach(function(t){f.contentWindow.postMessage({'x-tiktok-player':true,type:t},'*')})}
window.addEventListener('message',function(e){var host='';try{host=new URL(e.origin).hostname}catch(x){}if(!/(^|\.)tiktok\.com$/.test(host))return;var d=e.data;if(typeof d==='string'){try{d=JSON.parse(d)}catch(x){return}}if(d&&d.type==='onPlayerReady')ttSound();if(d&&d.type==='onStateChange'&&d.value===0&&S.open&&S.open.p==='TikTok')ended(S.open)});
window.addEventListener('message',function(e){var host='';try{host=new URL(e.origin).hostname}catch(x){}if(!/(^|\.)youtube(-nocookie)?\.com$/.test(host))return;if(ytEnded(e.data)&&S.open&&S.open.p==='YouTube')ended(S.open)});
// Autoplay: when the open video ends (or a live stream goes offline), count down 5 seconds and play the next one.
// YouTube and TikTok report the end through their player messages, Twitch through its embed script,
// Kick live streams by dropping off the live list (checked every 2 minutes). Kick past broadcasts can't report an end.
var AUTO={on:load('gc_auto',true),t:null,done:null,prevLive:null};
function nextOf(c){
 if(!c||type(c)==='post')return null;
 if(c.kind==='live'){var L=LIVE||[],src=L.some(function(x){return x.n===c.n})?L:(AUTO.prevLive||L);var i=-1;src.forEach(function(x,k){if(x.n===c.n)i=k});
  for(var k=i+1;k<src.length;k++){var y=src[k];if(L.some(function(z){return z.n===y.n}))return L.filter(function(z){return z.n===y.n})[0]}
  return L.filter(function(z){return z.n!==c.n})[0]||null}
 var l=GRID.l||[],j=l.indexOf(c);
 if(j>=0)for(var m=j+1;m<l.length;m++){if(l[m]&&l[m].p&&type(l[m])===type(c))return l[m]}
 return (S.pool||[]).filter(function(x){return type(x)===type(c)})[0]||null;
}
function ended(c){
 if(!c||S.open!==c||AUTO.done===c||!$('lb').open)return;AUTO.done=c;
 var nx=nextOf(c);if(!nx)return;
 $('uptitle').textContent=nx.t;$('upbar').hidden=false;$('upgo').onclick=function(){openItem(nx)};
 if(!AUTO.on){$('upwhen').textContent=c.kind==='live'?'Stream ended. Up next':'Up next';$('upno').textContent='Dismiss';return}
 $('upno').textContent='Cancel';var left=5;
 function tick(){$('upwhen').textContent=(c.kind==='live'?'Stream ended. ':'')+'Up next in '+left+'s';if(left<=0){stopUp();openItem(nx);return}left--;AUTO.t=setTimeout(tick,1000)}
 tick();
}
function stopUp(){clearTimeout(AUTO.t);AUTO.t=null;clearTimeout(AUTO.dt);var b=$('upbar');if(b)b.hidden=true}
$('upno').onclick=function(){stopUp()};
$('nextb').onclick=function(){var nx=nextOf(S.open);if(nx)openItem(nx)};
function autoBtn(){var b=$('autob');b.textContent='Autoplay: '+(AUTO.on?'On':'Off');b.setAttribute('aria-pressed',String(AUTO.on))}
$('autob').onclick=function(){AUTO.on=!AUTO.on;store('gc_auto',AUTO.on);autoBtn();if(!AUTO.on&&AUTO.t){clearTimeout(AUTO.t);AUTO.t=null;$('upwhen').textContent='Up next';$('upno').textContent='Dismiss'}};
function ytEnded(data){var d=data;if(typeof d==='string'){try{d=JSON.parse(d)}catch(x){return false}}if(!d)return false;
 return (d.event==='onStateChange'&&d.info===0)||(d.event==='infoDelivery'&&d.info&&d.info.playerState===0)}
function ytListen(fr){try{fr.contentWindow.postMessage(JSON.stringify({event:'listening',id:'gc',channel:'widget'}),'*');fr.contentWindow.postMessage(JSON.stringify({event:'command',func:'addEventListener',args:['onStateChange'],id:'gc',channel:'widget'}),'*')}catch(x){}}
var TW={state:0,cbs:[]};
function twitchScript(cb){if(window.Twitch&&Twitch.Player)return cb(true);TW.cbs.push(cb);if(TW.state)return;TW.state=1;var sc=document.createElement('script');sc.src='https://player.twitch.tv/js/embed/v1.js';sc.async=true;
 sc.onload=function(){var l=TW.cbs;TW.cbs=[];TW.state=0;l.forEach(function(f){f(!!(window.Twitch&&Twitch.Player))})};sc.onerror=function(){var l=TW.cbs;TW.cbs=[];TW.state=0;l.forEach(function(f){f(false)})};document.head.append(sc)}
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
render();
tryOpen();
fetchVods();
if(S.want&&/^(twitch|kick|youtube):/.test(S.want))fetchLive();
fetchVideos();
fetchClips();
fetchPosts();
if(S.sec==='streams'||S.sec==='rankings')fetchLive();
