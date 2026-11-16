# Vérification de la veille intégrée · 16 novembre 2026

## Périmètre
Version construite à partir du ZIP fourni, sans changement des couleurs, des polices, du CV ou des autres pages. Non déployée sur imraneboumaza.com.

Fichiers existants modifiés : pages/veille.html et js/i18n/fr.js, en.js, ar.js, zh.js.
Fichiers ajoutés : css/veille-auto.css, js/veille-auto.js, assets/data/veille.json, scripts/veille/collect.py, scripts/veille/config.json, tests/veille/test_collect.py, .github/workflows/veille.yml, VEILLE-AUTOMATIQUE.md et ce rapport.
Aucun fichier existant supprimé. css/variables.css identique à l’original.

## Contrôles réalisés
- Collecte réelle des trois flux officiels : tous accessibles. Quatre publications initiales sourcées conservées ; aucun nouvel article pertinent ajouté lors de ce passage.
- Cinq tests automatisés réussis : catégories, liens non autorisés, XML avec entités, sortie IA contenant du HTML, cohérence du jeu de données et des traductions.
- Syntaxe JavaScript validée.
- Affichage ordinateur et fenêtre mobile de 390 px, thèmes clair et sombre, sélection des quatre langues ; arabe en RTL sans débordement global. Les tableaux défilent dans leur propre conteneur sur mobile.
- Recherche « Microscan » : une seule carte correspondante affichée.
- Console consultée : messages de l’extension du navigateur, aucune erreur de l’application observée.
- Comparaison binaire avec le ZIP initial : seuls les cinq fichiers existants annoncés ont changé.

## Limites et activation
Aucune clé API fournie : les appels Gemini réels ne sont pas testés. Les tests valident le traitement des réponses, pas la fidélité d’un modèle sur des articles futurs. Les synthèses automatiques restent signalées et doivent pouvoir être vérifiées via la source.
Le déploiement GitHub Actions reste à activer sur le compte de l’utilisateur. Les horaires peuvent être retardés par GitHub, et les quotas gratuits ou flux peuvent évoluer. Le guide explique les contrôles et la reprise.
Les graphiques mesurent les publications de cette veille, pas le total mondial des cyberattaques. Le calendrier CRA change automatiquement de statut selon la date ; une modification future de la loi exige une correction des échéances de référence.
