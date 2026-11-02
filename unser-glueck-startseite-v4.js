/* Unser Glück: gemeinsame Begrüßungs-/Baby-Karte. Keine Änderungen an Auth oder Daten. */
(()=>{
 'use strict';
 const css=`
 #home .new-intro{display:none!important}
 #home .new-babyhero.family-hero{position:relative;display:flex!important;flex-direction:column;align-items:flex-start;justify-content:center;min-height:195px;width:100%;padding:26px 28px!important;margin:0 0 20px!important;border:1px solid rgba(255,255,255,.5)!important;border-radius:21px!important;background:linear-gradient(100deg,rgba(7,43,32,.88),rgba(12,44,38,.52)),url('https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?auto=format&fit=crop&w=1400&q=80') center/cover!important;color:#fff!important;box-shadow:0 12px 28px rgba(14,42,32,.13)!important;text-align:left}
 #home .family-hero .new-babyhero-top,#home .family-hero .new-babyhero-bottom{display:none!important}
 #home .family-hero .family-overline{font-size:10px;letter-spacing:1.35px;font-weight:850;color:#e3ead9;margin-bottom:7px}
 #home .family-hero .family-greeting{font-size:clamp(25px,3.1vw,36px);line-height:1.15;font-weight:850;letter-spacing:-.6px;color:#fff;margin:0 0 5px}
 #home .family-hero .family-date{font-size:13px;font-weight:650;color:#f5f7ee;margin-bottom:16px}
 #home .family-hero .family-caption{font-size:12px;font-weight:750;color:#f4ead2;margin-bottom:6px}
 #home .family-hero #babyHomeStatus{font-size:clamp(16px,2vw,22px)!important;font-weight:800!important;line-height:1.3!important;letter-spacing:0!important;max-width:none!important;color:#fff!important;margin:0 0 5px!important}
 #home .family-hero .family-week{font-size:14px;font-weight:700;color:#e7f1df}
 #home .family-hero .family-arrow{position:absolute;right:18px;bottom:18px;background:#ffffff26;border:1px solid #ffffff50;border-radius:10px;padding:6px 11px;font-size:19px;color:#fff}
 @media(max-width:850px){#home .new-babyhero.family-hero{padding:22px 19px!important;min-height:204px}}
 `;
 const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
 const fmt=()=>new Intl.DateTimeFormat('de-DE',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
 const init=()=>{
  const hero=document.querySelector('#home .new-babyhero');
  const status=document.getElementById('babyHomeStatus');
  if(!hero||!status)return false;
  hero.classList.add('family-hero');
  hero.setAttribute('aria-label','Unser Baby öffnen');
  const top=hero.querySelector('.new-babyhero-top');
  const greeting=document.createElement('div');greeting.className='family-greeting';
  const date=document.createElement('div');date.className='family-date';
  const caption=document.createElement('div');caption.className='family-caption';caption.textContent='UNSER BABY · UNSER GEMEINSAMER WEG';
  const overline=document.createElement('div');overline.className='family-overline';overline.textContent='UNSER GLÜCK · ALLES FÜR UNSERE FAMILIE';
  const week=document.createElement('div');week.className='family-week';
  const arrow=document.createElement('span');arrow.className='family-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
  hero.insertBefore(overline,top);hero.insertBefore(greeting,top);hero.insertBefore(date,top);hero.insertBefore(caption,top);
  status.after(week);hero.appendChild(arrow);
  const update=()=>{
   const u=document.getElementById('papaCurrentUser')?.textContent||'';
   const who=/Maya/i.test(u)?'Maya':'Fabian';
   greeting.textContent='Hallo '+who+' 👋';date.textContent=fmt();
   const w=document.getElementById('babyCountdown')?.textContent||'';
   const match=w.match(/SSW\s*(\d+)\s*\((\d+)\s*\+\s*(\d+)\)/i);
   week.textContent=match?`SSW ${match[2]}+${match[3]} · ${match[1]}. Schwangerschaftswoche`:(/Geburtstermin erreicht/i.test(w)?'Der errechnete Termin ist erreicht':'Schwangerschaftswoche erscheint nach Eingabe des Geburtstermins');
  };
  update();
  const watched=[document.getElementById('babyCountdown'),document.getElementById('papaCurrentUser'),status].filter(Boolean);
  const obs=new MutationObserver(update);watched.forEach(e=>obs.observe(e,{childList:true,characterData:true,subtree:true}));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
  return true;
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
