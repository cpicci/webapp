# V1 Product Checklist

This checklist exists to keep the webapp aligned with the real V1 need.

Use it before adding any new feature.

## Must Have

These items should work reliably before expanding the product.

### Dossiers
Current note: the app now shows a dedicated dossier list for the current source snapshot.
- [x] show the list of open dossiers from the source of truth
- [x] show dossier identifier
- [x] show summary or subject clearly
- [x] show status clearly
- [x] show copro and lot when available
- [x] show creation date or recent activity date

### Relances
Current note: pending and drafted relances are now visible in dedicated sections for the current source snapshot.
- [x] show relances linked to the operational flow
- [x] distinguish pending relances from already drafted relances
- [x] show due date clearly
- [x] show enough context to understand why a relance exists
- [ ] support follow-up until closure state is explicit

### Operational Follow-Up
Current note: action-needed, overdue, drafted, and recent activity are now separated in the current V1 UI.
- [x] show what needs action now
- [x] show what is late or still pending
- [x] show what was handled recently
- [x] avoid fake precision when the source is incomplete

### Filters
- [x] filters must reflect real source dimensions only
- [x] primary V1 filters should use dimensions already present in the workbook before any inferred business segmentation
- [x] if the source does not support a scope, show an explicit empty state
- [x] do not pretend agency or metier segmentation exists when it does not

### UX Basics
Current note: the previous UI/UX pass improved hierarchy and readability, but it is not yet considered client-deliverable.
- [x] primary screens are readable without training
- [x] no noisy BI-style overload
- [x] empty states explain the data limitation
- [x] labels use business language the agency understands
- [ ] the interface feels like a finished application rather than a scaffold
- [ ] the interface no longer feels like a dashboard dressed up as an application
- [ ] visible French UI uses proper accents and reads professionally
- [ ] margins, density, and spacing feel intentional on desktop and mobile
- [ ] the visual system is coherent across shell, filters, KPI cards, panels, badges, and empty states
- [ ] Central Parc Immo branding is recognizable without falling into a generic admin-dashboard style
- [ ] dossiers, relances, and operational follow-up are visually dominant over support information

Current note: the latest pass corrected some visible French and added a stronger topbar, but the user still judges the global appearance, margins, and application feel insufficient.

## Useful But Secondary

- [x] compta summary remains available as pilot information
- [x] KPI cards remain secondary to dossiers and relances
- [ ] basic role-based visibility can exist if it does not complicate the MVP
- [x] source freshness can be added once the data path is stable

## Later

- [ ] advanced KPI dashboard
- [ ] full compta analytics
- [ ] custom permission matrix
- [ ] chat assistant in the webapp
- [ ] issue-resolution agent in the webapp
- [ ] client-deliverable UI/UX and branding pass for Central Parc Immo

## Decision Rule

If a proposed feature does not improve one of these first three pillars:

1. dossiers
2. relances
3. operational follow-up

then it is probably not V1-critical.
