import { Request, Response, NextFunction } from "express";
import { getToken } from "next-auth/jwt";
import AppError from "../../helpers/errorhelper/AppError";
import { env } from "../../config/env";

export interface AuthRequest extends Request {
  user?: {
    name?: string;
    email: string;
    role?: string;
    [key: string]: any;
  };
}

export const protectNextAuth = (roles?: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = await getToken({
        req,
        secret: env.JWT_SECRET_KEY,
      });

      if (!token) {
        throw new AppError(401, "Unauthorized: Invalid or missing session");
      }

      // Normalize token: convert null name to undefined
      const user = {
        ...token,
        name: token.name ?? undefined,
        role: (token as any).role ?? undefined, // Explicitly include role if it exists
      };

      if (!user.email) {
        throw new AppError(401, "Unauthorized: Missing email in token");
      }
      req.user = { ...user, email: user.email };

      if (roles && user.role && !roles.includes(user.role)) {
        throw new AppError(403, "Forbidden: Insufficient privileges");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
