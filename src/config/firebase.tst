// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAXJMJwUu90qe-EfyLrICt7omkZyMnskY",
  authDomain: "chargerdashboard.firebaseapp.com",
  databaseURL: "https://chargerdashboard-default-rtdb.firebaseio.com",
  projectId: "chargerdashboard",
  storageBucket: "chargerdashboard.firebasestorage.app",
  messagingSenderId: "242893273962",
  appId: "1:242893273962:web:87273f9d0418037c4ec313",
  measurementId: "G-DSDVD1BXX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);