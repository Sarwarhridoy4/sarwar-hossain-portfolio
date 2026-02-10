import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Set auth cookies (access + refresh tokens)
 */
export const setAuthCookie = (
  res: Response,
  tokenInfo: AuthTokens,
  accessTokenExpiryMs = 15 * 60 * 1000, // 15 min default
  refreshTokenExpiryMs = 7 * 24 * 60 * 60 * 1000 // 7 days default
) => {
  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
    path: "/",
  };

  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      maxAge: accessTokenExpiryMs,
      ...cookieOptions,
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      maxAge: refreshTokenExpiryMs,
      ...cookieOptions,
    });
  }
};

/**
 * Clear auth cookies (for logout)
 */
export const clearAuthCookie = (res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
  };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
};
