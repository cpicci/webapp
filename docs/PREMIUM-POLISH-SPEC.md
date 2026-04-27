# Webapp CPI — Spec Polish Premium

> **Date:** 2026-04-17
> **Statut:** En cours d'implémentation
> **Approche:** CSS-only, zéro dépendance ajoutée

---

## Contexte

La webapp CPI (Central Parc Immo) existe depuis fin mars 2026 et permet aux opérateurs de l'agence de voir leurs données (KPIs, dossiers, relances) synchronisées depuis Google Sheets vers Supabase.

**État initial (mars-avril 2026):**
- Interface fonctionnelle
- Code de qualité (TypeScript strict, tests unitaires)
- Architecture solide (React 19, hooks personnalisés)
- **Design sobre, voire spartiate** — pas d'animations, pas de transitions, pas de profondeur visuelle

**Décision (17 avril 2026):**
Transformer l'interface pour qu'elle ait une présence "premium" — animations d'entrée, transitions fluides, profondeur visuelle, éléments interactifs soignés. Sans restructurer le layout ni ajouter de dépendance.

---

## Périmètre

### Ce qui va changer

| Aspect | État actuel | État visé |
|--------|-------------|-----------|
| Animations | Aucune | Entrées cascade, transitions hover, shimmer skeleton |
| Depth | Tout à plat | Surface backgrounds, bordures subtiles, ombres légères |
| Typographie | Raleway 300 partout | Cormorant pour valeurs, hierarchy typographique |
| Interactions | Basiques | Hover lift, focus rings accent, button feedback |
| Loading | Texte "Chargement..." | Skeleton loaders avec shimmer |

### Ce qui NE change pas

- Couleurs (`--accent`, `--bg`, `--ink`...)
- Layout (max-width, grid, structure des composants)
- Architecture (composants, hooks, routes)
- Données (lecture depuis Supabase, KPIs calculés)
- Fonctionnalités

---

## Liste des animations et effets

### 1. Page de connexion

| Effet | Description |
|-------|-------------|
| Card entry | `fade + translateY(16px)` au montage, 400ms |
| Tab indicator | Surlignage glissant sous "Connexion"/"Créer un compte" |
| Input focus | Bordure passe en `--accent` à 150ms |
| Button feedback | Hover (`--accent-mid`), active (`scale(0.98)`) |
| Error shake | Oscillation horizontale 300ms à l'apparition |

### 2. Header (OperatorShell)

| Effet | Description |
|-------|-------------|
| Entry | `fade + translateY(-8px)` à 100ms du chargement |
| Depth | `border-bottom`, ombre subtile |
| Logout | Hover → couleur `--accent` |

### 3. FilterBar

| Effet | Description |
|-------|-------------|
| Surface | Background `--bg-soft`, bordure bas |
| Custom select | Chevron inline, focus ring `--accent` |
| Polling indicator | Badge "Actualisé" pulse au refresh en fond |

### 4. KPI Cards

| Effet | Description |
|-------|-------------|
| Cascade | Entrée décalée (60ms par carte) |
| Hover | `translateY(-3px)`, ombre plus profonde |
| Valeur | Cormorant Garamond, 2.2rem, 500 |
| Placeholder | Pas de hover, opacité réduite |

### 5. Queue Items

| Effet | Description |
|-------|-------------|
| Stagger | Entrée décalée (40ms par item) |
| Hover | Background `--bg-hover`, bordure gauche |
| Sélection | Background `--accent-soft`, bordure `--accent` |
| Hierarchy | Titre Raleway 400, meta Raleway 300 muted |

### 6. Detail Panel

| Effet | Description |
|-------|-------------|
| Entry | `fade + translateX(8px)` |
| Depth | Background `--bg-soft`, bordure gauche |
| Transition | Fade-in/out lors du changement d'item |
| Titre | Cormorant 1.6rem, kicker uppercase muted |

### 7. Skeleton Loader

| Effet | Description |
|-------|-------------|
| Shimmer | Gradient balaye de gauche à droite |
| Rows | 4-6 lignes mimant la queue |
| Detail | 3 lignes skeleton + bouton |

---

## Tokens CSS ajoutés

```css
:root {
  /* Durations */
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-enter: 300ms;
  --duration-page: 400ms;
  
  /* Easings */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Roadmap d'implémentation

| Étape | Tâche | Durée estimée | Statut |
|-------|-------|---------------|--------|
| 1 | CSS Foundation (tokens, animations de base, shimmer) | 30 min | À faire |
| 2 | Login Page (entry, tab indicator, shake) | 30 min | À faire |
| 3 | OperatorShell & FilterBar (depth, custom select) | 30 min | À faire |
| 4 | KPI Cards (cascade, hover lift, hierarchy) | 20 min | À faire |
| 5 | Queue Items (stagger, hover, hierarchy) | 20 min | À faire |
| 6 | Detail Panel (transition, depth, hierarchy) | 20 min | À faire |
| 7 | Skeleton Loader & refreshing indicator | 20 min | À faire |

**Total:** ~2h30-3h

---

## Critères de succès

- [ ] Tous les tests passent (21 vitests)
- [ ] TypeScript compile sans erreur
- [ ] Netlify deploy vert
- [ ] Animations fluides (60fps)
- [ ] Aucun changement de layout fonctionnel
- [ ] Zéro nouvelle dépendance

---

## Notes

- Le spec premium n'était pas dans le cahier des charges client (doc 0, 1, 10) — c'est une décision interne pour améliorer l'expérience opérateur
- L'objectif est de rendre l'interface "pro" pour le pilot client CPI
- Si le client demande des feedbacks pendant le pilot, on itère après
