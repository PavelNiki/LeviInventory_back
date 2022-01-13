/*
  Warnings:

  - The `updateBy` column on the `Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "updateBy",
ADD COLUMN     "updateBy" TEXT[];
