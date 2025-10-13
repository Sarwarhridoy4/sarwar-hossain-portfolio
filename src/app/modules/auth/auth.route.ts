import { Router } from "express";
import { UserControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { signupSchema, loginSchema } from "./auth.validator";
import { multerUpload } from "../../../config/multer";

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
 * 🌐 Google social login
 * - Returns accessToken + refreshToken
 * - Also sets cookies
 */
router.post("/google", UserControllers.authWithGoogle);

/**
 * 🐙 GitHub social login
 * - Same as Google login
 */
router.post("/github", UserControllers.authWithGithub);

export const AuthRoutes = router;
