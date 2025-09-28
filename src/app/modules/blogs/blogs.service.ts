// src/app/modules/blogs/blogs.service.ts
import { PrismaClient } from "@prisma/client";
import { SafeBlog } from "../../../types";
import AppError from "../../../helpers/errorhelper/AppError";
import {
  deleteImageFromCloudinary,
  uploadBufferToCloudinary,
} from "../../../config/cloudinary";

const prisma = new PrismaClient();

const getAllBlogs = async (): Promise<SafeBlog[]> => {
  return prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      tags: true,
      thumbnail: true,
      content: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getBlogById = async (id: string): Promise<SafeBlog> => {
  const blog = await prisma.blog.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      tags: true,
      thumbnail: true,
      content: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!blog) throw new AppError(404, "Blog not found");
  return blog;
};

const createBlog = async (
  payload: any,
  file?: Express.Multer.File
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

  const blog = await prisma.blog.create({
    data: {
      ...payload,
      tag: JSON.stringify(payload.tag || []), // store array as JSON string
      thumbnail: thumbnailUrl,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      tags: true,
      thumbnail: true,
      content: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return blog;
};

const updateBlog = async (
  id: string,
  payload: any,
  file?: Express.Multer.File
): Promise<SafeBlog> => {
  const existingBlog = await prisma.blog.findUnique({ where: { id } });
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

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: {
      ...payload,
      tag: JSON.stringify(payload.tag || []),
      thumbnail: thumbnailUrl,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      tags: true,
      thumbnail: true,
      content: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) throw new AppError(404, "Blog not found");

  // Delete thumbnail if exists
  if (blog.thumbnail) await deleteImageFromCloudinary(blog.thumbnail);

  await prisma.blog.delete({ where: { id } });
  return { message: "Blog deleted successfully" };
};

export const BlogService = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
