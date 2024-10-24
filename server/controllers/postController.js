// server/controllers/postController.js
const Post = require('../models/Post');
const Minio = require('minio');
const fs = require('fs');
const path = require('path');

// Configure MinIO
const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9001,
    useSSL: false,
    accessKey: 'admin',
    secretKey: 'password'
});

// Ensure the bucket exists
const bucketName = 'mybucket';
minioClient.bucketExists(bucketName, (err, exists) => {
    if (err) {
        console.error('Error checking bucket existence:', err);
        return;
    }
    if (!exists) {
        minioClient.makeBucket(bucketName, (err) => {
            if (err) {
                console.error('Error creating bucket:', err);
            }
        });
    }
});

exports.createPost = async (req, res) => {
    try {
        const { text, codeSnippet, language, fileName } = req.body;
        const userId = req.user.userId; // Ensure you have this from the auth middleware
        let fileUrl = null;

        // Handle code snippet upload
        if (codeSnippet && language && fileName) {
            const filePath = path.join(__dirname, '../uploads', fileName);
            fs.writeFileSync(filePath, codeSnippet); // Create file from code snippet

            // Upload to MinIO
            await minioClient.fPutObject(bucketName, fileName, filePath, { 'Content-Type': 'text/plain' });
            fileUrl = `http://localhost:9001/${bucketName}/${fileName}`;
            fs.unlinkSync(filePath); // Remove the file after uploading
        }

        // Handle file upload if provided
        if (req.file) {
            const fileBuffer = req.file.buffer;
            const uploadFileName = req.file.originalname; // Using original file name

            // Upload file to MinIO
            await minioClient.putObject(bucketName, uploadFileName, fileBuffer, req.file.size);
            fileUrl = `http://localhost:9001/${bucketName}/${uploadFileName}`;
        }

        const post = new Post({
            userId: userId,
            text,
            codeSnippet,
            language,
            fileName: fileName || (req.file ? req.file.originalname : null), // Use uploaded file name if available
            fileUrl
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });

    } catch (err) {
        console.error('Error creating post:', err); // Log the error for debugging
        res.status(500).json({ error: 'Error creating post' });
    }
};


// exports.getPosts = async (req, res) => {
//     try {
//         const posts = await Post.find().populate('userId', 'email'); // Populate userId field with email
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching posts' });
//     }
// };