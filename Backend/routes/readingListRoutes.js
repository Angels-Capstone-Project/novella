import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
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
        story: {
          connect: { id: storyId },
        },
      },
    });

    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: "Could not add book to reading list." });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const lists = await prisma.readingList.findMany({
      where: {
        userId,
      },
      include: {
        story: true,
      },
    });

    res.status(200).json(lists);
  } catch (err) {
    console.error("Failed to fetch reading lists:", err);
    res.status(500).json({ error: "Failed to fetch reading lists" });
  }
});

router.delete("/:listId", async (req, res) => {
  const { listId } = req.params;

  try {
    await prisma.readingList.delete({
      where: { id: listId },
    });

    res.status(200).json({ message: "Reading list deleted successfully." });
  } catch (err) {
    console.error("Failed to delete reading list:", err);
    res.status(500).json({ error: "Failed to delete reading list." });
  }
});

export default router;
