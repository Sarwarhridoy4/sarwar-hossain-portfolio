// routes/project.route.ts
import { Router } from "express";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../../config/multer";
import { protectNextAuth } from "../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../types";

const router = Router();

// Get all projects
router.get(
  "/",
  protectNextAuth([UserRole.ADMIN]),
  ProjectController.getAllProjects
);

// Get a project by ID
router.get(
  "/:id",
  protectNextAuth([UserRole.ADMIN]),
  ProjectController.getProjectById
);

// Create a new project (Admin only)
router.post(
  "/",
  protectNextAuth([UserRole.ADMIN]),
  multerUpload.array("images", 5), // allow up to 5 images
  ProjectController.createProject
);

// Update a project (Admin only)
router.put(
  "/:id",
  protectNextAuth([UserRole.ADMIN]),
  multerUpload.array("images", 5),
  ProjectController.updateProject
);

// Delete a project (Admin only)
router.delete(
  "/:id",
  protectNextAuth([UserRole.ADMIN]),
  ProjectController.deleteProject
);

export const ProjectRoutes = router;
