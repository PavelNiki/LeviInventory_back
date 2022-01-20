/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  addOne,
  addMany,
  getAllInventory,
  getFreeInventory,
  updateInventoryItem,
  deleteItem,
  makeAnInventory,
} from "src/controllers/inventory.controller";
export const inventoryRouter = Router();

inventoryRouter.post(
  "/add",

  addOne
);
inventoryRouter.post(
  "/add_many",

  addMany
);
inventoryRouter.get(
  "/all",

  getAllInventory
);
inventoryRouter.patch(
  "/update/:id",

  updateInventoryItem
);
inventoryRouter.get(
  "/free",

  getFreeInventory
);
inventoryRouter.post(
  "/make",

  makeAnInventory
);
inventoryRouter.delete("/:id", deleteItem);
