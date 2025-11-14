const mongoose = require("mongoose");
const { CONFIG } = require("../config/index");

const connectDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGO_URI);
    console.log("✅ MongoDB connected =>", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;

export {}