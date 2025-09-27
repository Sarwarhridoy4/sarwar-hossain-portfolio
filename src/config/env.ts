import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  BYCRYPT_SALT_ROUNDS: process.env.BYCRYPT_SALT_ROUNDS || 10,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET_KEY: process.env.JWT_ACCESS_SECRET || "your_jwt_secret_key",
  JWT_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES || "1d",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "30d",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "your_api_key",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
  DATABASE_URL: process.env.DATABASE_URL || "your_database_url",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",
};
