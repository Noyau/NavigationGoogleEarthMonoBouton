
/****************************************
 * auteur  : Romain Fontaine
 * contact : romain.fontaine@etu.u-bordeaux1.fr
 ****************************************/
 
//////////////////////////////////////////////////////////// FONCTIONS DU PANNEAU DE COMMANDES
function PanneauCommandes() {}

PanneauCommandes.deselectionnerLesCommandes = function() {
	$(".commande").removeClass("commande-hover");
	$(".commande").removeClass("commande-retour-hover");
};

//////////////////////////////////////////////////////////// FONCTIONS DE MANIPULATION DES EVENEMENTS
function Bouton() {}

Bouton.delaiTempsMax = 800; // temps equivalent a 0.80s
Bouton.delaiTempsMin = 0; // - temps equivalent a 0.00s

Bouton.tempsActivation = 0;
Bouton.tempsEcoule = 0;

Bouton.estActive = false;

Bouton.activer = function(evenement) {
	var timestamp = evenement.timeStamp;

	if(!Bouton.estActive)
		Bouton.tempsActivation = timestamp;
	else
		Bouton.tempsEcoule = timestamp - Bouton.tempsActivation;

	Bouton.estActive = true;

	PanneauCommandes.afficherEtatChargement();
};
Bouton.desactiver = function(evenement) {
	Bouton.traiterAcquisition();

	Bouton.tempsActivation = 0;
	Bouton.tempsEcoule = 0;
	Bouton.estActive = false;

	PanneauCommandes.surlignerGroupeCourant();
	if(Arborescence.niveau == 1)
		PanneauCommandes.surlignerCommandeCourante();
	else
		PanneauCommandes.deselectionnerLesCommandes();
};

Bouton.capturerEvenements = function() {
	// Quand cela n'est pas necessaire, je n'utilise pas les fonctions de jQuery : ici la fonction "bind" n'est pas plus simple que ces deux lignes
	// En revanche, en ce qui concerne la selection des balises, dans les autres fonctions, les fonctions jQuery sont utiles et plus simples !
	document.addEventListener("keydown", Bouton.activer, false);
	document.addEventListener("keyup", Bouton.desactiver, false);
};

Bouton.traiterAcquisition = function() {
	var tpsEcoule = Bouton.tempsEcoule;
	var delaiMax = Bouton.delaiTempsMax;
	var delaiMin = Bouton.delaiTempsMin;
	var niveauArborescence = Arborescence.niveau;

	if(tpsEcoule >= delaiMax) {
		if(niveauArborescence == 0)
			Arborescence.incrementerNiveau();
		else if(niveauArborescence == 1)
			PanneauCommandes.activerCommande();
		else
			ControleMouvement.permuterDegresVariation();
	} else if(tpsEcoule >= delaiMin) {
		if(niveauArborescence == 0)
			 Arborescence.incrementerNumGroupe();
		else if(niveauArborescence == 1)
			Arborescence.incrementerNumCommande();
		else
			PanneauCommandes.desactiverCommande();
	}
};

//////////////////////////////////////////////////////////// MANIPULATION DE L'INDICATEUR VISUEL DE TEMPS
PanneauCommandes.afficherEtatChargement = function () {
	var idBaliseChargement = "#barre-chargement > span";
	var baliseChargement = $(idBaliseChargement);
	var progression = Bouton.tempsEcoule / Bouton.delaiTempsMax;

	var couleurs  = ["#b3d7ff", "#b5f777"];// "#ed2424"];
	var idCouleur = 0;

	if(progression >= 1.0) {
		progression = 1;
		idCouleur = 1;
	}

	var pourcentage = progression * 100;

	baliseChargement.css({
		"width" : pourcentage+"%",
		"background-color" : couleurs[idCouleur]
	});
};

//////////////////////////////////////////////////////////// FONCTIONS DE MANIPULATION DE LA COMMANDE COURANTE
PanneauCommandes.getCommandeCourante = function () {
	var commandeCourante = null;
	if(Arborescence.numGroupe == 0)
		commandeCourante = Commande.listeCommandesGroupeGlobe[Arborescence.numCommande];
	else
		commandeCourante = Commande.listeCommandesGroupeCamera[Arborescence.numCommande];
	return commandeCourante;
};
PanneauCommandes.getFonctionCommandeCourante = function() {
	return PanneauCommandes.getCommandeCourante().getFonction();
};

PanneauCommandes.surlignerGroupeCourant = function () {
	PanneauCommandes.deselectionnerLesCommandes();

	var idBalise = Arborescence.numGroupe == 0 ? "#com-groupe-globe" : "#com-groupe-camera";
	var balise = $(idBalise);

	$(".com-groupe").removeClass("com-groupe-hover");

	balise.addClass("com-groupe-hover");

	var idBaliseAffichageGroupe = "#page-commande-groupe";
	var baliseAffichageGroupe = $(idBaliseAffichageGroupe);

	var nomGroupe = balise.children("legend").html();
	if(baliseAffichageGroupe.html() != nomGroupe) {
		baliseAffichageGroupe.fadeOut(0);
		baliseAffichageGroupe.html(nomGroupe);
		baliseAffichageGroupe.fadeIn();
	}

	if(Arborescence.niveau == 0) {
		var idBaliseAideTextuelle = "#page-aide-textuelle";
		var baliseAideTextuelle = $(idBaliseAideTextuelle);
		var message = "Pour sélectionner un autre groupe de commandes <em>appuyez brièvement</em> sur une touche, pour valider et sélectionner une commande <em>maintenez la pression</em>.";
		if(baliseAideTextuelle.html() != message) {
			baliseAideTextuelle.fadeOut(0);
			baliseAideTextuelle.html(message);
			baliseAideTextuelle.fadeIn();
		}
	}
};
PanneauCommandes.surlignerCommandeCourante = function () {
	PanneauCommandes.getCommandeCourante().surligner();
};

//////////////////////////////////////////////////////////// FONCTIONS DE MODIFICATION DE POINT DE VUE
PanneauCommandes.activerCommande = function () {
	if(!ControleMouvement.estActif()) {
		var fonctionCommandeCourante = PanneauCommandes.getFonctionCommandeCourante();
		if(fonctionCommandeCourante != null) {
			ControleMouvement.demarrerCompteur(function() {
				fonctionCommandeCourante(GlobeInstance.globe);
			});
			Arborescence.incrementerNiveau();
			PanneauCommandes.surlignerCommandeCourante();
		} else {
			PanneauCommandes.desactiverCommande();
		}
	}
};
PanneauCommandes.desactiverCommande = function () {
	ControleMouvement.arreterCompteur();
	Arborescence.decrementerNiveau();
};