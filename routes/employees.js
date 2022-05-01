const express = require("express");
const Employee = require("../mongooseScemas/employeeInfoScema.js");
const {
  checkEmployee,
  checkAutentication,
} = require("../middleware/employeeMiddleware");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

router.post("/login", checkEmployee, async (req, res, next) => {
  try {
    if (req.user) {
      const { employeeFirstName, employeeLastName } = req.user;
      const queryPassword = bcrypt.hashSync(req.body.employeePassword, salt);
      console.log(req.user.employeePassword);
      console.log(queryPassword);
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
    console.log(error);
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
