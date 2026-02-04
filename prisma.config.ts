import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";

// Ensure DATABASE_URL is available for Prisma CLI operations.
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
