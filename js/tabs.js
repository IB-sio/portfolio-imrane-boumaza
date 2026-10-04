/* Gère les onglets des stages avec navigation clavier et liens directs. */
(() => {
    'use strict';
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    /* ===== ACTIVATION ET HISTORIQUE ===== */
    function activate(tab, focus = false, changeHash = true) {
        tabs.forEach((item) => {
            const active = item === tab;
            item.setAttribute('aria-selected', String(active));
            item.tabIndex = active ? 0 : -1;
            document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
        });
        if (focus) tab.focus();
        if (changeHash) history.replaceState(null, '', '#' + tab.getAttribute('aria-controls'));
    }
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('keydown', (event) => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = tabs.length - 1;
            if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
        });
    });
    function fromHash() {
        const initial = tabs.find((tab) => '#' + tab.getAttribute('aria-controls') === location.hash) || tabs[0];
        if (initial) activate(initial, false, false);
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
})();
