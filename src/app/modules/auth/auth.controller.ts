import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.signupUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: user,
  });
});

export const UserControllers = {
  createUser,
};
