import { Router } from "express";
import { BlogControllers } from "./blogs.controller";
import { protectNextAuth } from "../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";

const router = Router();

// Public routes
router.get("/", BlogControllers.getAllBlogs); 
router.get("/:id", BlogControllers.getBlogById); 

// Admin protected routes
router.post(
  "/",
  protectNextAuth([UserRole.ADMIN]),
  multerUpload.single("thumbnail"),
  BlogControllers.createBlog
);

router.put(
  "/:id",
  protectNextAuth([UserRole.ADMIN]),
  multerUpload.single("thumbnail"),
  BlogControllers.updateBlog
);

router.delete(
  "/:id",
  protectNextAuth([UserRole.ADMIN]),
  BlogControllers.deleteBlog
);

export const BlogRoutes = router;
