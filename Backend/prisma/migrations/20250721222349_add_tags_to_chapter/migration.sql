-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];
