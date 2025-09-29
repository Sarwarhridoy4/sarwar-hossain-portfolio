// controllers/resume.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { ResumeService } from "./resume.service";
import { SafeResume } from "../../../types";
import { StatusCodes } from "http-status-codes";

// Get all resumes
const getAllResumes = catchAsync(async (req: Request, res: Response) => {
  const resumes: SafeResume[] = await ResumeService.getAllResumes();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Resumes fetched successfully",
    data: resumes,
  });
});

// Get a single resume by ID
const getResume = catchAsync(async (req: Request, res: Response) => {
  const resume: SafeResume = await ResumeService.getResumeById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Resume fetched successfully",
    data: resume,
  });
});

// Create a new resume
const createResume = catchAsync(async (req: Request, res: Response) => {
  const resume: SafeResume = await ResumeService.createResume(req.body, req.file);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Resume created successfully",
    data: resume,
  });
});

// Update an existing resume
const updateResume = catchAsync(async (req: Request, res: Response) => {
  const resume: SafeResume = await ResumeService.updateResume(
    req.params.id,
    req.body,
    req.file
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Resume updated successfully",
    data: resume,
  });
});

// Delete a resume
const deleteResume = catchAsync(async (req: Request, res: Response) => {
  const result = await ResumeService.deleteResume(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result.message,
    data: null,
  });
});

export const ResumeControllers = {
  getAllResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
};
