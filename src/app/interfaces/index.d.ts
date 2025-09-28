// types/express/index.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        name?: string;
        email: string;
        role?: string;
        [key: string]: any;
      };
    }
  }
}
