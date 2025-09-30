import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../../utils/catchAsync";
import { StatsService } from "./general.service";
import { sendResponse } from "../../../../utils/sendResponse";

const getOverviewStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getOverviewStats();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Overview stats fetched successfully",
    data: stats,
  });
});

export const StatsController = {
  getOverviewStats,
};
