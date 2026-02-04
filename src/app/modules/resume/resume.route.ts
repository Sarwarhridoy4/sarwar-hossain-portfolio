// routes/resume.routes.ts
import { Router } from "express";
import { ResumeControllers } from "./resume.controller";

import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createResumeSchema, updateResumeSchema } from "./resume.validation";
import { rateLimit } from "../../middlewares/rateLimit";

const router = Router();

// CRUD routes for resumes
router.get("/", checkAuth(UserRole.ADMIN), ResumeControllers.getAllResumes); // Get all resumes

router.get(
  "/public",
  rateLimit({ windowMs: 60_000, max: 60 }),
  ResumeControllers.getPublicResumes
);

router.get(
  "/public/:id",
  rateLimit({ windowMs: 60_000, max: 60 }),
  ResumeControllers.getPublicResume
);

router.get(
  "/user",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  ResumeControllers.getUserResumes
);

router.get("/:id", checkAuth(UserRole.ADMIN), ResumeControllers.getResume); // Get single resume

router.post(
  "/",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("professionalPhoto"), // Optional file
  validateRequest(createResumeSchema),
  ResumeControllers.createResume
); // Create a new resume

router.put(
  "/:id",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("professionalPhoto"), // Optional file
  validateRequest(updateResumeSchema),
  ResumeControllers.updateResume
); // Update an existing resume

router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN),
  ResumeControllers.deleteResume
); // Delete a resume

export const ResumeRoutes = router;
