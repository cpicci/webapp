# V1 Status

This file answers one question:

What is done, what is missing, and what is the next closed milestone for the webapp?

## Current Position
The webapp is technically viable, but product-direction wise it is not accepted.

What is true today:
- the scaffold exists
- the app builds and tests pass
- the app already reads real source-backed data through the current adapter path
- several UI passes have been attempted
- the result is still rejected because it remains too close to a dashboard

The current issue is no longer "make the page cleaner".
The current issue is "restart the product shape on a better basis".

## What Is Working

### Platform
- React/Vite/TypeScript app scaffold exists and builds
- tests exist and pass
- browser verification has already been achieved on desktop and mobile in previous passes

### Data
- app uses a real workbook-backed snapshot and adapter pipeline
- filters reflect real source dimensions currently available in the workbook
- dossiers, relances, and support metrics are already exposed in the current data contract

### Product Foundation
- source-of-truth hierarchy exists
- MVP scope exists
- roles and access assumptions exist

## What Is Not Accepted
- the first screen still reads too much like a dashboard
- the visual identity still does not feel like a credible Central Parc Immo application
- the previous structural passes changed pieces of the page without changing the overall grammar enough
- the active documentation surface had become too noisy and too contradictory

## Fresh-Start Decision
The project is now in a fresh-start documentation phase before any new UI rebuild.

The sequence is:
1. references
2. doc cleanup
3. new spec
4. new implementation plan
5. only then, a new UI rebuild

## Next Closed Milestone
The next milestone is:

**Fresh-start build readiness**

This milestone is complete only when:
1. the active docs have been reduced to a clear core
2. the reference pack is written
3. the new operator-workspace spec is decision-complete
4. the new implementation plan is ready

## What This Milestone Is Not
This milestone is not:
- another UI polish pass
- another dashboard correction pass
- another attempt to accept the current page by changing only margins, copy, or section order

## Immediate Next Work Package
The next concrete work package is now:
1. lock the fresh-start references
2. simplify the active documentation surface
3. validate the new operator-workspace spec
4. validate the new rebuild plan

Only after that should UI implementation resume.
