// Accounts (Vin, Nov 8): sign in with Google or Apple only, through Supabase Auth.
// Each new account gets a random GTA-style username (letters only, unique) and a random avatar (avatar.js).
// People can rename, get a new avatar, log out, or delete their profile. Favorites are saved to the account.
// Setup: README.md (Accounts) and supabase/schema.sql. Until Vercel has SUPABASE_URL and SUPABASE_ANON_KEY,
// the sign-in sheet says sign-in isn't switched on yet and the rest of the site works as before.
var ACC={sb:null,ready:false,off:false,user:null,prof:null,then:null,busy:false};
// Usernames: two words, no numbers. 60 x 60 pairs, with a three-word fallback if every try is taken.
var NAME_A=['Neon','Sunset','Chrome','Velvet','Midnight','Turbo','Golden','Pink','Palm','Ocean','Electric','Retro','Diamond','Crimson','Silent',
 'Lucky','Wild','Smooth','Rogue','Shadow','Coastal','Slick','Rapid','Royal','Cosmic','Crystal','Savage','Vapor','Lazy','Breezy','Flashy','Cherry',
 'Copper','Ivory','Jade','Lunar','Nitro','Outlaw','Rebel','Stormy','Tropic','Wicked','Cobalt','Laser','Burning','Iron','Salty','Sly','Hazy','Bold',
 'Glitter','Hustlin','Mellow','Chill','Rowdy','Sneaky','Heavy','Swift','Shady','Dapper'];
var NAME_B=['Hustler','Getaway','Drifter','Bandit','Kingpin','Racer','Runner','Gambler','Wheelman','Shark','Viper','Cruiser','Boss','Rider','Ghost',
 'Flamingo','Gator','Panther','Cobra','Falcon','Hawk','Jackal','Tiger','Wolf','Fox','Marlin','Barracuda','Mustang','Roadster','Speedster','Hotshot',
 'Highroller','Lowrider','Bootlegger','Racketeer','Wiseguy','Enforcer','Lookout','Driver','Pilot','Captain','Skipper','Surfer','Skater','Legend',
 'Maverick','Renegade','Vandal','Stuntman','Showboat','Smuggler','Pelican','Mobster','Crook','Ace','Tycoon','Dealmaker','Joyrider','Daredevil','Rascal'];
function accRand(n){var a=new Uint32Array(1);try{crypto.getRandomValues(a);return a[0]%n}catch(e){return Math.floor(Math.random()*n)}}
function accName(words){var s='';for(var i=0;i<(words||2)-1;i++)s+=NAME_A[accRand(NAME_A.length)];s+=NAME_B[accRand(NAME_B.length)];return s.length>20?accName(2):s}
function accValid(u){return /^[A-Za-z_]{3,20}$/.test(u)}
function accSvg(d,size){var ns='http://www.w3.org/2000/svg',sv=document.createElementNS(ns,'svg');sv.setAttribute('width',size||20);sv.setAttribute('height',size||20);sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');sv.innerHTML=d;return sv}
var ACCI={google:'<path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.5 5.5 0 01-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0012 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 010-4.6V6.6h-4a12 12 0 000 10.8l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 001.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z"/>',
 apple:'<path fill="currentColor" d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2.1-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5.1c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/>',
 dice:'<rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/>'};
function accScript(src,cb){var s=document.createElement('script');s.src=src;s.onload=function(){cb(true)};s.onerror=function(){cb(false)};document.head.append(s)}
// Start-up: read the public Supabase settings from /api/config, load supabase-js, finish a Google/Apple return if there is one.
function accInit(){
 fetch('/api/config').then(function(r){return r.ok?r.json():{}}).catch(function(){return {}}).then(function(cfg){
  if(!cfg||!cfg.supabaseUrl||!cfg.supabaseAnonKey){ACC.off=true;return}
  accScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js',function(ok){
   if(!ok||!window.supabase){ACC.off=true;return}
   ACC.sb=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
   ACC.ready=true;
   ACC.sb.auth.onAuthStateChange(function(ev,session){
    if(ev==='SIGNED_OUT'){accClear();return}
    if(session&&session.user&&(!ACC.user||ACC.user.id!==session.user.id)){ACC.user=session.user;setTimeout(accLoad,0)}});
   ACC.sb.auth.getSession().then(function(r){var s=r&&r.data&&r.data.session;if(s&&!ACC.user){ACC.user=s.user;accLoad()}accCleanUrl()})})})}
// After Google/Apple sends people back, drop the ?code= from the address and return to the page they were on.
function accCleanUrl(){var ret=null;try{ret=sessionStorage.getItem('gc_ret');sessionStorage.removeItem('gc_ret')}catch(e){}
 if(location.search.indexOf('code=')>=0||location.search.indexOf('error')>=0){var q=new URLSearchParams(location.search),err=q.get('error_description');
  history.replaceState(null,'',location.pathname+(ret||location.hash));if(ret)window.dispatchEvent(new HashChangeEvent('hashchange'));if(err)toast('Sign-in didn’t finish: '+err)}}
// Load (or create) the profile, then the saved favorites.
function accLoad(){if(!ACC.user)return;var uid=ACC.user.id;
 ACC.sb.from('profiles').select('id,username,avatar_seed').eq('id',uid).maybeSingle().then(function(r){
  if(r.error){toast('Couldn’t load your profile. Try again in a moment.');return}
  if(r.data){accSet(r.data,false);return}
  accCreate(uid,0)})}
function accCreate(uid,tries){var p={id:uid,username:accName(tries<6?2:3),avatar_seed:AV.seed()};
 ACC.sb.from('profiles').insert(p).select('id,username,avatar_seed').single().then(function(r){
  if(r.error&&r.error.code==='23505'&&tries<12){accCreate(uid,tries+1);return}
  if(r.error){toast('Couldn’t create your profile. Try again in a moment.');return}
  accSet(r.data,true)})}
function accSet(prof,isNew){ACC.prof=prof;S.user=prof.username;render();
 if($('sid').open)accSheet();
 toast(isNew?'Welcome, @'+prof.username+'!':'Signed in as @'+prof.username);
 accFavsLoad()}
function accFavsLoad(){ACC.sb.from('favorites').select('item_id,item,created_at').then(function(r){if(r.error)return;
  var mine={};(r.data||[]).forEach(function(f){mine[f.item_id]=1;if(!S.saved[f.item_id])S.saved[f.item_id]=Date.parse(f.created_at)||Date.now();
   if(f.item&&f.item.kind==='live'&&!S.chans[f.item_id])S.chans[f.item_id]=f.item});
  // Favorites saved on this device before signing in are added to the account.
  var up=Object.keys(S.saved).filter(function(n){return !mine[n]}).map(function(n){return {user_id:ACC.user.id,item_id:n,item:accSnap(accFind(n)||S.chans[n]||{n:n})}});
  if(up.length)ACC.sb.from('favorites').upsert(up,{onConflict:'user_id,item_id',ignoreDuplicates:true}).then(function(){});
  store('gc_saved',S.saved);store('gc_chans',S.chans);render();accPending()})}
function accFind(n){var l=allItems();for(var i=0;i<l.length;i++)if(String(l[i].n)===String(n))return l[i];return null}
function accSnap(c){var o={};['n','p','t','id','u','ch','name','thumb','url','kind','clip','short','vert','pub','views'].forEach(function(k){if(c&&c[k]!=null)o[k]=c[k]});return o}
// The clip someone tried to favorite before signing in gets favorited once they're back.
function accPending(){var n=null;try{n=sessionStorage.getItem('gc_pendfav');sessionStorage.removeItem('gc_pendfav')}catch(e){}if(!n||S.saved[n])return;
 var t0=Date.now();(function tryIt(){var c=accFind(n);if(c){if(!S.saved[c.n])toggleFav(c);return}if(Date.now()-t0<15000)setTimeout(tryIt,800)})()}
// Called by toggleFav after the favorite changed on this device.
function accFav(c,on){if(!ACC.ready||!ACC.user)return;
 var q=on?ACC.sb.from('favorites').upsert({user_id:ACC.user.id,item_id:String(c.n),item:accSnap(c)},{onConflict:'user_id,item_id'}):ACC.sb.from('favorites').delete().eq('user_id',ACC.user.id).eq('item_id',String(c.n));
 q.then(function(r){if(r&&r.error)toast('Couldn’t save that to your account. Try again.')})}
function accClear(){ACC.user=null;ACC.prof=null;S.user=null;S.saved={};S.chans={};store('gc_saved',{});store('gc_chans',{});render()}
function accGo(provider){
 if(!ACC.ready){$('siderr').textContent=ACC.off?'Sign-in isn’t switched on yet. It will be soon.':'Still loading. Try again in a second.';return}
 try{sessionStorage.setItem('gc_ret',location.hash||'');if(ACC.pend)sessionStorage.setItem('gc_pendfav',ACC.pend)}catch(e){}
 ACC.sb.auth.signInWithOAuth({provider:provider,options:{redirectTo:location.origin+location.pathname}}).then(function(r){if(r.error)$('siderr').textContent='Couldn’t open '+(provider==='apple'?'Apple':'Google')+' sign-in. Try again.'})}
// One sheet for both states: Google/Apple buttons when signed out, the profile when signed in.
function signIn(why,then,item){ACC.why=why;ACC.pend=item?item.n:null;ACC.then=then||null;accSheet();var d=$('sid');if(!d.open)d.showModal()}
function accSheet(){var f=$('sidf');ACC.delArm=false;
 if(!ACC.prof){
  f.replaceChildren(
   h('h2',{id:'sidh',text:ACC.why&&ACC.why!=='Sign in'?ACC.why:'Sign in to GRANDCLIPS'}),
   h('p',{id:'sidp',text:'One tap with Google or Apple. You get a random name and avatar, and your favorites are saved to your account.'}),
   h('div',{class:'accbtns'},[
    h('button',{type:'button',class:'accb google',onclick:function(){accGo('google')}},[accSvg(ACCI.google,20),document.createTextNode('Continue with Google')]),
    h('button',{type:'button',class:'accb apple',onclick:function(){accGo('apple')}},[accSvg(ACCI.apple,20),document.createTextNode('Continue with Apple')])]),
   h('div',{class:'err',id:'siderr','aria-live':'polite'}),
   h('div',{class:'acts'},[h('button',{type:'button',class:'pill',id:'sidx',onclick:accClose,text:'Cancel'})]));
  return}
 var p=ACC.prof,inp=h('input',{id:'sidu',value:p.username,maxlength:'20',autocomplete:'off',autocapitalize:'off',spellcheck:'false','aria-describedby':'siderr'});
 var av=h('div',{class:'accav'},[AV.el(p.avatar_seed,96)]);
 f.replaceChildren(
  h('div',{class:'acchead'},[av,h('div',{},[h('h2',{id:'sidh',text:'@'+p.username}),h('button',{type:'button',class:'pill sm',onclick:accNewAvatar},[accSvg(ACCI.dice,16),document.createTextNode('New avatar')])])]),
  h('label',{for:'sidu',text:'Username'}),
  h('div',{class:'accname'},[inp,h('button',{type:'button',class:'pill sm',title:'Random name','aria-label':'Random name',onclick:function(){inp.value=accName(2);inp.focus()}},[accSvg(ACCI.dice,16)]),h('button',{type:'submit',class:'pill solid sm',text:'Save'})]),
  h('div',{class:'err',id:'siderr','aria-live':'polite'}),
  h('p',{class:'acchint',text:'Letters and underscores only, 3 to 20 characters.'}),
  h('div',{class:'acts accacts'},[h('button',{type:'button',class:'pill acckill',id:'acckill',onclick:accDelete,text:'Delete profile'}),h('span',{style:'flex:1'}),
   h('button',{type:'button',class:'pill',onclick:accLogout,text:'Log out'}),h('button',{type:'button',class:'pill',id:'sidx',onclick:accClose,text:'Close'})]))}
function accClose(){ACC.then=null;ACC.pend=null;$('sid').close()}
$('sidf').addEventListener('submit',function(e){e.preventDefault();if(!ACC.prof||ACC.busy)return;var u=$('sidu').value.trim().replace(/^@/,''),err=$('siderr');
 if(u===ACC.prof.username){err.textContent='';return}
 if(!accValid(u)){err.textContent='Use 3 to 20 letters (A to Z) or underscores. No numbers or spaces.';return}
 ACC.busy=true;err.textContent='Saving…';
 ACC.sb.from('profiles').update({username:u}).eq('id',ACC.prof.id).select('id,username,avatar_seed').single().then(function(r){ACC.busy=false;
  if(r.error){err.textContent=r.error.code==='23505'?'@'+u+' is taken. Try another.':'Couldn’t save. Try again.';return}
  ACC.prof=r.data;S.user=r.data.username;render();accSheet();toast('You’re now @'+r.data.username)})});
function accNewAvatar(){if(!ACC.prof||ACC.busy)return;var s=AV.seed();ACC.busy=true;
 ACC.sb.from('profiles').update({avatar_seed:s}).eq('id',ACC.prof.id).then(function(r){ACC.busy=false;if(r.error){toast('Couldn’t change your avatar. Try again.');return}
  ACC.prof.avatar_seed=s;render();var a=document.querySelector('#sidf .accav');if(a)a.replaceChildren(AV.el(s,96))})}
function accLogout(){$('sid').close();ACC.sb.auth.signOut().then(function(){accClear();toast('Logged out')})}
function accDelete(){var b=$('acckill');
 if(!ACC.delArm){ACC.delArm=true;b.textContent='Tap again to delete for good';b.classList.add('arm');$('siderr').textContent='This deletes your profile and favorites. It can’t be undone.';return}
 b.disabled=true;ACC.sb.rpc('delete_me').then(function(r){
  if(r.error){b.disabled=false;$('siderr').textContent='Couldn’t delete your profile. Try again.';return}
  $('sid').close();ACC.sb.auth.signOut().catch(function(){}).then(function(){accClear();toast('Your profile was deleted')})})}
// Header button: avatar (and name on wide screens) when signed in.
function accHeader(){var si=$('signin');if(!ACC.prof){si.className='pill';si.replaceChildren(document.createTextNode('Sign in'));si.setAttribute('aria-label','Sign in');return}
 si.className='pill accpill';si.replaceChildren(AV.el(ACC.prof.avatar_seed,30),h('span',{class:'lbl',text:'@'+ACC.prof.username}));si.setAttribute('aria-label','Signed in as @'+ACC.prof.username+'. Account')}
accInit();
