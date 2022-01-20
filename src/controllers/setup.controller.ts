import { Setups, Prisma } from "@prisma/client";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import SetupService from "src/services/setup.service";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const addOne = async (
  req: Request,
  res: Response
): Promise<Setups | void> => {
  const { setup } = req.body;
  try {
    const newItem = await SetupService.addOne(
      setup as Prisma.SetupsCreateInput
    );
    res.status(CREATED).json(newItem);
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};
export const updateItem = async (
  req: Request,
  res: Response
): Promise<Setups | void> => {
  const { setup } = req.body;
  const { id } = req.params;
  try {
    const newItem = await SetupService.updateOne(
      setup as Prisma.SetupsUncheckedUpdateInput,
      id
    );
    res.status(CREATED).json(newItem);
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<Setups | void> => {
  const { itemId, roomName } = req.body;
  try {
    const deletedItem = await SetupService.deleteOne(
      itemId as string,
      roomName as string
    );
    res.status(OK).json(deletedItem);
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};
