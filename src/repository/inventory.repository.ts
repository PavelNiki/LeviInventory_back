import { Prisma, PrismaClient, Inventory } from "@prisma/client";
import { difference, differenceWith } from "lodash";
import _ from "lodash";

const prisma = new PrismaClient();

export default class Inventories {
  addOneItem = async (
    item: Prisma.InventoryUncheckedCreateInput
  ): Promise<Inventory | void> => {
    const createdItem = await prisma.inventory
      .create({
        data: {
          name: item.name,
          itemImage: item.itemImage,
          roomName: item.roomName,
          category: item.category,
          setupId: item.setupId,
        },
      })
      .catch((e) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return createdItem;
  };

  addManyItems = async (
    invent: Prisma.InventoryUncheckedCreateInput[]
  ): Promise<Prisma.BatchPayload> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const items = invent.map((item: Prisma.InventoryUncheckedCreateInput) => {
      const invent = {
        name: item.name,
        itemImage: item.itemImage,
        roomName: item.roomName,
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

  updateItem = async (
    item: Prisma.InventoryUncheckedUpdateInput,
    adminId: string
  ): Promise<Inventory> => {
    const updateItem = await prisma.inventory.update({
      where: {
        id: Number(item.id),
      },
      data: {
        ownerId: Number(item.ownerId),
        roomName: item.roomName,
        setupId: item.setupId,
        updateBy: {
          push: { adminId: adminId, updateInfo: item as any },
        },
      },
    });
    return updateItem;
  };

  allInventory = async (): Promise<Inventory[]> => {
    const allInventory = await prisma.inventory.findMany();
    return allInventory;
  };

  findFreeInventory = async (): Promise<Inventory[]> => {
    const freeInventory = await prisma.inventory.findMany({
      where: {
        roomName: {
          contains: "Storage",
        },
      },
    });
    return freeInventory;
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

  inventoryMake = async (searchObject: {
    roomName: string;
    inventoryList: Inventory[];
  }): Promise<Inventory[]> => {
    const roomInventory = await prisma.inventory.findMany({
      where: {
        roomName: {
          contains: searchObject.roomName,
        },
      },
    });
    const inventoryList = searchObject.inventoryList.map((item: any) =>
      Number(item.id)
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
