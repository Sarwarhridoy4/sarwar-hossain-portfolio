import { Router } from "express";
import { UserControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { signupSchema } from "./auth.validator";

const router = Router();

router.post(
  "/signup",
  validateRequest(signupSchema),
  UserControllers.createUser
);

export const AuthRoutes= router;
