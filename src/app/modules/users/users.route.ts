// routes/user.routes.ts
import { Router } from "express";
import { UserControllers } from "./users.controller";
import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// CRUD routes for User management
router.get("/", checkAuth(UserRole.ADMIN), UserControllers.getAllUsers); // Get all users
router.get("/:id", checkAuth(UserRole.ADMIN), UserControllers.getUser); // Get single user by ID
router.post(
  "/",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("profilePicture"),
  uploadToCloudinary("profile-image"),
  UserControllers.createUser
); // Create a new user
router.put(
  "/:id",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("profilePicture"),
  uploadToCloudinary("profile-image"),
  UserControllers.updateUser
); // Update existing user
router.delete("/:id", checkAuth(UserRole.ADMIN), UserControllers.deleteUser); // Delete user

export const UserRoutes = router;
