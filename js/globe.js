
/****************************************
 * auteur  : Romain Fontaine
 * contact : romain.fontaine@etu.u-bordeaux1.fr
 ****************************************/
 
//////////////////////////////////////////////////////////// CHARGER LE PLUGIN
google.load("earth", "1");

//////////////////////////////////////////////////////////// FONCTIONS DE MANÏPULATION DU GLOBE
function GlobeInstance() {}

GlobeInstance.idBaliseGlobe = "page-contenu-globe"; // <!> sans le "#" <!>
GlobeInstance.globe = null;

GlobeInstance.creer = function() {
	google.earth.createInstance(GlobeInstance.idBaliseGlobe, GlobeInstance.initialiser, GlobeInstance.afficherErreur);
};

GlobeInstance.initialiser = function(instance) {
	GlobeInstance.globe = instance;

	var globe = GlobeInstance.globe;

	var fenetre = globe.getWindow();
	var options = globe.getOptions();
	var vue = globe.getView();
	var camera = vue.copyAsCamera(globe.ALTITUDE_ABSOLUTE);

	fenetre.setVisibility(true);
	fenetre.blur();

	options.setFlyToSpeed(globe.SPEED_TELEPORT);

	camera.setAltitude(Globe.altitudeBase);
	camera.setLatitude(Globe.latitudeBase);
	camera.setLongitude(Globe.longitudeBase);

	vue.setAbstractView(camera);
};

GlobeInstance.idBaliseErreur = "#page-erreur";
GlobeInstance.afficherErreur = function(codeErreur) {
	var message = "Chargement du plugin Google Earth impossible.";
	var baliseErreur = $(GlobeInstance.idBaliseErreur);
	if(baliseErreur.html() != message) {
		baliseErreur.fadeOut(0);
		baliseErreur.html(message);
		baliseErreur.fadeIn();
	}
};

google.setOnLoadCallback(GlobeInstance.creer);