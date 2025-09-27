import { PrismaClient, type User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { env } from "../../../config/env";
import AppError from "../../../helpers/errorhelper/AppError";

const prisma = new PrismaClient();

/**
 * Signup a new user
 * @param payload - Partial user data (name, email, password, optional profilePicture)
 */
const signupUser = async (payload: {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existingUser) {
    throw new AppError(400, "User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcryptjs.hash(
    payload.password,
    Number(env.BYCRYPT_SALT_ROUNDS)
  );

  // Create user
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: "USER", // default role
      profilePicture: payload.profilePicture || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePicture: true,
      createdAt: true,
    },
  });

  return user;
};

export const AuthServices = {
  signupUser,
};
