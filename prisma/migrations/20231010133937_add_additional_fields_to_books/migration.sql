/*
  Warnings:

  - Added the required column `description` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_count` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_year` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "page_count" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL,
ADD COLUMN     "release_year" INTEGER NOT NULL;
