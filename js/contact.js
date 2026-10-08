/* POST multipart FormSubmit : un champ fichier distinct par pièce jointe.
   https://formsubmit.co/documentation : plusieurs champs, 10 Mo au total. */
(() => {
    'use strict';
    // Après activation, remplacer par l’identifiant aléatoire fourni par FormSubmit,
    // sans https://formsubmit.co/, pour masquer l’adresse dans l’URL d’envoi.
    const FORMSUBMIT_RECIPIENT = 'imranebmz.pro@gmail.com';
    const MAX_TOTAL_SIZE = 10 * 1000 * 1000; // 10 Mo décimaux, seuil conservateur du service.
    const MAX_FILES = 10;
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');
    const submit = form.querySelector('[type="submit"]');
    const picker = document.getElementById('attachment');
    const pick = document.getElementById('attachment-pick');
    const list = document.getElementById('attachment-list');
    const inputs = document.getElementById('attachment-inputs');
    const counter = document.getElementById('attachment-total');
    const fileError = document.getElementById('attachment-error');
    const largeLink = document.getElementById('large-file-link');
    const fields = ['nom', 'email', 'message'].map(id => document.getElementById(id));
    const tr = text => window.portfolioTranslate ? window.portfolioTranslate(text) : text;
    const types = {
        pdf: ['application/pdf'],
        docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
        zip: ['application/zip', 'application/x-zip-compressed'],
        png: ['image/png'], jpg: ['image/jpeg'], jpeg: ['image/jpeg']
    };
    let attachments = [], nextId = 0, selectionError = '';
    form.action = 'https://formsubmit.co/' + encodeURIComponent(FORMSUBMIT_RECIPIENT);
    form.querySelector('[name="_next"]').value = new URL('merci.html', location.href).href;
    submit.disabled = false;

    function validate(field) {
        let message = '';
        if (!field.value.trim()) message = 'Merci de remplir ce champ.';
        else if (field.type === 'email' && field.validity.typeMismatch) message = 'Saisissez une adresse email valide.';
        else if (field.id === 'nom' && field.value.trim().length < 2) message = 'Indiquez au moins 2 caractères.';
        else if (field.id === 'message' && field.value.trim().length < 10) message = 'Votre message doit contenir au moins 10 caractères.';
        else if (field.value.length > field.maxLength) message = 'Ce texte dépasse la longueur autorisée.';
        field.setAttribute('aria-invalid', String(Boolean(message)));
        document.getElementById(field.id + '-error').textContent = tr(message);
        return !message;
    }
    function validateLink() {
        const value = largeLink.value.trim();
        let valid = !value;
        if (value && value.startsWith('https://') && !/\s/.test(value)) {
            try {
                const url = new URL(value);
                valid = url.protocol === 'https:' && Boolean(url.hostname) && !url.username && !url.password;
            } catch (_) { valid = false; }
        }
        largeLink.setAttribute('aria-invalid', String(!valid));
        document.getElementById('large-file-link-error').textContent = valid ? '' : tr('Saisissez un lien valide commençant par https://.');
        return valid;
    }
    const totalSize = () => attachments.reduce((sum, entry) => sum + entry.file.size, 0);
    function validateAttachments() {
        const overweight = totalSize() > MAX_TOTAL_SIZE;
        const message = overweight ? 'Fichiers trop lourds (10 Mo max au total). Pour un fichier plus gros, utilisez le champ lien ci-dessous.' : selectionError;
        fileError.textContent = tr(message);
        pick.setAttribute('aria-invalid', String(Boolean(message)));
        return !overweight && attachments.length <= MAX_FILES;
    }
    function formatSize(bytes) {
        const locale = document.documentElement.lang || 'fr';
        return new Intl.NumberFormat(locale, {maximumFractionDigits: 3}).format(Math.ceil(bytes / 1000) / 1000) + ' ' + tr('Mo');
    }
    function render() {
        list.replaceChildren();
        for (const entry of attachments) {
            const row = document.createElement('li');
            row.className = 'attachment-selected';
            const text = document.createElement('span');
            text.className = 'attachment-detail';
            const name = document.createElement('span');
            name.className = 'attachment-filename';
            name.dataset.noI18n = ''; name.dir = 'auto'; name.textContent = entry.file.name;
            const size = document.createElement('small');
            size.dataset.noI18n = ''; size.textContent = formatSize(entry.file.size);
            text.append(name, size);
            const remove = document.createElement('button');
            remove.type = 'button'; remove.className = 'icon-button'; remove.dataset.removeAttachment = String(entry.id);
            remove.setAttribute('aria-label', tr('Retirer le fichier') + ' : ' + entry.file.name);
            const cross = document.createElement('span');
            cross.setAttribute('aria-hidden', 'true'); cross.textContent = '×'; remove.append(cross);
            remove.addEventListener('click', () => {
                entry.input.remove();
                attachments = attachments.filter(item => item.id !== entry.id);
                selectionError = ''; status.textContent = ''; render(); pick.focus();
            });
            row.append(text, remove); list.append(row);
        }
        list.hidden = !attachments.length;
        counter.textContent = formatSize(totalSize()) + ' / ' + formatSize(MAX_TOTAL_SIZE);
        validateAttachments();
    }
    pick.addEventListener('click', () => picker.click());
    picker.addEventListener('change', () => {
        const added = Array.from(picker.files);
        picker.value = ''; // Une nouvelle sélection ne remplace jamais la liste existante.
        if (!added.length) return;
        selectionError = ''; status.textContent = '';
        if (attachments.length + added.length > MAX_FILES) {
            selectionError = '10 fichiers maximum. Retirez un fichier avant d’en ajouter un autre.';
        } else if (added.some(item => {
            const extension = item.name.split('.').pop().toLowerCase();
            return !Object.hasOwn(types, extension) || (item.type && item.type !== 'application/octet-stream' && !types[extension].includes(item.type));
        })) {
            selectionError = 'Format non autorisé. Choisissez des fichiers PDF, DOCX, XLSX, PPTX, ZIP, PNG ou JPG.';
        } else {
            // Le sélecteur multiple n’a pas de name : seuls les champs individuels
            // nommés attachment_1, attachment_2, etc. sont envoyés à FormSubmit.
            const batch = [];
            try {
                for (const file of added) {
                    const input = document.createElement('input');
                    input.type = 'file'; input.className = 'form-file-input'; input.tabIndex = -1;
                    const id = ++nextId; input.name = 'attachment_' + id;
                    const transfer = new DataTransfer(); transfer.items.add(file); input.files = transfer.files;
                    batch.push({id, file, input});
                }
                for (const entry of batch) inputs.append(entry.input);
                attachments.push(...batch);
            } catch (_) {
                selectionError = 'Votre navigateur ne permet pas cet ajout. Utilisez le champ lien ci-dessous.';
            }
        }
        render();
    });
    fields.forEach(field => field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validate(field);
    }));
    largeLink.addEventListener('input', () => {
        if (largeLink.getAttribute('aria-invalid') === 'true') validateLink();
    });
    document.addEventListener('languagechange', () => {
        fields.forEach(field => { if (field.hasAttribute('aria-invalid')) validate(field); });
        if (largeLink.hasAttribute('aria-invalid')) validateLink();
        render();
    });
    form.addEventListener('submit', event => {
        const invalid = fields.filter(field => !validate(field));
        selectionError = ''; // Une sélection refusée ne fait pas partie du message.
        const validFiles = validateAttachments(), validLink = validateLink();
        if (invalid.length || !validFiles || !validLink) {
            event.preventDefault(); status.textContent = tr('Vérifiez les champs indiqués.');
            (invalid[0] || (!validFiles ? pick : largeLink)).focus(); return;
        }
        largeLink.value = largeLink.value.trim();
        submit.disabled = true; status.textContent = tr('Redirection vers la vérification anti-robot…');
    });
    window.addEventListener('pageshow', () => { submit.disabled = false; status.textContent = ''; });
    document.addEventListener('DOMContentLoaded', render, { once: true });
    render();
})();
