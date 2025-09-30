import { PrismaClient } from "@prisma/client";
import { SafeProject } from "../../../types";
import AppError from "../../../helpers/errorhelper/AppError";
import {
  deleteImageFromCloudinary,
  uploadBufferToCloudinary,
} from "../../../config/cloudinary";

const prisma = new PrismaClient();

const getAllProjects = async (): Promise<SafeProject[]> => {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getProjectById = async (id: string): Promise<SafeProject> => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new AppError(404, "Project not found");
  return project;
};

const createProject = async (
  payload: {
    title: string;
    slug: string;
    description: string;
    techStack: string[];
    authorId: string;
    videoUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
  },
  files?: Express.Multer.File[]
): Promise<SafeProject> => {
  let uploadedUrls: string[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
        "project-images"
      );
      uploadedUrls.push(result.secure_url);
    }
  }

  return prisma.project.create({
    data: {
      ...payload,
      images: uploadedUrls,
    },
  });
};

const updateProject = async (
  id: string,
  payload: Partial<{
    title: string;
    slug: string;
    description: string;
    videoUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
    techStack: string[];
  }>,
  files?: Express.Multer.File[]
): Promise<SafeProject> => {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Project not found");

  let updatedImages = existing.images;

  if (files && files.length > 0) {
    // delete old images from cloudinary
    for (const url of existing.images) {
      await deleteImageFromCloudinary(url);
    }

    updatedImages = [];
    for (const file of files) {
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
        "project-images"
      );
      updatedImages.push(result.secure_url);
    }
  }

  return prisma.project.update({
    where: { id },
    data: {
      ...payload,
      images: updatedImages,
    },
  });
};

const deleteProject = async (id: string) => {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Project not found");

  // delete images from cloudinary
  for (const url of existing.images) {
    await deleteImageFromCloudinary(url);
  }

  await prisma.project.delete({ where: { id } });

  return { message: "Project deleted successfully" };
};

export const ProjectService = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
