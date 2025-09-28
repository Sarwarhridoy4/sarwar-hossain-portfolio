import { Role } from "@prisma/client";

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: Role; // Matches Prisma enum: "ADMIN" | "USER"
  profilePicture: string | null;
  provider: string; // "CREDENTIAL" | "GOOGLE" | "GITHUB"
  createdAt: Date;
  updatedAt: Date;
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type SafeBlog = {
  id: string;
  title: string;
  slug: string;
  tags: string[]; // array of strings
  content: string;
  thumbnail: string; // Cloudinary URL
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};
