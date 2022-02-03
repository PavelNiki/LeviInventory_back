import { prisma } from "../prisma/prisma";
import { Setups, Prisma } from "@prisma/client";

export default class Setup {
  addOne = async (item: Prisma.SetupsCreateInput): Promise<Setups | void> => {
    const createdItem = await prisma.setups
      .create({
        data: {
          ...item,
          Inventory: {
            connect: item.Inventory as Prisma.InventoryWhereUniqueInput,
          },
        },
        include: {
          Inventory: true,
        },
      })
      .catch((e) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return createdItem;
  };

  deleteOne = async (
    itemId: string,
    roomName: string
  ): Promise<Setups | null> => {
    await prisma.inventory.updateMany({
      where: {
        setupId: +itemId,
      },
      data: {
        roomName: roomName,
      },
    });
    return await prisma.setups.delete({
      where: {
        id: +itemId,
      },
    });
  };
  updateSetup = async (
    item: Prisma.SetupsUncheckedUpdateInput,
    adminId: string
  ): Promise<Setups | null> => {
    return await prisma.setups.update({
      where: {
        id: Number(item.id),
      },
      data: {
        ...item,

        updatedBy: {
          push: {
            adminId: adminId,
            updateInfo: item as Prisma.SetupsUpdateupdatedByInput,
          },
        },
        Inventory: {
          connect: item.Inventory as Prisma.InventoryWhereUniqueInput,
        },
      },
    });
  };
  getOne = async (id: number): Promise<Setups | null> => {
    return await prisma.setups.findFirst({
      where: {
        id: id,
      },
      include: {
        Inventory: true,
      },
    });
  };
  getAll = async (): Promise<Setups[]> => {
    return await prisma.setups.findMany({
      include: {
        Inventory: true,
      },
    });
  };
}
