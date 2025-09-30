import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOverviewStats = async () => {
  const [users, blogs, projects, resumes] = await Promise.all([
    prisma.user.count(),
    prisma.blog.count(),
    prisma.project.count(),
    prisma.resume.count(),
  ]);

  return { users, blogs, projects, resumes };
};

export const StatsService = {
  getOverviewStats,
};
export type StatsService = typeof StatsService;
