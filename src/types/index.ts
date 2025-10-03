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
  views: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SafeProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  techStack: string[];
  images: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SafeResume = {
  id: string;
  title: string;
  summary: string | null;
  professionalPhoto: string | null;

  experiences: Record<string, any>[] | null; // array of objects for experiences
  education: Record<string, any>[] | null; // array of objects for education
  skills: string[]; // list of skills
  projects: Record<string, any>[] | null; // array of objects for projects
  certifications: Record<string, any>[] | null; // array of objects for certifications
  contactInfo: Record<string, any> | null; // object with contact info

  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
