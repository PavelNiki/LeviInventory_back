/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  addOne,
  deleteItem,
  updateItem,
} from "src/controllers/setup.controller";

export const setupRouter = Router();
setupRouter.post("/add", addOne);
setupRouter.patch("/update/:id", updateItem);
setupRouter.delete("/delete/:id", deleteItem);
setupRouter.get("/one/:id");
setupRouter.get("/all");
