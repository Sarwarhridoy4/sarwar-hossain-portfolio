// routes/user.routes.ts
import { Router } from "express";
import { UserControllers } from "./users.controller";
import { protectNextAuth } from "../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../types";
import { multerUpload } from "../../../config/multer";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";

const router = Router();

// CRUD routes for User management
router.get("/", protectNextAuth([UserRole.ADMIN]), UserControllers.getAllUsers); // Get all users
router.get(
  "/:id",
  protectNextAuth([UserRole.ADMIN, UserRole.USER]),
  UserControllers.getUser
); // Get single user by ID
router.post(
  "/",
  protectNextAuth([UserRole.ADMIN]),
  multerUpload.single("profilePicture"),
  uploadToCloudinary("profile-image"),
  UserControllers.createUser
); // Create a new user
router.put(
  "/:id",
  protectNextAuth([UserRole.ADMIN, UserRole.USER]),
  multerUpload.single("profilePicture"),
  uploadToCloudinary("profile-image"),
  UserControllers.updateUser
); // Update existing user
router.delete(
  "/:id",
  protectNextAuth([UserRole.ADMIN]),
  UserControllers.deleteUser
); // Delete user

export const UserRoutes = router;
