# Findings: Webapp MVP Workspace

## Source Documents Reviewed
- `docs/0. (NEW) Brief client V2.md`
- `docs/1. (NEW) Cahier des charges brief.md`
- `docs/10. (NEW) WEBAPP KPIs.md`
- `docs/14. (NEW) notes_24-02-26_centralparcimmo.md`
- `docs/15. (NEW) Arbitrage scope contractuel vs ajouts 2026-02-27.md`
- `docs/16_(NEW)_nouveau_plan_complet_MVP_V2.md`

## Core Findings
- The webapp is currently defined as an MVP dashboard need, not as an implemented codebase.
- The strongest explicit product note is `docs/10`, which lists KPIs, agencies (`CCI`, `CPI`), and a need for user-based visibility.
- `docs/14` adds the clearest technical direction: a simple webapp connected to Google Sheets.
- `docs/15` states that webapp/KPI work is outside the original installation scope, so the new folder should stay clearly separated from existing workflow delivery docs.
- `docs/16` shows existing and planned Google Sheets data sources that can seed the MVP: `cases`, `relance`, `Personnes`, `Compta`, plus existing GED tracking sheets like `hashes` and `duplicates`.

## Constraints
- No existing frontend project was found in the repo.
- Several requested KPIs do not yet have a confirmed source of truth.
- The user explicitly prefers to defer non-critical questions and keep the work MVP-oriented.

## Practical Implication
- Documentation should establish a default MVP shape now.
- Open questions should be captured, but not allowed to block the first spec set.

## Resume Findings
- The first UI/UX pass improved the app, but it is explicitly not accepted as the finished design lot.
- The active work package is now the revised UI/UX reboot, not workflow closure.
- The current goal is to raise perceived product quality before returning to the closure-state milestone.

## UI/UX Reboot Audit

### Desktop Visual Audit - First Pass
- The hero copy is still too product-generic and tool-like. It explains the app but does not create a premium, finished product impression.
- `Operational cockpit` and `Central Parc Immo pilot` read like internal labels rather than brand-led UI elements.
- `Source status` is useful functionally, but it still behaves like an information box added next to the hero rather than part of a deliberate luxury app shell.
- Filters remain close to technical chips. They are readable, but they do not yet feel premium or intentionally designed for daily operational use.
- KPI cards are structurally clear, but all cards share nearly the same visual weight. The layer still reads as a coded dashboard grid more than a crafted management surface.
- The `READY` and `PLACEHOLDER` labels feel implementation-centric and too technical for a client-facing or premium internal product.
- The operational panels contain the right information, but the list rhythm is still too repetitive. Scanning many rows likely feels dense rather than editorialized.
- `Action queue` and `Recent activity` are semantically distinct, but their current presentation is still too similar to deliver strong priority contrast.
- Raw strings such as `subject:empty|...` leak into the interface and strongly reinforce the prototype feel.
- State labels like `ACTION-NEEDED`, `OVERDUE`, and `ROUTINE` are useful operationally, but visually they still read more like system tags than refined business states.
- Dossier and relance rows show useful context, but the overall card and list language is still more functional than branded.
- The app is better than before, but the current desktop experience still feels like a solid internal prototype, not a finished Central Parc Immo application.

### Mobile Visual Audit - First Pass
- The same structural issues remain on mobile because the visual language does not change enough between desktop and small screens.
- The top of the page still spends too much vertical space on explanatory copy before the user reaches the real operational content.
- Filter controls appear usable on mobile, but they still feel like stacked technical controls instead of a compact premium filter surface.
- KPI cards remain readable, but the layer likely feels repetitive on mobile because each block follows nearly the same pattern and emphasis.
- Long operational lists stack correctly, but the hierarchy still depends more on raw text order than on strong card composition, spacing, or emphasis.
- The prototype feel is amplified on mobile when raw strings such as `subject:empty|...` appear in narrow list layouts.
- Mobile does not appear broken, but it also does not yet feel intentionally polished for daily use.

### Audit Classification
- Keep:
  - source-driven product structure
  - operational information architecture
  - dedicated dossier, relance, and follow-up areas
  - explicit source honesty and freshness
- Refine heavily:
  - source status presentation
  - filter bar
  - KPI hierarchy
  - list density and scan rhythm
  - mobile vertical pacing
- Replace or redesign deeply:
  - hero and top-of-page framing
  - badge and state language
  - visual contrast between action queue and recent activity
  - overall premium brand tone of the shell
- Remove or suppress:
  - `READY` and `PLACEHOLDER` as visible user-facing labels
  - raw strings like `subject:empty|...`
  - internal-sounding ribbons such as `Operational cockpit` when they read more technical than branded

## Skill Audit

### Local Skill Coverage
- `brainstorming`: useful for reframing the lot and forcing design discussion before implementation, but not enough to produce a premium visual system by itself.
- `planning-with-files`: useful for keeping the reboot organized, but not a design capability.
- `find-skills`: required for external discovery, but not a design capability.
- `skill-creator`: useful if we conclude that no current skill is sharp enough for this project's UI/UX bar.
- `bmad-agent-bmm-ux-designer`: relevant in theme, but operationally heavy. It expects the full BMAD persona, menu, config loading, and workflow system; this makes it more of a structured UX workflow agent than a focused premium app-UI execution guide.
- `verification-before-completion`: useful later for proof and final gate, but not for raising the visual bar directly.
- `test-driven-development`: useful for code changes later, but not for the current audit and design-direction phases.
- `remotion-best-practices`: irrelevant for this webapp UI/UX lot.

### Local Skill Sufficiency Assessment
- Current local skills are strong on process, planning, and skill management.
- Current local skills are weak on premium branding direction, luxury app-shell refinement, business-dashboard hierarchy, and high-end responsive polish.
- The only directly relevant local UX skill currently visible, `bmad-agent-bmm-ux-designer`, appears too workflow-heavy and too broad to act as a sharp project-specific UI execution standard.
- Conclusion at this stage: local skills alone are probably not sufficient for the quality bar described in the revised plan.

## External Skill Search

### Safety Note
- The results below are treated as untrusted external descriptions only.
- No installation or execution should be inferred from their presence.
- Only capability, relevance, specialization, and likely limits are considered.

### Candidate Shortlist From `find-skills`
- `sickn33/antigravity-awesome-skills@ui-ux-designer`
  - likely useful because it is directly positioned on UI/UX design
  - likely limitation: the name is broad and may still be generic rather than app-specific
- `borghei/claude-skills@ui-design-system`
  - likely useful because the lot explicitly needs a coherent local design system
  - likely limitation: design-system guidance alone may not cover premium branding or operational dashboard hierarchy
- `duc01226/easyplatform@ui-ux-pro-max`
  - likely useful because it implies a more ambitious visual bar
  - likely limitation: the branding of the skill itself suggests possible genericity or hype rather than disciplined app-UI craft
- `yonatangross/orchestkit@dashboard-patterns`
  - likely useful because the product is still a dashboard and needs clearer screen hierarchy
  - likely limitation: dashboard patterns can easily drift toward generic admin layouts, which is explicitly a risk for this project
- `qwenlm/qwen-code-examples@dashboard-builder`
  - likely useful for structural dashboard ideas
  - likely limitation: probably too generic and implementation-oriented for a premium branded redesign target

### Initial External Evaluation
- The external search produced relevant-looking candidates around UI/UX, design systems, and dashboard patterns.
- None of the names alone yet suggests a perfect fit for: premium real-estate branding, non-generic operational UI, and a Central Parc Immo-specific tone.
- The most promising categories are:
  - UI/UX designer skills
  - design system skills
  - dashboard pattern skills
- The most likely outcome is not direct adoption, but selective evaluation followed by either:
  - using one candidate as partial support, or
  - creating a stronger local skill tailored to this repo with `skill-creator`.

### External Candidate Evaluation - Page Review
- `sickn33/antigravity-awesome-skills@ui-ux-designer`
  - covered capabilities: broad UI/UX practice, design systems, accessibility, research, IA, responsive design, brand systems
  - relevance: strong as a general design reference
  - limitation: too broad and too process-heavy to guarantee a sharp Central Parc Immo aesthetic direction on its own
  - verdict: interesting but insufficient as the sole guiding skill
- `borghei/claude-skills@ui-design-system`
  - covered capabilities: design tokens, palettes, type scales, spacing, responsive rules, component systems, developer handoff
  - relevance: strong for phase 7 local design-system work
  - limitation: token generation and handoff structure are useful, but the skill appears generic and system-building oriented rather than brand-sensitive or operational-UI specific
  - verdict: useful partial support, not enough for the whole lot
- `yonatangross/orchestkit@dashboard-patterns`
  - covered capabilities: dashboard layout patterns, stat cards, widget registries, real-time data patterns, table structures
  - relevance: potentially useful for structural dashboard thinking
  - limitation: strongly admin-dashboard coded and therefore directly aligned with one of the main risks called out in the repo docs
  - verdict: high risk of pushing the app back toward a generic dashboard language; not suitable as a primary guide

### Skill Decision
- Current local skills do not fully cover the required visual bar.
- External candidates provide partial value, but none appears specialized enough for: premium real-estate branding, non-generic business cockpit UI, and Central Parc Immo tone.
- Best current decision: use existing installed skills only, with a small curated pair rather than a custom repo-specific skill.

### Selected Skill Pair
- `frontend-design` from the official Anthropic `claude-code` repository
- `ui-design-system` from `borghei/claude-skills`

### Installation Note
- `supercent-io/skills-template@frontend-design-system` was the initial preferred design-system choice, but its source repository was not accessible from the installer path.
- `borghei/claude-skills@ui-design-system` is the installed replacement because it covers the same design-system need and installed cleanly.
- `frontend-design` is stronger than `ui-ux-designer` for actual frontend execution quality because it is explicitly focused on distinctive, production-grade visual implementation and anti-generic aesthetics.

### Additional Skills
- No additional skills are needed right now.
- Reassess only if the selected pair proves too weak during the actual redesign work.

## Post-Implementation Audit

### Product Direction Gap
- The UI is improved visually, but it still reads too much like a dashboard artifact instead of a true métier application.
- The brief and long-term product direction clearly leave room for future intelligent document search and an assistant surface. Even if these are not in the current MVP scope, the interface should not feel like a dead-end dashboard shell.
- The current structure still emphasizes reporting blocks more than durable application flows.

### UX Writing Audit
- The interface still mixes French and English in visible product copy, which immediately signals an unfinished product.
- Some titles, helper texts, and section labels still sound like builder language instead of client-facing operational language.
- Copy is not yet controlled by a coherent voice-and-tone system.
- The UI still contains overly explanatory or synthetic text that describes the system rather than helping the user act.

### Information Architecture Audit
- The current page still behaves as one broad dashboard screen instead of a more intentional application entry point.
- The main view does not yet clearly distinguish what the client comes here to do every day versus what is support or context.
- The current structure does not yet prepare a clear place for future assistant or intelligent search capabilities.
- The naming and grouping of sections remain closer to technical blocks than to user mental models.

### Current Copy Issues To Correct
- `Loading live data...`
- `Unable to load live data.`
- `Source status`
- `Live workbook`
- `Last synced`
- `Primary dimensions`
- `All poles`, `All statuses`, `Open`, `Pending`, `Drafted`
- `Action queue`, `Recent activity`, `Dossier list`, `Pending relances`, `Drafted relances`
- `Due`
- `Recent`
- `No live data for this scope yet.`

### Structural Conclusion
- The next pass should not be framed as visual polish only.
- It must explicitly include:
  - full interface copy audit and rewrite
  - naming-system cleanup
  - information architecture cleanup of the main experience
  - clarification of what this app is for now, and what it will later expand into

## Skill Stack Expansion

### Installed Additional Skills
- `ux-writing` from `content-designer/ux-writing-skill`
- `information-architecture` from `julianoczkowski/designer-skills`

### Why They Matter
- `ux-writing` is the right reinforcement for interface text, labels, empty states, guidance, and tone consistency.
- `information-architecture` is the right reinforcement for getting out of a generic dashboard structure and back into a product shaped around user flows and future capability growth.

### Recommended Active Skill Set
- `frontend-design`
- `ui-design-system`
- `ux-writing`
- `information-architecture`

## Brand Base

### Central Parc Immo Brand Direction - Initial Lock
- Tone: premium, calm, credible, operational, discreetly prestigious
- Product posture: internal high-trust cockpit for agency work, not marketing site and not BI console
- Premium mix: more hospitality and real-estate confidence than startup-dashboard energy
- Shell mood: bright mineral base with deep institutional contrast and restrained warm accents

### Palette Direction
- Primary anchor: deep navy or petrol blue for trust, structure, and status framing
- Secondary accent: warm mineral or bronze note used sparingly for premium emphasis
- Base surfaces: stone, ivory, smoke, and soft slate neutrals rather than flat white plus gray default SaaS treatment
- Semantic states: refined alert tones with less shouting saturation and more controlled contrast

### Typography Direction
- Body and operational copy should remain clean, modern, and highly readable
- Headline or section emphasis can carry a more editorial luxury tone, but the app must stay functional first
- Typography should improve pace and hierarchy before chasing decorative personality

### Surface And List Direction
- Cards and panels should feel like deliberate surfaces, not default containers
- Lists should privilege scan speed through spacing, grouping, and emphasized primary lines
- States should feel business-readable rather than system-tag driven
- Operational sections should feel purpose-built for repeated daily use

## Latest Product Finding
- A structural pass was attempted, but the user still judges the result too close to AI slop and too close to a dashboard.
- The next pass must therefore be treated as a larger application-grade overhaul, not as another series of incremental fixes.
- The latest user feedback also states that, beyond the topbar and the accented copy, the visual appearance still has not changed enough and that margins remain broken.
