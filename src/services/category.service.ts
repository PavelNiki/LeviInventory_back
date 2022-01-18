/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Categories, Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma";
class Category {
  addCategory = async (
    item: Prisma.CategoriesCreateInput
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

  editCategory = async (
    item: Categories,
    adminId: string
  ): Promise<Categories | null> => {
    const update = await prisma.categories.update({
      where: { id: item.id },
      data: {
        name: item.name,
        updatedBy: {
          push: { adminId: adminId, updateInfo: item.name },
        },
      },
    });
    return update;
  };

  deleteCategory = async (id: string): Promise<Categories | null> => {
    const deleteCategory = await prisma.categories.delete({
      where: {
        id: Number(id),
      },
    });
    return deleteCategory;
  };
}
export default new Category();
