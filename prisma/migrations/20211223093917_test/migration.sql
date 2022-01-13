/*
  Warnings:

  - The `updateBy` column on the `Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updateBy` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "updateBy",
ADD COLUMN     "updateBy" JSONB[];

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "updateBy",
ADD COLUMN     "updateBy" TEXT[];
