// services/resume.service.ts
import { prisma } from "../../../config/db";
import { SafeResume } from "../../../types";
import AppError from "../../../helpers/errorhelper/AppError";
import {
  deleteImageFromCloudinary,
  uploadBufferToCloudinary,
} from "../../../config/cloudinary";

const parseBoolean = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return undefined;
};

const getAllResumes = async (options?: {
  includeDeleted?: boolean;
  publicOnly?: boolean;
}): Promise<SafeResume[]> => {
  const where: any = {};
  if (!options?.includeDeleted) {
    where.deletedAt = null;
  }
  if (options?.publicOnly) {
    where.isPublic = true;
  }

  const resumes = await prisma.resume.findMany({ where });
  return resumes.map((resume) => ({
    ...resume,
    experiences: resume.experiences as Record<string, any>[] | null,
    education: resume.education as Record<string, any>[] | null,
    projects: resume.projects as Record<string, any>[] | null,
    certifications: resume.certifications as Record<string, any>[] | null,
    contactInfo: resume.contactInfo as Record<string, any> | null,
  }));
};

// services/resume.service.ts
const getResumesByUser = async (
  email: string,
  options?: { includeDeleted?: boolean }
): Promise<SafeResume[]> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError(404, "User not found");

  const resumes = await prisma.resume.findMany({
    where: {
      userId: user.id,
      ...(options?.includeDeleted ? {} : { deletedAt: null }),
    },
  });

  return resumes.map((r) => ({
    ...r,
    experiences: r.experiences as Record<string, any>[] | null,
    education: r.education as Record<string, any>[] | null,
    projects: r.projects as Record<string, any>[] | null,
    certifications: r.certifications as Record<string, any>[] | null,
    contactInfo: r.contactInfo as Record<string, any> | null,
  }));
};

const getResumeById = async (
  id: string,
  options?: { includeDeleted?: boolean; publicOnly?: boolean }
): Promise<SafeResume> => {
  const resume = await prisma.resume.findFirst({
    where: {
      id,
      ...(options?.includeDeleted ? {} : { deletedAt: null }),
      ...(options?.publicOnly ? { isPublic: true } : {}),
    },
  });
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
    isPublic?: boolean;
  },
  file?: Express.Multer.File,
  actorId?: string
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
      isPublic:
        typeof payload.isPublic === "boolean"
          ? payload.isPublic
          : parseBoolean(payload.isPublic),
      professionalPhoto: uploadedPhoto,
      createdById: actorId,
      updatedById: actorId,
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
    isPublic?: boolean;
  }>,
  file?: Express.Multer.File,
  actorId?: string
): Promise<SafeResume> => {
  const existing = await prisma.resume.findFirst({
    where: { id, deletedAt: null },
  });
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

  const updatedResume = await prisma.$transaction(async (tx) =>
    tx.resume.update({
      where: { id },
      data: {
        ...payload,
        ...(Object.prototype.hasOwnProperty.call(payload, "isPublic")
          ? {
              isPublic:
                typeof payload.isPublic === "boolean"
                  ? payload.isPublic
                  : parseBoolean(payload.isPublic),
            }
          : {}),
        professionalPhoto: updatedPhoto,
        updatedById: actorId,
      },
    })
  );

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
  const existing = await prisma.resume.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) throw new AppError(404, "Resume not found");

  // delete professional photo if exists
  if (existing.professionalPhoto) {
    await deleteImageFromCloudinary(existing.professionalPhoto);
  }

  await prisma.$transaction(async (tx) => {
    await tx.resume.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  });
  return { message: "Resume deleted successfully" };
};

export const ResumeService = {
  getAllResumes,
  getResumesByUser,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
