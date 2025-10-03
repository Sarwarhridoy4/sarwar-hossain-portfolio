import { Router } from "express";
import { BlogControllers } from "./blogs.controller";
import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// Public routes
router.get("/", BlogControllers.getAllBlogs);
router.get("/:id", BlogControllers.getBlogById);

// Admin protected routes
router.post(
  "/",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("thumbnail"),
  BlogControllers.createBlog
);

router.put(
  "/:id",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("thumbnail"),
  BlogControllers.updateBlog
);

router.delete("/:id", checkAuth(UserRole.ADMIN), BlogControllers.deleteBlog);

export const BlogRoutes = router;
