# UI Rebuild Execution Spec

## Probleme percu actuel
- L'ecran reste lisible comme un dashboard recompose.
- Le haut de page ressemble encore a une vitrine interne avec resume support.
- Le contexte source est duplique au lieu d'etre integre a l'entree de travail.
- Les surfaces metier restent trop proches de panneaux paralleles.
- La couche future produit attire inutilement l'attention.

## Cible perceptive
- Le premier ecran doit ressembler a un poste de travail Central Parc Immo.
- L'entree doit orienter vers l'action du jour en quelques secondes.
- Les dossiers, relances et priorites doivent dominer le regard.
- La couche support doit aider sans rivaliser avec la zone de traitement.

## Invariants a preserver
- Aucun changement aux contrats de donnees source-driven.
- Aucun changement au contrat des filtres `Pole / Suivi`.
- Aucun ajout de nouvelle dimension metier.
- Aucun scope assistant ou recherche intelligente en implementation reelle.
- Les fallback runtime et la robustesse sur donnees incompletes restent en place.

## Elements a supprimer ou fusionner
- Supprimer le bloc visible `Acces rapides` et toute promesse produit equivalente sur le premier ecran.
- Supprimer la duplication du bloc `Etat des donnees`.
- Fusionner orientation, contexte actif et etat source minimal dans une seule entree compacte.
- Refaire la couche metier pour eviter l'effet `cartes voisines` ou `widgets jumeaux`.

## Refus explicites
- Ne plus traiter la refonte comme un simple travail de topbar, accents ou copy.
- Ne plus garder deux couches de contexte source.
- Ne plus empiler des sections homogenes qui recréent visuellement un dashboard.
- Ne plus faire d'espace futur produit qui vole l'attention a l'usage actuel.

## Preuves visuelles attendues
- Le haut de page ressemble a une zone de mise au travail, pas a un hero.
- Une seule zone `Etat des donnees` est visible.
- Aucun bloc `Acces rapides`, `Recherche documentaire` ou `Assistant metier` n'apparait.
- La lecture du centre de page tombe d'abord sur les priorites, dossiers et relances.
- La couche support est compacte et clairement secondaire sur desktop comme sur mobile.

## Criteres d'acceptation
1. L'entree de page ne ressemble plus a une landing interne.
2. Le centre de gravite visuel est la file de travail metier.
3. Le support n'est plus duplique ni trop dominant.
4. Aucun placeholder futur produit n'attire l'attention sur l'ecran principal.
5. Les tests, build, typecheck et verifications navigateur restent verts.
