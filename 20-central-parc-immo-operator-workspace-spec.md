# Central Parc Immo Operator Workspace Spec

## Product Thesis
The webapp is not a dashboard.

The webapp V1 is a personal operator workspace for Central Parc Immo. Its job is to help Fabrice and the rest of the agency restart daily work fast, understand what requires treatment, and keep enough context nearby to act without jumping between tools.

## First-Screen Model
The first screen is built from five layers:

1. shell personnel
2. mise en route
3. file de travail
4. detail persistant
5. support secondaire

The first screen is desktop-first with two dominant zones:
- left: one grouped work queue
- right: one persistent detail panel

On mobile, the detail panel moves below the queue but keeps the same reading order and semantics.

## What the Screen Is
- a bureau operateur
- a work-resumption screen
- a queue-first application
- a personal internal tool

## What the Screen Is Not
- not an overview page
- not an operational cockpit
- not a pile of cards
- not a KPI-first dashboard
- not a shell plus decorative side rail

## Core Behaviors
### Personal shell
- visible user identity
- visible agency context
- stable product identity
- minimal, credible application navigation
- no hero behavior
- no product-marketing tone
- no large session banner

### Work intake
- short orientation for the day
- source-driven filters
- clear reading of what deserves attention first
- compact source freshness only
- no support wall
- no KPI emphasis

### Work queue
The main queue is grouped, but still reads like one continuous work surface:
- urgences du jour
- dossiers suivis
- relances a traiter
- relances preparees

Rules:
- one single continuous reading path
- visible separators between groups
- no twin cards for relance sections
- each row is selectable
- each row must feel operable, not descriptive only

### Persistent detail
The selected item must show:
- nature of the item
- status
- key dates
- dossier or relance context
- copro or contact context when available
- related support information

Rules:
- useful by default, not decorative
- explicit operator empty state when no item is selected
- support modules must stay attached to the active item or active session

## Interaction Rules
- the default selected item is the top-priority visible sujet
- selection remains local UI state for now
- identifiers must be collision-safe across families
- when filters change, selection resets intelligently to the first visible valid item
- if no item is available, the detail area must show an explicit operator-grade empty state
- the first screen must not require tabs to move between dossiers and relances
- navigation remains minimal and should point only to real destinations or real screen anchors

## Visual Direction
- luxe sobre
- calm confidence
- fewer surfaces
- clearer editorial hierarchy
- restrained body text
- visible but calm motion

## Support Layer Rules
- source freshness stays visible, but compact
- KPI support stays secondary or absent from screen 1 if it recreates dashboard gravity
- compta support stays secondary or absent from screen 1 if it weakens the queue-first model
- support modules should serve the selected item or the current work context
- support must never become the center of gravity of the first screen

## Constraints
- no change to the external `buildDashboardViewModel` contract in this phase unless proven necessary later
- no invented metier dimensions
- no real assistant implementation
- no real intelligent search implementation
- no return to dashboard grammar hidden under better spacing
- allow a strong internal recomposition of the presentation layer if public data contracts remain stable
