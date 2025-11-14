import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 4500,
  MONGO_URI: process.env.MONGO_URI || "",
};
