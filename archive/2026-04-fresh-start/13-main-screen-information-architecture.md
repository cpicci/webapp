# Main Screen Information Architecture

## Goal
Define how the main screen should behave as a métier application entry point instead of a generic dashboard before the next major UI correction pass.

## Important Status Note
Une première recomposition en workspace a déjà été tentée dans le code.

Elle ne suffit pas encore.

Le prochain travail doit aller plus loin et produire un vrai shell d'application crédible, pas seulement une version réarrangée du dashboard.

Le retour utilisateur le plus récent confirme que la recomposition actuelle n'a pas encore assez changé l'apparence globale ni la qualité perçue du produit.

## Main Job Of The Screen
The main screen should help the user answer, in this order:
1. What requires action now?
2. Which dossiers need attention?
3. Which relances must be prepared or followed up?
4. What changed recently?
5. What support context explains the situation?

It should not primarily answer:
- How many dashboard cards can I scan?
- What is the abstract state of the system?

## Current Structural Problem
The current composition is still too close to:
1. shell
2. support context
3. filters
4. support indicators
5. panels

That still reads as a dashboard composition.

The next pass should keep one screen if needed, but reorganize it mentally and visually as an application workspace.

## Target Screen Hierarchy

### Zone 1: Entry And Orientation
Purpose:
- tell the user where they are
- tell them what kind of work this screen helps with
- provide access to the current source freshness without giving it too much dominance

Should contain:
- product title
- one concise orientation line
- compact data freshness block

Should not contain:
- long strategic product copy
- decorative ribbons that do not help action

### Zone 2: Active Work Controls
Purpose:
- let the user narrow the screen to the right work context

Should contain:
- filters for `Pole`
- filters for `Suivi`

Should feel like:
- a control surface
- not a hero subsection

### Zone 3: Immediate Priorities
Purpose:
- surface urgent action first

Should contain:
- the action surface currently called `Priorités du jour`
- one compact signal of what is blocked or late

This is the zone the user should notice first after arriving.

### Zone 4: Core Work Surfaces
Purpose:
- provide the actual working lists

Should contain:
- dossiers
- relances à traiter
- relances préparées

This zone is the real center of the product.

### Zone 5: Support Context
Purpose:
- provide useful but secondary understanding

Should contain:
- activité récente
- repère comptable
- selected indicators that help prioritize rather than distract
- future entry points for search and assistant if they remain visually secondary

This zone must remain secondary to the work surfaces.

## Content Hierarchy By Zone

### Main Screen Priority
1. priorités du jour
2. dossiers ouverts
3. relances à traiter
4. relances préparées
5. activité récente
6. repère comptable
7. indicateurs de suivi
8. état des données

## Future Growth Reservation

### Assistant
The main screen should eventually be able to host a lightweight assistant entry point.

Reserved place:
- utility area in the top shell, or
- a secondary action rail near the work surfaces

It should not require redesigning the whole screen later.

### Intelligent Search
The screen should eventually be able to host a document or dossier search entry point.

Reserved place:
- inside the active work controls zone, or
- as a dedicated search surface just above the core work surfaces

It should feel like part of the application, not an overlay pasted later.

## Naming Conventions

| Current concept | Target UI label |
|----------------|-----------------|
| source status | état des données |
| action queue | priorités du jour |
| recent activity | activité récente |
| dossier list | dossiers ouverts or dossiers suivis depending on section purpose |
| pending relances | relances à traiter |
| drafted relances | relances préparées |
| compta support | repère comptable |
| KPI overview | indicateurs de suivi |

## Build Implications

### Must Change In The Next Pass
- reduce the dominance of the current KPI zone
- move daily action higher in the visual hierarchy
- compress source status into a tighter support block
- make dossiers and relances the real center of the screen
- keep room for future search and assistant entry points
- make the shell feel like an application shell, not a hero plus blocks
- rework margins, spacing, and visual rhythm globally rather than locally
- remove the remaining dashboard grammar from the composition

### Must Stay Stable
- source-driven filtering model
- live proxy and workbook honesty
- dossier/relance-first product logic
- no fake dimensions and no invented product behavior
