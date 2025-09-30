import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../../utils/catchAsync";
import { BlogStatsService } from "./blogstats.service";
import { sendResponse } from "../../../../utils/sendResponse";

const getBlogStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await BlogStatsService.getBlogStats();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog stats fetched successfully",
    data: stats,
  });
});

export const StatsController = {
  getBlogStats,
};
