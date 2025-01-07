// const mqtt = require("mqtt");
// const DataModel = require("../models/DataModel");

// // Connect to the MQTT broker
// const mqttClient = mqtt.connect("mqtt://localhost:1883"); // Change if your MQTT broker is elsewhere

// // Subscribe to the topic that the Raspberry Pi sends data to
// mqttClient.on("connect", () => {
//   console.log("Connected to MQTT broker");
//   mqttClient.subscribe("charging/data", (err) => {
//     if (err) {
//       console.log("Error subscribing to topic: ", err);
//     }
//   });
// });

// // Handle incoming data
// mqttClient.on("message", async (topic, message) => {
//   if (topic === "charging/data") {
//     try {
//       const parsedData = JSON.parse(message.toString());
//       await updateChargingData(parsedData); // Function to update charging data in the database
//     } catch (error) {
//       console.log("Error processing MQTT message:", error);
//     }
//   }
// });

// // Update charging data
// const updateChargingData = async (data) => {
//   try {
//     const updatedData = await DataModel.findOneAndUpdate(
//       {},
//       {
//         SOC: data.SOC,
//         current: data.current,
//         voltage: data.voltage,
//         charging_status: data.charging_status,
//       },
//       { new: true }
//     );
//     console.log("Charging data updated:", updatedData);
//   } catch (error) {
//     console.log("Error updating charging data:", error);
//   }
// };

// module.exports = { mqttClient };
