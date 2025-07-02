import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import storyRoutes from './routes/storyRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';


dotenv.config();

const app= express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173',
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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


