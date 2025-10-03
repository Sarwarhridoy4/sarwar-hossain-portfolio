import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { env } from "../../../config/env";
import AppError from "../../../helpers/errorhelper/AppError";
import { StatusCodes } from "http-status-codes";
import { createUserTokens } from "../../../utils/userToken";

const prisma = new PrismaClient();

/**
 * Signup a new user
 */
const signupUser = async (payload: {
  name: string;
  email: string;
  password: string;
  profilePicture?: string | null;
}) => {
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
 * Login with email and password
 */
interface LoginPayload {
  email: string;
  password: string;
}

export const loginWithEmailAndPassword = async (payload: LoginPayload) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  // Validate password
  const isPasswordValid = await bcryptjs.compare(
    payload.password,
    user.password
  );
  if (!isPasswordValid)
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password is incorrect!");

  // Generate JWT tokens
  const tokens = createUserTokens({
    id: user.id, // use Prisma id
    email: user.email,
    role: user.role,
  });

  // Return safe user data along with tokens
  const { password, ...safeUser } = user;
  return { ...safeUser, tokens };
};

/**
 * Auth with OAuth provider (Google or GitHub)
 */
const authWithProvider = async (payload: {
  name: string;
  email: string;
  profilePicture?: string;
  provider: "GOOGLE" | "GITHUB";
}) => {
  let user = await prisma.user.findUnique({ where: { email: payload.email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: "", // OAuth users don’t need a password
        role: "USER",
        profilePicture: payload.profilePicture || null,
        provider: payload.provider,
      },
    });
  } else {
    // Update profile picture if changed
    if (
      payload.profilePicture &&
      payload.profilePicture !== user.profilePicture
    ) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { profilePicture: payload.profilePicture },
      });
    }
  }

  const { password, ...safeUser } = user;
  return safeUser;
};

export const AuthServices = {
  signupUser,
  loginWithEmailAndPassword,
  authWithProvider,
};
