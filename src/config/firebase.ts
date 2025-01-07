// src/config/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
<<<<<<< HEAD
=======
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
>>>>>>> 74243bf09453c957de10a535bb56c944c45fb442
  apiKey: "AIzaSyDEf7gCSLAoHqyVgVjXHTBEX2lFNvur40M",
  authDomain: "esp-charger-de7ff.firebaseapp.com",
  databaseURL: "https://esp-charger-de7ff-default-rtdb.firebaseio.com",
  projectId: "esp-charger-de7ff",
  storageBucket: "esp-charger-de7ff.firebasestorage.app",
  messagingSenderId: "843968719460",
  appId: "1:843968719460:web:28995932e8c4a83b088d71",
  measurementId: "G-F5J8LJS019",
};

// Initialize Firebase
let app: FirebaseApp;
let database: Database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { database };
