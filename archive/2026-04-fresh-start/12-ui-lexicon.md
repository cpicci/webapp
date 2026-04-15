# UI Lexicon

## Goal
Define the canonical French UI vocabulary for the webapp so the next correction pass can stop mixing English, technical wording, unstable naming, and unprofessional French without accents.

## Important Rule About French
All visible French UI text must use proper accents when the correct French spelling requires them.

ASCII-only French UI text is not acceptable for the final interface quality bar.

## Core Principles
- Use one French label per concept and keep it everywhere.
- Prefer métier language over dashboard language.
- Prefer user action and operational clarity over system explanation.
- Keep labels short, direct, and usable in daily agency work.
- Avoid synthetic or builder-sounding wording.

## Product Voice

### Voice
- sobre
- fiable
- calme
- professionnel
- utile au quotidien

### Tone Rules
- speak like a serious internal product, not a spec document
- use short task-oriented labels
- avoid unnecessary English
- avoid technical explanations unless the user actually needs them
- avoid marketing tone and avoid AI-sounding polish language

## Canonical Naming

| Concept | Canonical label | Notes |
|---------|-----------------|-------|
| App title | `Pilotage de l'activité` | Better as a durable screen title than a dashboard-like label |
| Source status | `État des données` | Clearer and more product-facing than `Source status` |
| Live workbook | `Source active` | Keep the workbook name as the value, not the label |
| Last synced | `Mise à jour` | Natural for a business tool |
| Primary dimensions | `Filtres disponibles` | Explains the role, not the data model |
| Pole filter | `Pôle` only if client validates it, otherwise `Pôle` should not be forced | Keep current `Pole` if that is the true métier wording, but the final spelling must be explicitly validated |
| Status filter | `Suivi` | Simpler than `Status` or `Suivi relance` |
| All poles | `Tous les pôles` if `Pôle` is validated, otherwise `Tous les poles` is a temporary fallback | Final spelling depends on client terminology validation |
| All statuses | `Tous les suivis` | Full French |
| Open | `Ouverts` | Works for dossiers and the current scope |
| Pending | `À traiter` | Better than literal workflow language |
| Drafted | `Préparées` | Better than `Brouillon` if the user sees them as prepared relances |
| KPI overview | `Indicateurs de suivi` | Better than KPI/dashboard framing |
| Open dossiers | `Dossiers ouverts` | Full French |
| Pending relances | `Relances à traiter` | Full French |
| Drafted relances | `Relances préparées` | Full French |
| Action needed | `Priorités du jour` | Feels product-oriented rather than technical |
| Recent activity | `Activité récente` | Full French |
| Coming soon KPIs | `Indicateurs à venir` | Full French |
| Coming soon | `À venir` | Full French |
| Source to confirm | `Source à confirmer` | Keep |
| Action queue | `Priorités du jour` | Stronger for daily use |
| Dossier list | `Dossiers suivis` | Less list-like, more product-like |
| Pending relances panel | `Relances à traiter` | Keep consistent with KPI layer |
| Drafted relances panel | `Relances préparées` | Keep consistent with KPI layer |
| Compta support | `Repère comptable` | More specific and less vague than `support` |
| Recent | `Recent` is forbidden | Use `Récente` only when grammar requires it, otherwise use a fuller label like `Activité récente` |
| Due | `Échéance` | Full French |
| Reference | `Référence dossier` | Clearer than `Reference` alone |
| Contact | `Contact` | Keep |
| Unassigned | `Non attribué` | More natural than `Non assigné` in this UI |
| Unknown source value | `Valeur source non exploitable` | Explains the issue without sounding technical for tech's sake |
| Empty state | `Aucune donnée exploitable pour ce filtre.` | Better than literal live-data wording |

## String Replacement Table

| Current text | Target text |
|--------------|-------------|
| `Loading live data...` | `Chargement des données...` |
| `Unable to load live data.` | `Impossible de charger les données.` |
| `No snapshot available.` | `Aucune donnée n'est disponible pour le moment.` |
| `Pilotage des dossiers et relances` | `Pilotage de l'activité` |
| `Pilotage de l'activite` | `Pilotage de l'activité` |
| `Source live back-office` | `Données back-office en direct` |
| `Source status` | `État des données` |
| `Live workbook` | `Source active` |
| `Last synced` | `Mise à jour` |
| `Primary dimensions` | `Filtres disponibles` |
| `Pole / Status` | `Pole / Suivi` until `Pôle` is validated |
| `Dashboard filter bar` | `Filtres de travail` |
| `All poles` | `Tous les pôles` or `Tous les poles` depending on validated métier spelling |
| `All statuses` | `Tous les suivis` |
| `Open` | `Ouverts` |
| `Pending` | `À traiter` |
| `Drafted` | `Préparées` |
| `KPI overview` | `Indicateurs de suivi` |
| `Open dossiers` | `Dossiers ouverts` |
| `Pending relances` | `Relances à traiter` |
| `Drafted relances` | `Relances préparées` |
| `Action needed` | `Priorités du jour` |
| `Recent activity` | `Activité récente` |
| `Coming soon KPIs` | `Indicateurs à venir` |
| `Coming soon` | `À venir` |
| `No live data for this scope yet.` | `Aucune donnée exploitable pour ce filtre.` |
| `Recent` | forbidden as-is in the live UI |
| `Due` | `Échéance` |
| `Action queue` | `Priorités du jour` |
| `Dossier list` | `Dossiers suivis` or `Dossiers ouverts` depending on section purpose |
| `Reference` | `Référence dossier` |
| `Non assigne` | `Non attribué` |
| `Non attribue` | `Non attribué` |
| `Unknown source value` | `Valeur source non exploitable` |

## Section Copy Rules

### Shell
- one headline
- one short explanatory line maximum
- no speculative product language
- no copy that sounds like a presentation deck

### Filters
- one short intro line maximum
- helper text should explain the effect of the filter, not the design intent

### KPI Layer
- note text should explain the operational meaning in plain French
- avoid references to `scope`, `workflow`, or internal system language unless indispensable

### Panels
- titles should reflect what the user comes to do
- helper text should be short and operational
- metadata labels should be stable and always in French

## Forbidden Patterns
- mixed English/French labels
- visible French without proper accents
- builder language like `scope`, `pilot`, `overview`, `queue` in the live UI
- technical phrases like `snapshot`, `source value`, `primary dimensions` when simpler product language works
- abstract copy that explains what the interface is trying to be instead of what the user can do

## Ready-To-Build Rule
Before the next implementation pass, every visible UI string touched by the main screen should either:
- exist in this lexicon, or
- be explicitly approved as a new canonical term
