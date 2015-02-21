
/****************************************
 * auteur  : Romain Fontaine
 * contact : romain.fontaine@etu.u-bordeaux1.fr
 ****************************************/
 
//////////////////////////////////////////////////////////// VARIABLES GLOBALES
function ControleMouvement() {}

ControleMouvement.degresVariationPositif =  0.0005;
ControleMouvement.degresVariationNegatif = -0.0005;
ControleMouvement.degresVariation = ControleMouvement.degresVariationPositif;
ControleMouvement.permuterDegresVariation = function() {
	if(ControleMouvement.degresVariation == ControleMouvement.degresVariationPositif)
		ControleMouvement.degresVariation = ControleMouvement.degresVariationNegatif;
	else
		ControleMouvement.degresVariation = ControleMouvement.degresVariationPositif;
};

// ControleMouvement.axeVertical = 0;
// ControleMouvement.axeHorizontal = 1;
// ControleMouvement.axeVariation = ControleMouvement.axeVertical;
// ControleMouvementpermuterAxeVariation = function() {
// 	if(ControleMouvement.axeVariation == ControleMouvement.axeVertical)
// 		ControleMouvement.axeVariation = ControleMouvement.axeHorizontal;
// 	else
// 		ControleMouvement.axeVariation = ControleMouvement.axeVertical;
// };

ControleMouvement.delaiRepetition = 20; // definit une repetition toutes les 0.02s

ControleMouvement.compteur = null; // compteur necessaire a la repetition de la fonction de manipulation du globe/camera
ControleMouvement.estActif = function() {
	return ControleMouvement.compteur != null;
};
ControleMouvement.demarrerCompteur = function(fonction) {
	ControleMouvement.compteur = setInterval(fonction, ControleMouvement.delaiRepetition);
};
ControleMouvement.arreterCompteur = function() {
	clearInterval(ControleMouvement.compteur);
	ControleMouvement.compteur = null;
};

//////////////////////////////////////////////////////////// FONCTIONS DE MANIPULATION DU GLOBE
function Globe() {}

Globe.latitudeBase  = 44.802614;
Globe.longitudeBase = -0.5880540000000565;
Globe.altitudeBase  = 10000000;

Globe.deplacementLatitude = function(globe) {
	var vue = globe.getView();
	var camera = vue.copyAsCamera(globe.ALTITUDE_ABSOLUTE);
	var latitude = camera.getLatitude();

	var degres = 360 * ControleMouvement.degresVariation * camera.getAltitude()/Globe.altitudeBase;

	latitude += degres;

	if(latitude >= 90)
		latitude =  90 - Math.abs(degres);
	else if(latitude <= -90)
		latitude = -90 + Math.abs(degres);

	camera.setLatitude(latitude);
	vue.setAbstractView(camera);
};
Globe.deplacementLongitude = function(globe) {
	var vue = globe.getView();
	var camera = vue.copyAsCamera(globe.ALTITUDE_ABSOLUTE);
	var longitude = camera.getLongitude();

	var degres = 360 * ControleMouvement.degresVariation * camera.getAltitude()/Globe.altitudeBase;

	longitude += degres;

	if(longitude <= -180)
		longitude = 180 - Math.abs(degres);

	camera.setLongitude(longitude);
	vue.setAbstractView(camera);
};

// Globe.rotation = function(globe) {
// 	if(ControleMouvement.axeVariation == 0)
// 		Globe.deplacementLongitude(globe);
// 	else
// 		Globe.deplacementLatitude(globe);
// };

//////////////////////////////////////////////////////////// FONCTIONS DE MANIPULATION DE LA CAMERA
function Camera() {}

Camera.rotation = function(globe) {
	var vue = globe.getView();
	var camera = vue.copyAsCamera(globe.ALTITUDE_ABSOLUTE);
	var angle = camera.getRoll();

	var degres = 360 * ControleMouvement.degresVariation;

	angle += degres;

	camera.setRoll(angle);
	vue.setAbstractView(camera);
};
Camera.inclinaison = function(globe) {
	var vue = globe.getView();
	var camera = vue.copyAsCamera(globe.ALTITUDE_ABSOLUTE);
	var inclinaison = camera.getTilt();

	var degres = 360 * ControleMouvement.degresVariation;

	inclinaison += degres;

	camera.setTilt(inclinaison);
	vue.setAbstractView(camera);
};
Camera.loupe = function(globe) {
	var vue = globe.getView();
	var camera = vue.copyAsCamera(globe.ALTITUDE_ABSOLUTE);
	var altitude = camera.getAltitude();

	var degres = altitude * ControleMouvement.degresVariation * 10 * -1;

	altitude += degres;

	camera.setAltitude(altitude);
	vue.setAbstractView(camera);
};