import { z } from "zod";
import { seoTextSchema, slugSchema, tagSchema, validationRules } from "../../../utils/validation";

const tagsSchema = z
  .union([z.array(tagSchema), tagSchema])
  .optional()
  .transform((val) => (val ? (Array.isArray(val) ? val : [val]) : []));

export const createBlogSchema = z.object({
  title: z.string().min(validationRules.titleMin),
  slug: slugSchema,
  content: z.string().min(validationRules.contentMin),
  tags: tagsSchema,
  seoTitle: seoTextSchema.optional(),
  seoDescription: seoTextSchema.optional(),
  ogImage: z.string().url().optional(),
  featured: z.union([z.boolean(), z.string()]).optional(),
  priority: z.union([z.number(), z.string()]).optional(),
  published: z.union([z.boolean(), z.string()]).optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
