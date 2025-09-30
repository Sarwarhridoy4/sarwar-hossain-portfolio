import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjectStats = async () => {
  // Total projects
  const totalProjects = await prisma.project.count();

  // Projects created per month (last 12 months)
  const monthlyProjects = await prisma.$queryRaw<
    { month: string; count: number }[]
  >`SELECT to_char("createdAt", 'YYYY-MM') as month, count(*) FROM "Project" GROUP BY month ORDER BY month`;

  // Top used tech stacks
  const allProjects = await prisma.project.findMany({
    select: { techStack: true },
  });
  const techCounter: Record<string, number> = {};
  allProjects.forEach((p) =>
    p.techStack.forEach((t) => (techCounter[t] = (techCounter[t] || 0) + 1))
  );
  const topTechStacks = Object.entries(techCounter)
    .sort(([, a], [, b]) => b - a)
    .map(([tech, count]) => ({ tech, count }));

  // Projects with most screenshots
  const projects = await prisma.project.findMany({
    select: { id: true, title: true, images: true },
  });
  const mostScreenshots = projects
    .sort((a, b) => b.images.length - a.images.length)
    .slice(0, 5);

  return { totalProjects, monthlyProjects, topTechStacks, mostScreenshots };
};
export const ProjectStatsService = {
  getProjectStats,
};
