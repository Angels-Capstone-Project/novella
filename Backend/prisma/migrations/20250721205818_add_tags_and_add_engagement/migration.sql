-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "Engagement" (
    "id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
