# UI Copy And IA Audit

## Goal
Document everything that still feels artificial, inconsistent, or too dashboard-like in the current webapp UI so the next correction pass can fix copy, naming, and information architecture before more visual polish.

## Scope
This audit covers the currently visible main screen and its primary strings:
- app shell
- source status
- filters
- KPI layer
- operational panels
- empty states and metadata labels

It does not yet rewrite the UI. It identifies what must change and why.

## Product Context
- The current MVP remains centered on dossiers, relances, and operational follow-up.
- Assistant and intelligent search are not part of the current implementation slice, but they are part of the product trajectory and should influence how the app is framed.

Reference points:
- `webapp/01-mvp-scope.md:40-49`
- `webapp/07-source-of-truth.md:74-89`
- `webapp/08-v1-product-checklist.md:59-67`
- `docs/5. (NEW) L'après MVP.md:184-193`
- `docs/10. (NEW) WEBAPP KPIs.md:17-19`

## Global Findings

### 1. The screen still behaves like a dashboard
- The interface is still one large reporting page rather than a clearly structured métier application.
- The current grouping favors visible blocks over true user tasks.
- The UI does not yet prepare a clear future place for assistant or intelligent search capabilities.

### 2. The copy is still mixed and unstable
- French and English are still mixed in the visible UI.
- Some labels sound technical, synthetic, or builder-written.
- Some helper texts explain the system instead of supporting a real user action.

### 3. Naming is not stabilized
- The same concepts are expressed with mixed levels of formality and mixed language.
- Several labels are placeholders for internal understanding rather than final product language.

### 4. The content model is too UI-fragile
- Important visible text still comes from technical view-model code rather than a deliberate UI copy layer.
- This makes consistency hard to maintain.

## Audit Rules

### Severity
- `critical`: breaks credibility or readability immediately
- `high`: strongly contributes to artificial or unfinished product feel
- `medium`: understandable but still wrong or inconsistent
- `low`: acceptable for now but should still be normalized later

### Action Types
- `rewrite`: keep the concept, rewrite the text
- `rename`: change the UI label entirely
- `remove`: remove the text because it should not be visible
- `move`: keep the information, but move or demote it structurally

## Exhaustive Visible Copy Audit

| Area | Current text | File reference | Severity | Problem | Action | Guidance |
|------|--------------|----------------|----------|---------|--------|----------|
| Shell | `Loading live data...` | `src/App.tsx:20` | high | English, technical, cold | rewrite | Replace with short French loading language appropriate for a daily tool |
| Shell | `Unable to load live data.` | `src/App.tsx:32` | high | English, backend-oriented phrasing | rewrite | Explain the issue in product language, not system language |
| Shell | `No snapshot available.` | `src/App.tsx:33` | high | technical fallback copy | rewrite | Use a product message that explains what is missing and what to do next |
| Shell | `Pilotage des dossiers et relances` | `src/App.tsx:11,19,31,47` | medium | better than before, but still generic and dashboard-like | review | Decide whether this is the final product name for the main screen or only a temporary title |
| Shell | `Une interface de suivi sobre et priorisee...` | `src/App.tsx:48-50` | high | synthetic product-writing, still sounds written for a review rather than for the user | rewrite | Shorten and ground in actual daily value |
| Shell | `Suivi syndic` | `src/App.tsx:53` | medium | too narrow if the app also spans other poles | review | Confirm whether this ribbon reflects reality or introduces bias |
| Shell | `Source live back-office` | `src/App.tsx:54` | high | mixed French/English, technical | rewrite | Keep the source honesty, but phrase it in cleaner French |
| Source status | `Source status` | `src/App.tsx:59` | critical | English title in a French app | rename | Must be fully French |
| Source status | `Live workbook` | `src/App.tsx:62` | critical | English and too technical | rewrite | Name the source in user-facing French |
| Source status | `Last synced` | `src/App.tsx:66` | critical | English and mechanical | rewrite | Use French wording for freshness/synchronization |
| Source status | `Primary dimensions` | `src/App.tsx:70` | high | technical analytics language | rename | Replace with a user-facing label for active filters or scope |
| Source status | `Pole / Status` | `src/App.tsx:71` | medium | understandable, but still half technical because of `Status` | rewrite | Full French naming |
| Source status | `La source live reflete le workbook back-office courant...` | `src/App.tsx:74-76` | high | mixed register, still technical, not elegant | rewrite | Keep the truth, but simplify and clarify |
| Filters | `Dashboard filter bar` | `src/components/FilterBar.tsx:27` | high | English accessibility label that reflects internal structure, not product language | rename | Use French region naming |
| Filters | `Vue active` | `src/components/FilterBar.tsx:29` | medium | acceptable, but may still be too abstract | review | Check against actual user mental model |
| Filters | `Prioriser le travail en cours` | `src/components/FilterBar.tsx:30` | medium | closer to product language, but still broad | review | Keep only if it aligns with final IA |
| Filters | `Ajuster la lecture par pole et par etat de suivi...` | `src/components/FilterBar.tsx:31-33` | high | synthetic and explanatory | rewrite | Make it shorter and more action-oriented |
| Filters | `Pole actif` | `src/components/FilterBar.tsx:39` | low | mostly fine | review | Keep if `pole` remains the canonical term |
| Filters | `Cadrer la lecture par domaine operationnel.` | `src/components/FilterBar.tsx:40` | medium | still sounds designed rather than used | rewrite | Reduce abstraction |
| Filters | `Suivi relance` | `src/components/FilterBar.tsx:63` | medium | singular and slightly awkward | rewrite | Align with final relance vocabulary |
| Filters | `Basculer entre les dossiers ouverts et les relances a traiter.` | `src/components/FilterBar.tsx:64` | medium | understandable, but still broad and builder-like | rewrite | Make it more direct |
| Filters | `All poles` | `src/components/FilterBar.tsx:15` | critical | English | rename | Full French |
| Filters | `All statuses` | `src/components/FilterBar.tsx:15` | critical | English | rename | Full French |
| Filters | `Open` | `src/components/FilterBar.tsx:18` | critical | English | rename | Full French |
| Filters | `Pending` | `src/components/FilterBar.tsx:19` | critical | English | rename | Full French |
| Filters | `Drafted` | `src/components/FilterBar.tsx:20` | critical | English | rename | Full French |
| KPI | `KPI overview` | `src/components/KpiOverview.tsx:9` | high | English region label and dashboard framing | rename | French and less dashboard-centric |
| KPI | `Open dossiers` | `src/data/dashboardAdapter.ts:330` | critical | mixed French/English | rename | Full French naming |
| KPI | `Open subjects currently visible in the active operational scope.` | `src/data/dashboardAdapter.ts:332` | critical | English and artificial | rewrite | Full French and shorter |
| KPI | `Pending relances` | `src/data/dashboardAdapter.ts:340` | critical | mixed language | rename | Full French |
| KPI | `Follow-ups still waiting for action in the current scope.` | `src/data/dashboardAdapter.ts:342` | critical | English and system-oriented | rewrite | User-facing French |
| KPI | `Drafted relances` | `src/data/dashboardAdapter.ts:350` | critical | mixed language | rename | Full French |
| KPI | `Relances already drafted and visible in the current scope.` | `src/data/dashboardAdapter.ts:344` | critical | English and awkward | rewrite | Full French |
| KPI | `Action needed` | `src/data/dashboardAdapter.ts:352` | critical | English | rename | Full French |
| KPI | `Items that require follow-up now or are already overdue.` | `src/data/dashboardAdapter.ts:354` | critical | English and system phrasing | rewrite | Full French, shorter |
| KPI | `Recent activity` | `src/data/dashboardAdapter.ts:362` | critical | English | rename | Full French |
| KPI | `Items created recently in the current operational scope.` | `src/data/dashboardAdapter.ts:364` | critical | English and abstract | rewrite | Full French and more natural |
| KPI | `Coming soon KPIs` | `src/data/dashboardAdapter.ts:136` | critical | English and product-builder tone | rename | Full French |
| KPI | `Coming soon` | `src/data/dashboardAdapter.ts:137` | critical | English placeholder | rename | Full French |
| KPI | `Source a confirmer` | `src/components/KpiOverview.tsx:22` | medium | acceptable, but still generic | review | Keep only if tone is harmonized with the rest |
| KPI | `Pending source confirmation` | `src/data/dashboardAdapter.ts:141,149` | critical | English technical source note | rewrite | Full French |
| Panels | `No live data for this scope yet.` | `src/components/OperationalPanels.tsx:19` | critical | English empty state | rewrite | Full French, user-helpful |
| Panels | `Recent` | `src/components/OperationalPanels.tsx:25,91` | critical | English | rename | Full French |
| Panels | `Due` | `src/components/OperationalPanels.tsx:41,176,211` | critical | English | rename | Full French |
| Panels | `Action queue` | `src/components/OperationalPanels.tsx:58` | critical | English title | rename | Full French and métier-aligned |
| Panels | `Les sujets a prendre en main en priorite...` | `src/components/OperationalPanels.tsx:59` | medium | okay intent, still generic | rewrite | Make it more operational and less abstract |
| Panels | `Recent activity` | `src/components/OperationalPanels.tsx:92` | critical | English title | rename | Full French |
| Panels | `Les mouvements recents a garder visibles...` | `src/components/OperationalPanels.tsx:93` | medium | decent but still explanatory | rewrite | More concrete, less meta |
| Panels | `Dossier list` | `src/components/OperationalPanels.tsx:126` | critical | English title | rename | Full French |
| Panels | `Les dossiers visibles dans le scope courant...` | `src/components/OperationalPanels.tsx:127` | medium | `scope` mental model still implied | rewrite | Simpler and more user-natural |
| Panels | `Reference` | `src/components/OperationalPanels.tsx:147` | high | English label | rename | Full French |
| Panels | `Pending relances` | `src/components/OperationalPanels.tsx:165` | critical | mixed language | rename | Full French |
| Panels | `Les relances encore ouvertes...` | `src/components/OperationalPanels.tsx:166` | medium | acceptable intent but still synthetic | rewrite | Shorter and more direct |
| Panels | `Contact` | `src/components/OperationalPanels.tsx:186,221` | low | acceptable | review | Keep if consistent with user terminology |
| Panels | `Non assigne` | `src/components/OperationalPanels.tsx:187,222` | medium | acceptable, but may need a more natural term | review | Confirm with métier wording |
| Panels | `Drafted relances` | `src/components/OperationalPanels.tsx:200` | critical | mixed language | rename | Full French |
| Panels | `Les relances deja preparees...` | `src/components/OperationalPanels.tsx:201` | medium | understandable, but still sounds designed | rewrite | Keep closer to actual user action |
| Panels | `Support` | `src/components/OperationalPanels.tsx:234` | medium | vague category label | review | Confirm whether client understands this grouping |
| Panels | `Les elements comptables de contexte utiles au pilotage...` | `src/components/OperationalPanels.tsx:236` | high | very builder-like and abstract | rewrite | More concrete, less strategic language |
| Panels | `Unknown source value` | `src/components/OperationalPanels.tsx:253` | critical | English technical warning | rewrite | Full French and user-helpful |
| Meta | `EUR` | `src/components/OperationalPanels.tsx:12` | low | acceptable in finance context | keep | No urgent issue |
| Meta | `Pole` | multiple | low | acceptable if this is a validated métier term | keep/review | Keep unless client prefers another label |
| Meta | `Echeance`, `Creee`, `Montant` | multiple | low | mostly acceptable | normalize | Keep accents and final wording consistent |

## Structural IA Findings

### Current screen problem
The current screen still groups content as:
- hero
- source status
- filters
- KPIs
- panels

This is visually cleaner than before, but structurally it still behaves like a dashboard composition.

### What daily users likely need first
Based on the current product and brief, the main entry priorities should be closer to:
1. what needs action now
2. which dossiers are active or blocked
3. which relances need preparation or follow-up
4. what changed recently
5. what source or support context helps explain the situation

### IA mismatch
- Source framing still sits too high relative to daily action.
- KPI cards still take too much centrality for a product that is supposed to be dossier/relance-first.
- The current screen does not yet show a strong distinction between daily action surfaces and supporting context.
- No clear reserved structural zone exists yet for future search or assistant entry points.

## Naming System Problems

### Concepts that need a final canonical label
- source status
- pole
- status
- relance pending/drafted
- action queue
- recent activity
- dossier list
- support/compta support
- reference
- contact/non assigne

### Immediate naming rule
Pick one French label per concept and use it everywhere.

No mixed English/French labels should remain in the live UI after the next correction pass.

## Rewrite Priorities

### Critical
- remove all visible English UI labels
- replace all mixed-language KPI labels and notes
- remove technical or internal-sounding wording from shell and source framing

### High
- simplify helper texts and section copy
- replace dashboard-sounding titles with métier-facing titles
- centralize visible UI copy instead of scattering it across technical layers

### Medium
- normalize metadata labels
- refine the tone of explanatory lines
- align section naming with a more application-like IA

## Next Correction Pass

The next pass should do this in order:
1. define the canonical French lexicon
2. rewrite all visible copy according to that lexicon
3. reframe the main screen around user actions, not dashboard sections
4. reduce the centrality of KPI/support language if it competes with dossiers and relances
5. reserve a future structural place for assistant/search without implementing them yet

## User Review After The First Application Pass

### Rejected As Still Insufficient
The current result is explicitly rejected by the user for these reasons:
- it still feels like AI slop
- it still feels too much like a dashboard
- margins and spacing are still not at the expected level
- the product still does not read as a real application
- French text quality is still not acceptable because accents are missing

### Additional Critical Findings
- Missing accents in visible French text now actively damage product credibility.
- The current workspace split is not enough by itself to break the dashboard feel.
- The visual language still feels assembled from blocks rather than designed as an application shell.
- The user is asking for a bigger update, not another series of small fixes.

### Latest Review Update
- Even after the accented-copy and topbar pass, the user still sees the product as essentially the same dashboard.
- The user explicitly reports that the margins still feel broken.
- The user explicitly reports that the appearance is still not professional enough.
- The next pass must therefore treat layout rhythm and global composition as primary problems, not secondary refinements.
