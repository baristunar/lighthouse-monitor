const dotenv = require("dotenv");

dotenv.config();

const CONFIG = {
  PORT: process.env.PORT || 4500,
  MONGO_URI: process.env.MONGO_URI || "",
};

module.exports = { CONFIG };
