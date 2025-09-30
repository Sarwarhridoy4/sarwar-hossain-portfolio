-- CreateTable
CREATE TABLE "public"."BlogView" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogView_blogId_date_key" ON "public"."BlogView"("blogId", "date");

-- AddForeignKey
ALTER TABLE "public"."BlogView" ADD CONSTRAINT "BlogView_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
