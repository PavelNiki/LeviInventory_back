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
  addOneItem = async (item: InventoryModel): Promise<Inventory | void> => {
    return await inventory.addOneItem(item);
  };
  addManyItems = async (
    item: InventoryModel[]
  ): Promise<Prisma.BatchPayload> => {
    return await inventory.addManyItems(item);
  };
  updateItem = async (
    item: InventoryModel,
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
    inventoryList: InventoryModel[];
  }): Promise<Inventory[]> => {
    return await inventory.inventoryMake(searchObject);
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
