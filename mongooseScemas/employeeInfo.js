const mongoose = require("mongoose");

employeeInformation = new mongoose.Schema({
  employeeFirstName: String,
  employeeLastName: String,
  employeeContactNo: String,
  employeeEamilAddress: String,
  employeeManager: String,
  employeeStatus: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("employeeInformation", employeeInformation);
