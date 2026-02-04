import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { type Request, type Response, Application } from "express";
import { StatusCodes } from "http-status-codes";
import { router } from "./routes";
import { globalErrorHandler } from "./app/middlewares/globalerrorHandler";
import notFound from "./app/middlewares/notFound";
import { env } from "./config/env";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: [env.FRONTEND_URL, env.FRONTEND_URL_PRODUCTION],
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", router);
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route for testing
app.get("/", (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "Welcome! Gretings From Sarwar Hossain!!" });
});

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
