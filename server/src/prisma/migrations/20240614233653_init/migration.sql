-- CreateEnum
CREATE TYPE "token_statuses" AS ENUM ('USED', 'NEW', 'EXPIRED');

-- CreateTable
CREATE TABLE "purchased_tokens" (
    "id" INTEGER NOT NULL,
    "meter_number" VARCHAR(6) NOT NULL,
    "token" VARCHAR(8) NOT NULL,
    "token_value_days" INTEGER NOT NULL,
    "token_status" "token_statuses" NOT NULL DEFAULT 'NEW',
    "purchased_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchased_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchased_tokens_token_key" ON "purchased_tokens"("token");
