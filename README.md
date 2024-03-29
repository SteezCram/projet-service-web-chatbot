# Projet Chatbot
Auteurs :
* Thomas Croizet
* Victor Dang

Bienvenue dans le projet Chatbot ! Ce service web vous permet de gérer et d'utiliser des chatbots en utilisant la puissante technologie RiveScript. Le projet est composé de deux dossiers : "api" et "website". Le dossier "api" contient l'API du site, écrit en Node.js, tandis que le dossier "website" contient le site web développé avec Nuxt.js.

## Description
Le projet Chatbot offre une plateforme complète pour la gestion des chatbots. Vous pouvez créer, modifier et supprimer des chatbots, ainsi que déployer des chatbots fonctionnant avec la technologie RiveScript. RiveScript est un langage de script simple mais puissant pour la création de chatbots intelligents.
Installation

Pour installer et exécuter le projet Chatbot sur votre machine locale, veuillez suivre les étapes suivantes :

Assurez-vous que vous avez Node.js installé sur votre système. Vous pouvez le télécharger à partir du site officiel de Node.js : https://nodejs.org

Clonez ce dépôt GitHub en utilisant la commande suivante :

```shell
git clone <lien du dépôt>
```
Accédez au dossier racine du projet :
```shell
cd projet-chatbot
```

Installez les dépendances du projet en exécutant les commandes suivantes dans les dossiers "api" et "website" :
```shell
cd api
npm install
```

```shell
cd ../website
npm install
```

### Documentation développeur
Pour générer la documentation développeur, exécutez la commande suivante dans le dossier "api" :
```shell
npm run jsdoc
```

La documentation développeur sera générée dans le dossier "api/docs".

### Lancement du projet
Pour lancer le projet Chatbot sur votre machine locale, suivez ces étapes :
Lancer l'API

Accédez au dossier "api" et exécutez la commande suivante pour lancer l'API à l'aide de Nodemon :
```shell
npm run nodemon
```

L'API du site sera démarrée et sera disponible à l'adresse : http://localhost:3001

Lancer le site web

Accédez au dossier "website" et exécutez la commande suivante pour lancer le site web :
```shell
npm run dev
```

Le site web du projet Chatbot sera démarré et sera accessible à l'adresse : http://localhost:3000.

## Documentation
Voici les différents identifiants pour se connecter au site : 
* Administrateur : 
    * Identifiant : admin@test.com
    * Mot de passe : test
* Utilisateur :
    * Identifiant : test@test.com
    * Mot de passe : test

Des contraintes ont été ajoutées au niveau de la base de données sous forme de clés étrangères pour les discussions. Si un utilisateur est supprimé toutes ses discussions le sont aussi. De même pour un bot.

## Technologies utilisées
* Node.js
* Nuxt3
* SQLite
* RiveScript
* Tailwind
* Flowbite