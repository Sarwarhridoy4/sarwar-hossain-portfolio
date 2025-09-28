import { Router } from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import path from "path";
import { UserRoutes } from "../app/modules/users/users.route";
import { BlogRoutes } from "../app/modules/blogs/blogs.route";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
