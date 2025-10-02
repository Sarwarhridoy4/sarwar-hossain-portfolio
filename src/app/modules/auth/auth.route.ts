import { Router } from "express";
import { UserControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { signupSchema, loginSchema } from "./auth.validator";
import { multerUpload } from "../../../config/multer";

const router = Router();

// ✅ Signup
router.post(
  "/signup",
  multerUpload.single("profilePicture"), // Optional file
  validateRequest(signupSchema),
  UserControllers.createUser
);

// ✅ Login (email + password)
router.post(
  "/login",
  validateRequest(loginSchema),
  UserControllers.loginWithEmailAndPassword
);

// ✅ Social login (Google)
router.post("/google", UserControllers.authWithGoogle);

// ✅ Social login (GitHub)
router.post("/github", UserControllers.authWithGithub);

export const AuthRoutes = router;
