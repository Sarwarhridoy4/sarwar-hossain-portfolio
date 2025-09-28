import { Router } from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import path from "path";
import { UserRoutes } from "../app/modules/users/users.route";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
