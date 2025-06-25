import { PrismaClient } from "../generated/prisma/index.js";
import express from "express";
import { likeStory, readStory } from "../controllers/storyController.js";

const prisma = new PrismaClient
const router = express.Router();

router.post("/stories/:id/like", likeStory);
router.post("/stories/:id/read", readStory);

export default router;
