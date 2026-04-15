# Data Sources

## Default Architecture
The webapp MVP reads from Google Sheets and other low-friction exports produced by the existing n8n workflows.

## Known Current Sources

### Back-office workflow sheets
From existing docs, these sources are already present or planned:

| Source | Known Purpose | Current Confidence |
|--------|---------------|-------------------|
| `cases` | dossiers or cases created by back-office flow | high |
| `relance` | reminders and follow-up tracking | high |
| `Personnes` | person registry used by compta flow | high |
| `Compta` | accounting lines for debit and credit | high |
| `hashes` | GED file tracking | medium |
| `duplicates` | duplicate document tracking | medium |

## Source Ownership

| Source | Upstream Owner |
|--------|----------------|
| `cases` | WF4 dossier flow |
| `relance` | WF4 and WF7 relance flows |
| `Personnes` | WF5 compta |
| `Compta` | WF5 compta |
| `hashes` | WF3 GED/document flow |
| `duplicates` | WF3 GED/document flow |

## MVP Data Contract Assumptions

### `cases`
Minimum useful fields for the webapp:
- `Dossier ID`
- title or label
- agency
- métier
- copro or account name
- status
- created date
- updated date

### `relance`
Minimum useful fields:
- `Relance ID`
- related `Dossier ID`
- due date
- status
- agency
- métier
- owner or assignee if available

### `Personnes`
Minimum useful fields:
- `personne_id`
- nom
- prenom
- email

### `Compta`
Minimum useful fields:
- date
- personne_id
- categorie
- debit
- credit
- description
- agency
- métier

## Missing Or Weak Sources
- rent expected versus received needs a clearer source contract
- voted budget versus actual expenses needs a syndic budget source
- decisions pending execution needs a decision-tracking source
- lot counts and growth need a trusted reference table over time
- email response delay needs timestamped interaction logs or a dedicated export

## Recommended MVP Data Strategy
1. Read existing Sheets directly for V1.
2. Add one lightweight normalized dashboard export only if direct sheet reads become too messy.
3. Keep KPI computation logic in the webapp layer at first, unless a calculation is too expensive or too ambiguous.

## Current Implementation State
- The current webapp reads from `/api/live-dashboard`, a local runtime proxy endpoint backed by the real workbook `MVP Test Back Office`.
- `src/data/loadLiveDashboardSnapshot.ts` is the runtime loading boundary for this endpoint.
- `server/liveDashboardProxy.ts` is the proxy boundary that reads the Google Sheets tabs and returns the UI snapshot contract.
- `src/data/dashboardAdapter.ts` is now the app boundary for:
  - normalization of agency and metier values
  - row-level data-quality tagging
  - KPI card derivation
  - filtered dossier, relance, and compta view models
- The workbook still does not expose explicit multi-agency and multi-metier segmentation, so those dimensions remain secondary and are not used as primary UI filters.
- The UI now displays `Last synced` from snapshot metadata so freshness is visible.

## Confirmed V1 Widgets Backed By The Adapter
- `Total credit` from filtered `Compta` rows
- `Total debit` from filtered `Compta` rows
- `Net result` from filtered `Compta` rows
- `Visible dossiers` from filtered `cases` rows
- `Pending relances` from filtered `relance` rows where `status = pending`
- `Coming soon KPIs` placeholder card for not-yet-backed KPI families

## First Live Contract

### Producer contract
- Workbook: `MVP Test Back Office`
- Effective tabs used by the webapp:
  - `cases`
  - `relance`
  - `Compta`
- The workbook currently provides operational rows, but not explicit `agency` or `metier` dimensions in the exported columns.

### Consumer contract
- The webapp needs:
  - dossier rows
  - relance rows
  - compta rows
  - top-level KPI aggregates derived from compta, dossiers, and relances
- The webapp also needs filter-compatible dimensions, but these are not yet present upstream.

### Compatibility strategy
- Use the real workbook rows now.
- Apply an explicit pilot mapping boundary in the adapter:
  - `normalizedAgency = CPI`
  - `normalizedMetier = Syndic`
- Preserve a visible note in the UI and row metadata so the assumption is explicit, not hidden.
- Load data through a thin local proxy so the app no longer depends on a bundled snapshot file for current data.

### Next upstream improvement needed
- Add explicit `agency` and `metier` fields to the producer sheets so the webapp can stop relying on the pilot mapping.
- Harden the local proxy for the eventual deployment target or replace it with the final backend path.

## Data Freshness Rule
- V1 may rely on scheduled refresh.
- Display last sync time on the dashboard.
- If freshness is unknown, show the source as stale rather than pretending it is live.
