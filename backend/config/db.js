const mongoose = require("mongoose");
const { User } = require("../models/userModel");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected :: ${conn.connection.host}`);
    console.log("User :: ", User);
  } catch (error) {
    console.log(`Error :: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
