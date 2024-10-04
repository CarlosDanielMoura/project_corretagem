/*
  Warnings:

  - Added the required column `actionAcess` to the `SessionAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionAnalysis" ADD COLUMN     "actionAcess" TEXT NOT NULL,
ALTER COLUMN "average_session_duration" DROP NOT NULL,
ALTER COLUMN "avg_actions_per_session" DROP NOT NULL,
ALTER COLUMN "threat_level_prediction" DROP NOT NULL;
