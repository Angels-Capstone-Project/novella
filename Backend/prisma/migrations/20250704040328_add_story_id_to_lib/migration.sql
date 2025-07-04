/*
  Warnings:

  - Added the required column `storyId` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "storyId" TEXT NOT NULL;
