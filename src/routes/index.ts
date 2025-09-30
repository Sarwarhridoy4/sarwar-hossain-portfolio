import { Router } from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { UserRoutes } from "../app/modules/users/users.route";
import { BlogRoutes } from "../app/modules/blogs/blogs.route";
import { ProjectRoutes } from "../app/modules/projects/project.route";
import { ResumeRoutes } from "../app/modules/resume/resume.route";
import { GeneralStatsRoutes } from "../app/modules/stats/general/general.route";
import { UserStatsRoutes } from "../app/modules/stats/user/userstats.routes";
import { TrafficStatsRoutes } from "../app/modules/stats/traffic/trafficstats.route";
import { BlogStatsRoutes } from "../app/modules/stats/blog/blogstats.routes";
import { ProjectStatsRoutes } from "../app/modules/stats/project/projectstats.route";
import { ResumeStatsRoutes } from "../app/modules/stats/resume/resumestats.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/resumes",
    route: ResumeRoutes,
  },
  // Stats routes (admin-only)
  {
    path: "/stats/general",
    route: GeneralStatsRoutes,
  },
  {
    path: "/stats/user",
    route: UserStatsRoutes,
  },
  {
    path: "/stats/traffic",
    route: TrafficStatsRoutes,
  },
  {
    path: "/stats/blog",
    route: BlogStatsRoutes,
  },
  {
    path: "/stats/project",
    route: ProjectStatsRoutes,
  },
  {
    path: "/stats/resume",
    route: ResumeStatsRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
