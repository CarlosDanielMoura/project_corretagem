/*
  Warnings:

  - The `userId` column on the `ClientLogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ClientLogs" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "ClientLogs" ADD CONSTRAINT "ClientLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
