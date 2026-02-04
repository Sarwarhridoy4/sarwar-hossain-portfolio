import { z } from "zod";

export const validationRules = {
  nameMin: 2,
  passwordMin: 6,
  titleMin: 3,
  slugMin: 3,
  contentMin: 50,
  summaryMin: 10,
  maxTags: 20,
  maxImages: 5,
};

export const tagSchema = z
  .string()
  .min(1)
  .max(32)
  .transform((tag) => tag.trim().toLowerCase());

export const slugSchema = z
  .string()
  .min(validationRules.slugMin)
  .regex(/^[a-z0-9-]+$/, "Slug must be lowercase, alphanumeric, and hyphenated");

export const seoTextSchema = z.string().max(160);
