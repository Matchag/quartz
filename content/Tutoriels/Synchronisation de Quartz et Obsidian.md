---
title: Synchronisation de Quartz et Obsidian
draft: false
tags:
  - tutoriel
  - fr
  - obsidian
  - github
---
Avant toute chose, en suivant ce tutoriel, je considère que vous avez installé et configuré Quartz localement et qu'il est déployé sur une page Github, si ce n'est pas le cas, voyez [ce tutoriel](Installation de Quartz).

Pour synchroniser avec Obisidian et éviter de devoir taper la commande `npx quartz sync` tout le temps, vous pouvez installer le plugin `Git` dans votre Vault :
![[git_obsidian_plugin.png]]

Une fois cela fait, appuyer sur `CTRL + P` et cherchez `Git: clone an exisiting remote repo` :
- La remote URL sera votre lien de votre repository Github
- Écrivez le nom du dossier **local** où vous souhaitez mettre le clone de votre repository dans votre Vault Obsidian

Une fois cela fait, vous devrez redémarrer Obsidian, et votre clone sera dans votre Vault !

Tout ce que vous écrivez dans `content` sera affiché sur votre site.
Pour mettre à jour Quartz via Obsidian, vous pouvez faire `CTRL + P`, puis `Git: Commit all changes` puis `Git: Push`.

>[!tip]
> Vous pouvez créer des raccourcis de touches pour ces commandes en allant dans les paramètres d'Obsidian directement.