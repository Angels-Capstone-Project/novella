-- DropForeignKey
ALTER TABLE "Engagement" DROP CONSTRAINT "Engagement_storyId_fkey";

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
