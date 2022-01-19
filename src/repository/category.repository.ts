import { prisma } from "../prisma/prisma";
import { Categories, Prisma } from "@prisma/client";

export default class Category {
  addOne = async (
    item: Prisma.CategoriesUncheckedCreateInput
  ): Promise<Categories | void> => {
    const createdItem = await prisma.categories
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
    items: Prisma.CategoriesUncheckedCreateInput[]
  ): Promise<Prisma.BatchPayload> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call

    const manyItems = await prisma.categories.createMany({
      data: items,
      skipDuplicates: true,
    });

    return manyItems;
  };
  deleteOne = async (itemId: string): Promise<Categories | null> => {
    return await prisma.categories.delete({
      where: {
        id: +itemId,
      },
    });
  };
  updateCategory = async (
    item: Prisma.CategoriesUncheckedUpdateInput,
    adminId: string
  ): Promise<Categories | null> => {
    return await prisma.categories.update({
      where: {
        id: Number(item.id),
      },
      data: {
        name: item.name,
        updatedBy: {
          push: { adminId: adminId, updateInfo: item as any },
        },
      },
    });
  };
}
