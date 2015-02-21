
/****************************************
 * auteur  : Romain Fontaine
 * contact : romain.fontaine@etu.u-bordeaux1.fr
 ****************************************/
 
//////////////////////////////////////////////////////////// FONCTIONS DE MANIPULATION DES COMMANDES
function Commande(numGroupe, numCommande, titre, details, fonction) {
	var titre = titre;
	var details = details;
	var fonction = fonction;

	var identifiant = "com-"+numGroupe+"-"+numCommande;

	this.creerBalise = function() {
		var baliseDebut = "<li class=\"commande "+identifiant+"\">";
		var baliseFin = "</li>";
		var baliseTitre = "<h1>"+titre+"</h1>";
		var baliseDetails = "<blockquote>"+details+"</blockquote>";

		return baliseDebut+baliseTitre+baliseDetails+baliseFin;
	};

	this.getTitre = function() {
		return titre;
	};
	this.getDetails = function() {
		return details;
	};
	this.getFonction = function() {
		return fonction;
	};

	this.getIdentifiant = function() {
		return identifiant;
	};

	this.surligner = function() {
		PanneauCommandes.deselectionnerLesCommandes();
		
		if(Arborescence.numCommande == Arborescence.numCommandeMax[Arborescence.numGroupe])
			$("."+this.getIdentifiant()).addClass("commande-retour-hover");
		else
			$("."+this.getIdentifiant()).addClass("commande-hover");

		var baliseAideTextuelle = $("#page-aide-textuelle");
		var aideTextuelle = this.getDetails();

		if(Arborescence.niveau >= 2)
			aideTextuelle += "<br>Pour désactiver la commande et revenir en arrière <em>appuyez brièvement</em> sur une touche, pour changer de sens <em>maintenez la pression</em>.";
		else if(Arborescence.niveau == 1)
			aideTextuelle += "<br>Pour passer à la commande suivante <em>appuyez brièvement</em> sur une touche, pour activer la commande <em>maintenez la pression</em>.";
	
		if(baliseAideTextuelle.html() != aideTextuelle) {
			baliseAideTextuelle.fadeOut(0);
			baliseAideTextuelle.html(aideTextuelle);
			baliseAideTextuelle.fadeIn();
		}
	};
}

Commande.listeCommandesGroupeGlobe = [
	new Commande(0, 0, "axe vertical", "Rotation autour de l'axe vertical.", Globe.deplacementLongitude),
	new Commande(0, 1, "axe horizontal", "Rotation autour de l'axe horizontal.", Globe.deplacementLatitude),
	new Commande(0, 2, "retour", "Revenir en arrière dans le panneau de commandes.", null)
];
Commande.listeCommandesGroupeCamera = [
	new Commande(1, 0, "inclinaison", "Inclinaison de la caméra.", Camera.inclinaison),
	new Commande(1, 1, "rotation", "Rotation de la caméra sur elle-même.", Camera.rotation),
	new Commande(1, 2, "loupe", "Modification de l'alitude de la caméra (agrandissement).", Camera.loupe),
	new Commande(1, 3, "retour", "Revenir en arrière dans le panneau de commandes.", null)
];