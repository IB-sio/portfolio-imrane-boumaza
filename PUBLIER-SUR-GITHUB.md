# Mettre à jour le portfolio sur GitHub Pages

Le ZIP contient le portfolio complet et les quatre CV actualisés. Le CV français est celui validé le 29 octobre 2026. Les traductions reprennent les compétences et la présentation des expériences, sans CM-MP dans les CV. Le reste du site conserve son design et ses couleurs.

## Sans terminal

1. Extrais le ZIP et ouvre **portfolio-imrane-boumaza**. Tu dois voir index.html, pages, js, css, assets et CNAME.
2. Connecte-toi à GitHub avec IB-sio. Ouvre le dépôt EXISTANT qui publie ton site.
3. Dans **Settings > Pages**, relève la branche et le dossier utilisés. Garde ces réglages et le domaine personnalisé. Si Pages utilise GitHub Actions, conserve le workflow existant.
4. Reviens dans **Code**, à la racine et sur la branche publiée. Clique **Add file > Upload files**, puis glisse le dossier **assets** depuis l'intérieur du dossier extrait (moins de 100 fichiers).
5. Saisis `Mise à jour des quatre CV`, puis valide le commit sur la branche publiée si les règles le permettent. Sinon, crée et fusionne la pull request proposée après vérification.
6. Recommence **Add file > Upload files** à la racine : glisse **js**, **css**, **pages** et les fichiers de la racine, dont index.html, CNAME, sitemap.xml, robots.txt et les fichiers Markdown.
7. Valide avec `Portfolio alternance 2027 et nouveaux CV`. N'envoie ni le ZIP ni le dossier parent portfolio-imrane-boumaza lui-même.
8. Si les anciens fichiers d'analytics existent encore dans le dépôt, supprime seulement js/consent.js, js/analytics.js, css/analytics-consent.css et confidentialite-analytics.html. L'envoi ne supprime pas les anciens fichiers absents du ZIP.
9. Dans **Actions**, attends la réussite du déploiement Pages. Recharge https://www.imraneboumaza.com avec **Ctrl + Maj + R**.
10. Sélectionne chaque langue et ouvre **Voir mon CV**. Vérifie aussi Compétences et Réalisations sur téléphone.

Ne change pas les DNS ou le domaine personnalisé. Garde le fichier CNAME fourni : www.imraneboumaza.com.

## Avec Git, si le dépôt est déjà cloné

Ouvre le terminal dans ton dépôt EXISTANT :

```bash
git status
git remote -v
```

Vérifie qu'il s'agit du bon dépôt IB-sio, sans modifications locales en attente. Sinon, sauvegarde et examine-les avant de poursuivre.

```bash
git pull --ff-only
```

Copie le CONTENU du dossier extrait dans le dépôt avec le gestionnaire de fichiers, en remplaçant les fichiers. Conserve le dossier .git et les workflows .github existants. Supprime les quatre anciens fichiers d'analytics listés plus haut s'ils sont encore présents.

```bash
git status
git diff --stat
git add -A
git diff --cached --stat
git commit -m "Portfolio : CV actualises en quatre langues"
git push
```

Examine la liste des fichiers avant le commit. Si Git signale un conflit ou une erreur d'authentification, conserve le message et n'utilise pas --force. Le mot de passe GitHub habituel ne remplace pas un jeton d'accès pour Git en HTTPS ; la méthode sans terminal évite cette configuration.

Documentation officielle : https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
