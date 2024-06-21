const { Firestore } = require('@google-cloud/firestore');
const dotenv = require('dotenv');
const serviceAccount = process.env.SERVICE_ACCOUNT ||require("../serviceAccountKey.json");

dotenv.config();

const firestore = new Firestore({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: serviceAccount
});
module.exports = firestore;
