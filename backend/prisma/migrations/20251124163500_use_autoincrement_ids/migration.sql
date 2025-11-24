/*
  Warnings:

  - The primary key for the `Bloc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Bloc` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `prelevementId` on the `Bloc` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Case` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Case` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Lame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `blocId` on the `Lame` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Lame` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Prelevement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `caseId` on the `Prelevement` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Prelevement` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bloc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prelevementId" INTEGER NOT NULL,
    CONSTRAINT "Bloc_prelevementId_fkey" FOREIGN KEY ("prelevementId") REFERENCES "Prelevement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bloc" ("id", "prelevementId") SELECT "id", "prelevementId" FROM "Bloc";
DROP TABLE "Bloc";
ALTER TABLE "new_Bloc" RENAME TO "Bloc";
CREATE TABLE "new_Case" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Case" ("createdAt", "id") SELECT "createdAt", "id" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
CREATE TABLE "new_Lame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coloration" TEXT NOT NULL,
    "blocId" INTEGER NOT NULL,
    CONSTRAINT "Lame_blocId_fkey" FOREIGN KEY ("blocId") REFERENCES "Bloc" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lame" ("blocId", "coloration", "id") SELECT "blocId", "coloration", "id" FROM "Lame";
DROP TABLE "Lame";
ALTER TABLE "new_Lame" RENAME TO "Lame";
CREATE TABLE "new_Prelevement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caseId" INTEGER NOT NULL,
    CONSTRAINT "Prelevement_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Prelevement" ("caseId", "id") SELECT "caseId", "id" FROM "Prelevement";
DROP TABLE "Prelevement";
ALTER TABLE "new_Prelevement" RENAME TO "Prelevement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
