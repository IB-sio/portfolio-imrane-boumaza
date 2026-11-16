# Veille IoT automatique directement sur imraneboumaza.com

Version du 16 novembre 2026. Cette version remplace le projet de second site. Il n'y a plus de lien vers un Observatoire séparé.

## Résultat

La page pages/veille.html conserve le menu, la palette et le fonctionnement du portfolio. Elle présente un tableau des incidents et alertes, deux graphiques de publications, les échéances CRA, des fiches avec sources et une recherche par sujet. FR, EN, arabe RTL et chinois utilisent le sélecteur existant.

Les graphiques comptent les PUBLICATIONS conservées, pas toutes les attaques mondiales. Un article n'est pas nécessairement un incident distinct. Les alertes de vulnérabilité sont distinguées des incidents/opérations. La classification par mots-clés peut se tromper et ne remplace pas une qualification humaine.

Le ton reste simple, avec « Je retiens… » pour les implications. Le modèle n'a pas le droit d'inventer des tests ou des expériences personnelles. Les synthèses IA sont signalées comme non relues. Les quatre résumés initiaux sont rédigés à partir de pages officielles ouvertes et vérifiées lors de la préparation.

## Ce qui est automatique

Chaque jour, à 06:23 UTC (07:23 en hiver, 08:23 en été en France), GitHub Actions lit les flux officiels CERT-FR et Department of Justice. Il sélectionne les sujets IoT et supprime les doublons d'URL. Gemini produit les résumés, les pistes d'analyse et les quatre traductions si la clé est active. Les données sont enregistrées dans GitHub, puis le portfolio est republié.

Les graphiques, tableaux et fiches utilisent le même fichier assets/data/veille.json. Ils se mettent à jour ensemble. Aucun ordinateur personnel n'a besoin de rester allumé. Maximum six synthèses par exécution et 300 publications conservées. Les articles en attente seront repris aux passages suivants.

Les textes sources sont des extraits RSS, pas des articles complets. Seuls ces textes publics sont transmis à Gemini. Pas de collecte de visiteurs, pas de clé API dans le navigateur. Les anciens contenus sont conservés en cas de panne de source. Une erreur de quota laisse le texte original accessible avec un statut explicite.

Le calendrier CRA suit automatiquement la date du jour ; les dates légales sont celles vérifiées auprès de la Commission. Si la loi change, il faut vérifier et adapter ces trois dates. Le programme ne réécrit pas le droit au hasard. La Commission est ici une source de référence, pas un flux automatique. La couverture des deux organismes collectés n'est pas exhaustive.

## Installation, du début à la fin

### 1. Garder ton domaine et ton dépôt actuels

Tout reste sur https://www.imraneboumaza.com/pages/veille.html. Aucun nouveau domaine, aucun nouveau dépôt, aucune modification chez Porkbun. Conserve le fichier CNAME et ton domaine actuel.

Si tu avais commencé un dépôt observatoire-iot, il n'est plus nécessaire pour cette solution. Il n'a pas été supprimé ni modifié par l'assistant. S'il contient déjà un workflow actif, désactive uniquement ce workflow dans Actions pour éviter de lancer deux collectes avec la même clé.

### 2. Envoyer les fichiers dans le dépôt du portfolio

Décompresse le ZIP. Il contient le portfolio complet. Fais une copie de ton dossier actuel avant remplacement. Les fichiers nouveaux/modifiés sont listés dans VERIFICATION-VEILLE.md.

Dans ton clone Git habituel du portfolio, copie les fichiers de ce dossier à leur place, en gardant les mêmes chemins. Le dossier caché .github doit aussi être copié. Sur Fedora : Ctrl+H. Sur Windows : Explorateur > Afficher > Afficher > Éléments masqués.

Puis dans le terminal de CE dépôt :

```bash
git status
git add pages/veille.html css/veille-auto.css js/veille-auto.js js/i18n/fr.js js/i18n/en.js js/i18n/ar.js js/i18n/zh.js assets/data/veille.json scripts/veille tests/veille .github/workflows/veille.yml VEILLE-AUTOMATIQUE.md VERIFICATION-VEILLE.md
git commit -m "Intégrer la veille IoT automatique au portfolio"
git push
```

Vérifie les fichiers affichés par git status avant validation. Si tu as déjà modifié le site depuis le ZIP du 10 novembre, copie seulement les fichiers concernés pour ne pas écraser tes autres changements. Ne supprime pas ton dossier .git.

Sans terminal : sur GitHub, ouvre chaque dossier correspondant > Add file > Upload files > envoie les fichiers modifiés > Commit changes. Pour le workflow caché, Add file > Create new file > nom `.github/workflows/veille.yml`, puis colle le contenu exact du fichier fourni. Ne colle pas le dossier entier dans un sous-dossier supplémentaire.

Le workflow fourni écoute la branche main. Si ta branche par défaut a un autre nom, remplace `main` dans `.github/workflows/veille.yml` par son nom exact.

### 3. Créer la clé Gemini

Ouvre https://aistudio.google.com/apikey et connecte-toi avec ton compte Google. Clique Create API key et sélectionne/crée un projet. Une première clé peut déjà être proposée.

Reste sur l'offre gratuite ; n'active pas de facturation. Si Google demande un paiement, arrête cette étape : le site peut rester accessible sans synthèse IA. Les quotas varient selon le modèle et le compte. Une vérification de projet peut être demandée. Documentation : https://aistudio.google.com/docs/api-key et https://ai.google.dev/gemini-api/docs/pricing.

Le modèle est configurable dans scripts/veille/config.json (gemini-2.5-flash-lite). Ne partage pas la clé dans une capture ou dans le chat. Ne la mets jamais dans le code ou le ZIP.

### 4. Ajouter la clé au BON dépôt

Dans le dépôt qui publie imraneboumaza.com :

Settings > Secrets and variables > Actions > New repository secret.

Name : `GEMINI_API_KEY`
Secret : colle ta clé.
Puis Add secret.

Si la clé existe seulement dans l'ancien dépôt observatoire-iot, elle n'est pas automatiquement disponible dans celui du portfolio : ajoute-la ici également.

### 5. Autoriser le workflow

Settings > Actions > General > Workflow permissions > Read and write permissions > Save. Le workflow doit pouvoir enregistrer le fichier de données dans ce dépôt.

Settings > Pages > Build and deployment > Source : GitHub Actions.

GARDE le Custom domain déjà configuré pour ton portfolio et Enforce HTTPS. Ne modifie pas tes DNS. Le workflow copie le CNAME existant dans le site publié.

Cette étape change la méthode de publication : le fichier veille.yml publie désormais tout le portfolio, pas seulement la page Veille. Il se lance aussi à chaque push sur main. S'il existe déjà un autre workflow qui publie le même site, garde une seule procédure de déploiement : ne laisse pas deux workflows concurrents publier des versions différentes. Le ZIP de départ ne contenait pas de workflow de publication.

### 6. Premier lancement

Actions > Actualiser la veille IoT > Run workflow > branche principale > Run workflow.

Attends les coches vertes des tâches update puis deploy. Ouvre la page Veille en ligne et recharge sans cache avec Ctrl+F5.

Vérifie la date de collecte, les chiffres des graphiques, une fiche récente et les quatre langues. « Analyse automatique à activer » signifie que la clé manque. « Analyse indisponible » signifie que la clé, le modèle ou les quotas posent problème. Une publication avec « Texte source · analyse et traduction en attente » n'a pas encore été traitée par l'IA.

Une exécution verte n'est pas une preuve que l'IA a fonctionné : le site reste publié en cas de panne IA. Vérifie le badge « Synthèse IA · non relue » sur une NOUVELLE publication et ses traductions. Le programme n'appelle pas Gemini s'il n'y a aucun nouvel article à analyser.

### 7. Ensuite

Aucune action quotidienne n'est nécessaire. Le workflow est planifié chaque jour ; GitHub peut retarder l'heure. Les sources/API peuvent changer ou devenir indisponibles. Un dépôt public inactif peut voir ses workflows planifiés désactivés après 60 jours : vérifie Actions si la date ne bouge plus. La page indique un avertissement après 48 heures sans collecte réussie.

L'objectif est d'éviter les modifications manuelles de contenu, pas de promettre un service sans aucune maintenance pour toujours. Lis les sources importantes avant un oral : les résumés automatiques peuvent se tromper.

## Dépannage

- 403 lors du git push du bot : vérifier les permissions Actions et les règles de branche. Ne désactive pas une protection sans comprendre son rôle.
- Erreur deploy : vérifier Source = GitHub Actions, domaine existant inchangé et environnement github-pages autorisant ta branche.
- Clé/quotas : mettre à jour GEMINI_API_KEY dans les secrets, vérifier le modèle dans config.json. Aucun changement HTML nécessaire.
- Flux indisponible : ancienne version conservée ; nouvel essai au prochain passage.
- Mise à jour incorrecte : l'historique GitHub de assets/data/veille.json permet de restaurer une version antérieure.

## Tests locaux

```bash
python3 -m unittest discover -s tests/veille
python3 scripts/veille/collect.py
```

Sans clé dans l'environnement, la deuxième commande ne fait que la collecte. La clé de production doit rester dans les secrets GitHub.
