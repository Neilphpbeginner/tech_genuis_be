const Employee = require("../mongooseScemas/employeeInfo");

const checkEmployee = async (req, res, next) => {
  try {
    const employeeQuery = req.body.employeeEmailAddress;
    const employee = await Employee.findOne({
      employeeEmailAddress: employeeQuery,
    });

    req.user = employee;

    next();
  } catch (error) {
    res.send(error);
  }
};

const checkAutentication = (req, res, next) => {
  const authBeamer = req.header["authorization"].split(" ")[1];
  console.log(authBeamer);
};

module.exports = { checkEmployee, checkAutentication };
