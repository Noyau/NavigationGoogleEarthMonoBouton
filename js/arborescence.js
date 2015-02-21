
/****************************************
 * auteur  : Romain Fontaine
 * contact : romain.fontaine@etu.u-bordeaux1.fr
 ****************************************/
 
//////////////////////////////////////////////////////////// FONCTIONS DE MANIPULATION DE L'ARBORESCENCE
function Arborescence() {}

Arborescence.niveau = 0;
/*
 * 0 : niveau de selection du groupe
 * 1 : niveau de selection de la commande
 * 2 : commande en cours d'execution
 */
Arborescence.niveauMax = 2;
Arborescence.incrementerNiveau = function() {
	if(++Arborescence.niveau > Arborescence.niveauMax)
		Arborescence.niveau = Arborescence.niveauMax;
};
Arborescence.decrementerNiveau = function() {
	if(--Arborescence.niveau < 0)
		Arborescence.niveau = 0;
};

Arborescence.numGroupe = 0;
/*
 * 0 : commandes de manipulation du globe
 * 1 : commandes de manipulation de la camera
 */
 Arborescence.numGroupeMax = 1;
 Arborescence.incrementerNumGroupe = function() {
 	if(++Arborescence.numGroupe > Arborescence.numGroupeMax)
 		Arborescence.numGroupe = 0;
 	Arborescence.numCommande = 0;
 };

 Arborescence.numCommande = 0;
 Arborescence.numCommandeMax = [2, 3];
 Arborescence.incrementerNumCommande = function() {
 	if(++Arborescence.numCommande > Arborescence.numCommandeMax[Arborescence.numGroupe])
 		Arborescence.numCommande = 0;
 };