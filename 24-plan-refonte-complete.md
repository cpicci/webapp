# Plan de Refonte UI — Operator Workspace

## État Actuel

### Ce qui est fait ✅
| Élément | Statut | Fichier |
|---------|--------|---------|
| Wireframe HTML | Créé | `workspace-v2.html` |
| Wireframe CSS | Créé | `workspace-v2.css` |
| Session documentée | Faite | `23-wireframe-v2-session.md` |
| Spec produit | Validé | `20-central-parc-immo-operator-workspace-spec.md` |
| Plan implémentation | Validé | `21-fresh-start-implementation-plan.md` |

### Ce qui reste à faire ❌

---

## Phase 0 : Validation Visuelle (PRIORITAIRE)

### Objectif
Valider le wireframe avec la charte Central Parc Immo avant toute implémentation React.

### Tâches

#### 0.1 — Appliquer la charte graphique
**Fichier :** `workspace-v2.css`

- [ ] Définir la palette de couleurs Central Parc Immo
  - Rouge corail (accent principal)
  - Couleurs neutres (fond, texte, borders)
  - Couleurs d'état (urgent, overdue, routine, recent, drafted)
- [ ] Appliquer la typographie
  - Polices (titres, corps, captions)
  - Tailles et hiérarchie
  - Interlignage et espacements
- [ ] Ajuster le ton "luxe sobre"
  - Réduire les borders visibles
  - Augmenter les espacements
  - Affiner les ombres et surfaces

#### 0.2 — Réduire l'effet "dashboard"
**Fichier :** `workspace-v2.html` + `workspace-v2.css`

- [ ] Supprimer les éléments qui font "dashboard"
  - Badges trop visibles ?
  - Groupes trop marqués ?
  - Trop de surfaces distinctes ?
- [ ] Renforcer l'effet "file de travail"
  - Liste plus continue
  - Séparateurs plus discrets
  - Hiérarchie plus subtile

#### 0.3 — Valider avec l'utilisateur
**Livrable :** Wireframe HTML ouvert dans Chrome

- [ ] Ouvrir `workspace-v2.html` dans Chrome
- [ ] Faire valider la structure
- [ ] Faire valider les couleurs
- [ ] Faire valider la hiérarchie
- [ ] Noter les retours dans `23-wireframe-v2-session.md`

### Critères de sortie
- [ ] Wireframe validé par l'utilisateur
- [ ] Charte graphique appliquée
- [ ] Plus d'effet "dashboard" perçu

---

## Phase 1 : Architecture des Composants

### Objectif
Définir l'architecture des composants React avant de coder.

### Tâches

#### 1.1 — Nettoyage des anciens composants
**Fichiers à supprimer :**
- `src/components/OperationalPanels.tsx` (trop dashboard)
- `src/components/KpiOverview.tsx` (KPI wall rejetée)
- `src/components/EmptyState.tsx` (à refaire)

**Fichiers à garder :**
- `src/hooks/useDashboardFilters.ts` (contract stable)
- `src/hooks/useLiveDashboardData.ts` (contract stable)
- `src/data/dashboardAdapter.ts` (contract stable)
- `src/types/dashboard.ts` (à vérifier)

#### 1.2 — Nouveaux composants à créer
**Structure cible :**

```
src/
├── App.tsx                    # Refait : shell + providers
├── components/
│   ├── OperatorShell.tsx      # Nouveau : shell minimal
│   ├── WorkQueue.tsx          # Nouveau : file de travail
│   ├── QueueGroup.tsx         # Nouveau : groupe dans la file
│   ├── QueueItem.tsx          # Nouveau : élément sélectionnable
│   ├── PersistentDetail.tsx   # Nouveau : détail persistant
│   ├── DetailMeta.tsx         # Nouveau : métadonnées détail
│   ├── FilterBar.tsx          # Gardé : filtres compacts
│   └── EmptyState.tsx         # Refait : état vide opérateur
├── data/
│   └── dashboardAdapter.ts    # Gardé (contract stable)
├── hooks/
│   ├── useDashboardFilters.ts # Gardé
│   ├── useLiveDashboardData.ts# Gardé
│   └── useQueueSelection.ts   # Nouveau : gestion sélection
└── types/
    └── dashboard.ts           # Gardé (si compatible)
```

### Critères de sortie
- [ ] Architecture documentée
- [ ] Anciens composants supprimés
- [ ] Hooks et adapters préservés

---

## Phase 2 : Implémentation Shell

### Objectif
Créer le shell minimal "personal agency".

### Tâches

#### 2.1 — Component OperatorShell
**Fichier :** `src/components/OperatorShell.tsx`

**Contenu :**
- Identité produit (Central Parc Immo)
- Utilisateur connecté (Bonjour Fabrice)
- Contexte agence (CPI)
- Navigation minimale (si nécessaire)

**Règles :**
- Pas de hero banner
- Pas de navigation marketing
- Ton sobre, interne

#### 2.2 — Refonte App.tsx
**Fichier :** `src/App.tsx`

**Nouvelle structure :**
```tsx
function App() {
  // 1. Hooks existants (données, filtres)
  // 2. État local (sélection)
  // 3. Rendu :
  //    - OperatorShell
  //    - FilterBar
  //    - WorkQueue + PersistentDetail
}
```

### Critères de sortie
- [ ] Shell rendu correctement
- [ ] Plus de navigation multi-vues
- [ ] Ton "application interne"

---

## Phase 3 : Implémentation File de Travail

### Objectif
Créer la file de travail groupée avec sélection.

### Tâches

#### 3.1 — Component WorkQueue
**Fichier :** `src/components/WorkQueue.tsx`

**Props :**
```tsx
{
  items: FollowUpItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}
```

**Comportement :**
- Affiche une liste continue
- Gère la sélection
- Scroll fluide

#### 3.2 — Component QueueGroup
**Fichier :** `src/components/QueueGroup.tsx`

**Props :**
```tsx
{
  title: string;
  badge?: number;
  items: FollowUpItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}
```

**Groupes :**
1. Urgences du jour
2. Dossiers suivis
3. Relances à traiter
4. Relances préparées

#### 3.3 — Component QueueItem
**Fichier :** `src/components/QueueItem.tsx`

**Props :**
```tsx
{
  item: FollowUpItem;
  isSelected: boolean;
  onSelect: () => void;
}
```

**Contenu :**
- Kicker (pôle/type)
- Titre
- Contexte (copro, lot)
- Métadonnées (date, statut)
- Badge d'état

### Critères de sortie
- [ ] File de travail rendue
- [ ] Groupes visibles mais discrets
- [ ] Sélection fonctionnelle
- [ ] Plus de cartes groupées style dashboard

---

## Phase 4 : Implémentation Détail Persistant

### Objectif
Créer le panneau de détail utile et opérationnel.

### Tâches

#### 4.1 — Component PersistentDetail
**Fichier :** `src/components/PersistentDetail.tsx`

**Props :**
```tsx
{
  item: FollowUpItem | null;
  isLoading: boolean;
}
```

**Structure :**
- Header (nature + statut)
- Carte de résumé
- Grille de métadonnées
- Actions principales
- Support secondaire (activité récente)

#### 4.2 — Component EmptyState
**Fichier :** `src/components/EmptyState.tsx`

**Quand affiché :**
- Aucun élément sélectionné
- Aucun élément disponible après filtrage

**Contenu :**
- Message opérateur (pas de placeholder générique)
- Guidance si pertinent

### Critères de sortie
- [ ] Détail affiché à droite (desktop)
- [ ] Détail en dessous (mobile)
- [ ] Empty state explicite
- [ ] Pas décoratif : utile par défaut

---

## Phase 5 : Styles et Motion

### Objectif
Appliquer le design system et les animations.

### Tâches

#### 5.1 — Refonte styles.css
**Fichier :** `src/styles.css`

**À faire :**
- Copier les styles validés de `workspace-v2.css`
- Adapter aux composants React
- Ajouter les variantes d'état
- Vérifier responsive

#### 5.2 — Animations et transitions
**Fichier :** `src/styles.css`

**À ajouter :**
- Transition sur sélection (fond, border)
- Transition sur hover
- Motion calme pour les changements de contexte
- Pas d'animation intrusive

### Critères de sortie
- [ ] Styles cohérents avec wireframe validé
- [ ] Responsive desktop/mobile
- [ ] Animations calmes et utiles

---

## Phase 6 : Vérification

### Objectif
Vérifier que tout fonctionne correctement.

### Tâches

#### 6.1 — Tests techniques
```bash
npm run build      # Doit passer
npm run test       # Tests verts
npm run dev        # Lance sans erreur
```

#### 6.2 — Vérifications manuelles
- [ ] Pas d'overflow horizontal desktop
- [ ] Pas d'overflow horizontal mobile
- [ ] Pas de texte en anglais
- [ ] Pas de `unknown` affiché
- [ ] Sélection fonctionne
- [ ] Filtres réinitialisent la sélection
- [ ] Console propre (pas d'erreurs)

#### 6.3 — Gates de validation

**Gate A :** Le shell lit-il comme une application sobre ?
- [ ] Oui → Continue
- [ ] Non → Refaire Phase 2

**Gate B :** La file lit-elle comme une queue de travail ?
- [ ] Oui → Continue
- [ ] Non → Refaire Phase 3

**Gate C :** Le détail est-il opérationnel (pas décoratif) ?
- [ ] Oui → Continue
- [ ] Non → Refaire Phase 4

**Gate D :** L'ensemble est-il une rupture avec le dashboard ?
- [ ] Oui → Terminé
- [ ] Non → Revoir l'architecture

---

## Résumé des Fichiers

### À créer
| Fichier | Phase | Description |
|---------|-------|-------------|
| `src/components/OperatorShell.tsx` | 2 | Shell minimal |
| `src/components/WorkQueue.tsx` | 3 | File de travail |
| `src/components/QueueGroup.tsx` | 3 | Groupe dans la file |
| `src/components/QueueItem.tsx` | 3 | Élément sélectionnable |
| `src/components/PersistentDetail.tsx` | 4 | Détail persistant |
| `src/components/DetailMeta.tsx` | 4 | Métadonnées détail |
| `src/components/EmptyState.tsx` | 4 | État vide |
| `src/hooks/useQueueSelection.ts` | 1 | Gestion sélection |

### À modifier
| Fichier | Phase | Description |
|---------|-------|-------------|
| `src/App.tsx` | 2 | Refonte complète |
| `src/styles.css` | 5 | Adapter aux nouveaux composants |
| `workspace-v2.css` | 0 | Appliquer charte (pré-React) |

### À supprimer
| Fichier | Phase | Raison |
|---------|-------|--------|
| `src/components/OperationalPanels.tsx` | 1 | Trop dashboard |
| `src/components/KpiOverview.tsx` | 1 | KPI wall rejetée |

### À garder (contracts stables)
| Fichier | Raison |
|---------|--------|
| `src/hooks/useDashboardFilters.ts` | Contract stable |
| `src/hooks/useLiveDashboardData.ts` | Contract stable |
| `src/data/dashboardAdapter.ts` | Contract stable |
| `src/types/dashboard.ts` | Types compatibles |

---

## Prochaine Action Immédiate

**Phase 0 avant tout le reste :**

1. Ouvrir `workspace-v2.html` dans Chrome
2. Valider la structure avec l'utilisateur
3. Appliquer la charte Central Parc Immo
4. Itérer jusqu'à validation complète
5. **Seulement ensuite** passer à l'implémentation React

---

## Notes Importantes

- **Ne pas sauter la Phase 0** : Le wireframe doit être validé avant de coder
- **Garder les contracts stables** : Ne pas changer les hooks/adapters sauf nécessité
- **Gates strictes** : Si un gate échoue, revenir en arrière
- **Documentation** : Mettre à jour `23-wireframe-v2-session.md` après chaque session
