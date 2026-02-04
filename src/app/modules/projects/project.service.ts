import { prisma } from "../../../config/db";
import { SafeProject } from "../../../types";
import AppError from "../../../helpers/errorhelper/AppError";
import {
  deleteImageFromCloudinary,
  uploadBufferToCloudinary,
} from "../../../config/cloudinary";
import { normalizeTags } from "../../../utils/normalizeTags";

const parseBoolean = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return undefined;
};

const parseNumber = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") return Number(value);
  return undefined;
};

const getAllProjects = async (options?: {
  q?: string;
  featured?: boolean;
  published?: boolean;
  includeDeleted?: boolean;
  includeDrafts?: boolean;
  page?: number;
  limit?: number;
}): Promise<SafeProject[]> => {
  const page = options?.page && options.page > 0 ? options.page : 1;
  const limit = options?.limit && options.limit > 0 ? options.limit : 20;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (!options?.includeDeleted) {
    where.deletedAt = null;
  }
  if (!options?.includeDrafts) {
    where.published = true;
  } else if (typeof options?.published === "boolean") {
    where.published = options.published;
  }
  if (typeof options?.featured === "boolean") {
    where.featured = options.featured;
  }
  if (options?.q) {
    where.OR = [
      { title: { contains: options.q, mode: "insensitive" } },
      { description: { contains: options.q, mode: "insensitive" } },
      { slug: { contains: options.q, mode: "insensitive" } },
      { techStack: { has: options.q.toLowerCase() } },
    ];
  }

  return prisma.project.findMany({
    where,
    skip,
    take: limit,
    orderBy: [{ featured: "desc" }, { priority: "desc" }, { createdAt: "desc" }],
  });
};

const getProjectById = async (
  id: string,
  options?: { includeDeleted?: boolean; includeDrafts?: boolean }
): Promise<SafeProject> => {
  const where: any = { id };
  if (!options?.includeDeleted) {
    where.deletedAt = null;
  }
  if (!options?.includeDrafts) {
    where.published = true;
  }

  const project = await prisma.project.findFirst({ where });
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
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
    featured?: boolean;
    priority?: number;
    published?: boolean;
  },
  files?: Express.Multer.File[],
  actorId?: string
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

  const published = parseBoolean(payload.published);
  const featured = parseBoolean(payload.featured);
  const priority = parseNumber(payload.priority);

  return prisma.project.create({
    data: {
      ...payload,
      images: uploadedUrls,
      techStack: normalizeTags(payload.techStack),
      featured: typeof featured === "boolean" ? featured : undefined,
      priority: typeof priority === "number" ? priority : undefined,
      published: typeof published === "boolean" ? published : undefined,
      publishedAt:
        typeof published === "boolean"
          ? published
            ? new Date()
            : null
          : undefined,
      createdById: actorId,
      updatedById: actorId,
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
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
    featured?: boolean;
    priority?: number;
    published?: boolean;
  }>,
  files?: Express.Multer.File[],
  actorId?: string
): Promise<SafeProject> => {
  const existing = await prisma.project.findFirst({
    where: { id, deletedAt: null },
  });
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

  const published = parseBoolean(payload.published);
  const featured = parseBoolean(payload.featured);
  const priority = parseNumber(payload.priority);

  const data: Record<string, any> = {
    ...payload,
    images: updatedImages,
    updatedById: actorId,
  };

  if (Object.prototype.hasOwnProperty.call(payload, "techStack")) {
    data.techStack = normalizeTags(payload.techStack);
  }

  if (typeof featured === "boolean") {
    data.featured = featured;
  }

  if (typeof priority === "number" && !Number.isNaN(priority)) {
    data.priority = priority;
  }

  if (typeof published === "boolean") {
    data.published = published;
    data.publishedAt = published ? new Date() : null;
  }

  return prisma.project.update({
    where: { id },
    data,
  });
};

const deleteProject = async (id: string) => {
  const existing = await prisma.project.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError(404, "Project not found");

  // delete images from cloudinary
  for (const url of existing.images) {
    await deleteImageFromCloudinary(url);
  }

  await prisma.project.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return { message: "Project deleted successfully" };
};

export const ProjectService = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
