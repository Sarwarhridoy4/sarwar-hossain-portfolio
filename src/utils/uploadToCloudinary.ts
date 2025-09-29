// src/middlewares/uploadToCloudinary.ts
import { Request, Response, NextFunction } from "express";
import AppError from "../helpers/errorhelper/AppError";
import { uploadBufferToCloudinary } from "../config/cloudinary";

export const uploadToCloudinary =
  (
    folder:
      | "profile-image"
      | "blog-thumbnails"
      | "project-images"
      | "resume-professional-photos"
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return next(); // no file → skip
      }

      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        req.file.originalname,
        folder
      );

      // Attach the Cloudinary URL back to body
      req.body.uploadedFileUrl = result.secure_url;

      next();
    } catch (error: any) {
      next(new AppError(500, `File upload failed: ${error.message}`));
    }
  };
