import { z } from "zod";
import { validationRules } from "../../../utils/validation";

const jsonStringSchema = z
  .union([z.string().min(2), z.any()])
  .optional();

const skillsSchema = z
  .union([z.array(z.string().min(1)), z.string().min(1)])
  .optional()
  .transform((val) => (val ? (Array.isArray(val) ? val : [val]) : []));

export const createResumeSchema = z.object({
  title: z.string().min(validationRules.titleMin),
  summary: z.string().min(validationRules.summaryMin).optional(),
  experiences: jsonStringSchema,
  education: jsonStringSchema,
  skills: skillsSchema,
  projects: jsonStringSchema,
  certifications: jsonStringSchema,
  contactInfo: jsonStringSchema,
  isPublic: z.union([z.boolean(), z.string()]).optional(),
});

export const updateResumeSchema = createResumeSchema.partial();
