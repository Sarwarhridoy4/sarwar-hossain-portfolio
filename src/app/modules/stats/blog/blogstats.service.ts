import { subDays } from "date-fns";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBlogStats = async () => {
  const totalBlogs = await prisma.blog.count();
  const totalViews = await prisma.blog.aggregate({
    _sum: { views: true },
  });

  // Views in last X days (chart style)
  const last7DaysViews = await prisma.blogView.groupBy({
    by: ["date"],
    _sum: { count: true },
    where: { date: { gte: subDays(new Date(), 7) } },
    orderBy: { date: "asc" },
  });

  const last30DaysViews = await prisma.blogView.groupBy({
    by: ["date"],
    _sum: { count: true },
    where: { date: { gte: subDays(new Date(), 30) } },
    orderBy: { date: "asc" },
  });

  return {
    totalBlogs,
    totalViews: totalViews._sum.views || 0,
    last7Days: last7DaysViews.map(v => ({ date: v.date, views: v._sum.count || 0 })),
    last30Days: last30DaysViews.map(v => ({ date: v.date, views: v._sum.count || 0 })),
  };
};

export const BlogStatsService = {
  getBlogStats,
};
export type BlogStatsService = typeof BlogStatsService;