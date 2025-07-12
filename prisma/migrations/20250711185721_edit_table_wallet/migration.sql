/*
  Warnings:

  - You are about to drop the column `account_id_from` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `account_id_to` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `wallet` table. All the data in the column will be lost.
  - Added the required column `wallet_id_from` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id_to` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "account_id_from",
DROP COLUMN "account_id_to",
ADD COLUMN     "wallet_id_from" TEXT NOT NULL,
ADD COLUMN     "wallet_id_to" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wallet" DROP COLUMN "client_id",
ADD COLUMN     "user_id" TEXT NOT NULL;
