import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { uploadBufferToCloudinary } from "../../../config/cloudinary";
import AppError from "../../../helpers/errorhelper/AppError";

// ✅ Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  let profilePictureUrl: string | undefined;

  // If a file is uploaded via multer
  if (req.file) {
    try {
      const result = await uploadBufferToCloudinary(
        req.file.buffer, // multer memoryStorage buffer
        req.file.originalname,
        "profile-image" // choose the folder you want
      );
      profilePictureUrl = result.secure_url;
    } catch (err: any) {
      console.error("Cloudinary upload error:", err);
      throw new AppError(500, "Failed to upload profile picture");
    }
  }

  // Merge profilePicture URL into req.body
  const userPayload = {
    ...req.body,
    profilePicture: profilePictureUrl,
  };

  const user = await AuthServices.signupUser(userPayload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: user,
  });
});

// ✅ Login with email + password
const loginWithEmailAndPassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = await AuthServices.loginWithEmailAndPassword(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Login successful",
      data: user,
    });
  }
);

// ✅ Auth with Google
const authWithGoogle = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.authWithProvider(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Google login successful",
    data: user,
  });
});

// ✅ Auth with GitHub
const authWithGithub = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.authWithProvider(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "GitHub login successful",
    data: user,
  });
});

export const UserControllers = {
  createUser,
  loginWithEmailAndPassword,
  authWithGoogle,
  authWithGithub,
};
