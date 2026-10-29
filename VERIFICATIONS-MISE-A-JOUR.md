# Vérifications du 28 octobre 2026

## Périmètre

- 9 pages : accueil, À propos, Formation, Stages, Réalisations, Compétences, Veille, Certifications, Contact.
- 390 px et 1440 px ; thèmes clair et sombre ; français, anglais, arabe et chinois : 144 configurations.
- Aucun débordement horizontal détecté. Aucune erreur JavaScript détectée. Images locales vérifiées ; les images différées de Stages ont été contrôlées après chargement complet.
- Aucun appel au service de collecte supprimé observé. Aucun attribut de suivi ni script de collecte conservé.
- Palette, polices, navigation, LinkedIn et CV inchangés. Les versions des ressources modifiées sont actualisées.

## Interactions

- Terminal : toutes les commandes, commande inconnue, historique, flèches, Échap, rejouer et pause testés. Du texte ressemblant à du HTML reste du texte.
- Commande CV : le fichier demandé correspond à la langue choisie et répond correctement. Le lecteur PDF natif a été remplacé par une réponse texte dans le test automatisé pour permettre son contrôle en navigateur sans interface.
- Trois cartes phares, grille de 25 projets, mini-bilan CTF et schémas présents.
- Fiches depuis Compétences : fermeture sans navigation, conservation du défilement, retour du focus sur le lien.
- Champs difficulté conservés vides lorsqu’ils ne sont pas renseignés. Aucun bouton PDF pour les fiches sans document.
- Le contenu de présentation destiné aux lecteurs d’écran reste présent sur l’accueil.

## Limites

Tests exécutés localement dans Chromium, avec les requêtes HTTPS externes neutralisées. Ils ne valident pas la disponibilité de Google Fonts ni les services tiers. Pas d’envoi du formulaire, pas de publication et pas de modification de l’infrastructure distante. La suppression des scripts du portfolio ne supprime pas les données éventuellement déjà stockées sur le backend séparé.

Les questions de contenu sont dans QUESTIONS-PROJETS.md ; les sources et limites des schémas sont dans SCHEMAS-SOURCES.md.
