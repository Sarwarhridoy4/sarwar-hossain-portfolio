// src/app/modules/blogs/blogs.service.ts
import { prisma } from "../../../config/db";
import { SafeBlog } from "../../../types";
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

const getAllBlogs = async (options?: {
  q?: string;
  tag?: string;
  featured?: boolean;
  published?: boolean;
  includeDeleted?: boolean;
  includeDrafts?: boolean;
  page?: number;
  limit?: number;
}): Promise<SafeBlog[]> => {
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
  if (options?.tag) {
    where.tags = { has: options.tag.toLowerCase() };
  }
  if (options?.q) {
    where.OR = [
      { title: { contains: options.q, mode: "insensitive" } },
      { content: { contains: options.q, mode: "insensitive" } },
      { slug: { contains: options.q, mode: "insensitive" } },
    ];
  }

  return prisma.blog.findMany({
    where,
    skip,
    take: limit,
    orderBy: [{ featured: "desc" }, { priority: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      tags: true,
      thumbnail: true,
      content: true,
      seoTitle: true,
      seoDescription: true,
      ogImage: true,
      featured: true,
      priority: true,
      published: true,
      publishedAt: true,
      authorId: true,
      createdById: true,
      updatedById: true,
      views: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getBlogById = async (
  id: string,
  options?: { includeDeleted?: boolean; includeDrafts?: boolean }
): Promise<SafeBlog> => {
  const today = new Date();
  const dateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const where: Record<string, any> = { id };
  if (!options?.includeDeleted) {
    where.deletedAt = null;
  }
  if (!options?.includeDrafts) {
    where.published = true;
  }

  // Perform blog fetch + total views increment + daily view count tracking in the same transaction
  const updatedBlog = await prisma.$transaction(async (tx) => {
    const updateResult = await tx.blog.updateMany({
      where,
      data: {
        views: { increment: 1 },
      },
    });

    if (updateResult.count === 0) {
      throw new AppError(404, "Blog not found");
    }

    const blog = await tx.blog.findFirst({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        tags: true,
        thumbnail: true,
        content: true,
        seoTitle: true,
        seoDescription: true,
        ogImage: true,
        featured: true,
        priority: true,
        published: true,
        publishedAt: true,
        authorId: true,
        createdById: true,
        updatedById: true,
        views: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!blog) {
      throw new AppError(404, "Blog not found");
    }

    await tx.blogView.upsert({
      where: { blogId_date: { blogId: id, date: dateOnly } },
      update: { count: { increment: 1 } },
      create: { blogId: id, date: dateOnly, count: 1 },
    });

    return blog;
  });

  return updatedBlog;
};

const createBlog = async (
  payload: any,
  file?: Express.Multer.File,
  actorId?: string
): Promise<SafeBlog> => {
  let thumbnailUrl = "";
  if (file) {
    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "blog-thumbnails"
    );
    thumbnailUrl = result.secure_url;
  }

  const published = parseBoolean(payload.published);
  const featured = parseBoolean(payload.featured);
  const priority = parseNumber(payload.priority);

  const blog = await prisma.blog.create({
    data: {
      ...payload,
      tags: normalizeTags(payload.tags),
      thumbnail: thumbnailUrl,
      featured: typeof featured === "boolean" ? featured : undefined,
      priority: typeof priority === "number" ? priority : undefined,
      published: typeof published === "boolean" ? published : undefined,
      publishedAt:
        typeof published === "boolean"
          ? published
            ? payload.publishedAt || new Date()
            : null
          : payload.publishedAt,
      createdById: actorId,
      updatedById: actorId,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      tags: true,
      thumbnail: true,
      content: true,
      seoTitle: true,
      seoDescription: true,
      ogImage: true,
      featured: true,
      priority: true,
      published: true,
      publishedAt: true,
      authorId: true,
      createdById: true,
      updatedById: true,
      views: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return blog;
};

const updateBlog = async (
  id: string,
  payload: any,
  file?: Express.Multer.File,
  actorId?: string
): Promise<SafeBlog> => {
  const existingBlog = await prisma.blog.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existingBlog) throw new AppError(404, "Blog not found");

  // Handle thumbnail replacement
  let thumbnailUrl = existingBlog.thumbnail;
  if (file) {
    if (thumbnailUrl) await deleteImageFromCloudinary(thumbnailUrl);
    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "blog-thumbnails"
    );
    thumbnailUrl = result.secure_url;
  }

  const published = parseBoolean(payload.published);
  const featured = parseBoolean(payload.featured);
  const priority = parseNumber(payload.priority);

  const data: Record<string, any> = {
    ...payload,
    thumbnail: thumbnailUrl,
    updatedById: actorId,
  };

  if (Object.prototype.hasOwnProperty.call(payload, "tags")) {
    data.tags = normalizeTags(payload.tags);
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

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data,
    select: {
      id: true,
      title: true,
      slug: true,
      tags: true,
      thumbnail: true,
      content: true,
      seoTitle: true,
      seoDescription: true,
      ogImage: true,
      featured: true,
      priority: true,
      published: true,
      publishedAt: true,
      authorId: true,
      createdById: true,
      updatedById: true,
      views: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const blog = await prisma.blog.findFirst({
    where: { id, deletedAt: null },
  });
  if (!blog) throw new AppError(404, "Blog not found");

  // Delete thumbnail if exists
  if (blog.thumbnail) await deleteImageFromCloudinary(blog.thumbnail);

  await prisma.blog.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return { message: "Blog deleted successfully" };
};

export const BlogService = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
