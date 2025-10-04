/* eslint-disable no-console */
import { StatusCodes } from "http-status-codes";
import { generateToken, verifyToken, AuthJwtPayload } from "./jwt";
import { env } from "../config/env";
import AppError from "../helpers/errorhelper/AppError";
import { prisma } from "../config/db";

/**
 * Generate access + refresh tokens for a user
 */
export const createUserTokens = (user: {
  id: string;
  email: string;
  role: string;
}) => {
  const jwtPayload: AuthJwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    env.JWT_SECRET_KEY,
    env.JWT_EXPIRES_IN
  );

  const refreshToken = generateToken(
    jwtPayload,
    env.JWT_REFRESH_SECRET,
    env.JWT_REFRESH_EXPIRES
  );

  return { accessToken, refreshToken };
};

/**
 * Refresh token logic → issue a new access token
 */
export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  let verifiedRefreshToken: AuthJwtPayload;

  try {
    verifiedRefreshToken = verifyToken(
      refreshToken,
      env.JWT_REFRESH_SECRET
    ) as AuthJwtPayload;
  } catch (err) {
    console.error("❌ Invalid refresh token:", err);
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }

  // ✅ Find user in Prisma
  const user = await prisma.user.findUnique({
    where: { email: verifiedRefreshToken.email },
  });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
  }

  const jwtPayload: AuthJwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const newAccessToken = generateToken(
    jwtPayload,
    env.JWT_SECRET_KEY,
    env.JWT_EXPIRES_IN
  );

  return newAccessToken;
};
