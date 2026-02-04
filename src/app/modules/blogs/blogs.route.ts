import { Router } from "express";
import { BlogControllers } from "./blogs.controller";
import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createBlogSchema, updateBlogSchema } from "./blogs.validation";
import { rateLimit } from "../../middlewares/rateLimit";

const router = Router();

// Admin protected routes
router.get(
  "/admin",
  checkAuth(UserRole.ADMIN),
  BlogControllers.getAllBlogs
);
router.get(
  "/admin/:id",
  checkAuth(UserRole.ADMIN),
  BlogControllers.getBlogById
);

// Public routes
router.get("/", rateLimit({ windowMs: 60_000, max: 60 }), BlogControllers.getAllBlogs);
router.get(
  "/:id",
  rateLimit({ windowMs: 60_000, max: 60 }),
  BlogControllers.getBlogById
);
router.post(
  "/",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("thumbnail"),
  validateRequest(createBlogSchema),
  BlogControllers.createBlog
);

router.put(
  "/:id",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("thumbnail"),
  validateRequest(updateBlogSchema),
  BlogControllers.updateBlog
);

router.delete("/:id", checkAuth(UserRole.ADMIN), BlogControllers.deleteBlog);

export const BlogRoutes = router;
