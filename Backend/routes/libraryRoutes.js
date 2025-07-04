import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, storyId } = req.body;

  try {
    const library = await prisma.library.create({
      data: {
        user: { connect: { id: userId } },
        book: { connect: { id: storyId } },
      },
    });

    res.status(201).json(library);
  } catch (err) {
    res.status(500).json({ error: "Could not add book to library." });
  }
});

export default router;
