const express = require("express");
const EmployeeRoles = require("../mongooseScemas/rolesScema");
const router = express.Router();

router.post("/addNewRole", async (req, res, next) => {
  const { newRole } = req.body;
  try {
    const newEmployeeRole = EmployeeRoles({
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
