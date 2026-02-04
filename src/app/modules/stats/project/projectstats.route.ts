import { Router } from "express";

import { UserRole } from "../../../../types";
import { StatsController } from "./projectstats.controller";
import { checkAuth } from "../../../middlewares/checkAuth";

const router = Router();

router.get("/", checkAuth(UserRole.ADMIN), StatsController.getProjectsStats);

export const ProjectStatsRoutes = router;
