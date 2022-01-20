import categoryService from "src/services/category.service";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { Categories, Prisma } from "@prisma/client";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const addCategory = async (
  req: Request,
  res: Response
): Promise<Categories | void> => {
  try {
    const category = await categoryService.addCategory(
      req.body as Prisma.CategoriesCreateInput
    );
    res.status(CREATED);
    res.status(CREATED).json(category);
  } catch (error) {
    res.status(BAD_REQUEST).send(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Categories | void> => {
  const { updatedCategory, adminId } = req.body;

  try {
    const category = await categoryService.editCategory(
      updatedCategory as Categories,
      adminId as string
    );
    res.status(CREATED);
    res.status(CREATED).json(category);
  } catch (error) {
    res.status(BAD_REQUEST).send(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoryService.deleteCategory(id);
    res.status(OK).json(deletedCategory);
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await categoryService.getAllCategories();
    res.status(OK).json(allCategories);
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};

export const getOneCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await categoryService.getOneCategories(id);
    res.status(OK).json(category);
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};
