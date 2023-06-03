# API du projet chatbot

L'API implémentée est de type REST et permet les opérations CRUD accessibles par **POST**, **GET**, **PUT**, **DELETE**.

## Ressources

Les ressources manipulées à travers l'API sont :

- *bot* : robot avec laquelle une discussion est possible pourvu qu'au moins un cerveau (fichier RiverScript) lui est associé
- *user* : compte utilisateur
- *discussion* : message entre un utilisateur et un robot
- *riverScript* : fichier de type RiveScript

## Documentation

Pour générer la documentation développeur, exécutez la commande suivante dans le dossier "api" :
```shell
npm run jsdoc
```

La documentation développeur sera générée dans le dossier "api/docs".
