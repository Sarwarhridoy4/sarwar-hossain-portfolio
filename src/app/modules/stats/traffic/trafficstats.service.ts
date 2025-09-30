// services/stats/traffic.stats.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTrafficStats = async () => {
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 29);

  const dailyViews = await prisma.blogView.groupBy({
    by: ["date"],
    _sum: { count: true },
    where: { date: { gte: last30Days } },
    orderBy: { date: "asc" },
  });

  const totalViews = dailyViews.reduce(
    (acc, v) => acc + (v._sum.count || 0),
    0
  );
  const avgDailyViews = dailyViews.length ? totalViews / dailyViews.length : 0;

  return { totalViews, avgDailyViews, dailyViews };
};
export const TrafficStatsService = {
  getTrafficStats,
};
