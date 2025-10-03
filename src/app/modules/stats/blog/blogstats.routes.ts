import { Router } from "express";
import { StatsController } from "./blogstats.controller";
import { UserRole } from "../../../../types";
import { checkAuth } from "../../../middlewares/checkAuth";
const router = Router();

// Admin-only stats routes

router.get(
  "/blogs",
  checkAuth(UserRole.ADMIN),
  StatsController.getBlogStats
);

export const BlogStatsRoutes = router;
