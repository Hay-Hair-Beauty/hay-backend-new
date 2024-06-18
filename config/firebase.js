const admin = require("firebase-admin");
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const dotenv = require('dotenv');

dotenv.config();

const ENV = process.env.NODE_ENV || 'DEV';

// Fungsi untuk mengakses secret dari Secret Manager
// async function getSecret() {
//   const client = new SecretManagerServiceClient();
//   const secretName = 'projects/YOUR_PROJECT_ID/secrets/YOUR_SECRET_NAME/versions/latest';
//   const [version] = await client.accessSecretVersion({ name: secretName });
//   const payload = version.payload.data.toString('utf8');
//   return JSON.parse(payload);
// }

// Fungsi untuk menginisialisasi Firebase Admin SDK
async function initializeFirebaseAdmin() {
  if (ENV === 'PROD') {
    // Inisialisasi menggunakan akun layanan default
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: "https://hay-hair-beauty.firebaseio.com",
    });
  } else {
    // Inisialisasi menggunakan file service account key
    const serviceAccount = require("../serviceAccountKey.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://hay-hair-beauty.firebaseio.com",
    });
  }

  const db = admin.firestore();
  return { admin, db };
}

// Konfigurasi Firebase SDK untuk analitik
const firebaseConfig = {
  apiKey: "AIzaSyCXr2cwdIn-l2AKnVcz5eAGGhxQc3OGpeM",
  authDomain: "hay-hair-beauty.firebaseapp.com",
  projectId: "hay-hair-beauty",
  storageBucket: "hay-hair-beauty.appspot.com",
  messagingSenderId: "126780028253",
  appId: "1:126780028253:web:d0386b51b13f49443124b4",
  measurementId: "G-5QJHMN455P",
};

// Inisialisasi Firebase SDK
const app = initializeApp(firebaseConfig);

// Check if the environment supports Firebase Analytics
let analytics;
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  analytics = getAnalytics(app);
}

// Panggil fungsi untuk menginisialisasi Firebase Admin SDK
initializeFirebaseAdmin()
  .then(({ admin, db }) => {
    module.exports = {
      admin,
      db,
      app,
      analytics,
    };
  })
  .catch(console.error);
