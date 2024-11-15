-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "ie" TEXT,
    "cep" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpfCnpj_key" ON "Client"("cpfCnpj");
