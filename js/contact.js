/* Envoi natif multipart : FormSubmit prend en charge le fichier et le CAPTCHA. */
(() => {
    'use strict';
    // Après activation, remplacer uniquement cette valeur par l’identifiant aléatoire
    // fourni par FormSubmit (sans https://formsubmit.co/), pour masquer l’adresse dans l’URL d’envoi.
    const FORMSUBMIT_RECIPIENT = 'imranebmz.pro@gmail.com';
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');
    const submit = form.querySelector('[type="submit"]');
    const file = document.getElementById('attachment');
    const pick = document.getElementById('attachment-pick');
    const remove = document.getElementById('attachment-remove');
    const selected = document.getElementById('attachment-selected');
    const filename = document.getElementById('attachment-name');
    const fileError = document.getElementById('attachment-error');
    const tr = (text) => window.portfolioTranslate ? window.portfolioTranslate(text) : text;
    const fields = ['nom', 'email', 'message'].map(id => document.getElementById(id));
    let fileMessage = '';
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
    function validateFile() {
        const files = file.files;
        fileMessage = '';
        if (files.length > 1) fileMessage = 'Joignez un seul fichier.';
        else if (files.length) {
            const item = files[0];
            const extension = item.name.split('.').pop().toLowerCase();
            const types = {
                pdf: ['application/pdf'],
                docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                png: ['image/png'], jpg: ['image/jpeg'], jpeg: ['image/jpeg']
            };
            if (!Object.hasOwn(types, extension) || (item.type && !types[extension].includes(item.type)))
                fileMessage = 'Format non autorisé. Choisissez un fichier PDF, DOCX, PNG ou JPG.';
            else if (item.size > MAX_FILE_SIZE) fileMessage = 'Le fichier dépasse 5 Mo. Choisissez un fichier plus petit.';
        }
        fileError.textContent = tr(fileMessage);
        pick.setAttribute('aria-invalid', String(Boolean(fileMessage)));
        return !fileMessage;
    }
    pick.addEventListener('click', () => file.click());
    file.addEventListener('change', () => {
        selected.hidden = !file.files.length;
        filename.textContent = file.files.length ? file.files[0].name : '';
        validateFile();
        status.textContent = '';
    });
    remove.addEventListener('click', () => {
        file.value = '';
        filename.textContent = '';
        selected.hidden = true;
        validateFile();
        status.textContent = '';
        pick.focus();
    });
    fields.forEach(field => field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validate(field);
    }));
    document.addEventListener('languagechange', () => {
        fields.forEach(field => { if (field.hasAttribute('aria-invalid')) validate(field); });
        validateFile();
    });
    form.addEventListener('submit', event => {
        const invalid = fields.filter(field => !validate(field));
        const validFile = validateFile();
        if (invalid.length || !validFile) {
            event.preventDefault();
            status.textContent = tr('Vérifiez les champs indiqués.');
            (invalid[0] || pick).focus();
            return;
        }
        // L’envoi POST classique conserve la pièce jointe. Aucun fetch/AJAX.
        submit.disabled = true;
        status.textContent = tr('Redirection vers la vérification anti-robot…');
    });
    // Rétablir le bouton si le visiteur revient depuis le service externe.
    window.addEventListener('pageshow', () => { submit.disabled = false; status.textContent = ''; });
})();
