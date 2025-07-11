import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

// Create a new chapter
router.post("/", async (req, res) => {
  const { title, content, storyId, bannerImage } = req.body;

  if (!title || !content || !storyId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const story = await prisma.story.findUnique({
      where: { id: storyId },
    });

    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    
    const existingChapters = await prisma.chapter.count({
      where: { storyId },
    });

    const order = existingChapters + 1;

    const chapter = await prisma.chapter.create({
      data: {
        title,
        content,
        order,
        storyId,
        bannerImage,
      },
    });

    res.status(201).json({ message: "Chapter created successfully.", chapter });
  } catch (error) {
    console.error("Error creating chapter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//  Get all chapters for a story
router.get("/story/:storyId", async (req, res) => {
  const { storyId } = req.params;

  try {
    const story = await prisma.story.findUnique({ where: { id: storyId } });
    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    const chapters = await prisma.chapter.findMany({
      where: { storyId },
      orderBy: { order: "asc" },
    });

    res.status(200).json({ chapters });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get one chapter
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const chapter = await prisma.chapter.findUnique({ where: { id } });
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found." });
    }

    res.status(200).json({ chapter });
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
//update a chapter
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, order, bannerImage } = req.body;

  try {
    const chapter = await prisma.chapter.update({
      where: { id },
      data: { title, content, order, bannerImage },
    });

    res.status(200).json(chapter);
  } catch (error) {
    console.error("Error updating chapter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.chapter.delete({ where: { id } });
    res.status(200).json({ message: "Chapter deleted." });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// to auto-save
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const chapter = await prisma.chapter.update({
      where: { id },
      data,
    });

    res.status(200).json(chapter);
  } catch (error) {
    console.error("Auto-save failed:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
