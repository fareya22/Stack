// backend/multerConfig.js
const multer = require('multer');

// Configure storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
