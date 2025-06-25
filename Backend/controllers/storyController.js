import { PrismaClient } from "../generated/prisma/index.js";
const Prisma = new PrismaClient();

export const likeStory = async (req, res) => {
  const userId = req.body.userId;
  const storyId = req.params.id;

  try {
    const updated = await Prisma.story.update({
      where: { id: storyId },
      data: {
        likedBy: {
          connect: { id: userId },
        },
      },
    });
    res.status(200).json({ message: "Story liked", story: updated });
  } catch (error) {
    res.status(500).json({ error: "Error liking story" });
  }
};

export const readStory = async (req, res) => {
  const userId = req.body.userId;
  const storyId = req.params.id;

  try {
    const updated = await Prisma.story.update({
      where: { id: storyId },
      data: {
        readBy: {
          connect: { id: userId },
        },
      },
    });
    res.status(200).json({ message: "Story read", story: updated });
  } catch (error) {
    res.status(500).json({ error: "Error tracking read" });
  }
};
