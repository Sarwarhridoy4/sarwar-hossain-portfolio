/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Resume" ADD COLUMN     "professionalPhoto" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "profilePicture" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "public"."Blog"("slug");
