# Sources des schémas

## Informations retrouvées

- **NetVision** : deux contrôleurs Windows Server 2025, SRV-DC1 et SRV-DC2, domaine netvision.lan, client Windows 11, VirtualBox, AD/DNS/DHCP/DFS/GPO. Les adresses 172.31.3.49 et 172.31.3.62 ont été retrouvées dans les échanges antérieurs comme adresses des deux contrôleurs. Aucune plage DHCP ou adresse de client n’a été ajoutée.
- **AP FRUIT** : le PDF fourni et la fiche décrivent la succession réseau de la salle, pfSense externe, DMZ, pfSense interne, LAN. Le serveur web public est en DMZ ; le web interne, DNS et le poste Windows 11 sont dans le LAN. Le schéma reste sans adresse IP pour présenter les zones sans reprendre les exemples de configuration du document.
- **TP01** : les descriptions fournies indiquent un routeur Debian à deux interfaces, Windows Server 2025 avec Active Directory, un client Windows 11 et un serveur Debian 13. Aucun plan d’adressage confirmé n’a été retrouvé.

## Schémas tirés uniquement des fiches

- **pfSense** : WAN, LAN, DMZ, Debian/Apache en DMZ, Windows 11 et VM Kali. La position réseau de Kali n’étant pas précisée, elle apparaît séparément comme composant de test.
- **Audit Kali** : Kali, Nmap, VM cible, recherche de CVE avec searchsploit. Le schéma décrit la démarche, pas une exploitation réussie ni un réseau inventé.
- **Serveur Debian en DMZ** : pfSense, Debian 13 en DMZ et services Apache/SSH/vsftpd.
- **LIVRIO et pile LEMP** : Proxmox, VM Debian, NGINX/PHP-FPM/MariaDB, HTTPS avec OpenSSL. Les blocs représentent les composants d’une même pile, pas plusieurs serveurs distincts.
- **NAS personnel** : OpenMediaVault, SSD pour le système et HDD pour le stockage. Aucune réplication, sauvegarde ou configuration RAID n’a été ajoutée.
- **MyCloud/Proxmox** : aucun plan autonome confirmé retrouvé. Pas de nouvelle fiche ni de nouvelle topologie créée.

## Visuels des cartes

Les logos sont les SVG déjà fournis dans assets/icons/outils/. Les photos existantes des robots et de maintenance sont conservées. Lorsqu’aucun logo correspondant n’est fourni (notamment OpenMediaVault, Fedora, Python/SQL et le CTF), la carte affiche les noms des technologies plutôt qu’un logo d’un autre produit.

Les trois projets phares et leurs fiches utilisent la même fonction SVG dans js/realisations.js. Les couleurs proviennent des variables existantes. Les schémas sont des synthèses, pas des captures ni des preuves d’exécution.
