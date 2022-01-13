/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inventory } from ".prisma/client";
import { prisma } from "../prisma/prisma";
import { inventoryModel } from "src/models/inventory.model";
import { difference, differenceWith } from "lodash";
import _ from "lodash";
// в qr инвенторя хранить name & inventoryId после сканирования на экране отображается инфа,
// а значения пушатся в массив,котрый отправляется на бэк
class InventoryService {
  addOneItem = async (item: Inventory) => {
    const oneItem = await prisma.inventory
      .create({
        data: {
          category: item.category,
          name: item.name,
        },
      })
      .catch((e) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return oneItem;
  };
  addManyItems = async (invent: Inventory[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const items = invent.map((item: Inventory) => {
      const invent = {
        name: item.name,
        category: item.category,
      };
      return invent;
    });
    const manyItems = await prisma.inventory.createMany({
      data: items,
      skipDuplicates: false,
    });
    return manyItems;
  };
  updateItem = async (item: Inventory, adminId: string) => {
    const model = inventoryModel(item);
    const updateItem = await prisma.inventory.update({
      where: {
        id: Number(item.id),
      },
      data: {
        ownerId: Number(item.ownerId),
        roomName: item.roomName,
        updateBy: {
          push: { adminId: adminId, updateInfo: model },
        },
      },
    });
    return updateItem;
  };
  allInventory = async () => {
    const allInventory = await prisma.inventory.findMany();
    return allInventory;
  };
  findFreeInventory = async () => {
    const freeInventory = await prisma.inventory.findMany({
      where: {
        roomName: {
          contains: "Storage",
        },
      },
    });
    return freeInventory;
  };
  removeUserInventoryToStorage = async () => {
    await prisma.inventory.updateMany({
      where: {
        ownerId: null,
      },
      data: {
        roomName: "Storage",
      },
    });
    return "Removing is success";
  };
  inventoryMake = async (searchObject: any) => {
    const roomInventory = await prisma.inventory.findMany({
      where: {
        roomName: {
          contains: searchObject.roomName,
        },
      },
    });
    const inventoryList: [number] = searchObject.inventoryList.map(
      (item: any) => Number(item.id)
    );
    const existInventiry = roomInventory.map(
      (inventory: Inventory) => inventory.id
    );

    const diff = _.concat(
      difference(existInventiry, inventoryList),
      difference(inventoryList, existInventiry)
    );
    const res = await prisma.inventory.findMany({
      where: {
        id: {
          in: diff,
        },
      },
    });
    return res;
  };
}

export default new InventoryService();
