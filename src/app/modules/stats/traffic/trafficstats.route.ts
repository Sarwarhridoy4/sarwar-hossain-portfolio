import { Router } from "express";

import { UserRole } from "../../../../types";
import { TrafficStatsController } from "./trafficstats.controller.ts";
import { checkAuth } from "../../../middlewares/checkAuth";

const router = Router();

router.get(
  "/traffic",
  checkAuth(UserRole.ADMIN),
  TrafficStatsController.getTrafficStats
);
export const TrafficStatsRoutes = router;
