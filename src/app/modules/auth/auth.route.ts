import { Router } from "express";
import { UserControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { signupSchema, loginSchema } from "./auth.validator";
import { multerUpload } from "../../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../../../types";

const router = Router();

/**
 * 📝 Signup
 * - Handles file upload (optional profile picture)
 * - Validates input with Zod/Joi schema
 * - Only creates user — no tokens returned
 */
router.post(
  "/signup",
  multerUpload.single("profilePicture"),
  validateRequest(signupSchema),
  UserControllers.createUser
);

/**
 * 🔑 Login (email + password)
 * - Validates request
 * - Returns both accessToken + refreshToken
 * - Sets them as httpOnly cookies
 */
router.post(
  "/login",
  validateRequest(loginSchema),
  UserControllers.loginWithEmailAndPassword
);

/**
 * ♻️ Refresh token
 * - Accepts refreshToken from cookie/body
 * - Returns new accessToken
 */
router.post("/refresh-token", UserControllers.refreshToken);

/**
 * 👤 Current user (cookie auth)
 */
router.get(
  "/me",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  UserControllers.getMe
);

/**
 * 🚪 Logout (clear cookies)
 */
router.post(
  "/logout",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  UserControllers.logout
);

export const AuthRoutes = router;
