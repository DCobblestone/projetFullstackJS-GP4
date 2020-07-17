# projetFullstackJS-GP4
Projet FullStack JS  
Groupe 4 : PROUDHOM Bastien - LEVECQ Pauline

# Descriptif général

L'application proposée ici est un wiki développé en NodeJS pour une base de données MongoDB pour la partie back, et en React pour la partie front. 

L'application est accessible à l'adresse http://localhost:3000.
Elle fait appel à l'API http://localhost:8000

Tous les appels sont construits sur cette URL, à laquelle vient s'ajouter le chemin spécifique de l'action souhaitée.  
Exemple : http://localhost:8000/articles

Cette API suit une architecture REST et implémente différentes méthodes HTTP :
* GET
* POST
* PUT
* DELETE 

## Formats de données

Les différents points d'entrée de l'API attendent et renvoient des données formatées en JSON. Cela est reflété dans les entêtes HTTP utilisant le content-type ```application/json```.

## Statut du retour

Chaque interaction avec l'API renvoie un code spécifique permettant d'évaluer la réussite ou l'échec de la requête envoyée. Lorsque la requête est validée avec succès, elle reviendra avec le code 200. En cas d'erreur, l'API renverra le message d'erreur expliquant l'origine de l'erreur.

# Descriptif des fonctionnalités développées

L'application permet la gestion d'articles, ainsi que leur catégorisation. Ainsi, vous pouvez réaliser les actions suivantes :
* **Ajouter** un article
* **Supprimer** un article
* **Modifier** un article
  
Un système de **versionning** a été implémenté. Chaque version de l'article est sauvegardée en base, et peut être consultée depuis l'application. Il est également possible de restaurer une version précédente, tout en conservant l'historique de modifications effectuées depuis. À cette fin, la version restaurée est considérée comme une nouvelle version du document, permettant ainsi de conserver l'intégralité de l'historique du document et les différents états par lequel il est passé. 
  
Lors de l'ajout ou de la modification d'un article, il vous est possible de lui attribuer une **catégorie**. Chaque catégorie a sa page dédiée permettant de retrouver les différents articles qu'elle contient.  
Il vous est également possible d'attribuer des **tags** à votre article. Plusieurs tags peuvent être renseignés pour le même article. Vous devez pour cela les séparer d'une virgule lors de l'édition ou de la modification de l'article.

Un **formulaire de recherche** vous permet de retrouver les articles par titre et par tag, indifféremment. Ce formulaire ne prend pas la casse en considération, et admet les recherches partielles (ex: "pre" pour "premier" ou "science" pour "sciences")

# Manuel d'installation

Prérequis :
* Avoir node d'installé sur la machine
* Avoir mongodb d'installé et une connection paramétrée sur localhost:27017

A l'ouverture du projet :
* ```cd back``` // Aller dans le dossier back
* ```npm install``` // Installer les dépendances
* ```nodemon index.js``` // Lancer le serveur : la console doit afficher "Le serveur tourne sur l'adresse : http://localhost:8000"  
 

* ```cd front``` // Aller dans le dossier front
* ```npm install``` // Installer les dépendances
* ```npm start``` // Lancement du projet React : votre navigateur doit s'ouvrir à l'adresse : http://localhost:3000

Initialisation de la base de données :
* Rendez-vous depuis votre navigateur à l'adresse : http://localhost:8000/setup  
Ceci va créer les collections et insérer les données de départ dans votre base de données.

# Documentation API

| HTTP Method |            URI           |                    Opération CRUD                    |
|:-----------:|:------------------------:|:----------------------------------------------------:|
|     GET     |         /articles        |                       Read all                       |
|     GET     |       /article/:id       |                        get(id)                       |
|    DELETE   |       /article/:id       |                      Delete one                      |
|     POST    |         /article         | Create(titre, contenu, tag, datePublication, auteur) |
|     PUT     |         /article         | Update(titre, contenu, tag, datePublication, auteur) |
|     POST    |     /article/search      |                  Find(titre or tag)                  |
|     GET     |        /categories       |                       Read all                       |
|     PUT     |        /categorie        |                Add article to category               |
|     GET     | /categorie/:nomCategorie |       Get all articles belonging to a category       |
    

