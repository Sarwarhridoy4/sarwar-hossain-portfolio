// services/resume.service.ts
import { PrismaClient } from "@prisma/client";
import { SafeResume } from "../../../types";
import AppError from "../../../helpers/errorhelper/AppError";
import {
  deleteImageFromCloudinary,
  uploadBufferToCloudinary,
} from "../../../config/cloudinary";

const prisma = new PrismaClient();

const getAllResumes = async (): Promise<SafeResume[]> => {
  const resumes = await prisma.resume.findMany();
  return resumes.map((resume) => ({
    ...resume,
    experiences: resume.experiences as Record<string, any>[] | null,
    education: resume.education as Record<string, any>[] | null,
    projects: resume.projects as Record<string, any>[] | null,
    certifications: resume.certifications as Record<string, any>[] | null,
    contactInfo: resume.contactInfo as Record<string, any> | null,
  }));
};

const getResumeById = async (id: string): Promise<SafeResume> => {
  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume) throw new AppError(404, "Resume not found");
  return {
    ...resume,
    experiences: resume.experiences as Record<string, any>[] | null,
    education: resume.education as Record<string, any>[] | null,
    projects: resume.projects as Record<string, any>[] | null,
    certifications: resume.certifications as Record<string, any>[] | null,
    contactInfo: resume.contactInfo as Record<string, any> | null,
  };
};

const createResume = async (
  payload: {
    title: string;
    summary?: string;
    experiences?: any;
    education?: any;
    skills?: string[];
    projects?: any;
    certifications?: any;
    contactInfo?: any;
    userId: string;
  },
  file?: Express.Multer.File
): Promise<SafeResume> => {
  let uploadedPhoto: string | undefined;

  if (file) {
    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "resume-professional-photos"
    );
    uploadedPhoto = result.secure_url;
  }

  const createdResume = await prisma.resume.create({
    data: {
      ...payload,
      professionalPhoto: uploadedPhoto,
    },
  });

  return {
    ...createdResume,
    experiences: createdResume.experiences as Record<string, any>[] | null,
    education: createdResume.education as Record<string, any>[] | null,
    projects: createdResume.projects as Record<string, any>[] | null,
    certifications: createdResume.certifications as
      | Record<string, any>[]
      | null,
    contactInfo: createdResume.contactInfo as Record<string, any> | null,
  };
};

const updateResume = async (
  id: string,
  payload: Partial<{
    title: string;
    summary?: string;
    experiences?: any;
    education?: any;
    skills?: string[];
    projects?: any;
    certifications?: any;
    contactInfo?: any;
  }>,
  file?: Express.Multer.File
): Promise<SafeResume> => {
  const existing = await prisma.resume.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Resume not found");

  let updatedPhoto = existing.professionalPhoto;

  if (file) {
    // delete old photo if exists
    if (existing.professionalPhoto) {
      await deleteImageFromCloudinary(existing.professionalPhoto);
    }

    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "resume-professional-photos"
    );
    updatedPhoto = result.secure_url;
  }

  const updatedResume = await prisma.resume.update({
    where: { id },
    data: {
      ...payload,
      professionalPhoto: updatedPhoto,
    },
  });

  return {
    ...updatedResume,
    experiences: updatedResume.experiences as Record<string, any>[] | null,
    education: updatedResume.education as Record<string, any>[] | null,
    projects: updatedResume.projects as Record<string, any>[] | null,
    certifications: updatedResume.certifications as
      | Record<string, any>[]
      | null,
    contactInfo: updatedResume.contactInfo as Record<string, any> | null,
  };
};

const deleteResume = async (id: string) => {
  const existing = await prisma.resume.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Resume not found");

  // delete professional photo if exists
  if (existing.professionalPhoto) {
    await deleteImageFromCloudinary(existing.professionalPhoto);
  }

  await prisma.resume.delete({ where: { id } });
  return { message: "Resume deleted successfully" };
};

export const ResumeService = {
  getAllResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
