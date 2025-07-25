import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/bookmark", async (req, res) => {
  const { userId, storyId, chapterId } = req.body;

  try {
    const existing = await prisma.bookmark.findFirst({
      where: { userId, storyId },
    });

    const bookmark = existing
      ? await prisma.bookmark.update({
          where: { id: existing.id },
          data: { chapterId },
        })
      : await prisma.bookmark.create({
          data: { userId, storyId, chapterId },
        });

    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: "Failed to save bookmark" });
  }
});

router.get("/bookmark/:userId/:storyId", async (req, res) => {
  const { userId, storyId } = req.params;
  console.log(`GET /bookmark/${userId}/${storyId}`);

  try {
    const bookmark = await prisma.bookmark.findFirst({
      where: { userId, storyId },
    });

    if (!bookmark) {
      console.log("No bookmark found for:", { userId, storyId });
      return res.status(404).json({ message: "No bookmark found", userId, storyId});
    }

    console.log("Bookmark found:", bookmark);
    res.json(bookmark);
  } catch (err) {
    console.error("Error fetching bookmark:", err);
    res.status(500).json({ error: "Failed to fetch bookmark" });
  }
});

export default router;
