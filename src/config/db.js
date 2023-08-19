const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const DB_URL = process.env.DB_URL; // Use DB_URL instead of DB_HOST

const connectDB = async () => {  
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (e) {
    console.log("Unable to connect");
    console.error(e);
  }
};

module.exports = connectDB;