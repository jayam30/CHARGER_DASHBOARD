// const mqtt = require("mqtt");

// // MQTT Configuration
// const MQTT_BROKER = "mqtt://your-broker-address"; // e.g., mqtt://localhost or a public broker URL
// const MQTT_TOPIC = "your_topic"; // Replace with the topic your Raspberry Pi is publishing to

// // Connect to MQTT Broker
// const mqttClient = mqtt.connect(MQTT_BROKER);

// mqttClient.on("connect", () => {
//   console.log(`Connected to MQTT Broker at ${MQTT_BROKER}`);
//   mqttClient.subscribe(MQTT_TOPIC, (err) => {
//     if (err) {
//       console.error(`Failed to subscribe to topic ${MQTT_TOPIC}:`, err);
//     } else {
//       console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
//     }
//   });
// });

// // Handle incoming messages
// mqttClient.on("message", (topic, message) => {
//   console.log(`Message received on topic ${topic}: ${message.toString()}`);

//   // TODO: Process the message and save it to the database
//   // Example:
//   // const data = JSON.parse(message.toString());
//   // const newData = new DataModel(data);
//   // await newData.save();
// });

// mqttClient.on("error", (err) => {
//   console.error("MQTT Error:", err);
// });

// module.exports = mqttClient;
