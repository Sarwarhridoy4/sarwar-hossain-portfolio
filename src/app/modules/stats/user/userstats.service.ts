import { subDays } from "date-fns";
import { prisma } from "../../../../config/db";
import { withCache } from "../../../../utils/cache";

const getUserStats = async () => {
  return withCache("stats:user", 60_000, async () => {
    const totalUsers = await prisma.user.count();
    const totalAdmins = await prisma.user.count({ where: { role: "ADMIN" } });

    const last7Days = await prisma.user.count({
      where: { createdAt: { gte: subDays(new Date(), 7) } },
    });

    const last30Days = await prisma.user.count({
      where: { createdAt: { gte: subDays(new Date(), 30) } },
    });

    return {
      totalUsers,
      totalAdmins,
      newUsersLast7Days: last7Days,
      newUsersLast30Days: last30Days,
    };
  });
};

export const StatsService = {
  getUserStats,
};
