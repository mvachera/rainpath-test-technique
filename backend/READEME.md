# Backend - API NestJS

API REST pour la gestion de dossiers d'anatomopathologie.

## 🔧 Technologies

- **NestJS** 10 - Framework Node.js
- **Prisma** 5 - ORM
- **SQLite** - Base de données
- **TypeScript** - Langage
- **class-validator** - Validation des données

## 📁 Structure
```
backend/
├── prisma/
│   ├── schema.prisma      # Schéma de base de données
│   └── dev.db            # Base SQLite (généré)
├── src/
│   ├── cases/
│   │   ├── cases.controller.ts  # Routes API
│   │   ├── cases.service.ts     # Logique métier
│   │   └── cases.module.ts      # Module NestJS
│   ├── types/
│   │   └── case.types.ts        # Types et DTOs
│   ├── app.module.ts            # Module racine
│   └── main.ts                  # Point d'entrée (CORS activé)
└── package.json
```

## 🚀 Installation
```bash
npm install
```

## 📊 Base de données

**Initialiser la base de données :**
```bash
npx prisma migrate dev
```

**Générer le client Prisma :**
```bash
npx prisma generate
```

**Visualiser la base (optionnel) :**
```bash
npx prisma studio
```

## ▶️ Lancement

**Mode développement (avec hot-reload) :**
```bash
npm run start:dev
```

**Mode production :**
```bash
npm run build
npm run start:prod
```

L'API sera accessible sur `http://localhost:3000`

## 🛣️ Endpoints API

### POST /cases
Créer un nouveau dossier.

**Body :**
```json
{
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
}
```

**Response :**
```json
{
  "id": 1,
  "createdAt": "2025-11-24T17:00:00.000Z",
  "prelevements": [
    {
      "id": 1,
      "caseId": 1,
      "blocs": [
        {
          "id": 1,
          "prelevementId": 1,
          "lames": [
            {"id": 1, "coloration": "HES", "blocId": 1},
            {"id": 2, "coloration": "PAS", "blocId": 1}
          ]
        }
      ]
    }
  ]
}
```

### GET /cases
Récupérer tous les dossiers.

**Response :** Array de dossiers

### GET /cases/:id
Récupérer un dossier spécifique.

**Response :** Dossier avec toute sa hiérarchie

## ✅ Validation

Les colorations acceptées sont limitées à :
- HES
- PAS
- IHC
- TRICHROME
- ALCIAN_BLUE
- CONGO_RED
- MASSON
- GIEMSA
- PAS_D

Toute autre valeur sera rejetée avec une erreur 400.

## 🗃️ Modèle de données
```prisma
model Case {
  id           Int           @id @default(autoincrement())
  createdAt    DateTime      @default(now())
  prelevements Prelevement[]
}

model Prelevement {
  id     Int    @id @default(autoincrement())
  caseId Int
  case   Case   @relation(fields: [caseId], references: [id], onDelete: Cascade)
  blocs  Bloc[]
}

model Bloc {
  id            Int         @id @default(autoincrement())
  prelevementId Int
  prelevement   Prelevement @relation(fields: [prelevementId], references: [id], onDelete: Cascade)
  lames         Lame[]
}

model Lame {
  id         Int    @id @default(autoincrement())
  coloration String
  blocId     Int
  bloc       Bloc   @relation(fields: [blocId], references: [id], onDelete: Cascade)
}
```

## 🔒 CORS

Le CORS est activé pour permettre les requêtes depuis le frontend (`http://localhost:5173`).

## 🧪 Tests

**Créer un dossier :**
```bash
curl -X POST http://localhost:3000/cases \
  -H "Content-Type: application/json" \
  -d '{"prelevements":[{"blocs":[{"lames":[{"coloration":"HES"}]}]}]}'
```

**Tester avec une coloration invalide :**
```bash
curl -X POST http://localhost:3000/cases \
  -H "Content-Type: application/json" \
  -d '{"prelevements":[{"blocs":[{"lames":[{"coloration":"INVALID"}]}]}]}'
```
Devrait retourner une erreur 400.