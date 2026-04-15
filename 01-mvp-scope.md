# Webapp MVP Scope

## Product Goal
Build an internal operator workspace for the agency team so they can resume daily work quickly without reopening multiple Sheets or workflow tools.

The first useful version is not defined as a dashboard. It is defined as a work surface centered on dossiers, relances, and day-to-day treatment.

## Working Assumption
The first version remains a lightweight internal webapp connected mainly to Google Sheets already fed by the n8n workflows.

The product shape changes, but the data backbone does not.

## Target Users
- Fabrice
- Mehdi
- Thomas
- additional internal collaborators
- future hires with role-based visibility

## MVP Outcome
The MVP is successful if a user can:
- open the application and immediately understand what deserves attention
- resume work on dossiers and relances without reopening multiple tools
- filter the visible queue only through real source dimensions
- keep useful support context nearby without letting support modules drive the page
- use the product as a personal internal workspace rather than as a passive reporting screen

## In Scope For MVP
- internal operator workspace only
- desktop-first responsive webapp
- protected internal access or simple account context
- role-based visibility at a simple level
- source-driven filters
- inbox-style work queue
- persistent detail and context area
- secondary KPI and compta support
- explicit empty states when the source cannot support the selected scope

## Out Of Scope For MVP
- public client portal
- mobile-native app
- full assistant implementation
- real intelligent search implementation
- workflow editing from the webapp
- advanced permission editor
- complex audit trails
- real-time collaboration
- BI suite replacement

## First-Screen Model
1. Personal shell
   - visible user and agency context
   - stable application identity

2. Work intake
   - short session context
   - source-driven filters
   - clear reading of what needs treatment first

3. Work queue
   - urgences du jour
   - dossiers suivis
   - relances a traiter
   - relances preparees

4. Persistent detail
   - item context
   - status
   - dates
   - related support information

5. Secondary support
   - compact source freshness
   - compact KPI support
   - compact compta support

## Default UX Rules
- if a feature behaves more like reporting than work resumption, it is secondary
- if a surface reads like a stacked dashboard card, it is the wrong shape
- filters must stay source-driven
- support should assist the work queue, not compete with it
- unavailable information should be explicit, never invented

## Notes
- The webapp remains a focused lot separated from the original workflow-installation scope.
- The operational core of V1 is dossiers, relances, and work resumption.
- KPI and compta layers remain secondary until they clearly support operator decisions.
