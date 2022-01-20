import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import RoomService from "src/services/room.service";
import { Prisma, Rooms } from "@prisma/client";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const createRoom = async (
  req: Request,
  res: Response
): Promise<Rooms | void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const room = await RoomService.addRoom(req.body.room);
    res.status(CREATED).json(room);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response
): Promise<Rooms | void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const deleteRoom = await RoomService.deleteRoom(req.params.id);
    res.status(OK).json(deleteRoom);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};

export const getAllRooms = async (
  req: Request,
  res: Response
): Promise<Rooms[] | void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const allRooms = await RoomService.getAllRoom();
    res.status(OK).json(allRooms);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};

export const createManyRooms = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { rooms } = req.body;
  try {
    const newRooms = await RoomService.addManyRooms(
      rooms as Prisma.RoomsCreateManyInput
    );

    res.status(CREATED).json(newRooms);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const getOneRoom = async (
  req: Request,
  res: Response
): Promise<Rooms | void> => {
  const { id } = req.params;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const room = await RoomService.getOneRoom(id);

    res.status(OK).json(room);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
