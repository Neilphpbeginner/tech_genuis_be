const express = require("express");
const Employee = require("../mongooseSchemas/employeeInfoSchema");
const {
  checkEmployee,
  checkAutentication,
} = require("../middleware/employeeMiddleware");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Roles = require("../mongooseSchemas/rolesSchema");
const salt = 12;

router.get("/", async (req, res, next) => {
  try {
    const allEmployees = await Employee.find();
    const newData = await Roles.findOne({ roles: "Employee" });
    res.send(newData);
  } catch (error) {
    res.send({
      message: error,
    });
  }
});

router.get("/allEmployees", async (req, res, next) => {
  const newData = await Roles.findOne({ roles: "Employee" });
  res.send(newData.employees);
});

router.post("/addNewEmployee", async (req, res, next) => {
  try {
    const defaultPassword = "Password123#";
    const encryptedPassword = bcrypt.hashSync(defaultPassword, salt);
    const newData = await Roles.findOne({ roles: "Employee" });
    const employee = new Employee({
      employeeFirstName: req.body.employeeFirstName,
      employeeLastName: req.body.employeeLastName,
      employeeContactNo: req.body.employeeContactNo,
      employeeEmailAddress: req.body.employeeEmailAddress,
      employeePassword: encryptedPassword,
      employeeManager: req.body.employeeManager,
    });
    const saveData = employee.save((error) => {
      if (error) {
        res.send({
          message: "No data saved",
        });
      } else {
      }
      newData.employees.push(employee);
      newData.save();
      res.send({
        message: "New Empoyee",
      });
    });
  } catch (error) {
    res.send({
      message: "Did not work",
    });
  }
});

router.post("/addNewManager", async (req, res, next) => {
  try {
    const defaultPassword = "Password123#";
    const encryptedPassword = bcrypt.hashSync(defaultPassword, salt);
    const newData = await Roles.findOne({ roles: "Manager" });
    const manager = new Employee({
      employeeFirstName: req.body.employeeFirstName,
      employeeLastName: req.body.employeeLastName,
      employeeContactNo: req.body.employeeContactNo,
      employeeEmailAddress: req.body.employeeEmailAddress,
      employeePassword: encryptedPassword,
      employeeManager: req.body.employeeManager,
    });
    const saveData = manager.save((error) => {
      if (error) {
        res.send({
          message: "No data saved",
        });
      } else {
      }
      newData.employees.push(employee);
      newData.save();
      res.send({
        message: "New Manager",
      });
    });
  } catch (error) {
    res.send({
      message: "Did not work",
    });
  }
});

router.post("/login", checkEmployee, async (req, res, next) => {
  try {
    if (req.user) {
      const { employeeFirstName, employeeLastName } = req.user;
      const queryPassword = bcrypt.hashSync(req.body.employeePassword, salt);
      const encryption = await jwt.sign(
        { employeeFirstName, employeeLastName },
        "test",
        { expiresIn: 60 * 360 },
        { algorithm: "HS256" }
      );
      res.send(encryption);
    } else {
      res.send("Not Autherised to view this page");
    }
  } catch (error) {
    res.send({
      message: "Employee Role not found",
    });
  }
});

router.put(
  "/changePassword",
  checkEmployee,
  checkAutentication,
  async (req, res, next) => {
    try {
      if (req.user) {
        const { employeeEmailAddress } = req.user;
        const encryptedPassword = bcrypt.hashSync(req.body.newPassword, salt);
        let changePassword = { employeePassword: encryptedPassword };
        let changeEmployeePassword = await Employee.findOneAndUpdate(
          { employeeEmailAddress: employeeEmailAddress },
          changePassword
        );

        res.send("Password updated");
      }
    } catch (error) {
      res.send("User not found on system");
    }
  }
);

module.exports = router;
