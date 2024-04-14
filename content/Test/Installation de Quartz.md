Dans un premier temps, on va installer Git et NodeJS, étant donné que Quartz a besoin de Node et npm pour fonctionner :

```bash
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt install -y nodejs
sudo apt install git
```

Ensuite, nous allons cloner le template pour quartz sur la page Github de jackyzha0 dans notre dossier /var/www :

```bash
sudo mkdir /var/www
sudo git clone https://github.com/jackyzha0/quartz.git
cd quartz
sudo npm i
sudo npx quartz create
```

Une fois cela fait, nous pouvons configurer notre Quartz dans le fichier `quartz.config.ts` :

```bash
nano quartz.config.ts
```

On pourra notamment modifier :

```json
pageTitle: "Blog de Matchag"
locale: "fr-FR"
baseUrl: "quartz.matchag.xyz"
```

Une fois cela fait, nous pouvons commencer le déploiement sur Github Pages !

Dans un premier temps, si vous n'avez pas de compte Github, créez en un. Ensuite, créez un nouveau repository. Vous pouvez le nommer comme vous le souhaitez. Cependant, si vous n'avez pas de nom de domaine, privilégiez un nom dans ce format là : `USERNAME.github.io`.
Pour ma part, ayant un nom de domaine, je vais simplement le nommer `quartz`. Mettez le en publique, ne créez pas de fichier README ni de .gitignore et ne mettez pas de licence.

![[Pasted image 20240414135932.png]]
![[Pasted image 20240414135943.png]]

Retournez dans votre terminal, allez à la racine de votre dossier Quartz et tapez les commandes suivantes, en remplaçant `REMOTE-URL` par votre URL de votre repository :

```bash
# liste les repository
git remote -v
# si le repository d'origine n'est pas le vôtre
git remote set-url origin REMOTE-URL
# si le repository d'upstream n'est pas celui de jackyzha0
git remote add upstream https://github.com/jackyzha0/quartz.git
```

Avant de passer à la suite, allez sur votre compte Github, dans les paramètres, et créez vous un token d'accès, afin de vous pouvoir vous identifier par la suite. Le token doit avoir les droits sur les repository et sur les workflows :
![[Pasted image 20240414140821.png]]

Une fois cela fait, vous pouvez lancer la commande suivante, qui va servir de push initial à notre repository :

```bash
npx quartz sync --no-pull
```

Vous aurez un prompt vous demandant un identifiant et un mot de passe, l'identifiant correspond à votre identifiant Github, et le mot de passe au token que vous venez de créer.

Si vous ne voulez pas host ceci sur une page Github, vous pouvez vous arrêter là. Il faudra cependant taper la commande suivante pour sauvegarder push les changements sur Github à chaque fois :

```bash
npx quartz sync
```

Pour ceux qui souhaitent déployer ça sur une page Github, voici la suite.

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
![[Pasted image 20240414141558.png]]

Vous pouvez également mettre votre domaine personnalisé si vous le souhaitez juste en dessous.

Une fois cela fait, retournez dans votre terminal et tapez :
```bash
npx quartz sync
```

Une fois tout cela fait, vous pouvez vous rendre sur l'URL de votre page Github, et voilà :
![[Pasted image 20240414142204.png]]

Pour synchroniser avec Obisidian et éviter de devoir taper la commande `npx quartz sync` tout le temps.

Dans un premier temps, dans votre Vault (créez en un juste pour Github si vous le souhaitez), installez le plugin "Git" :
![[Pasted image 20240414144338.png]]

Une fois cela fait, appuyer sur `CTRL + P` et cherchez `Git: clone an exisiting remote repo`.
La remote URL sera votre lien de votre repository, et ensuite écrivez le nom du dossier où vous souhaitez mettre le clone de votre repository.
Une fois cela fait, vous devrez redémarrer Obsidian, et votre clone sera dans votre Vault !
Tout ce que vous écrivez dans `content` sera affiché sur votre site.
Pour mettre à jour via Obsidian, vous pouvez faire `CTRL + P`, puis `Git: Commit all changes` puis `Git: Push`.

