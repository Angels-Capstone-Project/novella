import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import {extractTagsFromContent} from "../utils/extractTags.js";

const router = express.Router();
const prisma = new PrismaClient();

// Create a new chapter
router.post("/", async (req, res) => {
  const { title, content, storyId, isDraft, isPublished } =
    req.body;

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

    const existingDraft = await prisma.chapter.findFirst({
      where:{
        storyId,
        isDraft: true,
      },
    });

    if (isPublished && existingDraft) {
      const updatedChapter = await prisma.chapter.update({
        where: { id: existingDraft.id },
        data: {
          content,
          isDraft: false,
          isPublished: true,
        },
      });

      return res.status(200).json({
        message: "Draft chapter published successfully.",
        chapter: updatedChapter,
      });
    }

    const existingChapters = await prisma.chapter.count({
      where: { storyId },
    });

     const tags= extractTagsFromContent(content);
    const order = existingChapters + 1;

    const chapter = await prisma.chapter.create({
      data: {
        title,
        content,
        order,
        storyId,
        isDraft,
        isPublished,
        tags,
      },
    });

    res.status(201).json({ message: "Chapter created successfully.", chapter });
  } catch (error) {
    console.error("Error creating chapter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// POST /chapters/save-draft
router.post("/save-draft", async (req, res) => {
  const { chapterId, storyId, title, content, authorId,} =
    req.body;

  if (!chapterId || !storyId || !authorId || !title) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if draft already exists
    const existingDraft = await prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    // If draft exists, update it
    if (existingDraft) {
      const updatedDraft = await prisma.chapter.update({
        where: { id: chapterId },
        data: {
          title,
          content,
          isDraft: true,
        },
      });

      return res.json(updatedDraft);
    }else{

    // If draft doesn't exist, calculate order and create it
    const existingChapters = await prisma.chapter.count({
      where: { storyId },
    });

    const order = existingChapters + 1;

    const createdDraft = await prisma.chapter.create({
      data: {
        id: chapterId,
        storyId,
        title,
        content,
        authorId,
        isDraft: true,
        isPublished: false,
        order,
      },
    });

    return res.json(createdDraft);
  }
  } catch (err) {
    console.error(" Failed to save draft:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/all/:storyId", async (req, res) => {
  const { storyId } = req.params;

  try {
    const story = await prisma.story.findUnique({
      where: { id: storyId },
    });

    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    const chapters = await prisma.chapter.findMany({
      where: { storyId },
      orderBy: { order: "asc" },
    });

    res.status(200).json(chapters);
  } catch (error) {
    console.error("Error fetching all chapters:", error);
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
    console.error("Error fetching chapter:", err.message, err.stack);
    res.status(500).json({ error: "Internal server error." });
  }
});

//update a chapter
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, order, isDraft, isPublished } = req.body;
  const tags= extractTagsFromContent(content);


  try {
    const chapter = await prisma.chapter.update({
      where: { id },
      data: { title, content, order, isDraft, isPublished, tags, },
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

router.post("/sync/:storyId", async (req, res) => {
  const { storyId } = req.params;
  const chapters = req.body;

  if (!Array.isArray(chapters)) {
    return res.status(400).json({ error: "Invalid chapter payload" });
  }

  try {
    const upsertedChapters = await Promise.all(
      chapters.map((chapter) =>
        prisma.chapter.upsert({
          where: { id: chapter.id || "" },
          update: {
            title: chapter.title,
            content: chapter.content,
            order: chapter.order,
            isDraft: chapter.isDraft ?? true,
          },
          create: {
            title: chapter.title,
            content: chapter.content,
            order: chapter.order,
            isDraft: chapter.isDraft ?? true,
            storyId: storyId,
          },
        })
      )
    );

    res
      .status(200)
      .json({ message: "Chapters synced", chapters: upsertedChapters });
  } catch (err) {
    console.error("Error syncing chapters:", err);
    res.status(500).json({ error: "Failed to sync chapters" });
  }
});

export default router;
