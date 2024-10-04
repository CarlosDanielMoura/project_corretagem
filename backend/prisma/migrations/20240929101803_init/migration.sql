-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionAnalysis" (
    "id" SERIAL NOT NULL,
    "o_location" TEXT,
    "is_sensitive_data_access" BOOLEAN NOT NULL,
    "previous_sessions_count" INTEGER NOT NULL,
    "average_session_duration" DECIMAL(10,2) NOT NULL,
    "avg_actions_per_session" DECIMAL(10,2) NOT NULL,
    "threat_level_prediction" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "SessionAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SessionAnalysis" ADD CONSTRAINT "SessionAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
