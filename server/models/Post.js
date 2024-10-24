const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    codeSnippet: { type: String },
    language: { type: String },
    fileName: { type: String },
    fileUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
