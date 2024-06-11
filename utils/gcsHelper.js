const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');

dotenv.config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucketName = process.env.GCS_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const uploadToGCS = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject('No file provided');
    }

    const gcsFileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(gcsFileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('finish', () => {
      fileUpload.makePublic().then(() => {
        resolve(`https://storage.googleapis.com/${bucketName}/${gcsFileName}`);
      });
    });

    stream.end(file.buffer);
  });
};

module.exports = { uploadToGCS };
