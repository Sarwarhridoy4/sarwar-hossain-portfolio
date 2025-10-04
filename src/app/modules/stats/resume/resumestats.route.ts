import { Router } from "express";

import { UserRole } from "../../../../types";
import { ResumeStatsController } from "./resumestats.controller.ts";
import { checkAuth } from "../../../middlewares/checkAuth";

const router = Router();

router.get(
  "/stats/resumes",
  checkAuth(UserRole.ADMIN),
  ResumeStatsController.getResumesStats
);

export const ResumeStatsRoutes = router;
