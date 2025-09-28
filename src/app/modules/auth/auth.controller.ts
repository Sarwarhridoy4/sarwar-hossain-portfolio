import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// ✅ Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.signupUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: user,
  });
});

// ✅ Login with email + password
const loginWithEmailAndPassword = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.loginWithEmailAndPassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Login successful",
    data: user,
  });
});

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
