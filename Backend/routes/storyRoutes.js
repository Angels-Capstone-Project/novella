import { PrismaClient } from "../generated/prisma/index.js";
import express from "express";
import { likeStory, readStory } from "../controllers/storyController.js";
import multer from "multer";
import { extractTagsFromContent } from "../utils/extractTags.js";
import { generateRecommendations } from "../utils/recommendationEngine.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/stories/:id/like", likeStory);
router.post("/stories/:id/read", readStory);

const upload = multer({ storage: multer.memoryStorage() });

router.post("/engagement", async (req, res) => {
  const { userId, storyId, duration } = req.body;
  try {
    const engagement = await prisma.engagement.create({
      data: { userId, storyId, duration },
    });
    res.status(200).json(engagement);
  } catch (err) {
    res.status(500).json({ error: "Failed to track engagement" });
  }
});

router.get("/top-picks/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Get user (for birthday)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Get all stories with related info
    const allStories = await prisma.story.findMany({
      include: {
        chapters: true,
        likedBy: { select: { id: true } },
        readBy: { select: { id: true } },
      },
    });

    // 3. Stories user has liked and read
    const liked = await prisma.story.findMany({
      where: { likedBy: { some: { id: userId } } },
      select: { id: true },
    });
    const read = await prisma.story.findMany({
      where: { readBy: { some: { id: userId } } },
      select: { id: true },
    });

    const engagementRecords = await prisma.engagement.findMany({
      where: { userId },
    });

    const engagementData = {};
    for (const record of engagementRecords) {
      engagementData[record.storyId] = { duration: record.duration };
    }

    // 5. Generate recommendations
    const recommendedStories = generateRecommendations({
      allStories,
      user,
      likedStoryIds: liked.map((s) => s.id),
      readStoryIds: read.map((s) => s.id),
      engagementData,
    });

    return res.json(recommendedStories);
  } catch (error) {
    console.error("Top Picks Error:", error);
    return res.status(500).json({ error: "Failed to generate top picks" });
  }
});

router.get("/top-us", async (req, res) => {
  try {
    // 1. Get all users (for audience filtering)
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        birthday: true,
      },
    });

    // Use a fallback birthday if none found
    const fallbackUser = allUsers.find((u) => u.birthday) || {
      birthday: "2000-01-01", // fallback birthday
    };

    // 2. Get all stories and related info
    const allStories = await prisma.story.findMany({
      include: {
        likedBy: { select: { id: true } },
        readBy: { select: { id: true } },
        chapters: true,
        // author: true,
      },
    });

    // 3. Get engagement data from all users
    const allEngagements = await prisma.engagement.findMany();

    const engagementData = {};
    for (const record of allEngagements) {
      engagementData[record.storyId] = {
        duration: record.duration,
      };
    }

    const likedStoryIds = allStories
      .filter((s) => s.likedBy && s.likedBy.length > 0)
      .map((s) => s.id);

    const readStoryIds = allStories
      .filter((s) => s.readBy && s.readBy.length > 0)
      .map((s) => s.id);

    // 4. Generate Top US Recommendations
    const recommendedStories = generateRecommendations({
      allStories,
      user: fallbackUser,
      likedStoryIds,
      readStoryIds,
      engagementData,
    });
    const topN = 10;
    const topStories = recommendedStories.slice(0, topN);

    res.json(topStories);
  } catch (error) {
    console.error("Top US Error:", error);
    res.status(500).json({ error: "Failed to generate Top US stories" });
  }
});

router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;

  try {
    if (!genre) {
      return res.status(400).json({ error: "Genre parameter is required" });
    }

    const allUsers = await prisma.user.findMany();
    const fallbackUser = allUsers.find((u) => u.birthday) || {
      birthday: "2000-01-01", // fallback if none
    };

    const allStories = await prisma.story.findMany({
      where: {
        genre: {
          equals: genre,
          mode: "insensitive",
        },
      },
      include: {
        likedBy: { select: { id: true } },
        readBy: { select: { id: true } },
        chapters: true,
        author: true,
      },
    });

    const allEngagements = await prisma.engagement.findMany();
    const engagementData = {};
    for (const record of allEngagements) {
      engagementData[record.storyId] = {
        duration: record.duration,
      };
    }

    const likedStoryIds = allStories
      .filter((s) => s.likedBy && s.likedBy.length > 0)
      .map((s) => s.id);

    const readStoryIds = allStories
      .filter((s) => s.readBy && s.readBy.length > 0)
      .map((s) => s.id);

    // Recommendation logic
    const recommendedStories = generateRecommendations({
      allStories,
      user: fallbackUser,
      likedStoryIds,
      readStoryIds,
      engagementData,
    });

    const topN = 10;
    const topGenreStories = recommendedStories.slice(0, topN);
    res.json(topGenreStories);
  } catch (error) {
    console.error("Genre-based Error:", error);
    res.status(500).json({ error: "Failed to generate genre-based stories" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No usres found" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET stories written by a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await prisma.story.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            likedBy: true,
            readBy: true,
          },
        },
      },
    });
    res.json(stories);
  } catch (error) {
    console.error("Error fetching user stories:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/stories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const story = await prisma.story.findUnique({
      where: { id },
      include: {
        chapters: true,
        author: {
          select: { username: true },
        },
      },
    });

    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    res.status(200).json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Search stories by title or author
router.get("/stories", async (req, res) => {
  const { query } = req.query;

  try {
    const stories = await prisma.story.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          {
            author: {
              is: {
                username: { contains: query, mode: "insensitive" },
              },
            },
          },
        ],
      },
      include: { author: true },
    });

    res.json(stories);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/stories", upload.single("coverImage"), async (req, res) => {
  const { title, description, genre, audience, status, authorId } = req.body;

  if (!title || !description || !genre || !audience) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let coverImage = null;
  if (req.file) {
    coverImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;
  }

  if (!authorId) {
    return res.status(401).json({ error: "Unauthorized. Missing authorId." });
  }

  const systemTags = extractTagsFromContent(description);

  try {
    const story = await prisma.story.create({
      data: {
        title,
        description,
        genre,
        audience,
        status,
        coverImage,
        authorId,
        tags: systemTags,
      },
    });

    res.status(201).json(story);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Failed to create story" });
  }
});

router.get("/genre-all", async (req, res) => {
  try {
    const genres = [
      "romance",
      "thriller",
      "comedy",
      "horror",
      "drama",
      "mystery",
      "sci-fi",
      "fantasy",
    ];
    const genreData = {};

    for (const genre of genres) {
      const stories = await prisma.story.findMany({
        where: { genre },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
      genreData[genre] = stories;
    }

    res.json(genreData);
  } catch (err) {
    console.error("Failed to fetch genre data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//updating story
router.put("/stories/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, genre, audience, status, coverImage } = req.body;

  try {
    const updated = await prisma.story.update({
      where: { id },
      data: {
        title,
        description,
        genre,
        audience,
        status,
        coverImage,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating story:", error);
    res.status(500).json({ error: "Failed to update story" });
  }
});

router.delete("/stories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.story.delete({ where: { id } });
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ error: "Failed to delete story" });
  }
});

router.post("/mystories/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { stories } = req.body;

    if (!stories || !Array.isArray(stories)) {
      return res.status(400).json({ error: "Invalid stories payload" });
    }

    const saved = await Promise.all(
      stories.map(async (story) =>
        prisma.story.upsert({
          where: { id: story.id },
          update: { ...story },
          create: { ...story, authorId: userId },
        })
      )
    );

    res.status(200).json(saved);
  } catch (error) {
    console.error("Error syncing stories:", error);
    res.status(500).json({ error: "Failed to sync stories" });
  }
});

export default router;
