import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient;


// POST /comments/add
router.post("/add", async (req, res) => {
  const { text, authorId, storyId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { text, authorId, storyId },
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ error: "Could not add comment" });
  }
});

// GET /comments/story/:storyId
router.get("/story/:storyId", async (req, res) => {
  const { storyId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { storyId },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error("Fetch comments error:", err);
    res.status(500).json({ error: "Could not fetch comments" });
  }
});

export default router;
