/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inventory } from ".prisma/client";
import { prisma } from "../prisma/prisma";
import { InventoryModel } from "src/models/inventory.model";

import { Prisma } from "@prisma/client";
import Inventories from "src/repository/inventory.repository";
// в qr инвенторя хранить name & inventoryId после сканирования на экране отображается инфа,
// а значения пушатся в массив,котрый отправляется на бэк
const inventory = new Inventories();
class InventoryService {
  addOneItem = async (
    item: Prisma.InventoryUncheckedCreateInput
  ): Promise<Inventory | void> => {
    return await inventory.addOneItem(item);
  };
  addManyItems = async (
    item: Prisma.InventoryUncheckedCreateInput[]
  ): Promise<Prisma.BatchPayload> => {
    return await inventory.addManyItems(item);
  };
  updateItem = async (
    item: Prisma.InventoryUncheckedUpdateInput,
    adminId: string
  ): Promise<Inventory> => {
    return await inventory.updateItem(item, adminId);
  };

  allInventory = async (): Promise<Inventory[]> => {
    const allInventory = await prisma.inventory.findMany();
    return allInventory;
  };
  findFreeInventory = async (): Promise<Inventory[]> => {
    return await inventory.findFreeInventory();
  };
  inventoryMake = async (searchObject: {
    roomName: string;
    inventoryList: Inventory[];
  }): Promise<Inventory[]> => {
    return await inventory.inventoryMake(searchObject);
  };
  deleteItem = async (itemId: string): Promise<Inventory | null> => {
    return await inventory.deleteOne(itemId);
  };
  // removeUserInventoryToStorage = async () => {
  //   await prisma.inventory.updateMany({
  //     where: {
  //       ownerId: null,
  //     },
  //     data: {
  //       roomName: "Storage",
  //     },
  //   });
  //   return "Removing is success";
  // };
}

export default new InventoryService();
