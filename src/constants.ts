import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  SECRET_KEY: process.env.SECRET_KEY,
  MONGO_URI: process.env.MONGO_URI,
  ALLOWED_HOST: process.env.ALLOWED_HOST,
};
