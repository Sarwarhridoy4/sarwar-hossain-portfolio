import { Router } from "express";
import { UserControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { signupSchema, loginSchema } from "./auth.validator";

const router = Router();

// ✅ Signup
router.post(
  "/signup",
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
