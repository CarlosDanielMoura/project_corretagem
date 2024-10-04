/*
  Warnings:

  - You are about to drop the column `actionAcess` on the `SessionAnalysis` table. All the data in the column will be lost.
  - Added the required column `actionAccess` to the `SessionAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionAnalysis" DROP COLUMN "actionAcess",
ADD COLUMN     "actionAccess" TEXT NOT NULL;
