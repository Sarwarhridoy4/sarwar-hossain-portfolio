import { Router } from "express";
import { protectNextAuth } from "../../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../../types";
import { StatsController } from "./general.controller";

const router = Router();

// Only admin should see system-wide stats
router.get(
  "/general/overview",
  protectNextAuth([UserRole.ADMIN]),
  StatsController.getOverviewStats
);

export const GeneralStatsRoutes = router;
