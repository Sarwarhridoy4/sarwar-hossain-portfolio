import { Router } from "express";
import { protectNextAuth } from "../../../middlewares/nextAuthMiddleware";
import { StatsController } from "./blogstats.controller";
import { UserRole } from "../../../../types";
const router = Router();

// Admin-only stats routes

router.get(
  "/blogs",
  protectNextAuth([UserRole.ADMIN]),
  StatsController.getBlogStats
);

export const BlogStatsRoutes = router;
