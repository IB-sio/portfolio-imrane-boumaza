/* Stocke les réalisations et gère leurs filtres et fenêtres de détail. */
/* ===== DONNÉES : DUPLIQUER UN OBJET POUR AJOUTER UN PROJET ===== */
const projets = [
    {
        "id": "ha-active-directory",
        "title": "NetVision · Haute disponibilité AD",
        "categories": [
            "Systèmes",
            "Réseau"
        ],
        "summary": "Deux contrôleurs de domaine et des services d’infrastructure.",
        "technologies": [
            "Windows Server 2025",
            "Active Directory",
            "DNS",
            "DHCP",
            "DFS",
            "GPO",
            "VirtualBox"
        ],
        "context": "TP sous VirtualBox : SRV-DC1 et SRV-DC2, client Windows 11 et domaine netvision.lan.",
        "objective": "Étudier la continuité de service avec deux contrôleurs de domaine.",
        "steps": [
            "Deux contrôleurs de domaine",
            "Services DNS et DHCP",
            "Partage et organisation des données avec DFS",
            "Application de stratégies de groupe GPO",
            "DHCP Failover · FO-NETVISION",
            "DFS-N / DFS-R",
            "Tests d’arrêt d’un contrôleur et de continuité des services",
            "OU Héros, utilisateurs, groupes et lecteurs réseau",
            "GPO de restriction de l’heure ; vérification avec gpupdate et gpresult",
            "Configuration des plages DHCP, réservations et paramètres de passerelle et DNS.",
            "Relation de bascule FO-NETVISION"
        ],
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "contribution": "Mise en place des services AD, DNS, DHCP, DFS et GPO sur deux contrôleurs ; continuité vérifiée en arrêtant un DC.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/ha-active-directory.pdf",
        "group": "Systèmes & services"
    },
    {
        "id": "dns-bind9",
        "title": "DNS BIND9 & serveur web Apache",
        "categories": [
            "Réseau",
            "Systèmes"
        ],
        "summary": "Résolution de noms, zone inversée et validation depuis Windows.",
        "technologies": [
            "BIND9",
            "Debian",
            "Apache",
            "Windows 11"
        ],
        "context": "Infrastructure webinnovBI.lan : serveur DNS Debian/BIND9 et serveur Apache séparé.",
        "objective": "Associer des noms aux services et vérifier les résolutions DNS.",
        "steps": [
            "Création des zones directe et inversée",
            "Enregistrements DNS pour les services, dont www et ftp.",
            "Installation du serveur web Apache",
            "Tests depuis le client Windows 11"
        ],
        "difficulty": "Le serveur web utilisait le mauvais DNS. J’ai corrigé sa configuration pour interroger le serveur DNS du TP.",
        "skills": [
            1,
            2,
            5
        ],
        "contribution": "J’ai créé des zones directes et inverses, des enregistrements A/PTR et des VirtualHosts Apache, puis vérifié les réponses DNS et l’accès aux sites.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/dns-bind9.pdf",
        "group": "Systèmes & services"
    },
    {
        "id": "nextcloud-ldap",
        "title": "Nextcloud & Active Directory",
        "categories": [
            "Systèmes",
            "Web"
        ],
        "summary": "Connecter un service de fichiers à l’annuaire de l’organisation.",
        "technologies": [
            "Nextcloud",
            "LDAP",
            "Debian",
            "Active Directory"
        ],
        "context": "Projet d’intégration entre un serveur Debian et un serveur Windows.",
        "objective": "Relier Nextcloud à Active Directory via LDAP.",
        "steps": [
            "Service Nextcloud sur Debian",
            "Annuaire Active Directory sur Windows",
            "Connexion LDAP entre les deux environnements",
            "Connexion testée avec un utilisateur du domaine Active Directory."
        ],
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "contribution": "J’ai installé et configuré Nextcloud sous Linux et travaillé sur l’accès web, le stockage et la résolution des problèmes du service.",
        "pdf": "nextcloud-ldap-notes.pdf",
        "pdfExpected": "assets/docs/realisations/nextcloud-ldap.pdf",
        "group": "Systèmes & services",
        "pdfLabel": "Consulter mes notes de procédure (PDF)",
        "documentNote": "Notes issues de mes échanges avec Claude pendant le TP. Elles décrivent la procédure suivie, sans constituer un compte rendu de validation."
    },
    {
        "id": "nas-lycee",
        "title": "NAS personnel · OpenMediaVault",
        "categories": [
            "Systèmes",
            "Réseau"
        ],
        "technologies": [
            "OpenMediaVault",
            "NAS",
            "SSD",
            "HDD"
        ],
        "summary": "Installer OpenMediaVault à la maison et y stocker mes fichiers sur un HDD, avec un SSD pour la rapidité du serveur.",
        "context": "Projet personnel : un serveur de stockage utilisé à la maison.",
        "objective": "Installer OpenMediaVault à la maison et y stocker mes fichiers sur un HDD, avec un SSD pour la rapidité du serveur.",
        "steps": [
            "Installation et configuration d’OpenMediaVault.",
            "Deux disques aux rôles distincts : SSD pour la rapidité du serveur et HDD pour le stockage des fichiers."
        ],
        "difficulty": "",
        "skills": [
            4,
            5
        ],
        "contribution": "Installer OpenMediaVault à la maison et y stocker mes fichiers sur un HDD, avec un SSD pour la rapidité du serveur.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/nas-lycee.pdf",
        "group": "Systèmes & services"
    },
    {
        "id": "samba-debian",
        "title": "Samba · Partages sous Debian",
        "categories": [
            "Systèmes",
            "Réseau"
        ],
        "technologies": [
            "Debian",
            "Samba",
            "SMB"
        ],
        "summary": "Partages de fichiers avec Samba sur Debian.",
        "context": "Travaux pratiques",
        "objective": "Partages de fichiers avec Samba sur Debian.",
        "steps": [
            "Debian",
            "Samba",
            "SMB"
        ],
        "contribution": "Partages de fichiers avec Samba sur Debian.",
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/samba-debian.pdf",
        "status": "Travaux pratiques",
        "group": "Systèmes & services"
    },
    {
        "id": "fedora",
        "title": "Fedora · Administration personnelle",
        "categories": [
            "Systèmes"
        ],
        "technologies": [
            "Fedora",
            "Linux",
            "Waydroid",
            "Bash"
        ],
        "summary": "Administrer mon environnement Linux et diagnostiquer le matériel de mon ordinateur.",
        "context": "Projet personnel à la maison.",
        "objective": "Administrer mon environnement Linux et diagnostiquer le matériel de mon ordinateur.",
        "steps": [
            "Paquets, services, permissions et fichiers de configuration",
            "Waydroid, diagnostic RAM/SSD et températures avec dmidecode, nvme et sensors"
        ],
        "contribution": "Administrer mon environnement Linux et diagnostiquer le matériel de mon ordinateur.",
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/fedora.pdf",
        "status": "Travaux pratiques",
        "group": "Systèmes & services"
    },
    {
        "id": "infrastructure-domaine",
        "title": "Infrastructure Windows/Linux · TP01",
        "categories": [
            "Réseau",
            "Systèmes"
        ],
        "summary": "Relier un routeur Debian, un domaine Active Directory et un client Windows 11.",
        "technologies": [
            "Debian 13",
            "Windows Server 2025",
            "Active Directory",
            "Windows 11",
            "NAT",
            "iptables"
        ],
        "context": "TP01 : infrastructure pédagogique composée de plusieurs machines Linux et Windows.",
        "objective": "Relier un routeur Debian, un domaine Active Directory et un client Windows 11.",
        "steps": [
            "Installation d’un serveur Debian 13 de base.",
            "Configuration d’un routeur Debian à deux interfaces et activation du routage.",
            "Windows Server 2025 en contrôleur de domaine ; client Windows 11 joint au domaine.",
            "Accès de chaque machine au réseau de la salle et à Internet."
        ],
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "contribution": "Relier un routeur Debian, un domaine Active Directory et un client Windows 11.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/infrastructure-domaine.pdf",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "ap-fruit",
        "title": "AP FRUIT · Équipe Mangue",
        "categories": [
            "Réseau",
            "Sécurité",
            "Systèmes"
        ],
        "summary": "Une infrastructure segmentée avec deux pare-feu et une DMZ.",
        "technologies": [
            "pfSense",
            "Proxmox",
            "DMZ",
            "NAT",
            "BIND",
            "Windows 11"
        ],
        "context": "Projet noté d’ateliers professionnels, réalisé en binôme sur Proxmox : équipe Mangue.",
        "objective": "Séparer les réseaux et publier des services en contrôlant leurs communications.",
        "steps": [
            "Deux pare-feu pfSense : un externe et un interne.",
            "Serveur web public en DMZ ; serveur web interne et DNS BIND sur le LAN.",
            "Poste développeur Windows 11, redirections NAT et règles de filtrage."
        ],
        "difficulty": "",
        "skills": [
            1,
            4,
            5
        ],
        "contribution": "J’ai réalisé la configuration technique et les essais de l’infrastructure dans le cadre du binôme Mangue.",
        "pdf": "ap-fruit.pdf",
        "pdfExpected": "assets/docs/realisations/ap-fruit.pdf",
        "group": "Réseaux & cybersécurité",
        "documentNote": "La documentation distingue les observations du TP, les exemples reconstitués et les tests restant à valider."
    },
    {
        "id": "pare-feu-pfsense",
        "title": "pfSense · Sécurisation complète d’un réseau",
        "categories": [
            "Sécurité",
            "Réseau"
        ],
        "summary": "Configurer le filtrage, les accès, la détection d’intrusions et la continuité WAN dans un TP individuel.",
        "technologies": [
            "pfSense",
            "Suricata",
            "pfBlockerNG",
            "NAT",
            "NTP",
            "Debian",
            "Apache",
            "Windows 11",
            "Kali Linux"
        ],
        "context": "WAN, LAN et DMZ avec pfSense, serveur Debian/Apache en DMZ, client Windows 11 et VM Kali.",
        "objective": "Configurer le filtrage, les accès, la détection d’intrusions et la continuité WAN dans un TP individuel.",
        "steps": [
            "NAT, redirections de ports et règles de filtrage par interface.",
            "NTP, blocage SSH avec journalisation, portail captif et limitation de bande passante.",
            "IDS/IPS Suricata, filtrage DNS avec pfBlockerNG et bascule WAN.",
            "Étude du cadre légal de conservation des journaux et des recommandations ANSSI pour les pare-feu."
        ],
        "difficulty": "",
        "skills": [
            1,
            5,
            6
        ],
        "contribution": "Configurer le filtrage, les accès, la détection d’intrusions et la continuité WAN dans un TP individuel.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/pare-feu-pfsense.pdf",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "dmz-mangue",
        "title": "Serveur Debian en DMZ · Mangue",
        "categories": [
            "Réseau",
            "Sécurité",
            "Systèmes"
        ],
        "technologies": [
            "Debian 13",
            "Apache",
            "SSH",
            "vsftpd",
            "pfSense"
        ],
        "summary": "Publier des services web, SSH et FTP dans un réseau séparé du LAN.",
        "context": "Travaux pratiques",
        "objective": "Publier des services web, SSH et FTP dans un réseau séparé du LAN.",
        "steps": [
            "Debian 13, Apache, SSH et vsftpd sur swebmangue",
            "Règles FTP du LAN vers la DMZ et tests depuis les réseaux"
        ],
        "contribution": "Publier des services web, SSH et FTP dans un réseau séparé du LAN.",
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/dmz-mangue.pdf",
        "status": "Travaux pratiques",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "portail-captif",
        "title": "pfSense · Portail captif",
        "categories": [
            "Réseau",
            "Sécurité"
        ],
        "technologies": [
            "pfSense",
            "Captive Portal",
            "NeverSSL"
        ],
        "summary": "Mettre en place un accès réseau avec authentification et tester la redirection.",
        "context": "Travaux pratiques",
        "objective": "Mettre en place un accès réseau avec authentification et tester la redirection.",
        "steps": [
            "Utilisateur invite et port 8002",
            "Règles d’accès et test avec NeverSSL"
        ],
        "contribution": "Mettre en place un accès réseau avec authentification et tester la redirection.",
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/portail-captif.pdf",
        "status": "Travaux pratiques",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "traffic-shaper",
        "title": "pfSense · Limitation de débit",
        "categories": [
            "Réseau"
        ],
        "technologies": [
            "pfSense",
            "QoS",
            "HTTP/HTTPS"
        ],
        "summary": "Limiter le trafic web à 1 Mbit/s avec les limiters de pfSense.",
        "context": "Travaux pratiques",
        "objective": "Limiter le trafic web à 1 Mbit/s avec les limiters de pfSense.",
        "steps": [
            "Limiters Up_1M et Down_1M sur HTTP/HTTPS",
            "Réinitialisation des connexions et mesure du débit"
        ],
        "contribution": "Limiter le trafic web à 1 Mbit/s avec les limiters de pfSense.",
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/traffic-shaper.pdf",
        "status": "Travaux pratiques",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "cisco-packet-tracer",
        "title": "Réseau Cisco Packet Tracer",
        "categories": [
            "Réseau"
        ],
        "summary": "Adressage et routage dans un environnement simulé.",
        "technologies": [
            "Cisco Packet Tracer",
            "IPv4",
            "IPv6",
            "Routage statique"
        ],
        "context": "Travaux pratiques de simulation réseau.",
        "objective": "Construire un plan d’adressage et comprendre le routage statique.",
        "steps": [
            "Découpage en sous-réseaux IPv4 et IPv6",
            "Configuration du routage statique entre plusieurs routeurs Cisco simulés.",
            "Simulation du réseau"
        ],
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "contribution": "J’ai pratiqué l’adressage IPv4/IPv6 et le routage statique dans un réseau simulé avec Cisco Packet Tracer.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/cisco-packet-tracer.pdf",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "reseau-bac-pro",
        "title": "Infrastructure réseau · Bac Pro",
        "categories": [
            "Systèmes",
            "Réseau"
        ],
        "technologies": [
            "Windows Server",
            "IPv4"
        ],
        "summary": "Un projet de groupe réunissant réseau, serveurs et documentation.",
        "context": "Projet réseau de trois semaines réalisé en groupe au lycée, décrit dans mon CV.",
        "objective": "Un projet de groupe réunissant réseau, serveurs et documentation.",
        "steps": [
            "Adressage IP et schéma réseau",
            "Windows Server, gestion des utilisateurs et GPO",
            "Accès distant et documentation technique"
        ],
        "difficulty": "",
        "skills": [
            4,
            5
        ],
        "contribution": "J’ai travaillé en groupe sur les services du réseau et la documentation technique.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/reseau-bac-pro.pdf",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "kali-metasploitable",
        "title": "Audit de sécurité · Laboratoire Kali",
        "categories": [
            "Sécurité"
        ],
        "technologies": [
            "Kali Linux",
            "Nmap",
            "searchsploit",
            "CVE"
        ],
        "summary": "Identifier des services exposés et étudier une vulnérabilité dans un laboratoire pédagogique.",
        "context": "Audit pédagogique d’une VM cible depuis Kali Linux, dans un environnement de TP autorisé.",
        "objective": "Identifier des services exposés et étudier une vulnérabilité dans un laboratoire pédagogique.",
        "steps": [
            "Nmap : découverte des ports, identification des services, versions et système d’exploitation.",
            "Recherche de vulnérabilités et de CVE avec les scripts vuln et searchsploit."
        ],
        "contribution": "Identifier des services exposés et étudier une vulnérabilité dans un laboratoire pédagogique.",
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/kali-metasploitable.pdf",
        "status": "Travaux pratiques",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "passe-ton-hack",
        "title": "Passe ton hack d’abord · Challenge cyber national",
        "categories": [
            "Sécurité"
        ],
        "technologies": [
            "CTF",
            "Cryptographie",
            "Hachage",
            "Certificats"
        ],
        "summary": "Résoudre en équipe des épreuves de cybersécurité lors du challenge national pour lycéens et étudiants.",
        "context": "Challenge CTF en ligne organisé par le Commandement de la cyberdéfense (COMCYBER) et le ministère de l’Éducation nationale, ouvert aux lycéens et aux étudiants de BTS.",
        "objective": "Mettre en pratique des notions de cybersécurité sur des épreuves concrètes, en équipe.",
        "steps": [
            "Épreuves de cryptographie : chiffrement, hachage et certificats.",
            "Sécurité des données et résolution de challenges pratiques en équipe."
        ],
        "contribution": "",
        "difficulty": "",
        "skills": [
            6
        ],
        "pdf": "",
        "pdfExpected": "",
        "status": "Challenge national",
        "group": "Réseaux & cybersécurité"
    },
    {
        "id": "cisco-routeurs-physiques",
        "title": "Cisco · Routeurs physiques et console série",
        "summary": "Raccorder plusieurs routeurs Cisco et les configurer en ligne de commande depuis un PC.",
        "context": "Travaux pratiques",
        "objective": "Raccorder plusieurs routeurs Cisco et les configurer en ligne de commande depuis un PC.",
        "steps": [
            "Raccordement physique des routeurs pour constituer un réseau.",
            "Connexion du PC au routeur par câble console série.",
            "Configuration des équipements depuis leur interface en ligne de commande."
        ],
        "technologies": [
            "Cisco",
            "Console série",
            "CLI"
        ],
        "categories": [
            "Réseau"
        ],
        "group": "Réseaux & cybersécurité",
        "contribution": "Raccorder plusieurs routeurs Cisco et les configurer en ligne de commande depuis un PC.",
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "pdf": "",
        "status": "Travaux pratiques"
    },
    {
        "id": "diagnostic-infrastructure",
        "title": "Dépannage · Réseau et virtualisation",
        "summary": "Identifier la cause d’un incident et corriger la configuration à partir de trois situations rencontrées en TP.",
        "context": "Travaux pratiques",
        "objective": "Identifier la cause d’un incident et corriger la configuration à partir de trois situations rencontrées en TP.",
        "steps": [
            "Deux VM clonées partageaient la même adresse MAC et ne communiquaient pas : régénération de l’adresse MAC.",
            "Un masque DMZ en /8 au lieu de /24 provoquait des conflits sur pfSense : correction en /24.",
            "Une VM passait à l’état « Avortée » par manque de RAM sur l’hôte : réduction de la mémoire allouée par VM."
        ],
        "technologies": [
            "VirtualBox",
            "pfSense",
            "MAC",
            "IPv4",
            "RAM"
        ],
        "categories": [
            "Réseau",
            "Systèmes"
        ],
        "group": "Réseaux & cybersécurité",
        "contribution": "Identifier la cause d’un incident et corriger la configuration à partir de trois situations rencontrées en TP.",
        "difficulty": "",
        "skills": [
            1,
            2
        ],
        "pdf": "",
        "status": "Travaux pratiques"
    },
    {
        "id": "epicerie-du-monde",
        "title": "Site de l’Épicerie du monde",
        "categories": [
            "Web"
        ],
        "summary": "Un site React avec WordPress en CMS headless, de Figma au déploiement Netlify.",
        "technologies": [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Netlify",
            "WordPress"
        ],
        "context": "Stage dans une épicerie de spécialités à Pau, du 25 mai au 26 juin 2026.",
        "objective": "Renforcer la présence en ligne de l’entreprise avec un site vitrine.",
        "steps": [
            "Maquette Figma",
            "Premier jet Builder.io",
            "Adaptation du code dans VS Code avec GitHub Copilot",
            "Mise en forme avec Tailwind CSS",
            "Utilisation de WordPress comme CMS headless pour le site React.",
            "Tests et déploiement Netlify"
        ],
        "difficulty": "Le widget Trustindex se lançait avant que son conteneur React soit prêt. J’ai ajusté le script pour le lancer après l’apparition du conteneur.",
        "skills": [
            2,
            3,
            4,
            5,
            6
        ],
        "contribution": "J’ai conçu et développé les quatre pages du site, réalisé les tests et publié le résultat. Le gérant a validé le site.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/epicerie-du-monde.pdf",
        "group": "Web & bases de données"
    },
    {
        "id": "pile-lemp",
        "title": "LIVRIO · Application web en HTTPS",
        "categories": [
            "Systèmes",
            "Web"
        ],
        "summary": "Déployer une application avec NGINX, PHP-FPM, MariaDB et un certificat HTTPS auto-signé.",
        "technologies": [
            "Debian",
            "Proxmox",
            "NGINX",
            "PHP-FPM",
            "MariaDB",
            "HTTPS",
            "OpenSSL"
        ],
        "context": "Sujet de bibliothèque LIVRIO, déployé sur une VM Debian sous Proxmox.",
        "objective": "Déployer une application avec NGINX, PHP-FPM, MariaDB et un certificat HTTPS auto-signé.",
        "steps": [
            "Installation de NGINX, PHP-FPM et MariaDB sur Debian.",
            "Mise en place de l’application web, de sa base de données et des droits Linux.",
            "Création d’un certificat auto-signé avec OpenSSL et configuration de HTTPS."
        ],
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "contribution": "Déployer une application avec NGINX, PHP-FPM, MariaDB et un certificat HTTPS auto-signé.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/pile-lemp.pdf",
        "group": "Web & bases de données"
    },
    {
        "id": "lemp-demenagement",
        "title": "Entreprise de déménagement · Pile LEMP",
        "categories": [
            "Systèmes",
            "Web"
        ],
        "summary": "Déployer une application avec NGINX, PHP-FPM, MariaDB et un certificat HTTPS auto-signé.",
        "technologies": [
            "Debian",
            "Proxmox",
            "NGINX",
            "PHP-FPM",
            "MariaDB",
            "HTTPS",
            "OpenSSL"
        ],
        "context": "Second sujet : hébergement du site d’une entreprise de déménagement sur Debian/Proxmox.",
        "objective": "Déployer une application avec NGINX, PHP-FPM, MariaDB et un certificat HTTPS auto-signé.",
        "steps": [
            "Installation de NGINX, PHP-FPM et MariaDB sur Debian.",
            "Mise en place de l’application web, de sa base de données et des droits Linux.",
            "Création d’un certificat auto-signé avec OpenSSL et configuration de HTTPS."
        ],
        "difficulty": "",
        "skills": [
            1,
            5
        ],
        "contribution": "Déployer une application avec NGINX, PHP-FPM, MariaDB et un certificat HTTPS auto-signé.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/lemp-demenagement.pdf",
        "group": "Web & bases de données"
    },
    {
        "id": "programmation",
        "title": "Programmation · Exercices Python et SQL",
        "categories": [
            "Web",
            "Systèmes"
        ],
        "technologies": [
            "Python",
            "SQL"
        ],
        "summary": "Pratiquer les bases de Python et les requêtes SQL dans les exercices de formation.",
        "context": "Travaux pratiques",
        "objective": "Pratiquer les bases de Python et les requêtes SQL dans les exercices de formation.",
        "steps": [
            "Exercices Python : ensembles, congruences et petits programmes",
            "Création de bases et d’utilisateurs ; manipulation de données avec SQL."
        ],
        "contribution": "Pratiquer les bases de Python et les requêtes SQL dans les exercices de formation.",
        "difficulty": "",
        "skills": [
            2,
            6
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/programmation.pdf",
        "status": "Travaux pratiques",
        "group": "Web & bases de données"
    },
    {
        "id": "robot-esp32-c3",
        "title": "Robot piloté par téléphone",
        "categories": [
            "Robotique"
        ],
        "technologies": [
            "ESP32-C3",
            "Bluetooth",
            "Dabble",
            "Servomoteur"
        ],
        "summary": "D’un châssis récupéré à un robot piloté avec Dabble sur mon téléphone.",
        "context": "J’ai commencé avec micro:bit et la programmation par blocs, puis choisi l’ESP32-C3 pour adapter du code issu de la documentation à mon projet.",
        "objective": "D’un châssis récupéré à un robot piloté avec Dabble sur mon téléphone.",
        "steps": [
            "J’ai examiné le moteur et testé sa puissance pour choisir les batteries, puis ajouté leur support et les composants de commande.",
            "ESP32-C3, module Bluetooth, plaque d’essai et application Dabble",
            "Propulsion par les roues arrière et direction des roues avant par servomoteur"
        ],
        "difficulty": "Le servomoteur d’origine était hors service. Son remplaçant était trop petit pour le support : j’ai adapté sa fixation avec un collier de serrage et stabilisé la plaque d’essai.",
        "skills": [
            4
        ],
        "contribution": "J’ai adapté la mécanique, le câblage et le code pour commander l’avance, le recul et la direction depuis mon téléphone en Bluetooth.",
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/robot-esp32-c3.pdf",
        "media": [
            {
                "src": "../assets/img/realisations/robot-esp32-vue-ensemble.webp",
                "alt": "Vue d’ensemble : support de batterie, plaque d’essai, câblage et mécanisme de direction."
            },
            {
                "src": "../assets/img/realisations/robot-esp32-mecanique.webp",
                "alt": "Détail du train avant : mécanisme de direction et implantation de la plaque d’essai."
            },
            {
                "src": "../assets/img/realisations/robot-esp32-cablage.webp",
                "alt": "Module de commande des moteurs : borniers et fils de liaison avec le montage."
            },
            {
                "src": "../assets/img/realisations/robot-esp32-carte.webp",
                "alt": "Carte de commande installée sur la plaque d’essai, avant le câblage."
            }
        ],
        "group": "Robotique & maintenance"
    },
    {
        "id": "robot-suiveur-ligne",
        "title": "Robot suiveur de ligne",
        "categories": [
            "Robotique"
        ],
        "technologies": [
            "Robotique",
            "Capteurs"
        ],
        "summary": "Construire un robot équipé de capteurs pour suivre une ligne noire sur un circuit.",
        "context": "Projet de section européenne mené avec des partenaires en Italie et en Serbie. Label national de qualité eTwinning obtenu le 16 juillet 2024 pour le projet « Ardubots RACE – Robotics Arduino Challenge in Europe », au lycée Saint-Cricq.",
        "objective": "Construire un robot équipé de capteurs pour suivre une ligne noire sur un circuit.",
        "steps": [
            "Détection de la ligne noire par des capteurs de suivi de ligne",
            "Commande des moteurs pour suivre le circuit"
        ],
        "difficulty": "",
        "skills": [
            4
        ],
        "contribution": "J’ai participé à la construction d’un robot capable de suivre une ligne noire.",
        "pdf": "label-national-qualite-etwinning-2024.pdf",
        "pdfExpected": "assets/docs/realisations/label-national-qualite-etwinning-2024.pdf",
        "group": "Robotique & maintenance",
        "media": [
            {
                "src": "../assets/img/realisations/robot-suiveur-ligne-circuit.webp",
                "alt": "Robot suiveur de ligne sur le circuit — extrait de la vidéo fournie."
            }
        ],
        "video": {
            "src": "../assets/videos/robot-suiveur-ligne-demonstration.mp4",
            "poster": "../assets/img/realisations/robot-suiveur-ligne-circuit.webp"
        },
        "pdfLabel": "Voir le label eTwinning (PDF)"
    },
    {
        "id": "maintenance-pc",
        "title": "Maintenance · Diagnostic de PC",
        "categories": [
            "Maintenance",
            "Systèmes"
        ],
        "technologies": [
            "Windows",
            "Linux",
            "Macrium",
            "Dual boot"
        ],
        "summary": "Diagnostiquer des pannes, réparer des postes et accompagner les utilisateurs.",
        "context": "Pratique au lycée et en stages chez InfoDirect et MatFormatique.",
        "objective": "Diagnostiquer des pannes, réparer des postes et accompagner les utilisateurs.",
        "steps": [
            "Installation de Windows et Linux, y compris en dual boot",
            "Clonage de disques avec Macrium",
            "Montage, démontage et nettoyage de PC fixes ; démontage de portables",
            "Fiches clients, suivi des interventions et conseil",
            "Clés USB bootables, paramètres BIOS/UEFI et vérification de l’état des disques."
        ],
        "contribution": "J’ai monté des ordinateurs et des configurations complètes en stage, installé des systèmes et pratiqué le clonage et la maintenance matérielle.",
        "difficulty": "",
        "skills": [
            2,
            6
        ],
        "pdf": "",
        "pdfExpected": "assets/docs/realisations/maintenance-pc.pdf",
        "status": "Travaux pratiques",
        "media": [
            {
                "src": "../assets/img/realisations/maintenance-pc-montage.webp",
                "alt": "Montage des composants dans un boîtier de PC"
            },
            {
                "src": "../assets/img/realisations/maintenance-pc-cablage.webp",
                "alt": "Câblage à l’arrière du boîtier"
            },
            {
                "src": "../assets/img/realisations/maintenance-pc-assemble.webp",
                "alt": "Configuration de PC montée en stage"
            },
            {
                "src": "../assets/img/realisations/maintenance-setup.webp",
                "alt": "Vue d’ensemble d’un poste monté en stage"
            }
        ],
        "group": "Robotique & maintenance"
    }
];
/* ===== AFFICHAGE ET INTERACTIONS ===== */
(() => {
    'use strict';
    const names = {
        1: 'Gérer le patrimoine informatique',
        2: 'Répondre aux incidents et aux demandes d’assistance et d’évolution',
        3: 'Développer la présence en ligne de l’organisation',
        4: 'Travailler en mode projet',
        5: 'Mettre à disposition des utilisateurs un service informatique',
        6: 'Organiser son développement professionnel'
    };
    const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    /* ===== TABLEAU DE SYNTHÈSE (MÊME SOURCE DE DONNÉES) ===== */
    const tbody = document.getElementById('competences-body');
    if (tbody) {
        projets.forEach((project) => {
            const row = document.createElement('tr');
            row.innerHTML = `<th scope="row"><a href="realisations.html#${project.id}">${escapeHTML(project.title)}</a></th>` + Object.keys(names).map((key) => `<td>${project.skills.includes(Number(key)) ? '<span class="check" aria-hidden="true">✓</span><span class="sr-only">Mobilisée</span>' : '<span aria-hidden="true">—</span><span class="sr-only">Non mobilisée</span>'}</td>`).join('');
            tbody.append(row);
        });
    }
    const grid = document.getElementById('projects-grid');
    const onCompetences = document.body.dataset.page === 'competences';
    if (!grid && !onCompetences) return;
    // Un seul composant et les mêmes données pour les deux pages.
    document.body.insertAdjacentHTML('beforeend', "<dialog id=\"project-dialog\" aria-labelledby=\"project-title\"><div class=\"dialog-bar\"><span class=\"eyebrow\">FICHE / RÉALISATION</span><button class=\"icon-button\" id=\"close-project\" type=\"button\" autofocus aria-label=\"Fermer la fiche du projet\">Fermer ×</button></div><div id=\"project-detail\" class=\"dialog-content\"></div></dialog><dialog id=\"gallery-dialog\" aria-label=\"Galerie de captures\"><div class=\"dialog-bar\"><button type=\"button\" class=\"icon-button\" data-gallery-prev aria-label=\"Image précédente\">←</button><span class=\"gallery-counter\"></span><button type=\"button\" class=\"icon-button\" data-gallery-next aria-label=\"Image suivante\">→</button><button type=\"button\" class=\"icon-button\" data-gallery-close>Fermer</button></div><figure><img class=\"gallery-large\" alt=\"\"><figcaption class=\"gallery-caption\"></figcaption></figure></dialog>");
    const dialog = document.getElementById('project-dialog');
    const detail = document.getElementById('project-detail');
    let opener = null, savedScroll = null, closing = false, closeTimer = null;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    function lockPage() {
        if (savedScroll) return;
        const body = document.body;
        savedScroll = {x: scrollX, y: scrollY, top: body.style.top, padding: body.style.paddingInlineEnd};
        const gap = Math.max(0, innerWidth - document.documentElement.clientWidth);
        const padding = parseFloat(getComputedStyle(body).paddingInlineEnd) || 0;
        body.style.top = '-' + savedScroll.y + 'px';
        body.style.paddingInlineEnd = (padding + gap) + 'px';
        body.classList.add('project-scroll-locked', 'modal-open');
    }
    function unlockPage() {
        if (!savedScroll) return;
        const position = savedScroll; savedScroll = null;
        document.body.classList.remove('project-scroll-locked', 'modal-open');
        document.body.style.top = position.top;
        document.body.style.paddingInlineEnd = position.padding;
        window.scrollTo({left: position.x, top: position.y, behavior: 'instant'});
    }
    function closeProject() {
        if (!dialog.open || closing) return;
        closing = true;
        if (reducedMotion.matches) { dialog.close(); return; }
        dialog.classList.add('is-closing');
        closeTimer = setTimeout(() => dialog.close(), 200);
    }
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches && closing) { clearTimeout(closeTimer); dialog.close(); }
    });
    /* ===== CARTES ET FILTRAGE ===== */
    function render(category = 'Tout') {
        const visible = projets.filter((project) => category === 'Tout' || project.categories.includes(category));
        grid.innerHTML = '';
        let previousGroup='';
        visible.forEach((project) => {
            if(project.group!==previousGroup){const heading=document.createElement('h2');heading.className='project-group-heading';heading.id='domaine-'+['Systèmes & services','Réseaux & cybersécurité','Web & bases de données','Robotique & maintenance'].indexOf(project.group);heading.textContent=project.group;grid.append(heading);previousGroup=project.group;}
            const card = document.createElement('article');
            card.className = 'card project-card';
            card.innerHTML = `<span class="eyebrow">${project.categories.map(escapeHTML).join(' / ')}</span><div class="project-icon" aria-hidden="true">${project.categories.includes('Sécurité') ? '[ / ]' : project.categories.includes('Web') ? '&lt;/&gt;' : '{ : }'}</div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.summary)}</p><div class="badges">${project.technologies.slice(0,4).map((tech) => `<span class="badge">${escapeHTML(tech)}</span>`).join('')}</div><button type="button" class="button small" data-project="${project.id}">Voir le projet<span class="sr-only"> : ${escapeHTML(project.title)}</span></button>`;
            if(project.media?.length){const photo=document.createElement('img');photo.className='project-cover';photo.src=project.media[0].src;photo.alt=project.media[0].alt;photo.loading='lazy';card.querySelector('.project-icon').replaceWith(photo);}
            if(project.status==='En cours d’apprentissage'){const status=document.createElement('span');status.className='badge';status.textContent=project.status;card.querySelector('h3').before(status);}
            if(project.id==='epicerie-du-monde'){const logo=document.createElement('img');logo.className='company-logo';logo.src='../assets/img/stages/epicerie-du-monde-logo.webp';logo.alt='Logo de l’Épicerie du monde';logo.width=64;logo.height=64;card.querySelector('.project-icon').replaceWith(logo);} grid.append(card);
        });
        document.getElementById('result-count').textContent = visible.length + (visible.length > 1 ? ' réalisations' : ' réalisation') + ' / ' + category;
    }
    document.querySelectorAll('[data-filter]').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
            render(button.dataset.filter);
        });
    });
    document.querySelectorAll('.domain-links a').forEach(link => link.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'Tout')));
        render('Tout');
    }));
    /* ===== DIALOGUE NATIF : FOCUS, ÉCHAP ET RETOUR ===== */
    function openProject(id, source = null) {
        const project = projets.find((item) => item.id === id);
        if (!project) return;
        opener = source || document.activeElement;
        detail.innerHTML = `<h2 id="project-title">${escapeHTML(project.title)}</h2><div class="badges">${project.technologies.map((tech) => `<span class="badge">${escapeHTML(tech)}</span>`).join('')}</div><h3>Contexte</h3><p>${escapeHTML(project.context)}</p><h3>Objectif</h3><p>${escapeHTML(project.objective)}</p><h3>Étapes et composants du projet</h3><ol>${project.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}</ol>${project.difficulty && !project.difficulty.startsWith('[À COMPLÉTER') && !project.difficulty.startsWith('Les difficultés rencontrées restent') ? `<h3>Difficultés et solutions</h3><p>${escapeHTML(project.difficulty)}</p>` : ''}${project.contribution && !project.contribution.startsWith('[À COMPLÉTER') ? `<h3>Ma contribution et les résultats</h3><p>${escapeHTML(project.contribution)}</p>` : ''}<h3>Compétences du Bloc 1</h3><ul>${project.skills.map((id) => `<li>${names[id]}</li>`).join('')}</ul><p class="notice">Retrouvez la correspondance complète avec le Bloc 1 sur la page Compétences.</p>`;
        if(project.video){const figure=document.createElement('figure');figure.className='project-video';figure.innerHTML=`<video controls playsinline preload="metadata" poster="${escapeHTML(project.video.poster)}" aria-label="Démonstration du robot suiveur de ligne"><source src="${escapeHTML(project.video.src)}" type="video/mp4"></video><figcaption>Démonstration du robot suiveur de ligne</figcaption>`;detail.append(figure);}
        if(project.media?.length){const gallery=document.createElement('div');gallery.className='project-media-grid';gallery.innerHTML=project.media.map(m=>`<figure><button class="gallery-trigger" type="button" data-gallery="${escapeHTML(m.src)}" aria-label="${escapeHTML(m.alt)}"><img src="${escapeHTML(m.src)}" alt="${escapeHTML(m.alt)}" loading="lazy"></button><figcaption>${escapeHTML(m.alt)}</figcaption></figure>`).join('');const heading=document.createElement('h3');heading.textContent='Photos du projet';detail.append(heading,gallery);}
        if (project.documentNote) { const note = document.createElement('p'); note.className = 'notice'; note.textContent = project.documentNote; detail.append(note); }
        if (project.pdf && /^[a-z0-9-]+\.pdf$/i.test(project.pdf)) {
            const link = document.createElement('a');
            link.className = 'button';
            link.href = '../assets/docs/realisations/' + project.pdf;
            link.target = '_blank'; link.rel = 'noopener noreferrer';
            link.textContent = project.pdfLabel || 'Ouvrir la documentation PDF';
            detail.append(link);
        }
        if (project.id === 'epicerie-du-monde') {
            const link = document.createElement('a'); link.className = 'button'; link.href = 'stages.html#stage-1'; link.textContent = 'Lire le bilan du stage'; detail.append(link);
        }
        closing = false; clearTimeout(closeTimer); dialog.classList.remove('is-closing');
        lockPage();
        if (!dialog.open) dialog.showModal();
        dialog.scrollTop = 0;
        if (!onCompetences) history.replaceState(history.state, '', '#' + project.id);
    }
    grid?.addEventListener('click', event => {
        const button = event.target.closest('[data-project]');
        if (button) openProject(button.dataset.project, button);
    });
    if (onCompetences) {
        document.addEventListener('click', event => {
            const link = event.target.closest('a[href]');
            if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            const target = new URL(link.href, location.href);
            if (target.origin !== location.origin || !target.pathname.endsWith('/realisations.html')) return;
            const id = target.hash.slice(1);
            if (!projets.some(project => project.id === id)) return;
            event.preventDefault(); openProject(id, link);
        });
        document.querySelectorAll('main a[href*="realisations.html#"]').forEach(link => {
            link.setAttribute('aria-haspopup', 'dialog'); link.setAttribute('aria-controls', 'project-dialog');
        });
    }
    document.getElementById('close-project').addEventListener('click', closeProject);
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const box = dialog.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeProject();
    });
    dialog.addEventListener('close', () => {
        clearTimeout(closeTimer); closing = false; dialog.classList.remove('is-closing');
        detail.querySelectorAll('video').forEach(video => video.pause());
        unlockPage();
        if (!onCompetences) history.replaceState(history.state, '', location.pathname + location.search);
        if (opener?.isConnected) opener.focus({preventScroll: true});
    });
    if (grid) {
        render();
        if (location.hash) openProject(location.hash.slice(1));
        window.addEventListener('hashchange', () => { if (location.hash) openProject(location.hash.slice(1)); });
    }
})();
