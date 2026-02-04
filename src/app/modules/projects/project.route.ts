// routes/project.route.ts
import { Router } from "express";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../../config/multer";
import { UserRole } from "../../../types";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectSchema, updateProjectSchema } from "./project.validation";
import { rateLimit } from "../../middlewares/rateLimit";

const router = Router();

// Admin routes
router.get("/admin", checkAuth(UserRole.ADMIN), ProjectController.getAllProjects);
router.get(
  "/admin/:id",
  checkAuth(UserRole.ADMIN),
  ProjectController.getProjectById
);

// Public routes
router.get(
  "/",
  rateLimit({ windowMs: 60_000, max: 60 }),
  ProjectController.getAllProjects
);
router.get(
  "/:id",
  rateLimit({ windowMs: 60_000, max: 60 }),
  ProjectController.getProjectById
);

// Create a new project (Admin only)
router.post(
  "/",
  checkAuth(UserRole.ADMIN),
  multerUpload.array("images", 5), // allow up to 5 images
  validateRequest(createProjectSchema),
  ProjectController.createProject
);

// Update a project (Admin only)
router.put(
  "/:id",
  checkAuth(UserRole.ADMIN),
  multerUpload.array("images", 5),
  validateRequest(updateProjectSchema),
  ProjectController.updateProject
);

// Delete a project (Admin only)
router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN),
  ProjectController.deleteProject
);

export const ProjectRoutes = router;
