// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend's URL
    credentials: true,
}));
//console.log('MONGO_URI:', process.env.MONGO_URI);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));


// Routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// C:\minio.exe server C:\minio-data --console-address ":9001"