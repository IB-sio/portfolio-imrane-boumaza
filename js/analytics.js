(()=>{'use strict';
const ENDPOINT='https://imrane-analytics-collect.imrane-boumaza.workers.dev/v1/collect';
const SKEY='analytics-session-v2',VKEY='analytics-visitor-v2';let counted=false,abort=new AbortController(),idle=7200,stopped=false;
function allowed(){return window.analyticsAllowed?.()===true&&!!navigator.locks&&!stopped}
function originInfo(){let referrer='';try{const u=new URL(document.referrer);if(u.origin!==location.origin&&u.hostname.length<=253)referrer=u.hostname}catch{}
const params=new URLSearchParams(location.search),utm={};for(const k of['source','medium','campaign']){const v=params.get('utm_'+k);const list=k==='campaign'?['test','stage-2027','ecole-2027']:['email','linkedin','github','direct','social','referral','test'];if(list.includes(v))utm[k]=v}return{referrer,utm}}
async function update(kind,event){
 if(!allowed())return;
 await navigator.locks.request('portfolio-analytics',async()=>{
 if(!allowed())return;
 try{
 const now=Date.now();let v=localStorage.getItem(VKEY);if(!v){v=crypto.randomUUID();localStorage.setItem(VKEY,v)}
 let s=JSON.parse(localStorage.getItem(SKEY)||'null');let fresh=!s||now-s.touch>=idle*1000;
 if(fresh){s={session_id:crypto.randomUUID(),seq:0,pages:{},clicks:{},active_seconds:0,touch:now,tick:now,...originInfo()};counted=false}
 if(!counted){s.pages[location.pathname]=(s.pages[location.pathname]||0)+1;counted=true}
 if(s.ack&&kind==='tick'&&document.visibilityState==='visible'){s.active_seconds+=Math.min(60,Math.max(0,Math.floor((now-s.tick)/1000)))}
 s.tick=now;s.touch=now;
 if(event)s.clicks[event]=Math.min(500,(s.clicks[event]||0)+1);
 s.seq++;localStorage.setItem(SKEY,JSON.stringify(s));
 if(s.seq>120){stopped=true;return}
 const payload={site_id:'portfolio',consent:true,visitor_id:v,session_id:s.session_id,seq:s.seq,screen:{width:Math.min(16384,Math.max(1,screen.width)),height:Math.min(16384,Math.max(1,screen.height))},referrer:s.referrer,utm:s.utm,pages:s.pages,clicks:s.clicks,active_seconds:s.active_seconds};
 if(!allowed())return;
 const res=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',referrerPolicy:'no-referrer',body:JSON.stringify(payload),signal:abort.signal,keepalive:true});
 const data=await res.json().catch(()=>({}));
 if(res.status===409&&data.error==='new_session_required'){localStorage.removeItem(SKEY);counted=false}
 if(res.status===429)stopped=true;
 if(res.ok&&Number.isInteger(data.session_idle_seconds)){idle=data.session_idle_seconds;if(allowed()){s.ack=true;localStorage.setItem(SKEY,JSON.stringify(s))}}
 }catch{/* No logging of visitor data; analytics must never block navigation. */}
 });
}
window.addEventListener('analytics-consent-change',()=>{abort.abort();abort=new AbortController();if(!window.analyticsAllowed?.()){counted=false;return}stopped=false;update('page')});
document.addEventListener('click',e=>{const a=e.target.closest('[data-track]');if(a&&['cv_open','project_open','contact_click'].includes(a.dataset.track))update('click',a.dataset.track)});
setInterval(()=>{if(document.visibilityState==='visible')update('tick')},60000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')update('page')});
update('page');
})();
