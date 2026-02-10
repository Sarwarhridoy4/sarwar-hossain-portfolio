import { Role } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { env } from "../../../config/env";
import AppError from "../../../helpers/errorhelper/AppError";
import { StatusCodes } from "http-status-codes";
import { createUserTokens } from "../../../utils/userToken";
import { prisma } from "../../../config/db";

// ------------------
// Types
// ------------------
interface SignupPayload {
  name: string;
  email: string;
  password: string;
  profilePicture?: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}


// ------------------
// Return Type
// ------------------
interface UserWithTokens {
  id: string;
  name: string;
  email: string;
  role: Role;
  profilePicture?: string | null;
  createdAt: Date;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// ------------------
// Services
// ------------------
/**
 * 📝 Signup — only creates user (no tokens)
 */
const signupUser = async (payload: SignupPayload) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existingUser)
    throw new AppError(400, "User already exists with this email");

  const hashedPassword = await bcryptjs.hash(
    payload.password,
    Number(env.BYCRYPT_SALT_ROUNDS)
  );

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: "USER",
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

/**
 * 🔑 Login (email + password)
 */
const loginWithEmailAndPassword = async (
  payload: LoginPayload
): Promise<UserWithTokens> => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  const isPasswordValid = await bcryptjs.compare(
    payload.password,
    user.password
  );
  if (!isPasswordValid)
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password is incorrect!");

  const tokens = createUserTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const { password, ...safeUser } = user;
  return { ...safeUser, tokens };
};

/**
 * 👤 Get user profile by id
 */
const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePicture: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  return user;
};

export const AuthServices = {
  signupUser,
  loginWithEmailAndPassword,
  getUserById,
};
