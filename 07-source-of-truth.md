# Webapp Source Of Truth

This file defines what the webapp V1 is allowed to optimize for, and which sources are authoritative.

## Rule
The webapp V1 is valid only if each visible behavior maps to:
- an explicit product need
- a real operator workflow
- an explicit source

No inferred feature should outrank a documented operational need or a confirmed source.

## Source Hierarchy

### 1. Product truth for V1
These documents define what matters most for the first useful version:
- `docs/0. (NEW) Brief client V2.md`
- `docs/1. (NEW) Cahier des charges brief.md`

For the webapp, these documents outrank any inherited dashboard habit.

### 2. Operational truth for current live data
These workbook tabs are the current runtime truth for the webapp pilot:
- `cases`
- `relance`

Workbook currently used:
- `MVP Test Back Office`
- spreadsheet id: `1szo_2Iuv4-r3fvvVQZvoHRvMzRFvvb4JrjgwHmH4MWg`

These tabs are the main truth for dossier and relance work.

### 3. Secondary operational truth
- `Compta`
- `Personnes`

These are useful support sources, but they are not the primary V1 driver.

### 4. Secondary product truth
- `docs/10. (NEW) WEBAPP KPIs.md`

This matters for support metrics and future expansion, not for defining the first-screen center of gravity.

## Must-Work Areas
These are the core truth-aligned areas for V1:

1. operator work queue
2. detail and context view for the selected sujet
3. source-driven filters
4. relance state visibility
5. explicit empty states when the source cannot support the visible scope

## Secondary Areas
These may exist, but they must remain secondary:

1. KPI cards
2. richer compta analytics
3. assistant implementation
4. intelligent search implementation
5. role complexity beyond simple filtering

## Non-Negotiable Product Guardrails
1. Do not invent agency or metier segmentation when the source does not provide it.
2. Do not let KPI ambition displace dossier and relance work from the center of the product.
3. Do not present compta as the primary truth while the operational workflow remains pilot-level.
4. If a source is partial, say so explicitly in the UI.
5. If a visible behavior cannot be tied to a real operator workflow, it is probably noise.

## Current Decision
The webapp V1 is now treated as:
- an operator workspace first
- centered on dossiers and relances
- with a detail/context view attached to the active item
- with KPI and compta layers as support only

This is the active product truth for the fresh start.
