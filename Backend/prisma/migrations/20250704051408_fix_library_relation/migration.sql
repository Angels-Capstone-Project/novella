/*
  Warnings:

  - You are about to drop the `_LibraryBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LibraryBooks" DROP CONSTRAINT "_LibraryBooks_A_fkey";

-- DropForeignKey
ALTER TABLE "_LibraryBooks" DROP CONSTRAINT "_LibraryBooks_B_fkey";

-- DropTable
DROP TABLE "_LibraryBooks";

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
