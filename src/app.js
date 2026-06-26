const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.Routes');
const collectionRoutes = require('./routes/collection.Routes');
const noteRoutes = require('./routes/note.Routes');
const imagekitRoutes = require('./routes/imagekit.Route'); // NEW

const app = express();

dotenv.config();

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/collections', collectionRoutes);
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/imagekit', imagekitRoutes); // NEW









module.exports = app;
