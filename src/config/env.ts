import dotenv from "dotenv";
import e from "express";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  BYCRYPT_SALT_ROUNDS: process.env.BYCRYPT_SALT_ROUNDS || 10,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "your_jwt_secret_key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  DATABASE_URL: process.env.DATABASE_URL || "your_database_url",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",
};
