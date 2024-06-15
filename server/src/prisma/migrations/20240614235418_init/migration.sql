/*
  Warnings:

  - The primary key for the `purchased_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `purchased_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "purchased_tokens" DROP CONSTRAINT "purchased_tokens_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "purchased_tokens_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "purchased_tokens_id_key" ON "purchased_tokens"("id");
