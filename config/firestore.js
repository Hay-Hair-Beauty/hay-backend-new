const { Firestore } = require('@google-cloud/firestore');
const dotenv = require('dotenv');

dotenv.config();
if (process.env.NODE_ENV === 'DEV') {
  const firestore = new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
module.exports = firestore;
}


