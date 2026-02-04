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

interface OAuthAccount {
  provider: "google" | "github";
  type: "oauth";
  providerAccountId: string;
  access_token: string;
  expires_at?: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  token_type?: string;
  scope?: string;
  id_token?: string; // Google
}

interface OAuthProfileGoogle {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

interface OAuthProfileGitHub {
  id: number;
  login: string;
  avatar_url?: string;
  name?: string;
  email?: string;
  [key: string]: any; // allow extra fields
}

// Combined OAuth payload type
interface OAuthPayload {
  account: OAuthAccount;
  profile: OAuthProfileGoogle | OAuthProfileGitHub;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
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
 * 🌐 OAuth login (Google / GitHub)
 */
const authWithProvider = async (
  payload: OAuthPayload
): Promise<UserWithTokens> => {
  const email = payload.profile.email || payload.user.email;
  if (!email) throw new AppError(400, "Email is required for OAuth login");

  let user = await prisma.user.findUnique({ where: { email } });

  const profilePicture =
    payload.profile.picture ||
    (payload.profile as OAuthProfileGitHub).avatar_url ||
    null;

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: payload.user.name,
        email,
        password: "", // OAuth users don’t need passwords
        role: "USER",
        profilePicture,
        provider: payload.account.provider.toUpperCase() as "GOOGLE" | "GITHUB",
      },
    });
  } else {
    // Update provider + profilePicture if changed
    const updates: Partial<typeof user> = {};
    if (profilePicture && profilePicture !== user.profilePicture)
      updates.profilePicture = profilePicture;
    if (user.provider !== payload.account.provider.toUpperCase())
      updates.provider = payload.account.provider.toUpperCase() as
        | "GOOGLE"
        | "GITHUB";

    if (Object.keys(updates).length > 0) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: updates,
      });
    }
  }

  const tokens = createUserTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const { password, ...safeUser } = user;
  return { ...safeUser, tokens };
};

export const AuthServices = {
  signupUser,
  loginWithEmailAndPassword,
  authWithProvider,
};
