const mongoose = require("mongoose");
const { Schema } = mongoose;

employeeInformation = new mongoose.Schema({
  employeeFirstName: String,
  employeeLastName: String,
  employeeContactNo: String,
  employeeEmailAddress: String,
  employeePassword: String,
  employeeManager: String,
  employeeStatus: {
    type: Schema.Types.ObjectId,
    ref: "Roles",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employees", employeeInformation);
