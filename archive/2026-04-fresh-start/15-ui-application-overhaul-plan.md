# UI Application Overhaul Plan

## Goal
Passer d'un écran encore trop proche d'un dashboard à une vraie application métier Central Parc Immo, cohérente, lisible, crédible, et utilisable au quotidien, sans casser le comportement source-driven déjà en place.

## Important Reality Check
Une passe structurelle a déjà été tentée dans le code.

Cette passe a apporté des progrès techniques réels :
- meilleure robustesse runtime
- meilleure gestion des données live incomplètes
- début de recomposition de l'écran principal
- vérifications techniques vertes

Mais cette passe n'est pas acceptée comme suffisante.

Raisons explicites :
- l'interface garde encore une apparence de dashboard
- les marges et espacements ne sont pas au niveau attendu
- la hiérarchie visuelle reste trop faible
- le rendu garde une sensation artificielle ou générique
- le français visible n'est pas assez soigné, notamment sur les accents
- le produit ne paraît pas encore être une vraie application métier finie

## Latest Review Update
Après une passe supplémentaire, le retour utilisateur reste :
- la topbar et les accents ont changé, mais l'apparence générale n'a pas assez bougé
- l'effet dashboard reste dominant
- les marges et espacements restent mauvais
- le rendu reste peu professionnel

Conséquence :
- ce plan reste entièrement actif
- rien dans la passe précédente ne suffit à considérer l'overhaul comme engagé correctement
- la prochaine exécution doit repartir proprement de ce plan complet

## Scope Of The Next Pass
Cette passe n'est pas une série de petits fixes.

Cette passe est une reprise plus large qui doit traiter en même temps :
- le shell applicatif
- la composition générale de l'écran
- la hiérarchie des zones métier
- les marges, espacements, densités, respirations
- les débordements et contraintes de largeur
- le vocabulaire et la qualité du français affiché
- la préparation structurelle pour recherche intelligente et assistant

## Active Skill Stack
Les skills à utiliser pour cette passe restent :
1. `frontend-design`
2. `ui-design-system`
3. `ux-writing`
4. `information-architecture`

Ne pas ajouter d'autres skills tant qu'un manque concret n'est pas identifié pendant l'exécution.

## Skill Review Summary

### `frontend-design`
Le plan doit imposer une direction esthétique claire, pas seulement une liste de défauts à corriger.

### `ui-design-system`
Le plan doit définir des règles explicites de grille, d'espacement, de responsive, et de gestion des contenus longs.

### `ux-writing`
Le plan doit traiter séparément les familles de textes visibles et imposer un vrai niveau de français professionnel, avec accents.

### `information-architecture`
Le plan doit préciser le modèle d'entrée principal, la hiérarchie réelle des zones, et la place future de la recherche et de l'assistant.

## Non-Negotiable Constraints
- ne pas casser le comportement source-driven
- ne pas inventer de nouvelles dimensions métier
- ne pas rouvrir le scope assistant ou recherche intelligente en implémentation réelle
- ne pas transformer l'app en dashboard BI générique
- ne pas laisser de textes visibles en anglais
- ne pas laisser de français sans accents dans l'interface visible quand le bon mot français en demande
- ne pas afficher de valeurs techniques brutes comme `unknown`

## Phase A: Reset The Truth In The Repo
Objectif :
Faire en sorte que tous les documents racontent la réalité exacte du projet.

Sortie attendue :
- les documents disent clairement que la passe précédente est partielle et insuffisante
- tous les documents pointent vers ce plan comme référence active

## Phase B: Application Shell Rebuild
Objectif :
Faire apparaître un vrai shell d'application, pas un dashboard réarrangé.

À faire :
- redéfinir la zone d'entrée et d'orientation
- clarifier la distinction entre espace de travail principal et contexte support
- donner une vraie présence au shell sans retomber dans un hero marketing
- préparer une place crédible pour la recherche et l'assistant

### Aesthetic Direction
Le shell doit évoquer :
- un produit métier premium et calme
- un poste de travail quotidien fiable
- une application conçue pour l'agence, pas un dashboard générique

Le shell ne doit pas évoquer :
- un template admin réhabillé
- une landing page avec hero trop présent
- un prototype avec cartes empilées

Décision visuelle de référence :
- structure sobre
- contraste net entre zones principales et support
- typographie éditoriale sur les titres uniquement
- corps de texte très lisible et discret
- surfaces métier plus denses et plus nettes que les zones support
- support contextuel compact, non spectaculaire

## Phase C: Layout, Margins, And Overflow Hardening
Objectif :
Faire tenir l'interface comme un vrai produit.

À faire :
- revoir largeurs, colonnes et rythmes verticaux
- reprendre les marges et espacements de façon globale
- vérifier les contenus longs, les emails, les textes de relance, les références, les valeurs manquantes
- empêcher les débordements et les cassures de layout

### Layout System Rules
- définir une grille principale de workspace, pas une simple colonne de cartes
- définir un espace stable entre shell, contrôles, surfaces métier et contexte support
- imposer des largeurs minimales et maximales par zone
- utiliser `minmax(0, ...)` partout où le contenu long peut casser la grille
- forcer le wrapping sur : emails, rappels longs, références, copropriétés longues
- ne pas masquer les problèmes par overflow hidden si l'information métier devient illisible
- mobile : une seule colonne, avec ordre métier prioritaire conservé
- desktop : action et travail au centre, support latéral visiblement secondaire
- aucune ligne ne doit produire de scroll horizontal
- les marges et respirations doivent être retravaillées globalement, pas localement composant par composant

## Phase D: Dashboard-To-Application Reframing
Objectif :
Rompre visiblement avec la logique de dashboard.

À faire :
- réduire le poids visuel de la couche KPI/support
- faire des surfaces métier le vrai centre de gravité
- rendre les blocs plus continus, moins widgetisés
- éviter toute composition qui ressemble à un empilement de cartes de dashboard

### IA Decisions To Enforce
Ordre d'entrée dans l'écran :
1. orientation courte
2. contrôles de travail
3. priorités du jour
4. dossiers ouverts
5. relances à traiter / préparées
6. activité récente
7. repère comptable
8. état des données et indicateurs

Question de référence pour chaque zone :
- est-ce une zone de travail quotidien ?
- est-ce une zone de support ?
- est-ce une zone future ?

Si une zone support prend plus de présence que les surfaces métier, la composition est mauvaise.

## Phase E: French UI Quality Pass
Objectif :
Faire en sorte que le français affiché soit vraiment présentable.

À faire :
- appliquer les accents là où ils sont nécessaires
- retirer les formulations artificielles
- stabiliser le lexique métier
- supprimer le mélange anglais/français
- faire relire le texte UI contre le lexique canonique

### Copy System Rules
Traiter séparément :
- titres d'écran
- titres de section
- labels de filtres
- aides courtes
- états
- empty states
- messages d'erreur et de chargement
- métadonnées

Règles :
- un titre doit orienter, pas expliquer le produit
- une aide doit dire quoi faire ou quoi lire, pas commenter l'interface
- un état doit être court, compréhensible, et métier
- un empty state doit être utile sans sonner technique
- tout texte visible doit être relu avec accents corrects
- aucune formulation ne doit sonner comme du texte de présentation ou de spec

## Phase F: Final Verification
Obligatoire :
- `npm test`
- `npm run build`
- `npx tsc -b`
- vérification navigateur desktop
- vérification navigateur mobile
- console propre
- revue visuelle finale centrée sur :
  - marges
  - densité
  - débordements
  - sensation d'application
  - domination visuelle des surfaces métier

### Verification Checklist
- aucun texte anglais visible
- aucun texte français sans accents quand le mot correct en exige
- aucune valeur `unknown` visible
- aucun scroll horizontal desktop
- aucun scroll horizontal mobile
- aucune carte support au-dessus des zones métier principales
- aucune zone qui ressemble à un widget de dashboard générique sans nécessité métier
- la zone future recherche/assistant existe mais ne vole pas l'attention à l'usage actuel

## Acceptance Criteria
La passe n'est acceptable que si tout est vrai :
1. l'écran ne ressemble plus à un dashboard habillé
2. le shell ressemble à une vraie application métier
3. les marges et espacements tiennent partout
4. aucun contenu ne déborde visuellement
5. les textes visibles sont en français correct et accentué
6. les dossiers, relances et priorités dominent le rendu
7. la place future de la recherche et de l'assistant est crédible
8. le comportement source-driven reste intact

## Reminder About Previous Attempt
La passe précédente n'a pas échoué techniquement.

Elle a échoué sur le résultat perçu.

Le prochain build doit donc être jugé sur l'apparence globale, pas seulement sur la validité technique.

## Files To Update During Execution
Docs :
- `webapp/09-v1-status.md`
- `webapp/10-ui-ux-plan.md`
- `webapp/11-ui-copy-and-ia-audit.md`
- `webapp/12-ui-lexicon.md`
- `webapp/13-main-screen-information-architecture.md`
- `webapp/14-ui-pre-build-brief.md`
- `webapp/15-ui-application-overhaul-plan.md`
- `webapp/README.md`
- `webapp/AGENTS.md`
- `webapp/08-v1-product-checklist.md`
- `webapp/task_plan.md`
- `webapp/progress.md`

Code :
- `webapp/src/App.tsx`
- `webapp/src/content/mainScreenCopy.ts`
- `webapp/src/components/FilterBar.tsx`
- `webapp/src/components/KpiOverview.tsx`
- `webapp/src/components/OperationalPanels.tsx`
- `webapp/src/data/dashboardAdapter.ts`
- `webapp/src/styles.css`
- tests associés
