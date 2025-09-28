import { Router } from "express";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import path from "path";
import { TestRoutes } from "../app/modules/test/test.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/test",
    route: TestRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
