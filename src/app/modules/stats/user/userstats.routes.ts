import { Router } from "express";

import { StatsController } from "./userstats.controller";
import { UserRole } from "../../../../types";
import { checkAuth } from "../../../middlewares/checkAuth";
const router = Router();

// Admin-only stats routes

router.get("/", checkAuth(UserRole.ADMIN), StatsController.getUserStats);

export const UserStatsRoutes = router;
