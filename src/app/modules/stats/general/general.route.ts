import { Router } from "express";
import { UserRole } from "../../../../types";
import { StatsController } from "./general.controller";
import { checkAuth } from "../../../middlewares/checkAuth";

const router = Router();

// Only admin should see system-wide stats
router.get(
  "/general/overview",
  checkAuth(UserRole.ADMIN),
  StatsController.getOverviewStats
);

export const GeneralStatsRoutes = router;
