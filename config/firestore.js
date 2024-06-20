const { Firestore } = require('@google-cloud/firestore');
const dotenv = require('dotenv');

dotenv.config();

let firestoreConfig = {
  projectId: process.env.GCLOUD_PROJECT_ID,
};

if (process.env.NODE_ENV === 'DEV') {
  firestoreConfig.keyFilename = './serviceAccountKey.json';
}

const firestore = new Firestore(firestoreConfig);

module.exports = firestore;
