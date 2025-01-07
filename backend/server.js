// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const mqttClient = require("./config/mqtt"); // MQTT setup
// const DataModel = require("./models/DataModel"); // Import the data model

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// connectDB();

// // MQTT Integration
// mqttClient.on("message", async (topic, message) => {
//   try {
//     const data = JSON.parse(message.toString());
//     const newData = new DataModel(data);
//     await newData.save();
//     console.log("Data saved to database:", data);
//   } catch (error) {
//     console.error("Error processing MQTT message:", error.message);
//   }
// });

// // Routes
// app.use("/api", require("./routes/apiRoutes"));

// // 404 Handler for undefined routes
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err.message);
//   res.status(500).json({ message: "An internal server error occurred" });
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Backend running at http://localhost:${port}`);
// });

// app.use("/api", require("./routes/apiRoutes"));
// app.use("/charging", require("./routes/chargingRoutes"));
// app.use("/bms", require("./routes/bmsRoutes"));
