import { prisma } from "../prisma/prisma";
import { Categories, Prisma } from "@prisma/client";

export default class Category {
  addOne = async (
    item: Prisma.CategoriesUncheckedCreateInput
  ): Promise<Categories | void> => {
    const checkCategory = await prisma.categories.findFirst({
      where: {
        name: item.name,
      },
    });
    if (checkCategory) {
      throw new Error("Category already exias");
    } else {
      const newCategory = await prisma.categories.create({
        data: item,
        include: {
          Inventory: true,
        },
      });
      return newCategory;
    }
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
    item: Categories,
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

  getAllCategories = async (): Promise<Categories[]> => {
    return await prisma.categories.findMany();
  };

  getOneCategory = async (id: string): Promise<Categories | null> => {
    return await prisma.categories.findUnique({
      where: {
        id: +id,
      },
    });
  };
}
