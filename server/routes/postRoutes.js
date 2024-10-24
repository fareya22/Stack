// server/routes/postRoutes.js
const express = require('express');
const { createPost } = require('../controllers/postController');
const { authenticate } = require('../middleware/auth'); // Middleware for token verification
const multer = require('multer');

const router = express.Router();
const upload = multer(); // Initialize multer without storage since we're using memory storage

// Create post route
router.post('/', authenticate, upload.single('file'), createPost);
//router.get('/', authenticate, getPosts);
module.exports = router;
