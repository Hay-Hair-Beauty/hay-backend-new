const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
require('dotenv').config(); // Memuat variabel lingkungan dari file .env

let serviceAccount;

if (process.env.NODE_ENV === 'DEV') {
  // Parsing service account key dari file saat di lingkungan pengembangan
  serviceAccount = require('../serviceAccountKey.json');
} else {
  // Menggunakan service account default saat di lingkungan produksi
  serviceAccount = undefined;
}

const adminConfig = serviceAccount
  ? { credential: admin.credential.cert(serviceAccount), databaseURL: process.env.DATABASE_URL }
  : { databaseURL: process.env.DATABASE_URL };

admin.initializeApp(adminConfig);

const db = admin.firestore();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Memeriksa apakah lingkungan mendukung Firebase Analytics
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  const analytics = getAnalytics(app);
}

module.exports = {
  admin,
  db,
  app,
};