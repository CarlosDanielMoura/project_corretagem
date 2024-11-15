-- CreateTable
CREATE TABLE "ClientLogs" (
    "id" SERIAL NOT NULL,
    "actionType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "requestBody" TEXT NOT NULL,
    "responseBody" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientLogs_pkey" PRIMARY KEY ("id")
);
