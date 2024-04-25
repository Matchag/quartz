---
title: Découverte de CISO Assistant
draft: false
tags:
  - outils
  - fr
  - cybersécurité
  - gouvernance
  - blue team
date: 2024-04-24T15:45:30.123Z
---
Bonjour à tous !

Aujourd'hui, j'ai envie de vous faire découvrir un outil que j'ai trouvé très utile pour les sujets de gouvernance : **CISO Assistant**.

# Présentation de l'outil

**[CISO Assistant](https://github.com/intuitem/ciso-assistant-community)** est un outil développé par [Intuitem](https://intuitem.com/), une société **française** de cybersécurité.

C'est un outil open-source disponible en auto-hébergement très facilement : il suffit de cloner le dépôt Github et de lancer le script `docker-compose.sh`. Une fois cela fait, juste à lancer un `docker compose up -d` si on doit relancer les containers et l'outil est prêt !

Une fois déployé, il va nous aider à mettre en place des analyses de risques, des choses à mettre en conformité vis-à-vis de certaines normes (ISO, NIS2, RGPD, etc...). À l'heure où j'écris cet article, il peut prendre en charge pas moins de 30 référentiels de cybersécurité !

# Création de notre première mise en conformité

Une fois l'outil installé, nous arrivons devant ce tableau de bord :
![[dashboard_empty.png]]

Pour le moment, tout est vide, mais nous allons le remplir assez vite !

Commençons par créer notre première mise en conformité. 

Dans un premier temps, il faut créer ce que l'outil appelle un `folder`, autrement dit, un domaine. Dans le menu à gauche, il faudra aller dans `Organization > Domains` :
![[organization_domains.png]]
Puis `Add domain`. Pour cette exemple, je vais lui donner le nom IT.
