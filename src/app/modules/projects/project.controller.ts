import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { ProjectService } from "./project.service";

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await ProjectService.getAllProjects();
  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await ProjectService.getProjectById(id);
  res.status(200).json({
    success: true,
    message: "Project fetched successfully",
    data: project,
  });
});

const createProject = catchAsync(async (req: Request, res: Response) => {
  const { title, slug, description, techStack, authorId } = req.body;

  const parsedTechStack =
    typeof techStack === "string" ? JSON.parse(techStack) : techStack;

  const project = await ProjectService.createProject(
    { title, slug, description, techStack: parsedTechStack, authorId },
    req.files as Express.Multer.File[]
  );

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, description, techStack } = req.body;

  const parsedTechStack =
    typeof techStack === "string" ? JSON.parse(techStack) : techStack;

  const project = await ProjectService.updateProject(
    id,
    { title, slug, description, techStack: parsedTechStack },
    req.files as Express.Multer.File[]
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProject(id);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

export const ProjectController = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
