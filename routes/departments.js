const express = require("express");
const Department = require("../mongooseScemas/departmentScema");
const router = express.Router();

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

module.exports = router;
