import { Request, Response } from "express";
import { catchAsync } from "../../../../utils/catchAsync";
import { StatsService } from "./userstats.service";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../../utils/sendResponse";

const getUserStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await StatsService.getUserStats();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User stats fetched successfully",
    data: stats,
  });
});

export const StatsController = {
  getUserStats,
};
