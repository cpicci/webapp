# Task Plan: Webapp Fresh Start

## Goal
Replace the noisy restart history with a short active plan that prepares a real rebuild of the webapp around an operator-workspace model.

## Current Phase
Phase 4

## Active Phases

### Phase 1: Reference Pack
- [x] Decide that the next restart must begin with concrete references
- [x] Prefer structure-first references over sector-first references
- [x] Select a compact set of operator-workspace and inbox references
- [x] Write the active reference pack
- **Status:** complete

### Phase 2: Repo Cleanup
- [x] Audit the active `webapp/` doc surface
- [x] Archive superseded UI restart docs and rejected-pass materials
- [x] Reduce the active doc set to a small core
- [x] Rewrite the local read order around the fresh-start docs
- **Status:** complete

### Phase 3: Fresh-Start Spec
- [x] Rewrite the MVP shape around an operator workspace rather than a dashboard
- [x] Rewrite the active source-of-truth doc around work resumption
- [x] Lock the new product/UI spec for the first screen
- **Status:** complete

### Phase 4: Fresh-Start Implementation Plan
- [x] Define the rebuild method and gates
- [x] Validate that the implementation plan is the only active execution plan
- [ ] Resume UI build only from the new plan set
- **Status:** active

## Active Decisions
| Decision | Rationale |
|----------|-----------|
| Start with references before another UI pass | The team needs concrete structure targets, not another abstract redesign loop |
| Prefer structure-first references | The core failure is product form, not missing real-estate decoration |
| Apply strong doc cleanup | Too many superseded restart docs were still guiding work implicitly |
| Use spec-kit discipline, not full spec-kit adoption | Governance help is useful, but full adoption would add noise too early |
| Treat the next implementation as a rebuild, not a polish pass | The current page shape is rejected and should not be iterated on as a base |

## Active Notes
- Archived docs now live in `webapp/archive/2026-04-fresh-start/`.
- The next implementation must start from:
  - `webapp/19-ui-reference-pack.md`
  - `webapp/20-central-parc-immo-operator-workspace-spec.md`
  - `webapp/21-fresh-start-implementation-plan.md`
- No new UI build should resume from the archived restart plans.
- The implementation plan is now architecture-complete enough to guide a rebuild without reinterpreting the product shape.
