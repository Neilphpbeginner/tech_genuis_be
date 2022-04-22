let express = require("express");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let PORT = process.env.PORT || 8080;
let usersRouter = require("./routes/users");
let app = express();
let dotenv = require("dotenv");

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log("Server up and running on port no. " + PORT);
});
