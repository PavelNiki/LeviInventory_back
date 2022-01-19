import { prisma } from "../prisma/prisma";
import { Rooms, Prisma } from "@prisma/client";

export default class Room {
  addOne = async (
    item: Prisma.RoomsUncheckedCreateInput
  ): Promise<Rooms | void> => {
    const createdItem = await prisma.rooms
      .create({
        data: {
          name: item.name,
        },
      })
      .catch((e) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return createdItem;
  };
  addMany = async (
    items: Prisma.RoomsUncheckedCreateInput[]
  ): Promise<Prisma.BatchPayload> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call

    const manyItems = await prisma.rooms.createMany({
      data: items,
      skipDuplicates: true,
    });

    return manyItems;
  };
  deleteOne = async (itemId: string): Promise<Rooms | null> => {
    return await prisma.rooms.delete({
      where: {
        id: +itemId,
      },
    });
  };
  updateCategory = async (
    item: Prisma.RoomsUncheckedUpdateInput
  ): Promise<Rooms | null> => {
    return await prisma.rooms.update({
      where: {
        id: Number(item.id),
      },
      data: {
        name: item.name,
      },
    });
  };
}
