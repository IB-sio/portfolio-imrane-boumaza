/* No analytics request, identifier or IP lookup before opt-in. */
(()=>{'use strict';
const KEY='portfolio-analytics-consent-v2';
const M={
fr:{title:'Statistiques de visite',text:'Avec votre accord, Imrane Boumaza mesure les pages consultées, le temps actif et les clics sur le CV, les projets et le contact. Sont aussi enregistrés : identifiants aléatoires de visiteur et de session, adresse IP, pays et ville approximatifs, appareil, résolution, navigateur, système, domaine référent et codes de campagne. Les détails et IP sont conservés 24 mois, puis supprimés par une tâche quotidienne. Des totaux sans identifiants peuvent être conservés plus longtemps. Le refus ne limite pas le site.',accept:'Accepter',deny:'Refuser',manage:'Gérer mes choix statistiques',policy:'Confidentialité',exclude:'Exclure ce navigateur de mes statistiques',included:'Réautoriser ce navigateur (avec consentement)'},
en:{title:'Visit statistics',text:'With your permission, Imrane Boumaza measures page views, active time and clicks on the CV, projects and contact links. Random visitor and session identifiers, IP address, approximate country and city, device, screen resolution, browser, operating system, referring domain and campaign codes are also recorded. Details and IP addresses are kept for 24 months, then removed by a daily task. Totals without identifiers may be kept longer. Refusing does not restrict this website.',accept:'Accept',deny:'Refuse',manage:'Manage analytics preferences',policy:'Privacy',exclude:'Exclude this browser from my statistics',included:'Allow this browser again (with consent)'},
ar:{title:'إحصاءات الزيارات',text:'بموافقتك، يقيس عمران بومعزة الصفحات المعروضة ووقت النشاط والنقرات على السيرة الذاتية والمشاريع وروابط التواصل. تُسجّل أيضًا معرّفات عشوائية للزائر والجلسة وعنوان IP والبلد والمدينة التقريبيان ونوع الجهاز ودقة الشاشة والمتصفح ونظام التشغيل ونطاق الموقع المُحيل ورموز الحملات. تُحفظ التفاصيل وعناوين IP لمدة 24 شهرًا، ثم تُحذف بمهمة يومية. قد تُحفظ المجاميع الخالية من المعرّفات لفترة أطول. الرفض لا يحد من استخدام الموقع.',accept:'أوافق',deny:'أرفض',manage:'إدارة خيارات الإحصاءات',policy:'الخصوصية',exclude:'استبعاد هذا المتصفح من إحصاءاتي',included:'السماح لهذا المتصفح مجددًا مع الموافقة'},
zh:{title:'访问统计',text:'经您同意，Imrane Boumaza 会统计浏览页面、活跃时间，以及简历、项目和联系链接的点击情况。还会记录随机访客与会话标识、IP 地址、大致国家和城市、设备、屏幕分辨率、浏览器、操作系统、来源域名和推广代码。详细数据和 IP 地址保留 24 个月，之后由每日任务删除。不含标识的汇总数据可能保留更久。拒绝不会影响网站使用。',accept:'接受',deny:'拒绝',manage:'管理统计偏好',policy:'隐私说明',exclude:'将此浏览器排除在我的统计之外',included:'重新允许此浏览器（仍需同意）'}
};
function read(){try{const c=JSON.parse(localStorage.getItem(KEY));return c&&c.expires>Date.now()?c:null}catch{return null}}
window.analyticsAllowed=()=>{try{return read()?.accepted===true&&localStorage.getItem('analytics-excluded')!=='1'}catch{return false}};
const dialog=document.createElement('dialog');dialog.id='analytics-choice';dialog.setAttribute('aria-labelledby','analytics-choice-title');
const title=document.createElement('h2');title.id='analytics-choice-title';const text=document.createElement('p');const policy=document.createElement('a');policy.href='/pages/confidentialite-analytics.html';const actions=document.createElement('div');actions.className='analytics-actions';
const deny=document.createElement('button'),accept=document.createElement('button');for(const b of[deny,accept]){b.type='button';b.className='button'}actions.append(deny,accept);dialog.append(title,text,policy,actions);document.body.append(dialog);
const manage=document.createElement('button');manage.type='button';manage.className='button';const exclude=document.createElement('button');exclude.type='button';exclude.className='button';
const holder=document.createElement('div');holder.className='analytics-preferences';holder.append(manage,exclude);
function mount(){const f=document.querySelector('footer');if(f&&!f.contains(holder))f.append(holder)}mount();
// Navigation.js can replace the footer after loading: preserve access to preferences.
new MutationObserver(mount).observe(document.body,{childList:true,subtree:true});
function render(){const l=document.documentElement.lang.split('-')[0];const t=M[l]||M.fr;dialog.dir=l==='ar'?'rtl':'ltr';title.textContent=t.title;text.textContent=t.text;policy.textContent=t.policy;accept.textContent=t.accept;deny.textContent=t.deny;manage.textContent=t.manage;try{exclude.textContent=localStorage.getItem('analytics-excluded')==='1'?t.included:t.exclude}catch{exclude.textContent=t.exclude}}
new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
function open(){if(!dialog.open)dialog.showModal()}
function choose(value){try{const expires=new Date();expires.setMonth(expires.getMonth()+6);localStorage.setItem(KEY,JSON.stringify({accepted:value,expires:expires.getTime()}));if(!value){localStorage.removeItem('analytics-visitor-v2');localStorage.removeItem('analytics-session-v2')}}catch{value=false}dialog.close();window.dispatchEvent(new Event('analytics-consent-change'));}
accept.onclick=()=>choose(true);deny.onclick=()=>choose(false);manage.onclick=open;
exclude.onclick=()=>{try{localStorage.setItem('analytics-excluded',localStorage.getItem('analytics-excluded')==='1'?'0':'1');localStorage.removeItem('analytics-session-v2')}catch{}render();window.dispatchEvent(new Event('analytics-consent-change'))};
window.addEventListener('storage',e=>{if(e.key===KEY||e.key==='analytics-excluded'){render();window.dispatchEvent(new Event('analytics-consent-change'))}});
if(!read())open();
})();
