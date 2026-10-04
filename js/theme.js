/* Applique et mémorise le thème ; le mode clair est utilisé par défaut. */
(() => {
    'use strict';
    /* ===== LECTURE SANS BLOQUER LE SITE ===== */
    let theme = 'light';
    try { theme = localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'; } catch (error) { /* Stockage facultatif. */ }
    document.documentElement.dataset.theme = theme;
    /* ===== ÉVÉNEMENT DÉLÉGUÉ AU BOUTON COMMUN ===== */
    function updateLabel() {
        const button = document.querySelector('[data-theme-toggle]');
        if (button) {
            const light = document.documentElement.dataset.theme === 'light';
            button.textContent = light ? 'Sombre' : 'Clair';
            button.setAttribute('aria-label', light ? 'Activer le mode sombre' : 'Activer le mode clair');
        }
    }
    document.addEventListener('navigation-ready', updateLabel);
    document.addEventListener('click', (event) => {
        if (!event.target.closest('[data-theme-toggle]')) return;
        document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('portfolio-theme', document.documentElement.dataset.theme); } catch (error) { /* Le thème reste actif sans persistance. */ }
        updateLabel();
    });
})();
