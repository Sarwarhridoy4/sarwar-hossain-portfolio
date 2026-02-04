import { prisma } from "../../../../config/db";
import { withCache } from "../../../../utils/cache";

const getOverviewStats = async () => {
  return withCache("stats:general", 60_000, async () => {
    const [users, blogs, projects, resumes] = await Promise.all([
      prisma.user.count(),
      prisma.blog.count({ where: { deletedAt: null } }),
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.resume.count({ where: { deletedAt: null } }),
    ]);

    return { users, blogs, projects, resumes };
  });
};

export const StatsService = {
  getOverviewStats,
};
export type StatsService = typeof StatsService;
