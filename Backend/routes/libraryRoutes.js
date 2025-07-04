import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";


const prisma = new PrismaClient;
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("rceived body", req.body);
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

export default router;
