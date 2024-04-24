---
title: Installation de Quartz
draft: false
tags:
  - tutoriel
  - fr
  - github
date: 2024-04-14T15:45:30.123Z
---

Bonjour à tous !

Je vais vous présenter comment créer votre propre blog grâce à 2 outils : **Quartz** et **Github Pages**.

# Installation de Quartz en local

## NodeJS et Git

Pour le terminal, j'utilise une instance WSL sous Ubuntu 22.04.
Dans un premier temps, il est nécessaire d'avoir Git et NodeJS, étant donné que Quartz a besoin de Node et npm pour fonctionner :

```bash
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt install -y nodejs
sudo apt install git
```

## Téléchargement du template Quartz

Clonez le template pour Quartz sur la page Github de [jackyzha0](https://github.com/jackyzha0/quartz.git) :

```bash
sudo git clone https://github.com/jackyzha0/quartz.git
cd quartz
sudo npm i
sudo npx quartz create
```

Une fois cela fait, vous pouvez configurer votre Quartz dans le fichier `quartz.config.ts` :

```bash
nano quartz.config.ts
```

Beaucoup de choses peuvent être modifiables, mais celles-ci sont, pour moi, les plus importantes :

```json
pageTitle: "Blog de Matchag"
locale: "fr-FR"
baseUrl: "quartz.matchag.xyz"
```

Une fois cela fait, nous pouvons commencer le déploiement sur Github Pages !

# Déploiement sur Github Pages

## Création du repository

Dans un premier temps, si vous n'avez pas de compte Github, **créez en un**. Ensuite, créez un nouveau repository. Vous pouvez le nommer comme vous le souhaitez. Cependant, si vous n'avez pas de nom de domaine, privilégiez un nom dans ce format là : `USERNAME.github.io`.
Pour ma part, ayant un nom de domaine, je vais simplement le nommer `quartz`. Ne le **mettez pas** en privé, ne** créez pas** de fichier **README **ni de **.gitignore** et ne mettez pas de licence.

![[repository_name_quartz.png]]
![[repository_options.png]]

## Création du token

Allez ensuite dans les paramètres, et créez vous un token d'accès (tout en bas à gauche, dans `Developper Settings`, afin de vous pouvoir vous identifier par la suite. Le token doit avoir les droits sur les repository et sur les workflows :
![[token_options.png]]

Retournez dans votre terminal, allez à la racine de votre dossier Quartz et tapez les commandes suivantes, en remplaçant `REMOTE-URL` par votre URL de votre repository :

```bash
# liste les repository
git remote -v
# si le repository d'origine n'est pas le vôtre
git remote set-url origin REMOTE-URL
# si le repository d'upstream n'est pas celui de jackyzha0
git remote add upstream https://github.com/jackyzha0/quartz.git
```

Une fois cela fait, vous pouvez lancer la commande suivante, qui va servir de push initial à notre repository :

```bash
npx quartz sync --no-pull
```

Vous aurez un prompt vous demandant un identifiant et un mot de passe, l'identifiant correspond à votre **identifiant Github**, et le mot de passe au **token** que vous venez de créer.

Il faudra taper la commande suivante pour push les changements sur Github à chaque fois :

```bash
npx quartz sync
```

## Création du fichier deploy.yml

Créez un nouveau fichier `quartz/.github/workflows/deploy.yml` et complétez le de cette manière :
```yaml
name: Deploy Quartz site to GitHub Pages
 
on:
  push:
    branches:
      - v4
 
permissions:
  contents: read
  pages: write
  id-token: write
 
concurrency:
  group: "pages"
  cancel-in-progress: false
 
jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Fetch all history for git info
      - uses: actions/setup-node@v3
        with:
          node-version: 18.14
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: public
 
  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

Après cela, allez dans les options de votre repository et allez dans "Pages" et sélectionnez "Github Actions" dans "Source" :
![[source_github_pages.png]]

Vous pouvez également mettre votre domaine personnalisé si vous le souhaitez juste en dessous.

Une fois cela fait, retournez dans votre terminal et tapez :
```bash
npx quartz sync
```

Une fois tout cela fait, vous pouvez vous rendre sur l'URL de votre page Github, et voilà :
![[index_quartz.png]]

Pour ceux qui souhaitent utiliser Obsidian comme éditeur de texte pour vos pages Quartz, voyez ici comment configurer la [[Synchronisation entre Quartz et Obsidian]].
