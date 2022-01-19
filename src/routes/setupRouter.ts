/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { addOne, updateItem } from "src/controllers/setup.controller";
export const setupRouter = Router();
setupRouter.post("/add", addOne);
setupRouter.patch("/update/:id", updateItem);
