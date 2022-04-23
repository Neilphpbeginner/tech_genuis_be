const Employee = require("../mongooseScemas/employeeInfo");

const checkEmployee = async (req, res, next) => {
  try {
    const employeeQuery = req.body.employeeEmailAddress;
    const employee = await Employee.find({
      employeeEmailAddress: employeeQuery,
    });
    req.user = employee;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkEmployee };
