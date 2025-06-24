const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app= express();
const PORT = process.env.PORT || 3000

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


