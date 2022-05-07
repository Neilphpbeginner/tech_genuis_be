const express = require("express");
const EmployeeRoles = require("../mongooseSchemas/rolesSchema");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/addNewRole", async (req, res, next) => {
  const { newRole } = req.body;
  try {
    const newEmployeeRole = EmployeeRoles({
      _id: new mongoose.Types.ObjectId(),
      roles: newRole,
    });

    const adNewEmployeeRole = await newEmployeeRole.save((error) => {
      if (error) {
        res.send(error);
      } else {
        res.send({
          message: "New Role Created",
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
