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
