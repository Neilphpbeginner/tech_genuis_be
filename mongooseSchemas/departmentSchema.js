let mongoose = require("mongoose");

departmentInfo = new mongoose.Schema({
  departmantName: String,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Department", departmentInfo);
