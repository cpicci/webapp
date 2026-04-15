# UI Personal Shell Spec

## Probleme percu actuel
- L'interface reste trop anonyme et trop proche d'un cockpit interne.
- Le shell n'exprime pas encore un usage personnel ou multi-utilisateur d'agence.
- La hiérarchie visuelle laisse encore les surfaces de support rivaliser avec la file de travail.
- Les marges et hauteurs de blocs donnent encore une impression de panneaux juxtaposés.

## Cible perceptive
- Le premier écran doit ressembler à un espace de travail personnel Central Parc Immo.
- Le shell doit rendre crédible un futur usage compte par compte, sans ouvrir le scope auth.
- La file de travail doit dominer visuellement le support.
- Le langage visuel doit être plus applicatif, plus éditorial et moins “dashboard”.

## Invariants
- Aucun changement au contrat externe de `buildDashboardViewModel`.
- Aucun changement aux filtres `Pôle / Suivi`.
- Aucun ajout de nouvelle donnée métier.
- Aucun placeholder assistant ou recherche visible sur cet écran.

## Suppressions et fusions imposées
- Supprimer l'entrée de page anonyme au profit d'un shell personnel.
- Garder une seule zone `État des données`, intégrée en appui.
- Réduire la lecture en gros blocs parallèles dans la zone métier.
- Raccourcir et calmer les zones `Activité récente` et `Repère comptable`.

## Signaux attendus
- Présence d'une salutation utilisateur crédible.
- Présence d'un contexte agence / rôle / usage personnel dans le shell.
- Zone centrale dominée par priorités, dossiers et relances.
- Support compact, utile, sans concurrence visuelle.

## Refus explicites
- Pas de topbar décorative seule.
- Pas de simple changement de palette sans changement de forme.
- Pas de pile de cartes homogènes.
- Pas de “dashboard renommé”.
