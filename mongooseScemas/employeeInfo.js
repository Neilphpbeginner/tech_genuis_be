let mongoose = require("mongoose");

employeeInformation = new mongoose.Schema({
  employeeFirstName: String,
  employeeLastName: String,
  employeeContactNo: String,
  employeeEmailAddress: String,
  employeePassword: String,
  employeeManager: String,
  employeeStatus: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employees", employeeInformation);
