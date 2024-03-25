const mongoose = require("mongoose");
const { User } = require("../models/userModel");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected :: ${conn.connection.host}`);
    const user = User.find();
    console.log("User :: ", user);
  } catch (error) {
    console.log(`Error :: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
