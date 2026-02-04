import { Router } from "express";

import { UserRole } from "../../../../types";
import { ResumeStatsController } from "./resumestats.controller";
import { checkAuth } from "../../../middlewares/checkAuth";

const router = Router();

router.get("/", checkAuth(UserRole.ADMIN), ResumeStatsController.getResumesStats);

export const ResumeStatsRoutes = router;
