/*
  Warnings:

  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Artwork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Insight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_userId_fkey";

-- DropForeignKey
ALTER TABLE "Insight" DROP CONSTRAINT "Insight_artworkId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_artworkId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropTable
DROP TABLE "Artist";

-- DropTable
DROP TABLE "Artwork";

-- DropTable
DROP TABLE "Follow";

-- DropTable
DROP TABLE "Insight";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "User222294" (
    "id222294" SERIAL NOT NULL,
    "name222294" TEXT NOT NULL,
    "email222294" TEXT NOT NULL,
    "password222294" TEXT NOT NULL,
    "createdAt222294" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt222294" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User222294_pkey" PRIMARY KEY ("id222294")
);

-- CreateTable
CREATE TABLE "Artist222294" (
    "id222294" SERIAL NOT NULL,
    "name222294" TEXT NOT NULL,
    "password222294" TEXT NOT NULL,
    "bio222294" TEXT,
    "website222294" TEXT,
    "createdAt222294" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt222294" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist222294_pkey" PRIMARY KEY ("id222294")
);

-- CreateTable
CREATE TABLE "Artwork222294" (
    "id222294" SERIAL NOT NULL,
    "title222294" TEXT NOT NULL,
    "description222294" TEXT,
    "imageUrl222294" TEXT NOT NULL,
    "price222294" DOUBLE PRECISION NOT NULL,
    "createdAt222294" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt222294" TIMESTAMP(3) NOT NULL,
    "artistId222294" INTEGER NOT NULL,

    CONSTRAINT "Artwork222294_pkey" PRIMARY KEY ("id222294")
);

-- CreateTable
CREATE TABLE "Like222294" (
    "id222294" SERIAL NOT NULL,
    "userId222294" INTEGER NOT NULL,
    "artworkId222294" INTEGER NOT NULL,
    "createdAt222294" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like222294_pkey" PRIMARY KEY ("id222294")
);

-- CreateTable
CREATE TABLE "Follow222294" (
    "id222294" SERIAL NOT NULL,
    "userId222294" INTEGER NOT NULL,
    "artistId222294" INTEGER NOT NULL,
    "createdAt222294" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow222294_pkey" PRIMARY KEY ("id222294")
);

-- CreateTable
CREATE TABLE "Insight222294" (
    "id222294" SERIAL NOT NULL,
    "artworkId222294" INTEGER NOT NULL,
    "views222294" INTEGER NOT NULL DEFAULT 0,
    "likes222294" INTEGER NOT NULL DEFAULT 0,
    "shares222294" INTEGER NOT NULL DEFAULT 0,
    "createdAt222294" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt222294" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insight222294_pkey" PRIMARY KEY ("id222294")
);

-- CreateIndex
CREATE UNIQUE INDEX "User222294_name222294_key" ON "User222294"("name222294");

-- CreateIndex
CREATE UNIQUE INDEX "User222294_email222294_key" ON "User222294"("email222294");

-- CreateIndex
CREATE UNIQUE INDEX "User222294_password222294_key" ON "User222294"("password222294");

-- CreateIndex
CREATE UNIQUE INDEX "Artist222294_name222294_key" ON "Artist222294"("name222294");

-- CreateIndex
CREATE UNIQUE INDEX "Artist222294_password222294_key" ON "Artist222294"("password222294");

-- AddForeignKey
ALTER TABLE "Artwork222294" ADD CONSTRAINT "Artwork222294_artistId222294_fkey" FOREIGN KEY ("artistId222294") REFERENCES "Artist222294"("id222294") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like222294" ADD CONSTRAINT "Like222294_userId222294_fkey" FOREIGN KEY ("userId222294") REFERENCES "User222294"("id222294") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like222294" ADD CONSTRAINT "Like222294_artworkId222294_fkey" FOREIGN KEY ("artworkId222294") REFERENCES "Artwork222294"("id222294") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow222294" ADD CONSTRAINT "Follow222294_userId222294_fkey" FOREIGN KEY ("userId222294") REFERENCES "User222294"("id222294") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow222294" ADD CONSTRAINT "Follow222294_artistId222294_fkey" FOREIGN KEY ("artistId222294") REFERENCES "Artist222294"("id222294") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insight222294" ADD CONSTRAINT "Insight222294_artworkId222294_fkey" FOREIGN KEY ("artworkId222294") REFERENCES "Artwork222294"("id222294") ON DELETE RESTRICT ON UPDATE CASCADE;
