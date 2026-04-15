# Roles And Access

## Goal
Keep the dashboard useful by showing each user only the data they need.

## MVP Access Model
Use simple role-based visibility first. Avoid building a full custom permission system in V1.

## Proposed Roles

| Role | Default Access |
|------|----------------|
| `admin` | all agencies, all métiers, all pages |
| `direction` | all KPI pages, all agencies, no config editing required in V1 |
| `gestion` | gestion data only, all relevant pages |
| `syndic` | syndic data only, all relevant pages |
| `assistant` | limited operational views, no sensitive finance summary unless explicitly granted |

## User Defaults For MVP
- Mehdi: `admin`
- Thomas: `direction` or `admin` depending on operational need
- 3 additional users: assign by métier first, not by custom field-level policy

## Visibility Rules

### Agency visibility
- a user can be limited to `CCI`, `CPI`, or both

### Métier visibility
- a user can be limited to:
  - `Gestion`
  - `Syndic`
  - both

### Page visibility
- use page-level or widget-level toggles
- do not implement row-level policy complexity for V1 unless a sensitive dataset forces it

## MVP Permission Matrix

| Area | Admin | Direction | Gestion | Syndic | Assistant |
|------|-------|-----------|---------|--------|-----------|
| Overview | yes | yes | yes | yes | yes |
| Dossiers | yes | yes | limited | limited | limited |
| Relances | yes | yes | limited | limited | limited |
| Compta summary | yes | yes | optional | optional | no by default |
| Data health | yes | yes | no | no | no |

## Authentication Default
- internal protected access only
- exact auth provider can be chosen later
- for MVP planning, assume a small managed user list rather than self-service signup

## Non-Goals For V1
- self-service role editor
- per-field masking matrix
- audit-grade authorization logs
- SSO complexity unless the chosen stack makes it trivial
