import { Router } from "express";
import { protectNextAuth } from "../../../middlewares/nextAuthMiddleware";
import { StatsController } from "./userstats.controller";
import { UserRole } from "../../../../types";
const router = Router();

// Admin-only stats routes

router.get("/users", protectNextAuth([UserRole.ADMIN]), StatsController.getUserStats);

export const UserStatsRoutes = router;
