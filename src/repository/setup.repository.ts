import { prisma } from "../prisma/prisma";
import { Setups, Prisma } from "@prisma/client";

export default class Setup {
  addOne = async (
    item: Prisma.SetupsUncheckedCreateInput
  ): Promise<Setups | void> => {
    console.log("item", item);
    const createdItem = await prisma.setups
      .create({
        data: item,
      })
      .catch((e) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return createdItem;
  };
  addMany = async (
    items: Prisma.SetupsUncheckedCreateInput[]
  ): Promise<Prisma.BatchPayload> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call

    const manyItems = await prisma.setups.createMany({
      data: items,
      skipDuplicates: true,
    });

    return manyItems;
  };
  deleteOne = async (itemId: string): Promise<Setups | null> => {
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
          push: { adminId: adminId, updateInfo: item as any },
        },
      },
    });
  };
}
