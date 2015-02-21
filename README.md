# NavigationGoogleEarthMonoBouton
Code réalisé lors d'un stage. L'objectif était de réaliser une interface de navigation pour le plug-in Google Earth, avec la contrainte de n'utiliser qu'un seul bouton

------------------------------------------------------------------------------------

Auteur  : Fontaine Romain<br/>
Contact : romain.fontaine@etu.u-bordeaux.fr

Projet : Google Earth - navigation avec un seul bouton<br/>
Technologie : HTML/CSS et Javascript

./css/<br/>
Contient : toutes les feuilles de styles de l'application.

./js/<br/>
Contient : tous les scripts répartis en modules nécessaires à l'application.

./js/jquery<br/>
Contient : la bibliothèque (js) de jQuery nécessaire à l'application.
note : placée ici de manière à ce que le navigateur prenne moins de temps à la charger via la connexion internet, et pour qu'elle soit disponible hors ligne.

./<br/>
Contient :
- index.html : la "page d'accueil", une description sommaire de l'application (n'est pas obligatoire).
- appli.html : l'application par elle-même, écrite en HTML/CSS et définit la structure de l'application ainsi que le script d'initialisation.


note : l'API Google Earth nécessite une connexion internet pour pouvoir être chargée, cela dit il semble qu'après chargement elle doit subsister dans le cache du navigateur, ce qui permettrait donc après un premier chargement que l'application soit disponible hors ligne.
[source - dernier accès le 21/02/2015](https://support.google.com/earth/answer/21423)

notes :
- le plugin Google Earth est distribué pour Windows et Mac OS X 10.4+.
- application testée et fonctionne sur les navigateurs Google Chrome (v20.0.xxx) et Firefox (v13.0.x).
- application incompatible avec le navigateur Internet Explorer 8...

Navigateur conseillé : Google Chrome
