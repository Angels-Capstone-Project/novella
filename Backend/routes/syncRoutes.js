import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

async function syncSectionData(req, res, sectionName) {
  const { userId } = req.params;
  const data = req.body[sectionName];

  if (!data) {
    return res
      .status(400)
      .json({ error: `Missing '${sectionName}' in request body` });
  }

  try {
    const existing = await prisma.homeCache.findUnique({ where: { userId } });

    if (existing) {
      await prisma.homeCache.update({
        where: { userId },
        data: {
          [sectionName]: data,
        },
      });
    } else {
      await prisma.homeCache.create({
        data: {
          userId,
          [sectionName]: data,
        },
      });
    }

    res.status(200).json({ message: `${sectionName} synced successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to sync ${sectionName}` });
  }
}


router.post("/topPicks/:userId", (req, res) =>
  syncSectionData(req, res, "topPicks")
);
router.post("/topUS/:userId", (req, res) => syncSectionData(req, res, "topUS"));
router.post("/genres/:userId", (req, res) =>
  syncSectionData(req, res, "genres")
);
router.post("/trendingByGenre/:userId", (req, res) =>
  syncSectionData(req, res, "trendingByGenre")
);

export default router;
