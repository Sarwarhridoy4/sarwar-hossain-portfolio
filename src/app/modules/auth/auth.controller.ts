import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { uploadBufferToCloudinary } from "../../../config/cloudinary";
import AppError from "../../../helpers/errorhelper/AppError";
import { clearAuthCookie, setAuthCookie } from "../../../utils/setCookie";
import { createNewAccessTokenWithRefreshToken } from "../../../utils/userToken";

/**
 * 📝 Create user (Signup) — NO tokens here
 */
const createUser = catchAsync(async (req: Request, res: Response) => {
  let profilePictureUrl: string | undefined;

  if (req.file) {
    try {
      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        req.file.originalname,
        "profile-image"
      );
      profilePictureUrl = result.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to upload profile picture"
      );
    }
  }

  const userPayload = { ...req.body, profilePicture: profilePictureUrl };
  const user = await AuthServices.signupUser(userPayload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: user,
  });
});

/**
 * 🔑 Login with Email + Password — Returns Tokens
 */
const loginWithEmailAndPassword = catchAsync(
  async (req: Request, res: Response) => {
    const userWithTokens = await AuthServices.loginWithEmailAndPassword(
      req.body
    );
    const { tokens, ...safeUser } = userWithTokens;

    setAuthCookie(res, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Login successful",
      data: {
        ...safeUser,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  }
);

/**
 * ♻️ Refresh Access Token using Refresh Token
 */
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (!refreshToken)
    throw new AppError(StatusCodes.UNAUTHORIZED, "No refresh token provided");

  // Returns { accessToken, expiresIn }
  const newTokens = await createNewAccessTokenWithRefreshToken(refreshToken);

  // Rotate refresh token and update cookies
  setAuthCookie(res, {
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Access token refreshed",
    data: {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    },
  });
});

/**
 * 👤 Get current user profile (cookie auth)
 */
const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }

  const user = await AuthServices.getUserById(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User profile fetched",
    data: user,
  });
});

/**
 * 🚪 Logout - clears auth cookies
 */
const logout = catchAsync(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  sendResponse(res, {
    success: true,
    
    statusCode: StatusCodes.OK,
    message: "Logged out successfully",
    data: null,
  });
});


export const UserControllers = {
  createUser,
  loginWithEmailAndPassword,
  refreshToken,
  getMe,
  logout,
};
