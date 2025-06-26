import { PrismaClient } from "../generated/prisma/index.js";
import express from "express";
import { likeStory, readStory } from "../controllers/storyController.js";

const prisma = new PrismaClient();
const router = express.Router();


router.post("/stories/:id/like", likeStory);
router.post("/stories/:id/read", readStory);


router.get("/top-picks/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        LikedStories: true,
        ReadStories: true,
      },
    });

    const interactedGenres = [
      ...new Set([
        ...user.LikedStories.map((story) => story.genre),
        ...user.ReadStories.map((story) => story.genre),
      ]),
    ];

    const stories = await prisma.story.findMany({
      where: {
        genre: { in: interactedGenres },
        NOT: { authorId: userId },
      },
      include: {
        readBy: true,
        LikedBy: true,
      },
    });

    const sorted = stories
      .map((story) => ({
        ...story,
        popularityScore: story.readBy.length + story.LikedBy.length,
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 10);

    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top picks for you" });
  }
});


router.get("/top-us", async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      include: {
        readBy: true,
        LikedBy: true,
      },
    });

    const sorted = stories
      .map((story) => ({
        ...story,
        popularityScore: story.readBy.length + story.LikedBy.length,
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 10);

    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top US stories" });
  }
});

router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;

  try {
    const stories = await prisma.story.findMany({
      where: { genre },
      include: {
        readBy: true,
        LikedBy: true,
      },
    });

    const sorted = stories
      .map((story) => ({
        ...story,
        popularityScore: story.readBy.length + story.LikedBy.length,
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 10);

    res.json(sorted);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch trending stories for genre" });
  }
});


export default router;
