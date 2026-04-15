# Webapp MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current `webapp/` scaffold into a usable internal MVP dashboard with a typed data layer, real filter state, confirmed-source overview widgets, and supporting tables for dossiers, relances, and compta.

**Architecture:** Keep the app frontend-only for now, with a thin local data adapter boundary so the UI can start from mock or fixture data and later switch to Google Sheets or an API proxy without rewriting the dashboard. Keep scope narrow: one overview page, one shared filter state, confirmed-source widgets first, and explicit placeholders for unavailable KPIs.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS

**Command Context:** Unless a step says otherwise, run all commands from `webapp/`.

---

## File Map

### Existing Files To Modify
- `webapp/README.md`
  - update current position now that a frontend scaffold exists
- `webapp/03-data-sources.md`
  - tighten the first confirmed source set once the adapter shape is finalized
- `webapp/src/App.tsx`
  - shrink to page composition only
- `webapp/src/App.test.tsx`
  - keep top-level rendering and interaction coverage
- `webapp/src/styles.css`
  - host shared page layout and responsive rules

### New Files To Create
- `webapp/src/types/dashboard.ts`
  - app-facing types for filters, summary cards, dossiers, relances, and compta rows
- `webapp/src/data/mockDashboardData.ts`
  - local fixture data aligned with confirmed sources
- `webapp/src/data/dashboardAdapter.ts`
  - mapping layer from raw source-shaped data to UI-friendly view models
- `webapp/src/hooks/useDashboardFilters.ts`
  - single source of truth for selected agency and metier filters
- `webapp/src/components/FilterBar.tsx`
  - shared agency and metier controls
- `webapp/src/components/KpiOverview.tsx`
  - top KPI cards for confirmed or placeholder widgets
- `webapp/src/components/OperationalPanels.tsx`
  - supporting panels for dossiers, relances, and compta highlights
- `webapp/src/components/EmptyState.tsx`
  - consistent placeholder for unavailable KPI areas
- `webapp/src/components/__tests__/FilterBar.test.tsx`
  - filter interaction tests
- `webapp/src/components/__tests__/KpiOverview.test.tsx`
  - card rendering and placeholder tests
- `webapp/src/components/__tests__/OperationalPanels.test.tsx`
  - supporting panel rendering tests
- `webapp/src/data/dashboardAdapter.test.ts`
  - adapter contract tests

### Optional Later Files
- `webapp/src/data/googleSheetsClient.ts`
  - only add when we decide on direct Sheets access
- `webapp/src/data/dashboardApi.ts`
  - only add if we switch to a backend proxy

---

## Chunk 1: Stabilize The Frontend Structure

### Task 1: Split The App Shell Into Clear Units

**Files:**
- Modify: `webapp/src/App.tsx`
- Create: `webapp/src/components/FilterBar.tsx`
- Create: `webapp/src/components/KpiOverview.tsx`
- Create: `webapp/src/components/OperationalPanels.tsx`
- Create: `webapp/src/components/EmptyState.tsx`
- Create: `webapp/src/types/dashboard.ts`
- Test: `webapp/src/App.test.tsx`

- [ ] **Step 1: Write the failing app composition test**

Add assertions in `webapp/src/App.test.tsx` that require:
- one `FilterBar`
- one KPI overview region
- one operational panel region
- one explicit empty or coming-soon block

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL because the new structure and labels are not implemented yet.

- [ ] **Step 3: Create the dashboard types**

In `webapp/src/types/dashboard.ts`, define minimal types for:
- `AgencyFilter = 'all' | 'CCI' | 'CPI'`
- `MetierFilter = 'all' | 'Gestion' | 'Syndic'`
- `KpiCardViewModel` including:
  - `title`
  - `value`
  - `note`
  - `status`
  - `formula`
  - `source`
  - `refreshMode`
  - `ownerWorkflow`
- `DossierRow`
- `RelanceRow`
- `ComptaRow`

Row metadata required on all three row types:
- `dataQuality: 'known' | 'unknown'`
- `dataQualityNote?: string`

Row normalization fields:
- `normalizedAgency: AgencyFilter | 'unknown'`
- `normalizedMetier: MetierFilter | 'unknown'`

Important distinction:
- filter state stays limited to `AgencyFilter` and `MetierFilter`
- row view models may carry `'unknown'` normalized values to preserve source fidelity without polluting the filter controls

Keep display labels canonical in the type layer and normalize any lowercase source data inside the adapter.
Normalization rules for the adapter:
- case-insensitive matching
- `cci` or `Cci` -> `CCI`
- `cpi` or `Cpi` -> `CPI`
- `gestion` -> `Gestion`
- `syndic` -> `Syndic`
- unknown or missing values -> `all` only for filter defaults, otherwise keep row visible in an `unknown` bucket note until the source is cleaned

- [ ] **Step 4: Create the smallest `EmptyState` component**

Create a presentational component that receives:
- `title`
- `body`

and renders a consistent placeholder block.

- [ ] **Step 5: Create the smallest `FilterBar` component**

Accept props for:
- `agency`
- `metier`
- `onAgencyChange`
- `onMetierChange`

Render only the controls required by the current MVP.

- [ ] **Step 6: Create the smallest `KpiOverview` and `OperationalPanels` components**

Render cards and support sections from props rather than hardcoded data in `App.tsx`.

- [ ] **Step 7: Reduce `App.tsx` to composition only**

Keep `App.tsx` as a thin page component that assembles the shell.

- [ ] **Step 8: Re-run the test to verify it passes**

Run: `npm test`
Expected: PASS with the updated composition assertions.

---

## Chunk 2: Add A Typed Data Adapter Boundary

### Task 2: Introduce Fixture Data And Mapping Logic

**Files:**
- Create: `webapp/src/data/mockDashboardData.ts`
- Create: `webapp/src/data/dashboardAdapter.ts`
- Create: `webapp/src/data/dashboardAdapter.test.ts`
- Modify: `webapp/src/App.tsx`

- [ ] **Step 1: Write the failing adapter test**

In `webapp/src/data/dashboardAdapter.test.ts`, write tests that require the adapter to:
- return exactly these confirmed-source widgets for V1:
  - `Total credit`
  - `Total debit`
  - `Net result`
  - `Visible dossiers`
  - `Pending relances`
  - one explicit placeholder card for unavailable KPI families
- return dossier rows
- return relance rows
- return compta rows
- mark unavailable KPIs as placeholders instead of fabricating values
- include KPI metadata fields for source, formula, refresh mode, and owner workflow
- normalize incoming agency and metier values to the canonical filter values used by the UI

- [ ] **Step 2: Run the adapter test to verify it fails**

Run: `npm test`
Expected: FAIL because the adapter files do not exist yet.

- [ ] **Step 3: Add fixture data shaped like the current known sources**

In `webapp/src/data/mockDashboardData.ts`, create small arrays for:
- `cases`
- `relance`
- `compta`

Keep the fixtures tiny and readable.

Required raw fixture contracts:

- `cases` rows:
  - `dossierId: string`
  - `title: string`
  - `agency: string`
  - `metier: string`
  - `copro: string`
  - `status: 'open' | 'pending' | 'closed' | string`
  - `createdAt: string`
  - `updatedAt: string`

- `relance` rows:
  - `relanceId: string`
  - `dossierId: string`
  - `agency: string`
  - `metier: string`
  - `status: 'pending' | 'drafted' | 'sent' | 'done' | string`
  - `dueDate: string`
  - `owner?: string`

- `compta` rows:
  - `entryId: string`
  - `agency: string`
  - `metier: string`
  - `date: string`
  - `categorie: string`
  - `debit: number`
  - `credit: number`
  - `description: string`

Use row-level compta filtering first, then derive summary totals from the already-filtered row set.

- [ ] **Step 4: Implement the adapter with the smallest mapping logic**

In `webapp/src/data/dashboardAdapter.ts`, export functions that:
- normalize agency and metier values
- map fixture rows to UI view models
- output placeholder KPI metadata for not-ready sources
- preserve explicit KPI metadata even for placeholder cards

Unknown handling rule:
- attach `dataQuality: 'known' | 'unknown'` to mapped rows
- keep unknown rows visible in the lists when filters are `all`
- show an `Unknown source value` badge or note on those rows
- exclude unknown rows from agency-specific or metier-specific totals until the source is cleaned

Counting rules for V1:
- `Visible dossiers` always equals the number of dossier rows currently visible after filters
- `Pending relances` always equals the number of relance rows with `status='pending'` currently visible after filters
- unknown rows count in those two KPI cards only when the current filter is `all`
- when a specific agency or metier filter is active, unknown rows stay out of KPI counts and summary totals

- [ ] **Step 5: Wire `App.tsx` to adapter output**

Replace hardcoded page data with adapter-provided values.

Aggregation rule for V1:
- filter compta rows first
- then compute `Total credit`, `Total debit`, and `Net result` from the filtered rows only

- [ ] **Step 6: Re-run the adapter tests**

Run: `npm test`
Expected: PASS for adapter behavior.

---

## Chunk 3: Make Filters Real

### Task 3: Add Shared Filter State And Filtering Logic

**Files:**
- Create: `webapp/src/hooks/useDashboardFilters.ts`
- Create: `webapp/src/components/__tests__/FilterBar.test.tsx`
- Modify: `webapp/src/components/FilterBar.tsx`
- Modify: `webapp/src/App.tsx`
- Modify: `webapp/src/data/dashboardAdapter.ts`

- [ ] **Step 1: Write the failing filter interaction test**

In `webapp/src/components/__tests__/FilterBar.test.tsx`, require:
- changing agency updates the selected state
- changing metier updates the selected state
- the initial state is `all` for both

- [ ] **Step 2: Run the filter test to verify it fails**

Run: `npm test`
Expected: FAIL because the controls are currently static.

- [ ] **Step 3: Add `useDashboardFilters`**

Expose:
- `agency`
- `metier`
- `setAgency`
- `setMetier`

No persistence yet. Keep it memory-only.

- [ ] **Step 4: Update `FilterBar` to be controlled**

The selected chip styles must come from props rather than hardcoded classes.

- [ ] **Step 5: Filter the adapter output in `App.tsx`**

Apply agency and metier filters to:
- dossiers
- relances
- compta summaries

- [ ] **Step 6: Re-run the filter tests**

Run: `npm test`
Expected: PASS with the controlled filters.

---

## Chunk 4: Replace Placeholder Sections With Real MVP Panels

### Task 4: Build The First Useful Overview Widgets

**Files:**
- Create: `webapp/src/components/__tests__/KpiOverview.test.tsx`
- Create: `webapp/src/components/__tests__/OperationalPanels.test.tsx`
- Modify: `webapp/src/components/KpiOverview.tsx`
- Modify: `webapp/src/components/OperationalPanels.tsx`
- Modify: `webapp/src/styles.css`

- [ ] **Step 1: Write the failing KPI overview test**

Require `KpiOverview` to render:
- one confirmed-source finance summary card
- one dossiers and relances health card
- one explicit placeholder card titled `Coming soon KPIs`

- [ ] **Step 2: Write the failing support panel test**

Require `OperationalPanels` to render:
- latest dossiers table or list
- pending relances table or list
- recent compta activity table or list

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL because the current sections are still too generic.

- [ ] **Step 4: Implement the smallest useful KPI card content**

Show:
- total debit
- total credit
- net result
- count of pending relances
- count of visible dossiers

- [ ] **Step 5: Implement the smallest useful operational panels**

Show only a few top rows per panel. Do not add pagination yet.

- [ ] **Step 6: Refine the CSS only as needed**

Keep the current visual direction. Add table or list styling without redesigning the app.

- [ ] **Step 7: Re-run the tests**

Run: `npm test`
Expected: PASS for overview and panel coverage.

---

## Chunk 5: Verification, Docs, And Next Data Step

### Task 5: Verify, Document, And Freeze The MVP Boundary

**Files:**
- Modify: `webapp/README.md`
- Modify: `webapp/03-data-sources.md`
- Modify: `webapp/progress.md`
- Modify: `webapp/task_plan.md`

- [ ] **Step 1: Update `webapp/README.md`**

Replace the outdated line saying no scaffold exists. Summarize the actual current state.

- [ ] **Step 2: Update `webapp/03-data-sources.md`**

Reflect the actual first adapter and what remains mocked versus real.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS with all frontend tests green.

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: PASS with generated `dist/` assets.

- [ ] **Step 5: Verify the app in a real browser**

Run the dev server and load the page in browser automation.

Run from `webapp/`:
- `npm run dev -- --host 127.0.0.1 --port 4173`
- verify with Playwright or Chrome DevTools browser automation against `http://127.0.0.1:4173/`

Prerequisites:
- `npm install` already completed in `webapp/`
- browser automation tooling available in the harness, using either Playwright MCP or Chrome DevTools MCP

Expected:
- page loads
- no console errors
- desktop layout intact
- mobile layout still usable

- [ ] **Step 6: Update planning files**

Record:
- what was implemented
- what is still mocked
- what the next real data integration step is

---

## Immediate Delivery Order

1. Split the app into components
2. Add the typed adapter boundary
3. Make filters real
4. Replace generic placeholders with useful panels
5. Update docs and verify everything

## Not In This Plan

- backend API
- direct Google authentication
- live Google Sheets integration
- advanced permissions editor
- complete KPI catalog implementation
- chat assistant or autonomous problem-resolution features

## Exit Criteria

The plan is complete when:
- the overview page uses typed mapped data instead of hardcoded card text
- filters actually affect visible data
- the UI shows confirmed-source operational information
- unavailable KPI areas are explicit and not misleading
- tests, build, and browser verification all pass
