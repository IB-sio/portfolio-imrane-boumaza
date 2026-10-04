/* Centralise le menu, le pied de page et les liens externes de toutes les pages. */
(() => {
    'use strict';
    /* ===== COORDONNÉES COMMUNES À MODIFIER ICI ===== */
    const contacts = {
        email: 'imranebmz.pro@gmail.com',
        linkedin: '', // [À COMPLÉTER : URL LinkedIn]
        github: 'https://github.com/IB-sio',
        cv: '' // [À COMPLÉTER : URL externe publique du CV]
    };
    const pages = [ ['index', 'Accueil'], ['a-propos', 'À propos'], ['formation', 'Formation'], ['stages', 'Stages'], ['realisations', 'Réalisations'], ['competences', 'Compétences'], ['veille', 'Veille'], ['certifications', 'Certifications'], ['contact', 'Contact'] ];
    const current = document.body.dataset.page;
    const root = current === 'index' ? '' : '../';
    const url = (key) => root + (key === 'index' ? 'index.html' : 'pages/' + key + '.html');
    /* ===== EN-TÊTE ET PIED DE PAGE PARTAGÉS ===== */
    document.getElementById('site-header').innerHTML = `
        <div class="container header-inner">
            <a class="brand" href="${url('index')}" aria-label="Imrane Boumaza, accueil"><span class="brand-mark" aria-hidden="true">IB</span><span class="brand-word">IMRANE BOUMAZA<small>PORTFOLIO / SISR</small></span></a>
            <nav class="main-nav" id="main-nav" aria-label="Navigation principale">${pages.map(([key,label]) => `<a href="${url(key)}" ${key === current ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
            <div class="header-tools"><button class="icon-button" data-theme-toggle type="button">Clair</button><button class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Ouvrir le menu">Menu</button></div>
        </div>`;
    document.getElementById('site-footer').innerHTML = `
        <div class="container"><div class="footer-top"><div><strong>Imrane Boumaza</strong><p>Construire. Comprendre. Sécuriser.</p></div><div class="footer-links"><a data-contact="linkedin">LinkedIn</a><a data-contact="github">GitHub</a><a href="mailto:${contacts.email}">Email</a><a data-contact="cv">Voir mon CV</a></div></div><div class="footer-bottom"><span>© 2026 Imrane Boumaza – Portfolio BTS SIO SISR</span><span>Pau, France · Promotion 2027</span></div></div>`;
    document.querySelectorAll('[data-contact]').forEach((link) => {
        const key = link.dataset.contact;
        const value = contacts[key] || (key === 'cv' ? root + 'assets/docs/cv-imrane-boumaza.pdf' : '');
        if ((key === 'linkedin' || key === 'github') && !value.trim()) { link.remove(); return; }
        if (value) {
            link.href = value;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        } else {
            link.removeAttribute('href');
            link.setAttribute('aria-disabled', 'true');
            link.title = 'Lien à compléter dans js/navigation.js';
            const note = document.createElement('span');
            note.className = 'footer-placeholder';
            note.textContent = `[À COMPLÉTER : ${key === 'cv' ? 'URL externe du CV' : 'URL ' + key}]`;
            link.append(' ', note);
        }
    });
    /* ===== MENU MOBILE ET CLAVIER ===== */
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('main-nav');
    function closeMenu(returnFocus = false) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
        if (returnFocus) toggle.focus();
    }
    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        menu.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true); });
    document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMenu(); });
    window.matchMedia('(min-width:1001px)').addEventListener('change', () => closeMenu());
    document.dispatchEvent(new Event('navigation-ready'));
})();
