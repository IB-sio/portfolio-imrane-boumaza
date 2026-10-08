# Portfolio d’Imrane Boumaza

## Version du 8 octobre 2026

Cette version part de l’archive fournie. Six fichiers principaux ont été comparés au site en ligne et étaient identiques avant modification : `index.html`, `css/variables.css`, `pages/veille.html`, `pages/contact.html`, `js/realisations.js` et `js/contact.js`.

Les changements concernent la veille IoT et le formulaire avec pièce jointe, leurs traductions et leurs styles locaux. La palette est conservée. `pages/merci.html` est la nouvelle page de retour après l’envoi.

## Activer le formulaire FormSubmit

1. Publier les fichiers du portfolio sur le domaine habituel. Ouvrir `pages/contact.html` depuis le site en ligne, avec JavaScript activé.
2. Remplir le nom, une adresse de réponse valide et un message de test d’au moins 10 caractères. Cliquer sur « Envoyer le message », puis effectuer la vérification anti-robot de FormSubmit.
3. Dans la boîte de réception configurée, ouvrir l’email d’activation de FormSubmit. Regarder aussi dans les indésirables. Cliquer sur le lien ou bouton de confirmation (« Activate Form »).
4. Revenir au formulaire et envoyer un nouveau message de test, d’abord sans fichier, puis avec un petit PDF. Vérifier la réception effective du message et du fichier. L’activation ne remplace pas ce contrôle.
5. Après confirmation, FormSubmit fournit un identifiant aléatoire pour l’adresse d’envoi. Dans `js/contact.js`, remplacer uniquement la valeur de `FORMSUBMIT_RECIPIENT` par cet identifiant, sans le préfixe `https://formsubmit.co/`. Publier à nouveau le fichier. La même constante sert à construire l’URL du formulaire.

Cet identifiant masque l’adresse dans l’URL de traitement. L’adresse de contact reste volontairement visible ailleurs dans le portfolio.

Le formulaire utilise un envoi POST classique avec `multipart/form-data`. Les champs `_subject`, `_template`, `_captcha`, `_honey` et `_next` sont configurés. La redirection est construite automatiquement vers `merci.html` dans le même dossier et sur le même domaine ; la langue reste celle mémorisée dans le navigateur.

Un fichier facultatif est accepté : PDF, DOCX, PNG ou JPEG (extension `.jpg` ou `.jpeg`), au maximum 5 × 1024 × 1024 octets. Le navigateur vérifie le nombre, l’extension, le type MIME lorsqu’il est renseigné et la taille avant l’envoi. Ce contrôle côté navigateur ne remplace pas une analyse antivirus. La réception réelle, le CAPTCHA et l’activation dépendent du service FormSubmit.

Documentation consultée : <https://formsubmit.co/documentation>.

## Modifier la veille et les langues

La veille est dans `pages/veille.html`. Les traductions sont dans `js/i18n/fr.js`, `en.js`, `ar.js` et `zh.js`. Chaque nouveau texte doit avoir ses quatre versions. Les clés sont les textes français.

La date de dernière mise à jour et « environ 14 mois » sont calculées pour le 8 octobre 2026. Lors d’une prochaine mise à jour, vérifier à nouveau les échéances et modifier les quatre langues ensemble. Les sources et leur rôle sont listés dans `SOURCES-VEILLE.md`.

## Publier cette mise à jour

Conserver le dossier `assets` et tous les fichiers existants. Remplacer les fichiers modifiés et ajouter `pages/merci.html`. Sur GitHub Pages, envoyer le contenu du dossier `portfolio-imrane-boumaza` à la racine du dépôt existant, puis attendre la fin du déploiement. Ne pas changer le domaine personnalisé déjà configuré.

Après publication, contrôler les deux pages dans les quatre langues et faire le test de réception FormSubmit décrit ci-dessus.
