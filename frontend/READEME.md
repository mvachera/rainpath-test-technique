# Frontend - Interface React

Interface web pour visualiser et créer des dossiers d'anatomopathologie.

## 🔧 Technologies

- **React** 18 - Library UI
- **TypeScript** - Langage
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **@tailwindcss/postcss** - Plugin PostCSS

## 📁 Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── CaseForm.tsx       # Formulaire de création
│   │   └── CaseGraph.tsx      # Visualisation hiérarchique
│   ├── services/
│   │   └── api.ts             # Appels API
│   ├── types/
│   │   └── case.types.ts      # Interfaces TypeScript
│   ├── App.tsx                # Composant principal
│   ├── App.css                # Styles principaux
│   ├── main.tsx               # Point d'entrée
│   └── index.css              # Tailwind imports
├── tailwind.config.js         # Config Tailwind
├── postcss.config.js          # Config PostCSS
└── package.json
```

## 🚀 Installation
```bash
npm install
```

## ▶️ Lancement

**Mode développement :**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

**Build pour production :**
```bash
npm run build
```

Les fichiers buildés seront dans `dist/`

## 🎨 Fonctionnalités

### Onglet "Créer un dossier"

- Formulaire dynamique avec ajout/suppression illimité
- Structure hiérarchique : Prélèvements → Blocs → Lames
- Liste déroulante pour sélectionner la coloration
- Validation : tous les champs sont requis
- Messages de succès/erreur après soumission

### Onglet "Visualiser"

- Sélecteur de dossiers
- Affichage hiérarchique en graphe
- Couleurs distinctes par niveau :
  - 🔵 Prélèvements (bleu)
  - 🟢 Blocs (vert)
  - 🟣 Lames (violet)
- Flèches pour montrer les relations
- IDs auto-incrémentés visibles

## 📡 Connexion à l'API

L'application se connecte au backend sur `http://localhost:3000`.

Pour changer l'URL, modifiez `src/services/api.ts` :
```typescript
const API_BASE_URL = 'http://localhost:3000';
```

## 🎨 Colorations disponibles

- HES
- PAS
- IHC
- TRICHROME
- ALCIAN BLUE
- CONGO RED
- MASSON
- GIEMSA
- PAS D

## 🧩 Composants principaux

### CaseForm

Formulaire de création avec :
- State management React (useState)
- Gestion dynamique des listes
- Validation HTML5 (required)
- Messages de feedback utilisateur

### CaseGraph

Visualisation hiérarchique avec :
- Rendu récursif des niveaux
- Stylisation Tailwind
- Responsive design

### App

Composant principal avec :
- Gestion des onglets
- Chargement des données
- Sélection de dossiers

## 🎯 Prérequis

Le backend doit être lancé sur `http://localhost:3000` avant de démarrer le frontend.

## 🔄 Flow utilisateur

1. L'utilisateur clique sur "📝 Créer un dossier"
2. Remplit le formulaire (ajoute prélèvements/blocs/lames)
3. Sélectionne les colorations
4. Clique sur "Créer le dossier"
5. Voit le message de succès
6. Clique sur "📊 Visualiser (X)" pour voir le graphe
7. Sélectionne un dossier dans la liste
8. Visualise la hiérarchie complète

## 🎨 Personnalisation

**Changer les couleurs :**
Modifiez les classes Tailwind dans les composants.

**Ajouter des colorations :**
Modifiez la constante dans `CaseForm.tsx` :
```typescript
const COLORATIONS = ['HES', 'PAS', ...];
```