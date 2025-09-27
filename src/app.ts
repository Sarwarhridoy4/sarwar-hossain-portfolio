import compression from "compression";
import cors from "cors";
import express, {
  type Request,
  type Response,
  type NextFunction,
  Application,
} from "express";
import { UserRoutes } from "./app/modules/users/users.route";
import { StatusCodes } from "http-status-codes";

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

// Routes
app.use("/api/v1/user", UserRoutes);

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
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
