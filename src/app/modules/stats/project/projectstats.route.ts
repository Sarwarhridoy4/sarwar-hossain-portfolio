import { Router } from "express";
import { protectNextAuth } from "../../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../../types";
import { StatsController } from "./projectstats.controller";

const router = Router();

router.get(
  "/stats/projects",
  protectNextAuth([UserRole.ADMIN]),
  StatsController.getProjectsStats
);

export const ProjectStatsRoutes = router;
