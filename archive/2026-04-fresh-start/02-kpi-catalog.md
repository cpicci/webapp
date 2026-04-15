# KPI Catalog

This file converts the raw KPI wishlist into an MVP-oriented catalog.

## Status Labels
- `ready`: source is known or strongly inferable from current docs
- `partial`: source is plausible but needs one extra mapping or field confirmation
- `later`: no reliable source is defined yet

## KPI List

| KPI | Description | Split | MVP Status | Default Display |
|-----|-------------|-------|------------|-----------------|
| CA Syndic et Gestion | Revenue split by agency and category: honoraires, vacations, suivi de travaux, autres | `CCI` / `CPI` / total | partial | cards + breakdown table |
| Loyers encaissés vs loyers attendus | Rent collected compared with expected rent | `CCI` / `CPI` | later | card hidden behind `coming soon` |
| Budget voté vs dépenses réelles | Budget versus actual expenses for syndic | copro / agency | later | card hidden behind `coming soon` |
| Décisions votées vs en attente | Voted decisions versus not yet executed decisions | copro / agency | later | ratio card + table later |
| Travaux votés vs terminés | Works approved versus completed | copro / agency | partial | status card + list later |
| Nombre de lots gestion locative et syndic | Active lot counts by métier and agency | `CCI` / `CPI` | later | count cards |
| Délai moyen de réponse aux emails ou tickets | Average time to first useful reply | agency / métier | later | trend card later |
| Croissance parc | Change in managed stock over time | agency | later | monthly trend later |
| Mini comptes de résultat | Compact operating summary | agency | partial | summary table |

## Recommended MVP Priority

### Priority 1
- CA Syndic et Gestion
- Mini comptes de résultat
- Travaux votés vs terminés

### Priority 2
- Loyers encaissés vs loyers attendus
- Nombre de lots gestion locative et syndic

### Priority 3
- Budget voté vs dépenses réelles
- Décisions votées vs en attente
- Délai moyen de réponse
- Croissance parc

## Default Formulas For MVP Drafting

These are working defaults to avoid blocking the MVP framing. They can be refined later.

### CA Syndic et Gestion
- Sum of accounting lines grouped by:
  - agency
  - métier
  - category
- categories default to:
  - `honoraires`
  - `vacations`
  - `suivi_travaux`
  - `autres`

### Mini comptes de résultat
- simplified financial summary per agency:
  - total credit
  - total debit
  - net

### Travaux votés vs terminés
- count items tagged as approved work versus items tagged as completed work
- if no explicit status source exists yet, show this block as pending source confirmation

## MVP Display Rules
- Show `ready` KPIs first.
- Show `partial` KPIs only if their formula and source are made explicit in code.
- Show `later` KPIs as disabled blocks or omit them entirely from V1.

## Known Gaps
- Several KPI formulas are still implied rather than contractually defined.
- Some KPI inputs likely need a new normalized export sheet or a dedicated aggregation flow.
