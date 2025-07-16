import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import storyRoutes from './routes/storyRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';
import readingListRoutes from './routes/readingListRoutes.js';
import syncRoutes from './routes/syncRoutes.js';
import bodyParser from 'body-parser';



dotenv.config();

const app= express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json({ limit: '90mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '90mb' }));


app.use(cors({
origin: function (origin, callback) {
if (!origin || origin.startsWith("http://localhost")) {
callback(null, true);
} else {
callback(new Error("Not allowed by CORS"));
}
},
credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(authRoutes);
app.use('/', storyRoutes);
app.use('/chapters', chapterRoutes);
app.use("/library", libraryRoutes);
app.use("/readingList", readingListRoutes);
app.use(syncRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


