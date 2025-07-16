-- CreateTable
CREATE TABLE "HomeCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topPicks" JSONB,
    "topUS" JSONB,
    "genres" JSONB,
    "trendingByGenre" JSONB,

    CONSTRAINT "HomeCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeCache_userId_key" ON "HomeCache"("userId");
