import jwt, { JwtPayload, SignOptions, VerifyOptions } from "jsonwebtoken";
import AppError from "../helpers/errorhelper/AppError"; // adjust path

// Strongly typed JWT payload
export interface AuthJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * 🔐 Generate a signed JWT
 */
export const generateToken = (
  payload: AuthJwtPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
  options: SignOptions = {}
): string => {
  try {
    if (!secret) throw new AppError(500, "JWT secret is not configured");
    return jwt.sign(payload, secret, { ...options, expiresIn });
  } catch (err: any) {
    throw new AppError(500, "Failed to generate token", err?.message);
  }
};

/**
 * ✅ Verify token and return decoded payload
 */
export const verifyToken = (
  token: string,
  secret: string,
  options: VerifyOptions = {}
): AuthJwtPayload => {
  try {
    if (!secret) throw new AppError(500, "JWT secret is not configured");
    const decoded = jwt.verify(token, secret, options);
    if (typeof decoded === "string") {
      throw new AppError(401, "Invalid token payload");
    }
    return decoded as AuthJwtPayload;
  } catch (err: any) {
    throw new AppError(401, "Invalid or expired token", err?.message);
  }
};

/**
 * ⚠ Decode token without verification
 * - Only use for debugging or non-secure scenarios
 */
export const decodeToken = (token: string): AuthJwtPayload | null => {
  try {
    return jwt.decode(token) as AuthJwtPayload | null;
  } catch {
    return null;
  }
};
