// routes/project.route.ts
import { Router } from "express";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../../config/multer";
import { UserRole } from "../../../types";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// Get all projects
router.get("/", checkAuth(UserRole.ADMIN), ProjectController.getAllProjects);

// Get a project by ID
router.get("/:id", checkAuth(UserRole.ADMIN), ProjectController.getProjectById);

// Create a new project (Admin only)
router.post(
  "/",
  checkAuth(UserRole.ADMIN),
  multerUpload.array("images", 5), // allow up to 5 images
  ProjectController.createProject
);

// Update a project (Admin only)
router.put(
  "/:id",
  checkAuth(UserRole.ADMIN),
  multerUpload.array("images", 5),
  ProjectController.updateProject
);

// Delete a project (Admin only)
router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN),
  ProjectController.deleteProject
);

export const ProjectRoutes = router;
