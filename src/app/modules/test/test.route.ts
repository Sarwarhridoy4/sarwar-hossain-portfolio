// src/app/test/test.route.ts
import express from "express";
import { TestController } from "./test.controller";
import { protectNextAuth } from "../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../types";

const router = express.Router();

// Accessible by any authenticated user
router.get("/protected", protectNextAuth(), TestController.getProtectedData);

// Accessible by admin only
router.get(
  "/admin-only",
  protectNextAuth([UserRole.ADMIN]),
  TestController.getAdminData
);

export const TestRoutes = router;
