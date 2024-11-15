/*
  Warnings:

  - Made the column `ie` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "ie" SET NOT NULL;
