import { Inventory } from "@prisma/client";
// interface IInventoryModel {
//   id: string | number;
//   owner?: string | number | null;
//   roomName: string;
//   name: string;
//   itemImg?: string | null;
//   category: string;
//   updateBy?: string | undefined;
// }
export const inventoryModel = (item: Inventory) => {
  const model = {
    id: item.id,
    ownerId: item.ownerId,
    roomName: item?.roomName,
    name: item?.name,
    itemImage: item?.itemImage,
    category: item?.category,
  };
  return model;
};
