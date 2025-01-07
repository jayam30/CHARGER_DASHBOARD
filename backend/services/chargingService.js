// const DataModel = require("../models/DataModel");

// // Start Charging
// const startCharging = async (chargingData) => {
//   try {
//     const { targetEnergy } = chargingData;
//     const updatedData = await DataModel.findOneAndUpdate(
//       {},
//       { isChargingInitialized: true, targetEnergy: targetEnergy },
//       { new: true }
//     );
//     return updatedData;
//   } catch (error) {
//     throw new Error("Error starting charging: " + error.message);
//   }
// };

// // Stop Charging
// const stopCharging = async () => {
//   try {
//     const updatedData = await DataModel.findOneAndUpdate(
//       {},
//       { isChargingInitialized: false },
//       { new: true }
//     );
//     return updatedData;
//   } catch (error) {
//     throw new Error("Error stopping charging: " + error.message);
//   }
// };

// // Get Charging Status
// const getChargingStatus = async () => {
//   try {
//     const data = await DataModel.findOne({}); // You may want to adjust which fields you fetch here
//     return data;
//   } catch (error) {
//     throw new Error("Error fetching charging status: " + error.message);
//   }
// };

// module.exports = { startCharging, stopCharging, getChargingStatus };
