// controllers/user.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { UserService } from "./users.service";
import { SafeUser } from "../../../types";
import { StatusCodes } from "http-status-codes";

// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users fetched successfully",
    data: users,
  });
});

// Get a single user by ID
const getUser = catchAsync(async (req: Request, res: Response) => {
  const user: SafeUser = await UserService.getUserById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// Create a new user (Admin only)
const createUser = catchAsync(async (req: Request, res: Response) => {
  const user: SafeUser = await UserService.createUser(req.body, req.file);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: user,
  });
});

// Update an existing user (Admin only)
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user: SafeUser = await UserService.updateUser(
    req.params.id,
    req.body,
    req.file
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: user,
  });
});

// Delete a user (Admin only)
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result.message,
    data: null,
  });
});

export const UserControllers = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
