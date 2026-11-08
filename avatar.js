// Profile pictures (Vin, Nov 8): every account gets a random avatar in the logo's style. A rounded sunset tile, a striped
// retro sun, and a dark purple head-and-shoulders silhouette with neon extras (shades, chains, headphones...).
// No uploads, so every profile looks like part of the same set. The avatar is drawn from a short seed string saved
// on the profile; "New avatar" just picks a new seed.
var AV=(function(){
 var INK='#2A0E4A';
 var PAL=[['#FFC24B','#FF5E7E','#E5308F','#6A2BD9'],['#FF8A5B','#E5308F','#8B2BD9','#3B1C8C'],['#3EE0D0','#5AA0FF','#C04BE0','#FF5E7E'],
  ['#FFE16B','#FFA94B','#FF5E7E','#C0307F'],['#FF5EC4','#B04BFF','#5B2BD9','#1E1550'],['#FFD3A0','#FF8FA0','#E55AA8','#7A3BD9']];
 var NEON=['#FFFFFF','#FFC24B','#3EE0D0','#FF5E7E','#FF9DE0'];
 function rng(seed){var x=2166136261;for(var i=0;i<seed.length;i++){x^=seed.charCodeAt(i);x=Math.imul(x,16777619)}
  return function(){x+=0x6D2B79F5;var t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296}}
 function pick(r,a){return a[Math.floor(r()*a.length)]}
 // Hair and headwear change the outline of the silhouette, like the palm in the logo.
 var HAIR={
  buzz:'',
  pomp:'<path d="M34 44 C32 28 42 22 52 23 C62 22 70 28 67 42 C64 34 58 31 50 32 C42 31 37 36 34 44Z"/>',
  slick:'<path d="M35 44 C34 31 42 26 51 26 C60 26 67 31 65 44 C62 36 56 33 50 33 C44 33 38 37 35 44Z"/>',
  afro:'<circle cx="50" cy="37" r="20"/><circle cx="36" cy="44" r="8"/><circle cx="64" cy="44" r="8"/>',
  long:'<path d="M33 46 C31 28 42 24 50 24 C58 24 69 28 67 46 L69 70 C66 74 61 74 59 70 L60 50 L40 50 L41 70 C39 74 34 74 31 70Z"/>',
  bun:'<circle cx="50" cy="22" r="7.5"/><path d="M35 44 C34 31 42 27 50 27 C58 27 66 31 65 44 C62 36 56 33 50 33 C44 33 38 37 35 44Z"/>',
  mohawk:'<path d="M45 40 L44 22 L50 14 L56 22 L55 40Z"/>',
  cap:'<path d="M33 41 C33 29 41 25 50 25 C59 25 67 29 67 41Z"/><path d="M60 39 L80 41 C80 44 76 45 66 44Z"/>',
  beanie:'<path d="M33 42 C32 27 41 21 50 21 C59 21 68 27 67 42Z"/><circle cx="50" cy="19" r="4"/>',
  curls:'<circle cx="38" cy="34" r="7"/><circle cx="46" cy="29" r="7"/><circle cx="55" cy="29" r="7"/><circle cx="62" cy="34" r="7"/><circle cx="35" cy="41" r="5"/><circle cx="65" cy="41" r="5"/>'
 };
 var FACE={none:'',beard:'<path d="M36 52 C37 66 44 71 50 71 C56 71 63 66 64 52 C60 60 55 62 50 62 C45 62 40 60 36 52Z"/>',
  goatee:'<path d="M45 61 C46 67 48 69 50 69 C52 69 54 67 55 61 C53 63 47 63 45 61Z"/>'};
 // Neon extras sit on top of the silhouette.
 function shades(kind,c,grad){
  if(kind==='aviator')return '<g fill="url(#'+grad+')" stroke="'+c+'" stroke-width="1.2"><path d="M37 44 h10 c0 6 -2 9 -5.5 9 c-3.5 0 -5 -4 -4.5 -9Z"/><path d="M53 44 h10 c.5 5 -1 9 -4.5 9 c-3.5 0 -5.5 -3 -5.5 -9Z"/></g><path d="M47 45.5 h6" stroke="'+c+'" stroke-width="1.2"/>';
  if(kind==='visor')return '<rect x="35" y="43" width="30" height="7" rx="3.5" fill="url(#'+grad+')" stroke="'+c+'" stroke-width="1.2"/><path d="M39 46.5 h22" stroke="#fff" stroke-width=".8" opacity=".7"/>';
  if(kind==='round')return '<g fill="url(#'+grad+')" stroke="'+c+'" stroke-width="1.2"><circle cx="43" cy="47" r="5"/><circle cx="57" cy="47" r="5"/></g><path d="M48 46.5 h4" stroke="'+c+'" stroke-width="1.2"/>';
  if(kind==='block')return '<g fill="'+c+'"><rect x="36" y="43" width="12" height="7" rx="2"/><rect x="52" y="43" width="12" height="7" rx="2"/><rect x="47" y="44" width="6" height="2"/></g>';
  return '<g fill="'+c+'"><ellipse cx="44" cy="47" rx="2" ry="1.6"/><ellipse cx="56" cy="47" rx="2" ry="1.6"/></g>'}
 function extra(kind,c,top){
  if(kind==='chain')return '<path d="M38 78 C42 88 58 88 62 78" fill="none" stroke="#FFC24B" stroke-width="2.4" stroke-dasharray="2.2 1.2"/>';
  if(kind==='earring')return '<circle cx="34.5" cy="55" r="2" fill="none" stroke="#FFC24B" stroke-width="1.4"/>';
  if(kind==='phones')return '<path d="M33 48 C31 '+(top-8)+' 69 '+(top-8)+' 67 48" fill="none" stroke="'+c+'" stroke-width="2.6"/><rect x="29" y="44" width="7" height="12" rx="3" fill="'+c+'"/><rect x="64" y="44" width="7" height="12" rx="3" fill="'+c+'"/>';
  if(kind==='collar')return '<path d="M40 76 L50 86 L60 76 L56 74 L50 80 L44 74Z" fill="'+c+'"/>';
  return ''}
 function svg(seed,size){var r=rng(String(seed||'grandclips')),p=pick(r,PAL),hair=pick(r,Object.keys(HAIR)),face=r()<0.3?pick(r,['beard','goatee']):'none',
   sh=pick(r,['aviator','aviator','visor','round','block','eyes']),ex=pick(r,['none','chain','earring','phones','collar','chain']),c=pick(r,NEON),
   uid='av'+Math.floor(r()*1e9).toString(36),sy=48+Math.round(r()*8),top=hair==='afro'?17:hair==='bun'||hair==='beanie'?21:24;
  if(ex==='phones'&&(hair==='cap'||hair==='beanie'||hair==='mohawk'||hair==='bun'))ex='chain';
  if(ex==='earring'&&(hair==='long'||hair==='afro'))ex='collar';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="'+(size||40)+'" height="'+(size||40)+'" aria-hidden="true">'+
   '<defs><linearGradient id="'+uid+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p[0]+'"/><stop offset=".38" stop-color="'+p[1]+'"/><stop offset=".7" stop-color="'+p[2]+'"/><stop offset="1" stop-color="'+p[3]+'"/></linearGradient>'+
   '<linearGradient id="'+uid+'l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p[0]+'"/><stop offset="1" stop-color="'+p[2]+'"/></linearGradient>'+
   '<clipPath id="'+uid+'c"><rect width="100" height="100" rx="24"/></clipPath>'+
   '<mask id="'+uid+'m"><rect width="100" height="100" fill="#fff"/><rect y="'+(sy+6)+'" width="100" height="2" fill="#000"/><rect y="'+(sy+12)+'" width="100" height="2.8" fill="#000"/><rect y="'+(sy+18.5)+'" width="100" height="3.6" fill="#000"/></mask></defs>'+
   '<rect width="100" height="100" rx="24" fill="url(#'+uid+'g)"/><g clip-path="url(#'+uid+'c)">'+
   '<circle cx="50" cy="'+sy+'" r="30" fill="#fff" mask="url(#'+uid+'m)"/>'+
   '<g transform="translate(50 66) scale(1.2) translate(-50 -66)"><g fill="'+INK+'"><path d="M12 104 C14 84 30 76 50 76 C70 76 86 84 88 104Z"/><rect x="43" y="58" width="14" height="20" rx="5"/>'+
   '<ellipse cx="50" cy="47" rx="15" ry="18"/><ellipse cx="35" cy="49" rx="2.6" ry="4"/><ellipse cx="65" cy="49" rx="2.6" ry="4"/>'+HAIR[hair]+FACE[face]+'</g>'+
   shades(sh,c,uid+'l')+extra(ex,c,top)+'</g></g></svg>'}
 function seed(){var a=new Uint32Array(2);try{crypto.getRandomValues(a)}catch(e){a[0]=Math.random()*4294967296;a[1]=Date.now()}return a[0].toString(36)+a[1].toString(36)}
 function el(seedStr,size,cls){var s=document.createElement('span');s.className='av-img'+(cls?' '+cls:'');s.innerHTML=svg(seedStr,size);return s}
 return {svg:svg,seed:seed,el:el}})();
