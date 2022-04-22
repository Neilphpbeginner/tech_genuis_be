let mongoose = require("mongoose");

module.export = mongoose
  .connect(
    "mongodb+srv://Neil:kopPxu5GUZNZnWH7@TechGenius.gumuz.mongodb.net/futureemployers?retryWrites=true&w=majority"
  )
  .catch((error) => {
    console.log(error);
  });
