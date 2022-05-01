const express = require("express");
const Department = require("../mongooseScemas/departmentScema");
const router = express.Router();

router.get("/getAllDepartments", async (req, res, next) => {
  try {
    const findall = await Department.find();
    res.send(findall);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addNewDepartment", async (req, res, next) => {
  const { newDepartment, activeDepartment } = req.body;
  try {
    const newlyAddedDepartment = new Department({
      departmantName: newDepartment,
      status: activeDepartment,
    });

    let addingNewDepartment = await newlyAddedDepartment.save((error) => {
      if (error) {
        console.log(error);
      } else {
        res.send("New Department Added");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("getDepartments/:departmentName", async (req, res, next) => {
  try {
    const { departmentQuery } = req.params;
    const findDepartment = await Department.findOne(
      departmentQuery,
      (error, department) => {
        if (error) {
          console.log(error);
        } else {
          res.send(department);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
