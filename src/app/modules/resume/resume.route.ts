// routes/resume.routes.ts
import { Router } from "express";
import { ResumeControllers } from "./resume.controller";
import { protectNextAuth } from "../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";

const router = Router();

// CRUD routes for resumes
router.get(
  "/",
  protectNextAuth([UserRole.ADMIN]),
  ResumeControllers.getAllResumes
); // Get all resumes
router.get(
  "/:id",
  protectNextAuth([UserRole.ADMIN, UserRole.USER]),
  ResumeControllers.getResume
); // Get single resume

router.post(
  "/",
  protectNextAuth([UserRole.ADMIN, UserRole.USER]),
  multerUpload.single("professionalPhoto"), // Optional file
  ResumeControllers.createResume
); // Create a new resume

router.put(
  "/:id",
  protectNextAuth([UserRole.ADMIN, UserRole.USER]),
  multerUpload.single("professionalPhoto"), // Optional file
  ResumeControllers.updateResume
); // Update an existing resume

router.delete(
  "/:id",
  protectNextAuth([UserRole.ADMIN, UserRole.USER]),
  ResumeControllers.deleteResume
); // Delete a resume

export const ResumeRoutes = router;
