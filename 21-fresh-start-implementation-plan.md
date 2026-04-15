# Fresh-Start Implementation Plan

## Goal
Restart the next UI rebuild from the new operator-workspace spec rather than from the current page shape.

## Architecture Strategy
The rebuild should preserve the current public data contracts while strongly refactoring the screen composition layer.

The implementation is split into three responsibilities:
- `App` and existing hooks keep data loading, filters, loading/error states, and top-level orchestration
- a screen-composition layer translates the existing dashboard view model into a queue-first workspace
- dedicated screen components render shell, grouped queue, and persistent detail separately

The current monolithic screen composition should not remain the long-term structure.

## Working Method
Use a spec-driven discipline inspired by spec-kit, without adopting the full framework yet.

That means:
- one active spec
- one active implementation plan
- explicit archives for rejected or superseded directions
- gates between direction, implementation, and acceptance

## Why Not Full spec-kit Now
- spec-kit helps governance, not visual direction by itself
- the repo already suffered from too much active documentation
- adding the full framework now would risk creating another layer of noise before the new direction is stable
- we can revisit fuller adoption later if governance drift remains a problem

## Rebuild Phases
### Phase 1: Design Foundation
- validate the reference pack
- validate the product/UI spec
- define the UI language boundaries before code
- lock the first-screen contents before any CSS-first implementation

### Phase 2: Shell Rebuild
- rebuild the top of the app as a personal agency shell
- remove any lingering dashboard chrome
- ensure the product reads like a real internal application immediately
- keep the shell sober: identity, user, agency, minimal nav, compact session context only

### Phase 3: Work Queue Rebuild
- rebuild the first screen around the queue as the dominant surface
- stop rendering the page as grouped cards or overview panels
- make the list the central reading path
- implement one grouped queue with separators, not a wall of independent blocks
- keep dossiers and relances on the same first-screen flow
- treat row selection as the main interaction, not as a side behavior

### Phase 4: Persistent Detail Rebuild
- rebuild the right-side detail as a real work context area
- ensure it responds clearly to selection
- ensure it feels useful, not decorative
- make support modules subordinate to the active item
- allow KPI/compta support to disappear from screen 1 if they recreate dashboard gravity

### Phase 5: Visual Language And Motion
- apply the intended Central Parc Immo tone
- tune hierarchy, spacing, and density
- add calm but visible motion for selection and context shifts
- improve row editorial quality so titles, context lines, and state density feel intentional

### Phase 6: Verification
- verify desktop behavior
- verify mobile behavior
- verify no overflow
- verify no English leakage
- verify no `unknown` leakage
- verify queue and detail reliability

## Gates
### Gate A
If the top of the app still reads like dashboard chrome, stop.

### Gate B
If the center still reads like grouped panels instead of a work queue, stop.

### Gate C
If the detail area feels decorative rather than operational, stop.

### Gate D
If the result is merely "better but same shape", do not call it finished.

## Implementation Rules
- do not change the external `buildDashboardViewModel` contract in this pass
- do not change the `Pôle / Suivi` filter contract
- allow a strong internal refactor of presentation components
- keep selection state local to the frontend
- prefer behavior-level tests over styling-detail tests
- if a support module harms the queue-first architecture, remove it from screen 1 instead of keeping it by inertia

## Expected Internal Shape
The rebuild should converge toward:
- one shell component
- one work-intake section
- one grouped queue component
- one persistent detail component
- one thin presentation-mapping layer between the adapter output and the screen components

The rebuild should move away from:
- one oversized screen component carrying all layout responsibility
- repeated card sections as the dominant grammar
- support modules treated as first-class screen anchors

## QA Checklist
- no horizontal overflow on desktop
- no horizontal overflow on mobile
- no visible English in the UI
- no visible `unknown`
- no dominant KPI wall
- queue selection is reliable
- detail resets correctly when filters change
- console stays clean
- tests, build, and typecheck stay green
- the first visible reading path is queue first, support second
- the shell reads as a sober application shell, not as a hero or admin topbar

## Start Condition For The Next Build
The next UI build should start only after the user validates:
- the reference pack
- the operator-workspace spec
- this implementation plan
