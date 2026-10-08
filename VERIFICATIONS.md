# Vérifications du 8 octobre 2026

## Base de travail

L’archive fournie a été comparée au site en ligne sur six fichiers : accueil, variables de couleur, pages Veille et Contact, catalogue des réalisations et script de contact. Les six étaient identiques avant modification. Il ne s’agit pas d’une comparaison exhaustive de tous les fichiers du serveur.

Après modification, la comparaison avec l’archive confirme que seuls huit fichiers existants ont changé : `pages/veille.html`, `pages/contact.html`, `js/contact.js`, les quatre dictionnaires et `css/components.css`. Les règles CSS ajoutées sont limitées aux pages Veille et Contact. Les couleurs de `variables.css`, les autres pages et tous les médias sont identiques à ceux de l’archive.

## Contrôles effectués

- Les onze liens documentaires de la veille ont été ouverts et leur contenu vérifié. Sept articles sont présentés, avec des dates de publication ou de mise à jour explicites.
- Les références locales, les identifiants HTML et la syntaxe JavaScript ont été contrôlés.
- Aucune référence à l’ancien prestataire de formulaire ne reste dans les fichiers HTML, JavaScript, CSS ou Markdown.
- Tests fonctionnels en DOM simulé : Veille, Contact et Merci, quatre langues, deux thèmes, deux largeurs de menu (390 et 1440 pixels), soit 48 combinaisons.
- Langue mémorisée, attribut RTL pour l’arabe, sélection des traductions et placement du sélecteur dans le menu mobile contrôlés.
- Formulaire : champs obligatoires, email invalide, taille et type de fichier, incohérence extension/MIME, retrait du fichier, fichiers autorisés à la limite de taille, envoi sans fichier et construction de l’URL de retour contrôlés.
- Le POST est autorisé uniquement après validation ; les tests interceptent les événements en environnement simulé et n’envoient aucun email.

## Limites restant à vérifier

Le navigateur distant n’a pas pu accéder à la copie locale. Aucun rendu visuel réel sur ordinateur/mobile ni aucune capture de la nouvelle version n’a donc pu être produit. Les tests DOM ne permettent pas de confirmer l’absence de débordement, le chargement des polices ou l’apparence effective en clair/sombre.

Après publication, vérifier Veille, Contact et Merci dans les quatre langues, notamment les tableaux sur mobile et la frise en arabe. Activer FormSubmit avec le lien reçu par email, puis confirmer la réception d’un message et d’une petite pièce jointe. Le CAPTCHA et l’envoi réel n’ont pas été exécutés ici.
