/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getOneCategories,
  updateCategory,
} from "src/controllers/category.controller";

export const categoryRouter = Router();

categoryRouter.post("/add", addCategory);
categoryRouter.delete("/delete/:id", deleteCategory);
categoryRouter.patch("/update", updateCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/one/:id", getOneCategories);
