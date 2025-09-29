import { Router } from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import path from "path";
import { UserRoutes } from "../app/modules/users/users.route";
import { BlogRoutes } from "../app/modules/blogs/blogs.route";
import { ProjectRoutes } from "../app/modules/projects/project.route";
import { ResumeRoutes } from "../app/modules/resume/resume.route";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
