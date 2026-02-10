import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { UserRole } from "../types";
import { prisma } from "../config/db";

async function main() {
  if (!env.ADMIN_PASSWORD) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Please set it in .env or .env.local before running seed."
    );
  }

  if (!env.DATABASE_URL || env.DATABASE_URL === "your_database_url") {
    throw new Error(
      "DATABASE_URL is not set. Please configure it in .env or .env.local before running seed."
    );
  }

  const saltRounds = Number(env.BYCRYPT_SALT_ROUNDS);
  if (!Number.isFinite(saltRounds) || saltRounds <= 0) {
    throw new Error(
      "BYCRYPT_SALT_ROUNDS must be a positive number. Check your environment configuration."
    );
  }

  const hashedPassword = await bcrypt.hash(
    env.ADMIN_PASSWORD,
    saltRounds
  );

  const admin = await prisma.user.upsert({
    where: { email: "sarwarhridoy4@gmail.com" },
    update: {}, // do nothing if exists
    create: {
      name: "Sarwar Hossain",
      email: "sarwarhridoy4@gmail.com",
      password: hashedPassword,
      profilePicture: "https://picsum.photos/200",
      role: UserRole.ADMIN,
    },
  });

  console.log("✅ Admin user seeded:", admin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
