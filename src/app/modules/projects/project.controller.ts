import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { ProjectService } from "./project.service";

const parseMaybeJsonArray = (value: unknown) => {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const isAdmin = req.user?.role === "ADMIN";
  const includeDrafts = isAdmin
    ? req.query.includeDrafts !== "false"
    : false;
  const includeDeleted = isAdmin && req.query.includeDeleted === "true";

  const projects = await ProjectService.getAllProjects({
    q: req.query.q as string | undefined,
    featured: req.query.featured
      ? req.query.featured === "true"
      : undefined,
    published: req.query.published
      ? req.query.published === "true"
      : undefined,
    includeDrafts,
    includeDeleted,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  });
  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const isAdmin = req.user?.role === "ADMIN";
  const project = await ProjectService.getProjectById(id, {
    includeDrafts: isAdmin ? req.query.includeDrafts !== "false" : false,
    includeDeleted: isAdmin && req.query.includeDeleted === "true",
  });
  res.status(200).json({
    success: true,
    message: "Project fetched successfully",
    data: project,
  });
});

const createProject = catchAsync(async (req: Request, res: Response) => {
  const {
    title,
    slug,
    description,
    videoUrl,
    liveUrl,
    repoUrl,
    techStack,
    authorId,
    seoTitle,
    seoDescription,
    ogImage,
    featured,
    priority,
    published,
  } = req.body;

  const parsedTechStack = parseMaybeJsonArray(techStack);

  const project = await ProjectService.createProject(
    {
      title,
      slug,
      description,
      videoUrl,
      liveUrl,
      repoUrl,
      techStack: parsedTechStack,
      authorId,
      seoTitle,
      seoDescription,
      ogImage,
      featured,
      priority,
      published,
    },
    req.files as Express.Multer.File[],
    req.user?.id
  );

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    slug,
    description,
    techStack,
    videoUrl,
    liveUrl,
    repoUrl,
    seoTitle,
    seoDescription,
    ogImage,
    featured,
    priority,
    published,
  } = req.body;

  const parsedTechStack = parseMaybeJsonArray(techStack);

  const project = await ProjectService.updateProject(
    id,
    {
      title,
      slug,
      description,
      videoUrl,
      repoUrl,
      liveUrl,
      techStack: parsedTechStack,
      seoTitle,
      seoDescription,
      ogImage,
      featured,
      priority,
      published,
    },
    req.files as Express.Multer.File[],
    req.user?.id
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
