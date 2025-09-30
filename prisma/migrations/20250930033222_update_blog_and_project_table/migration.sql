-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "liveUrl" TEXT,
ADD COLUMN     "repoUrl" TEXT,
ADD COLUMN     "videoUrl" TEXT;
