import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";
import AppError from "../../../helpers/errorhelper/AppError";
import { env } from "../../../config/env";
import { SafeUser } from "../../../types";
import {
  uploadBufferToCloudinary,
  deleteImageFromCloudinary,
} from "../../../config/cloudinary";

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<SafeUser[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePicture: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getUserById = async (id: string): Promise<SafeUser> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePicture: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) throw new AppError(404, "User not found");
  return user;
};

const createUser = async (
  payload: {
    name: string;
    email: string;
    password: string;
    role?: Role;
    provider?: string;
  },
  file?: Express.Multer.File
): Promise<SafeUser> => {
  const existing = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existing) throw new AppError(400, "User already exists");

  const hashedPassword = await bcryptjs.hash(
    payload.password,
    Number(env.BYCRYPT_SALT_ROUNDS)
  );

  let uploadedUrl: string | undefined;
  if (file) {
    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "profile-image"
    );
    uploadedUrl = result.secure_url;
  }

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      role: payload.role || "USER",
      provider: payload.provider || "CREDENTIAL",
      profilePicture: uploadedUrl,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePicture: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<{
    name: string;
    email: string;
    password: string;
    role: Role;
    provider: string;
  }>,
  file?: Express.Multer.File
): Promise<SafeUser> => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "User not found");

  const data: any = { ...payload };

  if (payload.password) {
    data.password = await bcryptjs.hash(
      payload.password,
      Number(env.BYCRYPT_SALT_ROUNDS)
    );
  }

  if (file) {
    // Upload new image
    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "profile-image"
    );
    data.profilePicture = result.secure_url;

    // Delete old image
    if (existing.profilePicture) {
      await deleteImageFromCloudinary(existing.profilePicture);
    }
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePicture: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const deleteUser = async (id: string) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "User not found");

  // Delete image if exists
  if (existing.profilePicture) {
    await deleteImageFromCloudinary(existing.profilePicture);
  }

  // Delete DB user
  await prisma.user.delete({ where: { id } });

  return { message: "User deleted successfully" };
};

export const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
