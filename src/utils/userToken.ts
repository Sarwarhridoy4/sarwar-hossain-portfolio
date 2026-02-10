/* eslint-disable no-console */
import { StatusCodes } from "http-status-codes";
import { generateToken, verifyToken, AuthJwtPayload } from "./jwt";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import AppError from "../helpers/errorhelper/AppError";
import { prisma } from "../config/db";

/**
 * 🔐 Generate access + refresh tokens for a user
 */
export const createUserTokens = (user: {
  id: string;
  email: string;
  role: string;
}) => {
  const accessExpiresIn = env.JWT_EXPIRES_IN as SignOptions["expiresIn"];
  const refreshExpiresIn = env.JWT_REFRESH_EXPIRES as SignOptions["expiresIn"];
  const jwtPayload: AuthJwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  // Access token (short lifespan)
  const accessToken = generateToken(
    jwtPayload,
    env.JWT_SECRET_KEY,
    accessExpiresIn
  );

  // Refresh token (long lifespan)
  const refreshToken = generateToken(
    jwtPayload,
    env.JWT_REFRESH_SECRET,
    refreshExpiresIn
  );

  return {
    accessToken,
    refreshToken,
    expiresIn: env.JWT_EXPIRES_IN,
  };
};

/**
 * ♻️ Generate new access token using refresh token
 */
export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  try {
    // Verify refresh token validity
    const decoded = verifyToken(
      refreshToken,
      env.JWT_REFRESH_SECRET
    ) as AuthJwtPayload;

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user)
      throw new AppError(StatusCodes.NOT_FOUND, "User no longer exists");

    const newAccessToken = generateToken(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET_KEY,
      env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
    );

    const newRefreshToken = generateToken(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      env.JWT_REFRESH_SECRET,
      env.JWT_REFRESH_EXPIRES as SignOptions["expiresIn"]
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: env.JWT_EXPIRES_IN,
      refreshExpiresIn: env.JWT_REFRESH_EXPIRES,
    };
  } catch (err) {
    console.error("❌ Refresh token error:", err);
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
};
