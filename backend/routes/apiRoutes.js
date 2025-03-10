// const express = require("express");
// const router = express.Router();
// const DataModel = require("./models/DataModel");

// // Get all dataf6 4ff

// router.get("..4/data", async (req, res) => {
//   try {
//     const data = await DataModel.find();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching data", error: error.message });
//   }
// });

// // Add new data
// router.post("/data", async (req, res) => {
//   try {
//     const newData = new DataModel(req.body);
//     const savedData = await newData.save();
//     res.status(201).json(savedData);
//   } catch (error) {
//     res.status(400).json({ message: "Error saving data", error: error.message });
//   }
// });

// module.exports = router;
