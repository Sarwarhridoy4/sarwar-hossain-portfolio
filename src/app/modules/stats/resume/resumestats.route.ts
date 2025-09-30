import { Router } from "express";
import { protectNextAuth } from "../../../middlewares/nextAuthMiddleware";
import { UserRole } from "../../../../types";
import { ResumeStatsController } from "./resumestats.controller.ts";

const router = Router();

router.get(
  "/stats/resumes",
  protectNextAuth([UserRole.ADMIN]),
  ResumeStatsController.getResumesStats
);

export const ResumeStatsRoutes = router;
