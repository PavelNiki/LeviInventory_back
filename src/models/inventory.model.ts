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

// export interface InventoryModel {
//   id?: number;
//   ownerId?: number | null;
//   roomName: string;
//   name: string;
//   itemImage?: string | null;
//   category: string;
//   updateBy?: string | undefined;
//   setupId?: number;
// }
export type InventoryModel = Omit<
  Inventory,
  "createdAt" | "updatedAt" | "UpdatedBy"
>;
