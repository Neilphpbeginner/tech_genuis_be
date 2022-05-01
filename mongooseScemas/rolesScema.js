let mongoose = require("mongoose");

employeeRoles = new mongoose.Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  roles: String,
});

module.exports = mongoose.model("Roles", employeeRoles);
