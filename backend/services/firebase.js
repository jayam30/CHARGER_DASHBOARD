// // backend/services/firebase.js
// const { initializeApp } = require("firebase/app");
// const { getDatabase, ref, set, get, update, remove } = require("firebase/database");
// const mqtt = require("mqtt");

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDEf7gCSLAoHqyVgVjXHTBEX2lFNvur40M",
//   authDomain: "esp-charger-de7ff.firebaseapp.com",
//   databaseURL: "https://esp-charger-de7ff-default-rtdb.firebaseio.com",
//   projectId: "esp-charger-de7ff",
//   storageBucket: "esp-charger-de7ff.appspot.com",
//   messagingSenderId: "843968719460",
//   appId: "1:843968719460:web:28995932e8c4a83b088d71",
//   measurementId: "G-F5J8LJS019",
// };

// // Initialize Firebase
// let app;
// let database;

// try {
//   app = initializeApp(firebaseConfig); // Initialize Firebase
//   database = getDatabase(app);        // Connect to Firebase Realtime Database
//   console.log("Firebase connected successfully");
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
//   throw error;
// }

// // MQTT Connection
// const mqttClient = mqtt.connect("mqtt://broker.hivemq.com"); // Replace with your MQTT broker
// mqttClient.on("connect", () => {
//   console.log("Connected to MQTT broker");
//   mqttClient.subscribe("esp/charging/data", (err) => {
//     if (err) {
//       console.error("Error subscribing to topic:", err);
//     } else {
//       console.log("Subscribed to MQTT topic: esp/charging/data");
//     }
//   });
// });

// mqttClient.on("message", async (topic, message) => {
//   console.log(`Received message on topic ${topic}:`, message.toString());

//   try {
//     const parsedData = JSON.parse(message.toString());
//     const dataRef = ref(database, "raspberryPiData"); // Path in Firebase
//     await set(dataRef, parsedData);                  // Save data to Firebase
//     console.log("Data saved to Firebase successfully");
//   } catch (error) {
//     console.error("Error handling MQTT message:", error);
//   }
// });

// // CRUD Functions for Firebase
// const writeData = async (path, data) => {
//   try {
//     const dataRef = ref(database, path);
//     await set(dataRef, data);
//     console.log(`Data written to path ${path}`);
//   } catch (error) {
//     console.error("Error writing data to Firebase:", error);
//     throw error;
//   }
// };

// const readData = async (path) => {
//   try {
//     const dataRef = ref(database, path);
//     const snapshot = await get(dataRef);
//     if (snapshot.exists()) {
//       console.log(`Data read from path ${path}:`, snapshot.val());
//       return snapshot.val();
//     } else {
//       console.log("No data found at path", path);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error reading data from Firebase:", error);
//     throw error;
//   }
// };

// const updateData = async (path, updates) => {
//   try {
//     const dataRef = ref(database, path);
//     await update(dataRef, updates);
//     console.log(`Data updated at path ${path}`);
//   } catch (error) {
//     console.error("Error updating data in Firebase:", error);
//     throw error;
//   }
// };

// const deleteData = async (path) => {
//   try {
//     const dataRef = ref(database, path);
//     await remove(dataRef);
//     console.log(`Data removed from path ${path}`);
//   } catch (error) {
//     console.error("Error removing data from Firebase:", error);
//     throw error;
//   }
// };

// module.exports = { database, mqttClient, writeData, readData, updateData, deleteData };
