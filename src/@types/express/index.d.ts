import { Users } from ".prisma/client";
import { inventoryModel } from "src/models/inventory.model";

declare module "express" {
  // export interface Request {
  //   body: Users | ReturnType<typeof inventoryModel>;
  // }
}
