import { z } from "zod";
import { seoTextSchema, slugSchema, validationRules } from "../../../utils/validation";

const techStackSchema = z
  .union([z.array(z.string().min(1)), z.string().min(1)])
  .optional()
  .transform((val) => (val ? (Array.isArray(val) ? val : [val]) : []));

export const createProjectSchema = z.object({
  title: z.string().min(validationRules.titleMin),
  slug: slugSchema,
  description: z.string().min(validationRules.titleMin),
  techStack: techStackSchema,
  videoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  seoTitle: seoTextSchema.optional(),
  seoDescription: seoTextSchema.optional(),
  ogImage: z.string().url().optional(),
  featured: z.union([z.boolean(), z.string()]).optional(),
  priority: z.union([z.number(), z.string()]).optional(),
  published: z.union([z.boolean(), z.string()]).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
