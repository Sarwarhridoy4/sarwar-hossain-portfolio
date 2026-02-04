import { z } from "zod";
import { validationRules } from "../../../utils/validation";

export const signupSchema = z.object({
  name: z
    .string()
    .min(validationRules.nameMin, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(validationRules.passwordMin, "Password must be at least 6 characters"),
  profilePicture: z.string().optional(),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(validationRules.passwordMin, "Password must be at least 6 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;
