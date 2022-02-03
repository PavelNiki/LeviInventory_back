/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Categories, Prisma } from "@prisma/client";

import Category from "../repository/category.repository";

const categories = new Category();
class Categorys {
  addCategory = async (
    item: Prisma.CategoriesCreateInput
  ): Promise<Categories | void> => {
    return await categories.addOne(item);
  };
  addCategories = async (
    items: Prisma.CategoriesUncheckedCreateInput[]
  ): Promise<any> => {
    return await categories.addMany(items);
  };
  editCategory = async (
    item: Categories,
    adminId: string
  ): Promise<Categories | null> => {
    return await categories.updateCategory(item, adminId);
  };

  deleteCategory = async (id: string): Promise<Categories | null> => {
    return await categories.deleteOne(id);
  };

  getAllCategories = async () => {
    return await categories.getAllCategories();
  };

  getOneCategories = async (id: string) => {
    return await categories.getOneCategory(id);
  };
}
export default new Categorys();
