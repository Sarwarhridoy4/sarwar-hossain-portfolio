import { PrismaClient, type User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { env } from "../../../config/env";

const prisma = new PrismaClient();

// Create user
const createUser = async (payload: Partial<User>) => {
  const hashedPassword = await bcryptjs.hash(
    payload.password as string,
    Number(env.BYCRYPT_SALT_ROUNDS)
  ); // Hash the password before saving (implement hashing as needed)
  const user = await prisma.user.create({
    data: {
      name: payload.name!,
      email: payload.email!,
      password: hashedPassword!,
    },
  });
  return user;
};

// Get all users
const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      // Exclude password
    },
  });
};

// Get user by ID
const getUserById = async (id: string) => {
  // Convert string to number
  const userId = Number(id);

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      // Exclude password
    },
  });
  return user;
};

// Update user by ID
const updateUserById = async (id: string, data: Partial<User>) => {
  const userId = Number(id);
  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      // Exclude password
    },
    data,
  });

  return updatedUser;
};

// Delete user by ID
const deleteUserById = async (id: string) => {
  const userId = Number(id);
  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return deletedUser;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
