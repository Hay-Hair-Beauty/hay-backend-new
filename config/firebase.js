const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hay-hair-healthy.firebaseio.com",
});

const db = admin.firestore();

const firebaseConfig = {
  apiKey: "AIzaSyDi5fmucja1cyvYY_9yNP2g70mHFt1UFH0",
  authDomain: "hay-hair-healthy.firebaseapp.com",
  projectId: "hay-hair-healthy",
  storageBucket: "hay-hair-healthy.appspot.com",
  messagingSenderId: "203380541286",
  appId: "1:203380541286:web:418782904d89a660d7eaa7",
  measurementId: "G-793PMGL96E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if the environment supports Firebase Analytics
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  const analytics = getAnalytics(app);
}

module.exports = {
  admin,
  db,
  app,
};