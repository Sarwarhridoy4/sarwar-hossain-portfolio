import { subDays } from "date-fns";
import { prisma } from "../../../../config/db";
import { withCache } from "../../../../utils/cache";

const getBlogStats = async () => {
  return withCache("stats:blog", 60_000, async () => {
    const totalBlogs = await prisma.blog.count({
      where: { deletedAt: null },
    });
    const totalViews = await prisma.blog.aggregate({
      _sum: { views: true },
      where: { deletedAt: null },
    });

    // Views in last X days (chart style)
    const last7DaysViews = await prisma.blogView.groupBy({
      by: ["date"],
      _sum: { count: true },
      where: {
        date: { gte: subDays(new Date(), 7) },
        blog: { deletedAt: null },
      },
      orderBy: { date: "asc" },
    });

    const last30DaysViews = await prisma.blogView.groupBy({
      by: ["date"],
      _sum: { count: true },
      where: {
        date: { gte: subDays(new Date(), 30) },
        blog: { deletedAt: null },
      },
      orderBy: { date: "asc" },
    });

    return {
      totalBlogs,
      totalViews: totalViews._sum.views || 0,
      last7Days: last7DaysViews.map((v) => ({
        date: v.date,
        views: v._sum.count || 0,
      })),
      last30Days: last30DaysViews.map((v) => ({
        date: v.date,
        views: v._sum.count || 0,
      })),
    };
  });
};

export const BlogStatsService = {
  getBlogStats,
};
export type BlogStatsService = typeof BlogStatsService;
