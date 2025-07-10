import { PrismaClient } from "../generated/prisma/index.js";
import express from "express";
import { likeStory, readStory } from "../controllers/storyController.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/stories/:id/like", likeStory);
router.post("/stories/:id/read", readStory);

function sortStoriesByPopularity(stories, limit = 20) {
  return stories
    .map((story) => ({
      ...story,
      popularityScore: story.readBy.length + story.likedBy.length,
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
}

router.get("/top-picks/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "Missing user Id" });
    }

    const userInteractions = await prisma.story.findMany({
      where: {
        OR: [
          { likedBy: { some: { id: userId } } },
          { readBy: { some: { id: userId } } },
        ],
      },
      select: { genre: true },
    });

    if (!userInteractions.length) {
      return res.status(200).json([]);
    }

    const genreCount = {};
    for (const story of userInteractions) {
      genreCount[story.genre] = (genreCount[story.genre] || 0) + 1;
    }

    const total = Object.values(genreCount).reduce((a, b) => a + b, 0);
    const genreQuota = {};
    for (const [genre, count] of Object.entries(genreCount)) {
      genreQuota[genre] = Math.round((count / total) * 10);
    }

    for (const genre in genreQuota) {
      if (genreQuota[genre] < 1) genreQuota[genre] = 1;
    }

    let topPicks = [];

    for (const [genre, count] of Object.entries(genreQuota)) {
      const stories = await prisma.story.findMany({
        where: {
          genre,
          likedBy: { none: { id: userId } },
          readBy: { none: { id: userId } },
        },
        take: count,
      });

      topPicks.push(...stories);
    }

    const shuffled = topPicks.sort(() => 0.5 - Math.random());
    res.json(shuffled.slice(0, 20));
  } catch (error) {
    console.error("Failed to fetch top picks", error);
    res.status(500).json({ error: "Server error while fetching top picks" });
  }
});

router.get("/top-us", async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      include: {
        readBy: true,
        likedBy: true,
      },
    });

    if (!stories || stories.length === 0) {
      return res.status(404).json({ error: "No stories found for Top Us" });
    }

    const sorted = sortStoriesByPopularity(stories);
    res.json(sorted);
  } catch (error) {
    console.error("Top Us Error:", error);
    res.status(500).json({ error: "Failed to fetch top US stories" });
  }
});

router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;

  try {
    if (!genre) {
      return res.status(400).json({ error: "Genre parameter is required" });
    }
    const stories = await prisma.story.findMany({
      where: {
        genre: {
          equals: genre,
          mode: "insensitive",
        },
      },
      include: {
        readBy: true,
        likedBy: true,
      },
    });

    const sorted = sortStoriesByPopularity(stories);
    res.json(sorted);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch trending stories for genre" });
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

router.post("/stories", async (req, res) => {
  const {
    title,
    description,
    genre,
    category,
    audience,
    rating,
    status,
    coverImage,
    authorId,
  } = req.body;

  try {
    const story = await prisma.story.create({
      data: {
        title,
        description,
        genre,
        category,
        audience,
        rating,
        status,
        coverImage,
        authorId,
      },
    });

    res.status(201).json(story);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Failed to create story" });
  }
});

//updating story
router.put("/stories/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    genre,
    category,
    audience,
    rating,
    status,
    coverImage,
  } = req.body;

  try {
    const updated = await prisma.story.update({
      where: { id },
      data: {
        title,
        description,
        genre,
        category,
        audience,
        rating,
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

router.delete('/stories/:id', async(req, res)=>{
  const {id} = req.params;
  try{
    await prisma.story.delete({where: {id}});
    res.json({message: "Story deleted successfully"});
  }catch(error){
    console.error("Error deleting story:", error);
    res.status(500).json({ error: "Failed to delete story" });
  }
})
export default router;
