// const mongoose = require("mongoose");

// const DataSchema = new mongoose.Schema({
//   BMSData: {
//     latest: {
//       SOC: { type: Number, required: true }, // State of Charge
//       current: { type: Number, required: true },
//       voltage: { type: Number, required: true },
//     },
//   },
//   ChargingStatus: {
//     isChargingInitialized: { type: Boolean, default: false },
//     targetEnergy: { type: Number, required: true },
//   },
//   IsReceiverCoilDetected: { type: Boolean, default: false },
//   Is_FOD_Present: { type: Boolean, default: false }, // Foreign Object Detection
//   Payment: {
//     latest: { type: Number, required: true },
//     selectedAmount: { type: Number, required: true },
//   },
//   charging: {
//     targetEnergy: { type: Number, required: true },
//     duration: {
//       hours: { type: Number, default: 0 },
//       minutes: { type: Number, default: 0 },
//     },
//   },
//   charging_status: {
//     isChargingInitialized: { type: Boolean, default: false },
//     emergencyStop: { type: Boolean, default: false },
//   },
//   timestamp: { type: Date, default: Date.now }, // Automatically add timestamps
// });

// // Static method to find records by timestamp range (optional utility)
// DataSchema.statics.findByTimestamp = function (start, end) {
//   return this.find({ timestamp: { $gte: start, $lte: end } });
// };

// // Export the model
// const DataModel = mongoose.model("Data", DataSchema);

// module.exports = DataModel;
