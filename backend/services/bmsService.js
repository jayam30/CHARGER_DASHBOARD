// const DataModel = require("../models/DataModel");

// // Update BMS data
// const updateBMSData = async (newBMSData) => {
//   try {
//     const updatedData = await DataModel.findOneAndUpdate(
//       {},
//       { SOC: newBMSData.SOC, current: newBMSData.current, voltage: newBMSData.voltage },
//       { new: true }
//     );
//     return updatedData;
//   } catch (error) {
//     throw new Error("Error updating BMS data: " + error.message);
//   }
// };

// // Get BMS data
// const getBMSData = async () => {
//   try {
//     const data = await DataModel.findOne({}, "SOC current voltage"); // Select only BMS fields
//     return data;
//   } catch (error) {
//     throw new Error("Error fetching BMS data: " + error.message);
//   }
// };

// module.exports = { updateBMSData, getBMSData };
