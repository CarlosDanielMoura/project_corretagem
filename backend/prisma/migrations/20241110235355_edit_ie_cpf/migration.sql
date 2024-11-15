/*
  Warnings:

  - A unique constraint covering the columns `[ie]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Client_cpfCnpj_key";

-- CreateIndex
CREATE UNIQUE INDEX "Client_ie_key" ON "Client"("ie");
