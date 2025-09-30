import { Request, Response, NextFunction } from "express";
import { ResumeStatsService } from "./resumestats.service";
import { sendResponse } from "../../../../utils/sendResponse";

const getResumesStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await ResumeStatsService.getResumeStats();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Resume stats fetched successfully",
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
export const ResumeStatsController = {
  getResumesStats,
};
