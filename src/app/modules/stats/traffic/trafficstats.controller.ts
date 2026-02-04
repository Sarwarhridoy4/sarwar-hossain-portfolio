import { Request, Response, NextFunction } from "express";
import { TrafficStatsService } from "./trafficstats.service";
import { sendResponse } from "../../../../utils/sendResponse";

const getTrafficStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await TrafficStatsService.getTrafficStats();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Traffic stats fetched successfully",
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
export const TrafficStatsController = {
  getTrafficStats,
};
