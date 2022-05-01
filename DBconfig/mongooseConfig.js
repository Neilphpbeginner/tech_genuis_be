let mongoose = require("mongoose");

module.export = mongoose
  .connect(
    "mongodb+srv://Neil:kopPxu5GUZNZnWH7@Test.gumuz.mongodb.net/TechGenuisDB?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to DataBase"))
  .catch((error) => {
    console.log(error);
  });
