/* Animations facultatives : aucun shell ni requête réseau n'est exécuté. */
(() => {
 'use strict';
 const preference = matchMedia('(prefers-reduced-motion: reduce)');
 let paused = preference.matches;
 try { paused = paused || sessionStorage.getItem('portfolio-motion') === 'paused'; } catch (_) {}
 const root = document.documentElement;
 const decoration = document.createElement('div');
 decoration.className = 'ambient'; decoration.setAttribute('aria-hidden', 'true');
 const geometry = '<svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><circle cx="400" cy="400" r="320"/><circle cx="400" cy="400" r="260"/><rect x="180" y="180" width="440" height="440" transform="rotate(30 400 400)"/><path d="M80 400H720M400 80V720"/></g><g fill="currentColor"><circle cx="400" cy="80" r="7"/><circle cx="80" cy="400" r="7"/><circle cx="400" cy="720" r="7"/></g></svg>';
 decoration.innerHTML = geometry + geometry; document.body.prepend(decoration);
 const toggle = document.createElement('button'); toggle.type='button'; toggle.className='motion-toggle';
 document.querySelector('main').append(toggle);
 const terminal = document.querySelector('.terminal-output');
 const replay = document.querySelector('.terminal-replay');
 const entries = [
  ['whoami','Imrane Boumaza'],
  ['cat parcours.txt','BTS SIO · SISR · Pau · 2027'],
  ['ls outils/','Debian  Proxmox  pfSense  Active Directory'],
  ['cat objectif.txt','Intégrer une école d’ingénieur en cybersécurité.']
 ];
 let timer, entry=0, letter=0, line;
 function fullTerminal() {
  if(!terminal) return;
  entry=entries.length; letter=0;
  terminal.replaceChildren();
  entries.forEach(([command,answer])=>{ const p=document.createElement('p'); const span=document.createElement('span');span.className='command';span.textContent='$ '+command;p.append(span,document.createElement('br'),document.createTextNode(answer));terminal.append(p); });
 }
 function tick() {
  clearTimeout(timer);
  if(!terminal || paused || document.hidden) return;
  if(entry===entries.length) { replay.textContent='Rejouer'; return; }
  if(letter===0) { const p=document.createElement('p');line=document.createElement('span');line.className='command';p.append(line);terminal.append(p); }
  const [command,answer]=entries[entry];
  line.textContent='$ '+command.slice(0,++letter);
  if(letter>=command.length) { line.parentElement.append(document.createElement('br'),document.createTextNode(answer));entry++;letter=0;timer=setTimeout(tick,750); }
  else timer=setTimeout(tick,45);
 }
 function restart() { clearTimeout(timer); if(!terminal)return; if(paused){fullTerminal();return;} terminal.replaceChildren();entry=0;letter=0;replay.textContent='Recommencer';tick(); }
 function setMotion() { root.dataset.motion=paused?'paused':'active';toggle.textContent=paused?'Activer les animations':'Mettre les animations en pause';toggle.setAttribute('aria-pressed',String(paused));toggle.disabled=preference.matches;clearTimeout(timer);fullTerminal(); }
 toggle.addEventListener('click',()=>{paused=preference.matches||!paused;try{sessionStorage.setItem('portfolio-motion',paused?'paused':'active');}catch(_){}setMotion();});
 preference.addEventListener('change',()=>{paused=preference.matches;setMotion();});
 if(replay) replay.addEventListener('click',restart);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(timer);else if(!paused)tick();});
 setMotion();
 document.querySelectorAll('main > section').forEach(el=>el.classList.add('reveal'));
 if('IntersectionObserver' in window && !paused) {
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('will-reveal');observer.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
 }

})();
/* Une seule séquence d'entrée : nom, puis sous-titre. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const name=document.querySelector('.hero h1'),subtitle=document.querySelector('.hero .role');
 if(!name||!subtitle||reduced.matches||document.documentElement.dataset.motion==='paused')return;
 name.setAttribute('data-no-i18n','');
 let count=0;
 for(const node of [...name.childNodes]){
  const target=node.nodeType===3?name:node;
  const text=node.textContent;
  const frag=document.createDocumentFragment();
  for(const c of Array.from(text)){const span=document.createElement('span');span.className='name-letter';span.style.setProperty('--delay',`${count++*45}ms`);span.textContent=c;frag.append(span);}
  if(node.nodeType===3)node.replaceWith(frag);else node.replaceChildren(frag);
 }
 const original=subtitle.textContent;
 subtitle.setAttribute('aria-label',original);
 subtitle.textContent='';
 let timer,index=0;
 function restore(){clearTimeout(timer);subtitle.textContent=original;subtitle.removeAttribute('aria-label');}
 timer=setTimeout(()=>{if(reduced.matches)return;subtitle.textContent='';const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');visual.setAttribute('data-no-i18n','');const caret=document.createElement('span');caret.className='cursor';caret.setAttribute('aria-hidden','true');subtitle.append(visual,caret);function tick(){visual.textContent=Array.from(original).slice(0,++index).join('');if(index<Array.from(original).length)timer=setTimeout(tick,24);else{subtitle.removeAttribute('aria-label');visual.removeAttribute('aria-hidden');}}tick();},count*45+200);
 reduced.addEventListener('change',restore);document.addEventListener('languagechange',restore);document.querySelector('.motion-toggle')?.addEventListener('click',restore);
})();
/* Galerie : photos authentiques, clic, flèches et Échap. */
(() => {
 const dialog=document.getElementById('gallery-dialog');if(!dialog)return;
 let triggers=[],index=0,opener;
 function show(){const button=triggers[index],img=dialog.querySelector('.gallery-large');img.src=button.dataset.gallery;img.alt=button.querySelector('img').alt;dialog.querySelector('.gallery-caption').textContent=img.alt;dialog.querySelector('.gallery-counter').textContent=`${index+1} / ${triggers.length}`;}
 document.addEventListener('click',event=>{const button=event.target.closest('[data-gallery]');if(!button)return;const scope=button.closest('.project-media-grid')||document;triggers=[...scope.querySelectorAll('[data-gallery]')];index=triggers.indexOf(button);opener=button;show();dialog.showModal();document.body.classList.add('modal-open');});
 function move(step){index=(index+step+triggers.length)%triggers.length;show();}
 dialog.querySelector('[data-gallery-prev]').addEventListener('click',()=>move(-1));dialog.querySelector('[data-gallery-next]').addEventListener('click',()=>move(1));dialog.querySelector('[data-gallery-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}});
 dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');opener?.focus();});
})();
