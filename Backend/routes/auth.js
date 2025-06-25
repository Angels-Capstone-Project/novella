import express  from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, birthday, pronouns } = req.body;

  try {
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, email and password are required." });
    }

    if (password.length < 10) {
      return res
        .status(400)
        .json({ error: "Password must be at least 10 characters long." });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        pronouns,
        birthday: birthday ? new Date(birthday) : undefined
      },
    });

    req.session.userId = user.id;

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Something went wrong during signup" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    req.session.userId = user.id;

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Something went wrong during login" });
  }
});

router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(200).json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        username: true,
        id: true,
        email: true,
      },
    });

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ error: "Error fetching user session data" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); 
    res.json({ message: "Logout successful" });
  });
});

export default router;
