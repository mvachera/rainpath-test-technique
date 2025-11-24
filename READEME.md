# Gestion de Dossiers - Anatomopathologie

Application full-stack pour la gestion hiérarchique de dossiers d'anatomopathologie.

## 📋 Structure du projetrainpath-test-technique/
├── backend/          # API NestJS + Prisma + SQLite
├── frontend/         # Interface React + TypeScript + Tailwind
└── README.md         # Ce fichier

## 🏗️ Architecture

**Backend :**
- NestJS 10
- Prisma ORM
- SQLite
- TypeScript
- Validation avec class-validator

**Frontend :**
- React 18
- TypeScript
- Vite
- Tailwind CSS

## 🚀 Installation et lancement

### Prérequis
- Node.js 18+
- npm

### Démarrage rapide

**1. Backend (Terminal 1)**
```bashcd backend
npm install
npx prisma migrate dev
npm run start:dev
L'API sera accessible sur `http://localhost:3000`

**2. Frontend (Terminal 2)**
```bashcd frontend
npm install
npm run dev
L'interface sera accessible sur `http://localhost:5173`

## 📊 Fonctionnalités

### Backend
- ✅ POST /cases - Créer un dossier
- ✅ GET /cases - Lister tous les dossiers
- ✅ GET /cases/:id - Récupérer un dossier spécifique
- ✅ Base de données SQLite avec Prisma
- ✅ Validation des données (colorations limitées)
- ✅ IDs auto-incrémentés

### Frontend
- ✅ Formulaire dynamique de création
- ✅ Ajout/suppression de prélèvements, blocs et lames
- ✅ Visualisation hiérarchique en graphe
- ✅ Sélection de dossiers
- ✅ Messages de succès/erreur
- ✅ Interface responsive avec Tailwind

## 🎯 Hiérarchie des donnéesDossier
└── Prélèvements (1..n)
└── Blocs (1..n)
└── Lames (1..n)
└── Coloration (HES, PAS, IHC, etc.)

## 📝 Bonus implémentés

- ✅ Base de données SQL (SQLite + Prisma)
- ✅ Validation des colorations côté backend
- ✅ Sélecteur de dossiers dans l'interface
- ✅ Liste déroulante pour les colorations (meilleure UX)

## 🧪 Test rapide

**Créer un dossier via curl :**
```bashcurl -X POST http://localhost:3000/cases 
-H "Content-Type: application/json" 
-d '{
"prelevements": [
{
"blocs": [
{
"lames": [
{"coloration": "HES"},
{"coloration": "PAS"}
]
}
]
}
]
}'

**Récupérer tous les dossiers :**
```bashcurl http://localhost:3000/cases

## 📖 Documentation détaillée

- [Documentation Backend](./backend/README.md)
- [Documentation Frontend](./frontend/README.md)

## ⏱️ Temps de développement

Environ 3 heures conformément au cahier des charges.