// services/stats/resume.stats.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getResumeStats = async () => {
  const totalResumes = await prisma.resume.count();

  // Resumes per month
  const monthlyResumes = await prisma.$queryRaw<
    { month: string; count: number }[]
  >`SELECT to_char("createdAt", 'YYYY-MM') as month, count(*) FROM "Resume" GROUP BY month ORDER BY month`;

  // Average skills
  const resumes = await prisma.resume.findMany({ select: { skills: true } });
  const totalSkills = resumes.reduce(
    (acc, r) => acc + (r.skills?.length || 0),
    0
  );
  const avgSkills = resumes.length ? totalSkills / resumes.length : 0;

  // Most common skills
  const skillCounter: Record<string, number> = {};
  resumes.forEach((r) =>
    r.skills?.forEach((s) => (skillCounter[s] = (skillCounter[s] || 0) + 1))
  );
  const topSkills = Object.entries(skillCounter)
    .sort(([, a], [, b]) => b - a)
    .map(([skill, count]) => ({ skill, count }))
    .slice(0, 10);

  return { totalResumes, monthlyResumes, avgSkills, topSkills };
};
export const ResumeStatsService = {
  getResumeStats,
};
export type ResumeStatsService = typeof ResumeStatsService;
