-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "audience" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "rating" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';
