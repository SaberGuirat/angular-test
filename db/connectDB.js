const mongoose = require("mongoose");

const URI =
  process.env.MONGODB_URL ||
  "mongodb+srv://saber:saber123@cluster0.foj0k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to MongoDB database ...");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
