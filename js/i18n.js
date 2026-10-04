/* Traductions locales, sans service externe. Éditer js/i18n/fr.js, en.js, ar.js ou zh.js. */
(() => {
 'use strict';
 const dictionaries=window.PORTFOLIO_I18N,allowed=['fr','en','ar','zh'];let language='fr';
 try{const saved=localStorage.getItem('portfolio-language');if(allowed.includes(saved))language=saved;}catch(_){}
 const texts=new WeakMap(),attrs=new WeakMap();let running=false;
 const normal=s=>s.replace(/\s+/g,' ').trim();
 const reverse=new Map();for(const d of Object.values(dictionaries))for(const [k,v] of Object.entries(d))if(k!==v)reverse.set(v,k);
 function tr(value){const source=normal(value),d=dictionaries[language];if(Object.hasOwn(d,source))return d[source];
  if(reverse.has(source))return d[reverse.get(source)]||source;
  if(source.startsWith(': '))return ': '+tr(source.slice(2));
  if(source.includes(' / '))return source.split(' / ').map(tr).join(' / ');
  const count=source.match(/^(\d+) réalisation(s)?$/);if(count)return count[1]+' '+({fr:Number(count[1])>1?'réalisations':'réalisation',en:Number(count[1])>1?'projects':'project',ar:'مشاريع',zh:'个项目'}[language]);
  if(source.startsWith('[À COMPLÉTER : documentation PDF '))return {fr:source,en:'[PDF documentation to add]',ar:'[وثائق PDF قيد الإضافة]',zh:'[待添加PDF文档]'}[language];
  return source;
 }
 function translateNode(node){
  if(node.parentElement?.closest('script,style,[data-no-i18n],.language-selector'))return;
  const value=normal(node.nodeValue||'');if(!value)return;
  let record=texts.get(node);if(!record||value!==record.last){record={source:Object.hasOwn(dictionaries.fr,value)?value:(reverse.get(value)||value),last:value};texts.set(node,record);}
  const result=tr(record.source);if(value!==result){const lead=node.nodeValue.match(/^\s*/)[0],tail=node.nodeValue.match(/\s*$/)[0];node.nodeValue=lead+result+tail;}record.last=result;
 }
 function apply(){if(running)return;running=true;
  document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())translateNode(n);
  document.querySelectorAll('[alt],[aria-label],[placeholder],[title]').forEach(el=>{if(el.closest('[data-no-i18n],.language-selector'))return;let record=attrs.get(el)||{};for(const attr of ['alt','aria-label','placeholder','title']){if(!el.hasAttribute(attr))continue;const value=normal(el.getAttribute(attr));if(!record[attr]||record[attr].last!==value)record[attr]={source:Object.hasOwn(dictionaries.fr,value)?value:(reverse.get(value)||value),last:value};const result=tr(record[attr].source);if(result!==value)el.setAttribute(attr,result);record[attr].last=result;}attrs.set(el,record);});
  document.title=tr(document.title);
  const base=document.body.dataset.page==='index'?'':'../';document.querySelectorAll('[data-contact="cv"],a[href*="cv-imrane-boumaza"]').forEach(a=>{const href=base+'assets/docs/cv/cv-imrane-boumaza-'+language+'.pdf';if(a.getAttribute('href')!==href)a.setAttribute('href',href);});
  document.querySelectorAll('[data-language]').forEach(b=>{const pressed=String(b.dataset.language===language);if(b.getAttribute('aria-pressed')!==pressed)b.setAttribute('aria-pressed',pressed);});
  running=false;
 }
 const selector=document.createElement('div');selector.className='language-selector';selector.setAttribute('role','group');selector.setAttribute('aria-label','FR / EN / العربية / 中文');selector.innerHTML=[['fr','FR','Français'],['en','EN','English'],['ar','العربية','العربية'],['zh','中文','中文']].map(([code,label,name])=>`<button type="button" data-language="${code}" lang="${code}" aria-label="${name}" aria-pressed="false">${label}</button>`).join('');
 function placeSelector(){const parent=matchMedia('(max-width:1000px)').matches?document.querySelector('.main-nav'):document.querySelector('.header-tools');parent?.append(selector);}
 placeSelector();matchMedia('(max-width:1000px)').addEventListener('change',placeSelector);
 selector.addEventListener('click',e=>{const b=e.target.closest('[data-language]');if(!b)return;language=b.dataset.language;try{localStorage.setItem('portfolio-language',language);}catch(_){}apply();document.dispatchEvent(new Event('languagechange'));});
 apply();let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply();});}).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','alt','title','placeholder']});
 window.portfolioTranslate=tr;
})();
