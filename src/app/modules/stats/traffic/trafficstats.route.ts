import { Router } from "express";
import { protectNextAuth } from "../../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../../types";
import { TrafficStatsController } from "./trafficstats.controller.ts";

const router = Router();

router.get(
  "/traffic",
  protectNextAuth([UserRole.ADMIN]),
  TrafficStatsController.getTrafficStats
);
export const TrafficStatsRoutes = router;
