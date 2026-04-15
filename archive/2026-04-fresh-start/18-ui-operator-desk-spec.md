# UI Operator Desk Spec

## Probleme percu actuel
- Les passes precedentes polissaient encore une grammaire de dashboard.
- Le premier ecran ne servait pas assez clairement de reprise du travail quotidien.
- Les sujets, dossiers et relances restaient juxtaposes au lieu de former une file continue.
- Le detail d'un sujet n'etait pas assez central pour donner l'impression d'un vrai outil operateur.

## Cible perceptive
- Le premier ecran doit ressembler a un bureau operateur Central Parc Immo.
- La page doit se lire comme une inbox maitre avec detail persistant, pas comme un overview.
- La file de travail doit etre le centre visuel et interactionnel.
- Le shell doit rester personnel et credible pour un usage agence compte par compte.

## Invariants
- Aucun changement au contrat externe de `buildDashboardViewModel`.
- Aucun changement aux filtres `Pole / Suivi`.
- Aucun ajout de nouvelle dimension metier.
- Aucun scope assistant, recherche intelligente, ou authentification reelle dans cette passe.

## Decisions de structure
- Une colonne de travail dominante regroupe priorites, dossiers et relances.
- Un panneau de detail persistant contextualise l'element actif.
- Les identifiants de selection sont distincts par famille metier pour eviter les collisions entre priorites, dossiers et relances.
- Les indicateurs, l'activite recente et le repere comptable vivent en soutien dans le detail au lieu de definir la page.

## Signaux attendus
- Presence d'une file de travail centrale explicite.
- Presence d'un detail persistant qui change vraiment quand on selectionne un item.
- Presence d'un shell personnel Central Parc Immo.
- Absence de duplication du contexte source et absence de colonne KPI dominante.

## Refus explicites
- Pas de retour a une pile de cartes overview.
- Pas de collision de selection entre groupes metier.
- Pas de bloc support qui prenne visuellement le dessus sur la file.
- Pas de faux statut "termine" tant que la qualite percue reste trop austere ou trop dashboard.
