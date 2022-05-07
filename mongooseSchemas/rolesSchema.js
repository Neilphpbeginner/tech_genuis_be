const mongoose = require("mongoose");
const { Schema } = mongoose;

employeeRoles = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  roles: String,
  employees: [{ type: Schema.Types.ObjectId, ref: "Employees" }],
});

module.exports = mongoose.model("Roles", employeeRoles);
