/*
  Warnings:

  - Added the required column `amount` to the `purchased_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchased_tokens" ADD COLUMN     "amount" INTEGER NOT NULL;
