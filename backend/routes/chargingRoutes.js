// const express = require("express");
// const router = express.Router();
// const chargingService = require("../services/chargingService");

// // Start Charging
// router.post("/start", async (req, res) => {
//   try {
//     const { targetEnergy } = req.body; // Expect targetEnergy from the request
//     if (!targetEnergy) {
//       return res.status(400).json({ message: "targetEnergy is required" });
//     }

//     const updatedData = await chargingService.startCharging({ targetEnergy });
//     res.status(200).json(updatedData);
//   } catch (error) {
//     console.error("Error starting charging:", error);
//     res.status(500).json({ message: "Error starting charging", error: error.message });
//   }
// });

// // Stop Charging
// router.post("/stop", async (req, res) => {
//   try {
//     const updatedData = await chargingService.stopCharging();
//     res.status(200).json(updatedData);
//   } catch (error) {
//     console.error("Error stopping charging:", error);
//     res.status(500).json({ message: "Error stopping charging", error: error.message });
//   }
// });

// // Get Charging Status
// router.get("/status", async (req, res) => {
//   try {
//     const data = await chargingService.getChargingStatus();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching charging status:", error);
//     res.status(500).json({ message: "Error fetching charging status", error: error.message });
//   }
// });

// module.exports = router;
