// backend/minioClient.js
const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',  // Replace with your MinIO access key
    secretKey: 'password'   // Replace with your MinIO secret key
});

const BUCKET_NAME = 'mybucket';



minioClient.bucketExists(BUCKET_NAME, async (err, exists) => {
  if (err) {
    console.log('Error checking bucket existence:', err);
    return;
  }
  if (!exists) {
    try {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1'); // Specify the region if needed
      console.log(`Bucket "${BUCKET_NAME}" created successfully.`);
    } catch (error) {
      console.error('Error creating bucket:', error);
      return;
    }
  }
});

module.exports = {minioClient,BUCKET_NAME};
