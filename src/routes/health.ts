import { Router } from "express";
import { prisma } from "../config/db";
import { env } from "../config/env";

export const HealthRoutes = Router();

HealthRoutes.get("/", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "ok",
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  }
});
