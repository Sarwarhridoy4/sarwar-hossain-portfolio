import { NextFunction, Request, Response } from "express";
import AppError from "../../helpers/errorhelper/AppError";
import { verifyToken } from "../../utils/jwt";
import { env } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config/db";
import { StatusCodes } from "http-status-codes";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies?.accessToken;

      if (!accessToken) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "No token received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        env.JWT_SECRET_KEY
      ) as JwtPayload & { role: string; email: string };
      if (!verifiedToken) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
      }

      // ✅ Prisma query
      const user = await prisma.user.findUnique({
        where: { email: verifiedToken.email },
      });

      if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route");
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        provider: user.provider,
        name: user.name,
      };

      next();
    } catch (error) {
      console.log("JWT error", error);
      next(error);
    }
  };
