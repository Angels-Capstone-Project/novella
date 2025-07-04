import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const { userId, name } = req.body;

  try {
    const list = await prisma.readingList.create({
      data: {
        name,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: "Failed to create reading list." });
  }
});


router.post("/:listId/add-book", async (req, res) => {
  const { listId } = req.params;
  const { storyId } = req.body;

  try {
    const update = await prisma.readingList.update({
      where: { id: listId },
      data: {
        stories: {
          connect: { id: storyId },
        },
      },
    });

    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: "Could not add book to reading list." });
  }
});

export default router;
