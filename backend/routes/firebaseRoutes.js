// // backend/routes/firebaseRoutes.js
// const { readData } = require("../services/firebase");

// router.get("/read/:path", async (req, res) => {
//   const path = req.params.path;
//   try {
//     const data = await readData(path);
//     res.status(200).send({ success: true, data });
//   } catch (error) {
//     res.status(500).send({ success: false, error: "Failed to read data" });
//   }
// });


// // backend/routes/firebaseRoutes.js
// const express = require("express");
// const { writeData } = require("../services/firebase");

// const router = express.Router();

// router.post("/write", async (req, res) => {
//   const { path, data } = req.body;
//   try {
//     await writeData(path, data); // Use writeData function from firebase.js
//     res.status(200).send({ success: true, message: "Data written successfully" });
//   } catch (error) {
//     res.status(500).send({ success: false, error: "Failed to write data" });
//   }
// });

// module.exports = router;
