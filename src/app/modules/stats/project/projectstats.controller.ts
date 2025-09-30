// controllers/stats.controller.ts
import e, { Request, Response, NextFunction } from "express";
import { ProjectStatsService } from "./projectstats.service";
import { sendResponse } from "../../../../utils/sendResponse";

const getProjectsStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await ProjectStatsService.getProjectStats();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Project stats fetched successfully",
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
export const StatsController = {
  getProjectsStats,
};
