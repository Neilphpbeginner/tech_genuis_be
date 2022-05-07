let mongoose = require("mongoose");

module.export = mongoose.connect(
  "mongodb+srv://Neil:kopPxu5GUZNZnWH7@Test.gumuz.mongodb.net/TechGenuisDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database myDb ;)");
  }
);
