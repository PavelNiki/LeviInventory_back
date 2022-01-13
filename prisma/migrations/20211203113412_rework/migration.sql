-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_roomName_fkey";

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "roomName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Rooms"("name") ON DELETE SET NULL ON UPDATE CASCADE;
