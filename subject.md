# projetFullstackJS-GP4
Projet FullStack JS - Group 4 : PROUDHOM Bastien - LEVECQ Pauline

# Sujet 

## Contexte
Dans ce projet vous devrez créer une application web en Fullstack JS.La partie back devra se faire en NodeJS et MongoDB. La partie Front sous React.Le projet se fait par groupe de 2, vous travaillerez sur Github et vous devrez nous donner l’url de votre projet comme remise de devoir.

## Sujet
Vous êtes chargés de créer un outil de travail collaboratif permettant la création, la modification et l’illustration de pages web dans une structure centralisée -aussi nommé un Wiki ;)
Vous devez gérer à minima :
   * l’ajout, la modification, la suppression d’articles  
   * La catégorisation des articles (Ex: faire une page qui centralise toutes les catégories et afficherla liste des articles correspondants au clic de celle-ci)  
   * La possibilité de rajouter des tags sur les articles  
   * La recherche d’articles (par tag, par titre)  
   * Le versionning : historisation des versions d’un article, restauration de version

## Documentation
Vous devrez dans un premier temps définir le contrat d’interface entre le back-office et le front-office et vous le reseignerez dans le README.md de votre projet git
Ce fichier readme servira de documentation au projet.  
La documentation doit contenir plusieurs points :  
   * Descriptif général  
   * Descriptif des fonctionnalités développées  
   * Manuel d’installation  
   * Documentation API  

## Back-office
Le back-office devra être réalisé en Node.js. Les données seront enregistrées dans une base mongoDB. Par défaut la base sera vide, Vous pouvez prévoir une api qui effectuera un traitement pour l’initialiser.  
    par exemple : ```GET /api/v1/setup```   
La documentation devra préciser comment initialiser le projet.  Vous êtes libre sur la structure documentaire à utiliser pour arriver à vos fins.

## Front-office
Le front devra être réalisé avec React. Vous devrez réaliser différents composants pour faire votre interface.Vous pouvez utiliser Axios (à installer) ou fetch (nativement inclus avec React) pour requêter l’api.

## Barème d’évaluation
   * Documentation (3 pts)
   * Design et ergonomie (3 pts)
   * Back-office (7 pts)
   * Front-office (7 pts)
