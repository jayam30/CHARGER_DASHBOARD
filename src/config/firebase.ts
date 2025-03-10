// src/config/firebase.ts
// import { initializeApp, FirebaseApp } from "firebase/app";
// import { getDatabase, Database } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDEf7gCSLAoHqyVgVjXHTBEX2lFNvur40M",
//   authDomain: "esp-charger-de7ff.firebaseapp.com",
//   databaseURL: "https://esp-charger-de7ff-default-rtdb.firebaseio.com",
//   projectId: "esp-charger-de7ff",
//   storageBucket: "esp-charger-de7ff.firebasestorage.app",
//   messagingSenderId: "843968719460",
//   appId: "1:843968719460:web:28995932e8c4a83b088d71",
//   measurementId: "G-F5J8LJS019",
// };

// // Initialize Firebase
// let app: FirebaseApp;
// let database: Database;

// try {
//   app = initializeApp(firebaseConfig);
//   database = getDatabase(app);
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
//   throw error;
// }

// export { database };
// src/config/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDAXJMJwUu90qe-EfyLrICt7omkZyMnskY",
  authDomain: "chargerdashboard.firebaseapp.com",
  databaseURL: "https://chargerdashboard-default-rtdb.firebaseio.com",
  projectId: "chargerdashboard",
  storageBucket: "chargerdashboard.firebasestorage.app",
  messagingSenderId: "242893273962",
  appId: "1:242893273962:web:28b0b7e59ba8c7b64ec313",
  measurementId: "G-FQ1Z10VJTR"
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
