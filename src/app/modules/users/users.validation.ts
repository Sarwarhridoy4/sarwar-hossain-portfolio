import { z } from "zod";
import { validationRules } from "../../../utils/validation";

export const createUserSchema = z.object({
  name: z.string().min(validationRules.nameMin),
  email: z.email("Invalid email address"),
  password: z.string().min(validationRules.passwordMin),
  role: z.string().optional(),
  provider: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();
