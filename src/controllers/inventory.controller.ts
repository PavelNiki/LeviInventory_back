import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import InventoryService from "src/services/inventory.service";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;
export const addOne = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const inventoryItem = await InventoryService.addOneItem(req.body.inventory);
    res.status(CREATED).json(inventoryItem);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const addMany = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addMany = await InventoryService.addManyItems(req.body.inventory);
    res.status(CREATED).json(`Добавлено ${addMany.count} новых объектов`);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const getAllInventory = async (req: Request, res: Response) => {
  try {
    const getAll = await InventoryService.allInventory();
    res.status(OK).json(getAll);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const updateInventoryItem = await InventoryService.updateItem(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      req.body,
      req.params.id
    );
    res.status(OK).json(updateInventoryItem);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const getFreeInventory = async (req: Request, res: Response) => {
  try {
    const freeInventory = await InventoryService.findFreeInventory();
    res.status(OK).json(freeInventory);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const makeAnInventory = async (req: Request, res: Response) => {
  try {
    const makeAnInventory = await InventoryService.inventoryMake(req.body);
    res.status(OK).json(makeAnInventory);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
