import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, {
  type Request,
  type Response,
  type NextFunction,
  Application,
} from "express";
import { StatusCodes } from "http-status-codes";
import { router } from "./routes";
import { globalErrorHandler } from "./app/middlewares/globalerrorHandler";

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", router);

// Default route for testing
app.get("/", (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "Welcome! Gretings From Sarwar Hossain!!" });
});

// 404 Handler
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
