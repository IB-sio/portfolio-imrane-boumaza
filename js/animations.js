/* Terminal de navigation local : aucun shell ni code saisi n'est exécuté. */
(() => {
 'use strict';
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=preference.matches;
 try { paused=paused||sessionStorage.getItem('portfolio-motion')==='paused'; } catch (_) {}
 const tr=s=>window.portfolioTranslate?.(s)||s;
 const root=document.documentElement;
 const decoration=document.createElement('div');decoration.className='ambient';decoration.setAttribute('aria-hidden','true');
 const geometry='<svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><circle cx="400" cy="400" r="320"/><circle cx="400" cy="400" r="260"/><rect x="180" y="180" width="440" height="440" transform="rotate(30 400 400)"/><path d="M80 400H720M400 80V720"/></g><g fill="currentColor"><circle cx="400" cy="80" r="7"/><circle cx="80" cy="400" r="7"/><circle cx="400" cy="720" r="7"/></g></svg>';
 decoration.innerHTML=geometry+geometry;document.body.prepend(decoration);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='motion-toggle';document.querySelector('main')?.append(toggle);
 const terminal=document.querySelector('.terminal-output'),replay=document.querySelector('.terminal-replay');
 let timer,entry=0,letter=0,line,input,form,intro,log;
 const commands=[],entries=[['whoami','Imrane Boumaza'],['cat parcours.txt','BTS SIO · SISR · Pau · 2027'],['ls outils/','Debian  Proxmox  pfSense  Active Directory'],['cat objectif.txt','Alternance 2027 : cybersécurité, sécurité cloud, systèmes et réseaux.']];
 let historyIndex=0,draft='';
 function paragraph(text,parent=log){const p=document.createElement('p');p.textContent=tr(text);parent.append(p);return p;}
 function finish(){if(input)input.disabled=false;replay&&(replay.textContent=tr('Rejouer'));}
 function fullTerminal(){if(!intro)return;intro.replaceChildren();entries.forEach(([command,answer])=>{const p=paragraph(answer,intro),span=document.createElement('span');span.className='command';span.dataset.noI18n='';span.textContent='$ '+command;p.prepend(span,document.createElement('br'));});entry=entries.length;finish();}
 function tick(){clearTimeout(timer);if(!intro||paused||document.hidden)return;if(entry===entries.length){finish();return;}if(letter===0){const p=document.createElement('p');line=document.createElement('span');line.className='command';line.dataset.noI18n='';p.append(line);intro.append(p);}const [command,answer]=entries[entry];line.textContent='$ '+command.slice(0,++letter);if(letter>=command.length){const response=document.createElement('span');response.textContent=tr(answer);line.parentElement.append(document.createElement('br'),response);entry++;letter=0;timer=setTimeout(tick,500);}else timer=setTimeout(tick,35);}
 function restart(){clearTimeout(timer);if(!intro)return;intro.replaceChildren();log.replaceChildren();entry=0;letter=0;input.disabled=true;if(paused)fullTerminal();else tick();}
 function addLink(label,href,newTab=false){const p=document.createElement('p'),a=document.createElement('a');a.textContent=tr(label);a.href=href;if(newTab){a.target='_blank';a.rel='noopener noreferrer';}p.append(a);log.append(p);return a;}
 if(terminal){
  terminal.removeAttribute('aria-hidden');
  intro=document.createElement('div');intro.className='terminal-intro';intro.setAttribute('aria-hidden','true');
  log=document.createElement('div');log.className='terminal-responses';log.setAttribute('role','log');log.setAttribute('aria-live','polite');log.setAttribute('aria-relevant','additions');
  terminal.append(intro,log);
  form=document.createElement('form');form.className='terminal-form';form.innerHTML='<label for="terminal-command"><span class="terminal-prompt" dir="ltr" data-no-i18n>imrane@debian:~$</span><span class="sr-only">Commande du terminal</span></label><input id="terminal-command" type="text" maxlength="120" autocomplete="off" autocapitalize="off" spellcheck="false" dir="ltr" aria-describedby="terminal-help"><button type="submit" class="terminal-submit" aria-label="Exécuter la commande">↵</button>';
  const help=document.createElement('p');help.id='terminal-help';help.className='terminal-help';help.textContent='Tape help pour découvrir les commandes. Échap pour quitter le champ.';
  terminal.after(form,help);input=form.querySelector('input');input.disabled=true;
  form.addEventListener('submit',event=>{
   event.preventDefault();const raw=input.value.trim();if(!raw)return;input.value='';commands.push(raw);if(commands.length>50)commands.shift();historyIndex=commands.length;draft='';
   const echo=document.createElement('p');echo.className='command';echo.dataset.noI18n='';echo.dir='ltr';echo.textContent='imrane@debian:~$ '+raw;log.append(echo);
   const command=raw.toLowerCase();
   switch(command){
    case 'help': paragraph('Commandes disponibles :');{const p=document.createElement('p');p.dataset.noI18n='';p.dir='ltr';p.textContent='help · whoami · projets · competences · cv · contact · veille · clear · history';log.append(p);}break;
    case 'whoami':paragraph('Imrane Boumaza');paragraph('Alternance 2027 : cybersécurité, sécurité cloud, systèmes et réseaux.');break;
    case 'projets':addLink('NetVision · Haute disponibilité AD','pages/realisations.html#ha-active-directory');addLink('pfSense · Sécurisation complète d’un réseau','pages/realisations.html#pare-feu-pfsense');addLink('Audit de sécurité · Laboratoire Kali','pages/realisations.html#kali-metasploitable');break;
    case 'competences':addLink('Voir mes compétences','pages/competences.html');break;
    case 'cv':{const language=['fr','en','ar','zh'].includes(root.lang)?root.lang:'fr';const link=addLink('Voir mon CV','assets/docs/cv/cv-imrane-boumaza-'+language+'.pdf?v=20261029-cv',true);link.click();break;}
    case 'contact':addLink('Me contacter','pages/contact.html');break;
    case 'veille':addLink('Veille IoT','pages/veille.html');break;
    case 'clear':intro.replaceChildren();log.replaceChildren();break;
    case 'history':{const p=document.createElement('p');p.dataset.noI18n='';p.dir='ltr';p.textContent=commands.map((c,i)=>`${i+1}  ${c}`).join('\n');log.append(p);break;}
    default:paragraph('commande introuvable — tape help');
   }
   // Keep the DOM bounded; the keyboard history retains the last 50 entries.
   while(log.children.length>120)log.firstElementChild.remove();
   terminal.scrollTop=terminal.scrollHeight;
  });
  input.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();replay.focus({preventScroll:true});return;}if(event.key!=='ArrowUp'&&event.key!=='ArrowDown')return;event.preventDefault();if(historyIndex===commands.length)draft=input.value;historyIndex=Math.max(0,Math.min(commands.length,historyIndex+(event.key==='ArrowUp'?-1:1)));input.value=historyIndex===commands.length?draft:commands[historyIndex];input.setSelectionRange(input.value.length,input.value.length);});
  replay.addEventListener('click',restart);
 }
 function setMotion(){root.dataset.motion=paused?'paused':'active';toggle.textContent=tr(paused?'Activer les animations':'Mettre les animations en pause');toggle.setAttribute('aria-pressed',String(paused));toggle.disabled=preference.matches;clearTimeout(timer);if(paused)fullTerminal();}
 toggle.addEventListener('click',()=>{paused=preference.matches||!paused;try{sessionStorage.setItem('portfolio-motion',paused?'paused':'active');}catch(_){}setMotion();});
 preference.addEventListener('change',()=>{paused=preference.matches;setMotion();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(timer);else if(!paused)tick();});
 document.addEventListener('languagechange',()=>{if(intro){clearTimeout(timer);fullTerminal();}});
 setMotion();restart();
 document.querySelectorAll('main > section').forEach(el=>el.classList.add('reveal'));
 if('IntersectionObserver' in window&&!paused){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('will-reveal');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});}
})();
/* Le rôle reste visible. Seule la devise suit l'apparition du nom. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const name=document.querySelector('.hero h1'),subtitle=document.querySelector('[data-typewriter]');
 if(!name||!subtitle||reduced.matches||document.documentElement.dataset.motion==='paused')return;
 name.setAttribute('data-no-i18n','');let count=0;
 for(const node of [...name.childNodes]){const text=node.textContent,frag=document.createDocumentFragment();for(const c of Array.from(text)){const span=document.createElement('span');span.className='name-letter';span.style.setProperty('--delay',`${count++*45}ms`);span.textContent=c;frag.append(span);}if(node.nodeType===3)node.replaceWith(frag);else node.replaceChildren(frag);}
 const original='Construire. Comprendre. Sécuriser.';
 subtitle.dataset.noI18n='';subtitle.textContent='';let timer,index=0;
 function restore(){clearTimeout(timer);subtitle.textContent=window.portfolioTranslate?.(original)||original;}
 timer=setTimeout(()=>{const translated=window.portfolioTranslate?.(original)||original;function tick(){if(reduced.matches||document.documentElement.dataset.motion==='paused'){restore();return;}subtitle.textContent=Array.from(translated).slice(0,++index).join('');if(index<Array.from(translated).length)timer=setTimeout(tick,24);}tick();},count*45+200);
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
