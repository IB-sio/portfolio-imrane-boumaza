/* Page Veille : une seule source de données (assets/data/veille.json) pour la une,
   les fiches, les tableaux, les graphiques et l'historique.
   Aucune donnée de visiteur, aucune clé d'API dans le navigateur. */
(() => {
    'use strict';
    const $ = (id) => document.getElementById(id);
    const mounts = {
        status: $('watch-status'), top: $('watch-top'), feed: $('watch-feed'), incidents: $('watch-incidents'),
        cra: $('watch-cra'), stats: $('watch-stats'), history: $('watch-history'), sources: $('watch-sources')
    };
    if (!mounts.top) return;

    const LABELS = {
        incident: 'Incident / opération', vulnerability: 'Vulnérabilité', regulation: 'Réglementation',
        practice: 'Bonne pratique', news: 'Actualité IoT'
    };
    const CRA = [
        ['2024-12-10', 'Entrée en vigueur'],
        ['2026-09-11', 'Signalement des vulnérabilités exploitées et des incidents graves'],
        ['2027-12-11', 'Application des principales obligations']
    ];
    const PAGE = 6;
    let data = null, query = '', category = 'all', shown = PAGE;

    const lang = () => document.documentElement.lang || 'fr';
    const t = (s) => window.PORTFOLIO_I18N?.[lang()]?.[s] || s;

    function el(tag, text, cls) {
        const node = document.createElement(tag);
        if (text !== undefined && text !== null) node.textContent = text;
        if (cls) node.className = cls;
        return node;
    }
    function fmt(iso, options) {
        return new Intl.DateTimeFormat(lang(), { timeZone: 'UTC', ...options }).format(new Date(iso));
    }
    const day = (iso) => fmt(iso, { day: 'numeric', month: 'short', year: 'numeric' });
    const month = (iso) => fmt(iso, { month: 'long', year: 'numeric' });
    function time(iso) {
        const node = el('time', day(iso));
        node.dateTime = iso;
        return node;
    }
    /* Seuls les liens https sont rendus cliquables. */
    function link(text, url, cls) {
        const a = el('a', text, cls);
        try {
            const u = new URL(url);
            if (u.protocol === 'https:') { a.href = u.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        } catch { /* lien ignoré */ }
        return a;
    }
    function text(item) {
        return item.translations?.[lang()] || item.translations?.fr
            || { title: item.original_title, summary: item.excerpt, analysis: '' };
    }
    const origin = (item) => t(item.kind === 'ai' ? 'Synthèse IA · non relue'
        : item.kind === 'editorial' ? 'Synthèse initiale sourcée' : 'Texte source · analyse et traduction en attente');
    const today = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

    function heading(mount, title, eyebrow) {
        mount.replaceChildren();
        if (eyebrow) mount.append(el('p', t(eyebrow), 'eyebrow'));
        mount.append(el('h2', t(title)));
    }
    function meta(item) {
        const p = el('p', undefined, 'watch-meta');
        p.append(el('span', t(LABELS[item.category] || LABELS.news), 'badge'), el('span', item.source), time(item.date));
        return p;
    }
    function table(headers, rows, label) {
        const wrap = el('div', undefined, 'table-wrap veille-table');
        wrap.tabIndex = 0; wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', t(label));
        const tb = el('table'), head = el('thead'), hr = el('tr'), body = el('tbody');
        headers.forEach((h) => { const th = el('th', t(h)); th.scope = 'col'; hr.append(th); });
        head.append(hr);
        rows.forEach((row) => {
            const tr = el('tr');
            row.forEach((value) => { const td = el('td'); td.append(typeof value === 'string' ? document.createTextNode(value) : value); tr.append(td); });
            body.append(tr);
        });
        tb.append(head, body); wrap.append(tb);
        return wrap;
    }

    /* ---------- État de la collecte ---------- */
    function renderStatus() {
        const m = mounts.status; m.replaceChildren();
        if (data.last_success) {
            const p = el('p', t('Dernière collecte réussie') + ' : ', 'eyebrow');
            p.append(time(data.last_success.slice(0, 10)));
            m.append(p);
            if (Date.now() - new Date(data.last_success) > 48 * 3600000) {
                m.append(el('p', t('Collecte à vérifier : les données ont plus de 48 heures.'), 'watch-health'));
            }
        }
        if (data.ai_status === 'unavailable') {
            m.append(el('p', t('Analyse indisponible au dernier passage ; nouvel essai lors de la prochaine collecte.'), 'watch-health'));
        }
    }

    /* ---------- À la une + dernières informations ---------- */
    function renderTop() {
        const m = mounts.top; m.replaceChildren();
        m.parentElement.setAttribute('aria-busy', 'false');
        const [lead, ...rest] = data.items;
        if (!lead) { m.append(el('p', t('Aucune publication ne correspond à la recherche.'))); return; }
        const v = text(lead), main = el('article', undefined, 'card featured watch-lead');
        main.append(el('p', t('À la une'), 'eyebrow'), meta(lead), el('h2', v.title), el('p', v.summary, 'watch-lead-summary'));
        if (v.device) {
            const dev = el('p', undefined, 'watch-device');
            dev.append(el('strong', t('Équipement concerné') + ' : '), document.createTextNode(v.device));
            main.append(dev);
        }
        if (v.analysis) {
            const note = el('div', undefined, 'watch-takeaway');
            note.append(el('h3', t('Mon analyse')), el('p', v.analysis));
            main.append(note);
        }
        const foot = el('p', undefined, 'watch-foot');
        foot.append(link(t('Lire la source officielle ↗'), lead.url, 'button primary'), el('small', origin(lead), 'watch-origin'));
        main.append(foot);

        const side = el('aside', undefined, 'card watch-latest');
        side.append(el('h2', t('Les dernières informations')));
        const list = el('ol');
        rest.slice(0, 5).forEach((item) => {
            const li = el('li');
            li.append(time(item.date), link(text(item).title, item.url), el('span', item.source + ' · ' + t(LABELS[item.category] || LABELS.news), 'watch-latest-source'));
            list.append(li);
        });
        side.append(list);
        const all = el('a', t('Toutes les actualités ↓')); all.href = '#actualites';
        side.append(all);
        m.append(main, side);
    }

    /* ---------- Actualités : filtres + fiches ---------- */
    function filtered() {
        const q = query.trim().toLocaleLowerCase(lang());
        return data.items.filter((item) => {
            if (category !== 'all' && item.category !== category) return false;
            if (!q) return true;
            const v = text(item);
            return [v.title, v.summary, v.analysis, v.device, item.source].join(' ').toLocaleLowerCase(lang()).includes(q);
        });
    }
    function renderCards() {
        const grid = $('watch-cards'); if (!grid) return;
        const items = filtered(); grid.replaceChildren();
        items.slice(0, shown).forEach((item) => {
            const v = text(item), card = el('article', undefined, 'card watch-article');
            card.append(meta(item), el('h3', v.title), el('p', v.summary));
            if (v.analysis) card.append(el('p', v.analysis, 'watch-retain'));
            const foot = el('p', undefined, 'watch-foot');
            foot.append(link(t('Lire la source officielle ↗'), item.url), el('small', origin(item), 'watch-origin'));
            card.append(foot); grid.append(card);
        });
        if (!items.length) grid.append(el('p', t('Aucune publication ne correspond à la recherche.')));
        $('watch-count').textContent = t('Publications affichées : {shown} sur {total}').replace('{shown}', String(Math.min(shown, items.length))).replace('{total}', String(items.length));
        $('watch-more').hidden = items.length <= shown;
    }
    function renderFeed() {
        const m = mounts.feed; heading(m, 'Actualités IoT', 'TOUTES LES PUBLICATIONS');
        const bar = el('div', undefined, 'watch-toolbar'), chips = el('div', undefined, 'filters');
        chips.setAttribute('role', 'group'); chips.setAttribute('aria-label', t('Filtrer par sujet'));
        [['all', 'Tout'], ...Object.entries(LABELS)].forEach(([value, title]) => {
            const count = value === 'all' ? data.items.length : data.items.filter((a) => a.category === value).length;
            if (!count) return;
            const b = el('button', t(title) + ' · ' + count, 'filter'); b.type = 'button';
            b.setAttribute('aria-pressed', String(category === value));
            b.addEventListener('click', () => { category = value; shown = PAGE; chips.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); renderCards(); });
            chips.append(b);
        });
        const label = el('label', undefined, 'watch-search'), input = el('input');
        label.append(el('span', t('Rechercher dans ma veille')));
        input.type = 'search'; input.value = query; input.autocomplete = 'off';
        input.addEventListener('input', () => { query = input.value; shown = PAGE; renderCards(); });
        label.append(input); bar.append(chips, label);
        const count = el('p', undefined, 'watch-note'); count.id = 'watch-count'; count.setAttribute('aria-live', 'polite');
        const grid = el('div', undefined, 'watch-cards'); grid.id = 'watch-cards';
        const more = el('button', t('Afficher davantage'), 'button'); more.id = 'watch-more'; more.type = 'button';
        more.addEventListener('click', () => { shown += PAGE; renderCards(); });
        m.append(bar, count, grid, more);
        renderCards();
    }

    /* ---------- Incidents et vulnérabilités ---------- */
    function renderIncidents() {
        const m = mounts.incidents; heading(m, 'Incidents et vulnérabilités', 'TABLEAU DE SUIVI');
        const rows = data.items.filter((a) => ['incident', 'vulnerability'].includes(a.category)).slice(0, 10).map((item) => {
            const v = text(item), what = el('div');
            what.append(el('strong', v.title), el('span', v.summary, 'watch-cell-note'));
            return [time(item.date), el('span', t(LABELS[item.category]), 'badge'), v.device || t('Non précisé'), what, link(item.source + ' ↗', item.url)];
        });
        m.append(table(['Date', 'Type', 'Équipement concerné', 'Ce qui s’est passé', 'Source'], rows, 'Incidents et vulnérabilités'),
            el('p', t('Ce tableau reprend les dix dernières publications classées « incident » ou « vulnérabilité ». Le classement est automatique et peut se tromper.'), 'watch-note'));
    }

    /* ---------- Cyber Resilience Act ---------- */
    function renderCra() {
        const m = mounts.cra; heading(m, 'Calendrier du Cyber Resilience Act', 'RÉGLEMENTATION EUROPÉENNE');
        const now = today(), box = el('div', undefined, 'card watch-cra');
        const days = Math.ceil((Date.UTC(2027, 11, 11) - Date.parse(now + 'T00:00:00Z')) / 86400000);
        const count = el('div', undefined, 'watch-countdown');
        if (days > 0) {
            count.append(el('strong', String(days)), el('span', t('jours avant l’application des principales obligations')));
        } else {
            count.append(el('span', t('Les principales obligations du CRA sont désormais en application.')));
        }
        const steps = el('ol', undefined, 'watch-steps');
        CRA.forEach(([date, title]) => {
            const li = el('li'); if (date <= now) li.className = 'is-done';
            li.append(time(date), el('span', t(title)), el('span', t(date <= now ? 'En application' : 'À venir'), 'badge veille-status'));
            steps.append(li);
        });
        const elapsed = Math.min(100, Math.max(0, (Date.parse(now) - Date.parse('2024-12-10')) / (Date.parse('2027-12-11') - Date.parse('2024-12-10')) * 100));
        const track = el('div', undefined, 'watch-progress'); track.setAttribute('aria-hidden', 'true');
        const fill = el('span'); fill.style.inlineSize = elapsed.toFixed(1) + '%'; track.append(fill);
        box.append(count, track, steps);
        const note = el('p', undefined, 'watch-note');
        if (days > 0) note.append(document.createTextNode(t('Échéance du CRA : dans environ {months} mois ({days} jours).').replace('{months}', String(Math.round(days / 30.4375))).replace('{days}', String(days)) + ' '));
        note.append(document.createTextNode(t('Les statuts suivent la date du jour. Les échéances sont issues de la Commission européenne.') + ' '), link(t('Commission européenne') + ' ↗', 'https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act'));
        m.append(box, note);
    }

    /* ---------- Chiffres et diagrammes ---------- */
    function bars(title, entries) {
        const card = el('div', undefined, 'card watch-chart'); card.append(el('h3', t(title)));
        const max = Math.max(1, ...entries.map((e) => e[1])), list = el('ul');
        entries.forEach(([name, count]) => {
            const li = el('li'), track = el('span', undefined, 'watch-track'), bar = el('span', undefined, 'watch-bar');
            track.setAttribute('aria-hidden', 'true'); bar.style.inlineSize = (count / max * 100) + '%'; track.append(bar);
            li.append(el('span', name), track, el('strong', String(count))); list.append(li);
        });
        card.append(list); return card;
    }
    function columns(title, entries) {
        const card = el('div', undefined, 'card watch-chart'); card.append(el('h3', t(title)));
        const max = Math.max(1, ...entries.map((e) => e[1])), list = el('ol', undefined, 'watch-columns');
        entries.forEach(([name, count]) => {
            const li = el('li'), col = el('span', undefined, 'watch-col');
            col.setAttribute('aria-hidden', 'true'); col.style.blockSize = Math.max(count ? 6 : 0, count / max * 100) + '%';
            const holder = el('span', undefined, 'watch-col-holder'); holder.append(col);
            li.append(el('strong', String(count)), holder, el('span', name, 'watch-col-label')); list.append(li);
        });
        card.append(list); return card;
    }
    function renderStats() {
        const m = mounts.stats; heading(m, 'La veille en chiffres', 'TABLEAU DE BORD');
        const items = data.items, limit = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
        const tiles = el('div', undefined, 'watch-tiles');
        [[items.length, 'Publications suivies'], [new Set(items.map((a) => a.source)).size, 'Sources citées'],
            [items.filter((a) => ['incident', 'vulnerability'].includes(a.category)).length, 'Incidents et vulnérabilités'],
            [items.filter((a) => a.date >= limit).length, 'Publications des 30 derniers jours']].forEach(([n, label]) => {
            const tile = el('div', undefined, 'card watch-tile'); tile.append(el('strong', String(n)), el('span', t(label))); tiles.append(tile);
        });
        const now = new Date(), months = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1)), prefix = d.toISOString().slice(0, 7);
            months.push([fmt(d.toISOString(), { month: '2-digit' }).replace(/\D/g, ''), items.filter((a) => a.date.startsWith(prefix)).length]);
        }
        const bySource = new Map(); items.forEach((a) => bySource.set(a.source, (bySource.get(a.source) || 0) + 1));
        const grid = el('div', undefined, 'watch-charts');
        grid.append(columns('Publications par mois', months),
            bars('Répartition des publications', Object.entries(LABELS).map(([key, label]) => [t(label), items.filter((a) => a.category === key).length]).filter((e) => e[1])),
            bars('Publications par source', Array.from(bySource).sort((a, b) => b[1] - a[1]).slice(0, 8)));
        m.append(tiles, grid, el('p', t('Ces graphiques comptent les publications retenues dans ma veille, pas toutes les attaques dans le monde. Un même incident peut être couvert par plusieurs sources.'), 'watch-note'));
    }

    /* ---------- Historique par mois ---------- */
    function renderHistory() {
        const m = mounts.history; heading(m, 'Historique par mois', 'ARCHIVES');
        const groups = new Map();
        data.items.forEach((item) => { const key = item.date.slice(0, 7); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
        let index = 0;
        groups.forEach((items, key) => {
            const box = el('details', undefined, 'watch-month'); if (index++ === 0) box.open = true;
            const sum = el('summary'); sum.append(el('span', month(key + '-01')), el('span', String(items.length), 'badge'));
            const list = el('ul');
            items.forEach((item) => {
                const li = el('li');
                li.append(time(item.date), link(text(item).title, item.url), el('span', item.source + ' · ' + t(LABELS[item.category] || LABELS.news), 'watch-latest-source'));
                list.append(li);
            });
            box.append(sum, list); m.append(box);
        });
    }

    /* ---------- État des flux ---------- */
    function renderSources() {
        const m = mounts.sources; m.replaceChildren();
        if (!data.sources?.length) return;
        m.append(el('h3', t('État de la collecte automatique')));
        m.append(table(['Source', 'Statut', 'Publications retenues au dernier passage'], data.sources.map((s) => [
            link(s.name + ' ↗', s.url), el('span', t(s.ok ? 'Accessible' : 'Indisponible au dernier passage'), 'badge' + (s.ok ? ' veille-status' : '')), String(s.matches ?? 0)
        ]), 'État de la collecte automatique'));
    }

    function render() {
        if (!data) return;
        renderStatus(); renderTop(); renderFeed(); renderIncidents(); renderCra(); renderStats(); renderHistory(); renderSources();
    }

    let renderedDay = new Date().toDateString();
    setInterval(() => { const now = new Date().toDateString(); if (now !== renderedDay) { renderedDay = now; render(); } }, 60000);
    document.addEventListener('languagechange', render);

    fetch('../assets/data/veille.json', { cache: 'no-cache' })
        .then((r) => { if (!r.ok) throw Error(); return r.json(); })
        .then((d) => { d.items = (d.items || []).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); data = d; render(); })
        .catch(() => { mounts.top.parentElement.setAttribute('aria-busy', 'false'); mounts.top.textContent = t('Les données ne peuvent pas être chargées pour le moment.'); });
})();
