// backend/config/db.js - CLEANED UP VERSION

const mongoose = require('mongoose');
// We no longer need to load dotenv here

const connectDB = async () => {
  try {
    // This will now correctly find process.env.MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;