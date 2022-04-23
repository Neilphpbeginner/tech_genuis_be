const express = require("express");
const Employee = require("../mongooseScemas/employeeInfo");
const router = express.Router();
const bcrypt = require("bcrypt");
const salt = 12;

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const allEmployees = await Employee.find();
    res.send(allEmployees);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addNewEmployee", async (req, res, next) => {
  const defaultPassword = "Password123#";
  const encryptedPassword = bcrypt.hashSync(defaultPassword, salt);

  try {
    const employee = new Employee({
      employeeFirstName: req.body.employeeFirstName,
      employeeLastName: req.body.employeeLastName,
      employeeContactNo: req.body.employeeContactNo,
      employeeEmailAddress: req.body.employeeEmailAddress,
      employeePassword: encryptedPassword,
      employeeManager: req.body.employeeManager,
      employeeStatus: req.body.employeeStatus,
    });

    let newEnry = await employee.save((error) => {
      if (error) {
        console.log(error);
      } else {
        res.send("New Employee Added");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
