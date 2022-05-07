const express = require("express");
const { default: mongoose } = require("mongoose");
const Department = require("../mongooseSchemas/departmentSchema");
const Employees = require("../mongooseSchemas/employeeInfoSchema");
const router = express.Router();

router.get("/getAllDepartments", async (req, res, next) => {
  try {
    const findall = await Department.find();
    res.send(findall);
  } catch (error) {
    res.send(error);
  }
});

router.post("/addNewDepartment", async (req, res, next) => {
  const { newDepartment, activeDepartment } = req.body;
  try {
    const newlyAddedDepartment = new Department({
      _id: new mongoose.Types.ObjectId(),
      departmantName: newDepartment,
      status: activeDepartment,
    });

    let addingNewDepartment = await newlyAddedDepartment.save((error) => {
      if (error) {
        res.send(error);
      } else {
        res.send("New Department Added");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/getDepartments/:departmentQuery", async (req, res, next) => {
  try {
    const { departmentQuery } = req.params;
    const findDepartment = await Department.find(
      {
        departmantName: departmentQuery,
      },
      (error, department) => {
        if (error) {
          res.send(false);
          next();
        } else {
          res.send(true);
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
