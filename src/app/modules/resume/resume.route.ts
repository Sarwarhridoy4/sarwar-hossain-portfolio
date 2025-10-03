// routes/resume.routes.ts
import { Router } from "express";
import { ResumeControllers } from "./resume.controller";

import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// CRUD routes for resumes
router.get("/", checkAuth(UserRole.ADMIN), ResumeControllers.getAllResumes); // Get all resumes

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
  ResumeControllers.createResume
); // Create a new resume

router.put(
  "/:id",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("professionalPhoto"), // Optional file
  ResumeControllers.updateResume
); // Update an existing resume

router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN),
  ResumeControllers.deleteResume
); // Delete a resume

export const ResumeRoutes = router;
