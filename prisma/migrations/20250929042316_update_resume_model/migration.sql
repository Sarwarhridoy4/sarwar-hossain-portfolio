/*
  Warnings:

  - You are about to drop the column `content` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Resume" DROP COLUMN "content",
ADD COLUMN     "certifications" JSONB,
ADD COLUMN     "contactInfo" JSONB,
ADD COLUMN     "education" JSONB,
ADD COLUMN     "experiences" JSONB,
ADD COLUMN     "projects" JSONB,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "summary" TEXT;
