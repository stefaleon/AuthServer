const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(console.log("MongoDB connected"))
  .catch(err => console.log(err));
