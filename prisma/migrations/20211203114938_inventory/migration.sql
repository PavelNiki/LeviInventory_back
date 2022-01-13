/*
  Warnings:

  - Made the column `roomName` on table `Inventory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_roomName_fkey";

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "roomName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Rooms"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
