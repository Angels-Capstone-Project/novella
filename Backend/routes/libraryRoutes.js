import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";


const prisma = new PrismaClient;
const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, storyId } = req.body;

  try {
    const library = await prisma.library.create({
      data: {
        user: { connect: { id: userId } },
        story: { connect: { id: storyId } },
      },
    });

    res.status(201).json(library);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not add book to library." });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const books = await prisma.library.findMany({
      where: {
        userId,
      },
      include: {
        story: true, 
      },
    });

    res.status(200).json(books);
  } catch (err) {
    console.error("Failed to fetch library:", err);
    res.status(500).json({ error: "Failed to fetch library" });
  }
});

export default router;
