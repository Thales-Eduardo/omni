/*
  Warnings:

  - Added the required column `available` to the `hash_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hash_user" ADD COLUMN     "available" BOOLEAN NOT NULL;
