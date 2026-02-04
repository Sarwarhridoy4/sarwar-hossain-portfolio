import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { UserRole } from "../types";
import { prisma } from "../config/db";

async function main() {
  const hashedPassword = await bcrypt.hash(
    env.ADMIN_PASSWORD,
    Number(env.BYCRYPT_SALT_ROUNDS)
  );

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {}, // do nothing if exists
    create: {
      name: "System Admin",
      email: "admin@example.com",
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
