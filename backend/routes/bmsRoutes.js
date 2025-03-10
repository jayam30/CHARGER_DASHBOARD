// const express = require("express");
// const router = express.Router();
// const DataModel = require("./models/DataModel");

// // Get BMS Data
// router.get("/", async (req, res) => {
//   try {
//     const data = await DataModel.findOne({SOC}, "SOC current voltage"); // Select only BMS-related fields
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching BMS data", error: error.message });
//   }
// });

// // Update BMS Data
// router.post("/", async (req, res) => {
//   try {
//     const { SOC, current, voltage } = req.body;
//     const updatedData = await DataModel.findOneAndUpdate(
//       {},
//       { SOC, current, voltage },
//       { new: true }
//     );
//     res.status(200).json(updatedData);
//   } catch (error) {
//     res.status(400).json({ message: "Error updating BMS data", error: error.message });
//   }
// });

// module.exports = router;
