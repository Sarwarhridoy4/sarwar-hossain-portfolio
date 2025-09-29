// src/app/modules/blogs/blogs.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { BlogService } from "./blogs.service";
import { StatusCodes } from "http-status-codes";
import { SafeBlog } from "../../../types";

// Get all blogs
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs: SafeBlog[] = await BlogService.getAllBlogs();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

// Get a single blog by ID
const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const blog: SafeBlog = await BlogService.getBlogById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog fetched successfully",
    data: blog,
  });
});

// Create a new blog (Admin only)
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog: SafeBlog = await BlogService.createBlog(req.body, req.file);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Blog created successfully",
    data: blog,
  });
});

// Update an existing blog (Admin only)
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blog: SafeBlog = await BlogService.updateBlog(
    req.params.id,
    req.body,
    req.file
  ); // pass file
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog updated successfully",
    data: blog,
  });
});

// Delete a blog (Admin only)
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlog(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result.message,
    data: null,
  });
});

export const BlogControllers = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
