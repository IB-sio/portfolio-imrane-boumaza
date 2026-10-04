/* Valide le formulaire, vérifie Turnstile et l'envoie via Formspree. */
(() => {
    'use strict';
    /* ===== CONFIGURATION ===== */
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbglnnqe';
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submit = form.querySelector('[type="submit"]');
    /* ===== VALIDATION ACCESSIBLE ===== */
    function validate(field) {
        let message = '';
        if (!field.value.trim()) message = 'Merci de remplir ce champ.';
        else if (field.type === 'email' && field.validity.typeMismatch) message = 'Saisissez une adresse email valide.';
        else if (field.id === 'nom' && field.value.trim().length < 2) message = 'Indiquez au moins 2 caractères.';
        else if (field.id === 'message' && field.value.trim().length < 10) message = 'Votre message doit contenir au moins 10 caractères.';
        field.setAttribute('aria-invalid', String(Boolean(message)));
        document.getElementById(field.id + '-error').textContent = message;
        return !message;
    }
    const fields = Array.from(form.querySelectorAll('[required]'));
    fields.forEach((field) => field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validate(field);
    }));
    /* ===== ENVOI RÉEL OU MESSAGE DE CONFIGURATION ===== */
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const invalid = fields.filter((field) => !validate(field));
        if (invalid.length) { status.textContent = 'Vérifiez les champs indiqués.'; invalid[0].focus(); return; }
        if (!/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(FORMSPREE_ENDPOINT)) {
            status.textContent = 'Formulaire valide, mais aucun message n’a été envoyé : le service d’envoi est à configurer. Contactez-moi directement à imranebmz.pro@gmail.com.';
            return;
        }
        /* ===== VÉRIFICATION ANTI-ROBOT (Cloudflare Turnstile) ===== */
        if (!window.turnstile) {
            status.textContent = 'La vérification anti-robot n’a pas pu se charger. Désactivez votre bloqueur de publicités pour ce site ou écrivez-moi directement à imranebmz.pro@gmail.com.';
            return;
        }
        const captcha = form.querySelector('[name="cf-turnstile-response"]');
        if (!captcha || !captcha.value) {
            status.textContent = 'Merci de valider la vérification anti-robot.';
            return;
        }
        submit.disabled = true;
        status.textContent = 'Envoi en cours…';
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
            if (!response.ok) throw new Error('Échec de l’envoi');
            status.textContent = 'Votre message a bien été envoyé. Merci !';
            form.reset();
        } catch (error) {
            status.textContent = 'Le message n’a pas pu être envoyé. Vos informations sont conservées dans les champs ; réessayez ou utilisez mon email.';
        } finally {
            submit.disabled = false;
            /* Un jeton Turnstile ne sert qu’une fois : on en demande un nouveau. */
            if (window.turnstile) window.turnstile.reset();
        }
    });
})();
