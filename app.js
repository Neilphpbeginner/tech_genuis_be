let express = require("express");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let connectDBconfiguration = require("./DBconfig/mongooseConfig");
let PORT = process.env.PORT || 8080;
let employeesRouter = require("./routes/employees");
let app = express();
let dotenv = require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/users", employeesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log("Server up and running on port no. " + PORT);
});
