const Employee = require("../mongooseScemas/employeeInfoScema.js");

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
  const authBeamer = req.headers["authorization"].split(" ")[1];
  if (authBeamer) {
    next();
  } else {
    res.send("No Go");
  }
};

module.exports = { checkEmployee, checkAutentication };
