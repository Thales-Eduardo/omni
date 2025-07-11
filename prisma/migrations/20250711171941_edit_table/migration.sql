/*
  Warnings:

  - You are about to drop the `hash_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hashes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `birthdate` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthdate" TEXT NOT NULL;

-- DropTable
DROP TABLE "hash_user";

-- DropTable
DROP TABLE "hashes";
