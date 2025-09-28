// src/app/test/test.controller.ts
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// Controller for protected route
const getProtectedData = catchAsync(async (req: Request, res: Response) => {
  // req.user is populated by protectNextAuth middleware
  const user = req.user;

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Protected route accessed successfully",
    data: {
      user,
      secretData: "This is protected data for authenticated users",
    },
  });
});

// Admin-only route
const getAdminData = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Admin-only route accessed",
    data: {
      user,
      secretAdminData: "This is sensitive admin-only data",
    },
  });
});

export const TestController = {
  getProtectedData,
  getAdminData,
};
