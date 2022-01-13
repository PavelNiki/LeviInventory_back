import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import RoomService from "src/services/room.service";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const createRoom = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const room = await RoomService.addRoom(req.body.room);
    res.status(CREATED).json(room);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const deleteRoom = await RoomService.removeRoom(req.params.id);
    res.status(OK).json(deleteRoom);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const allRooms = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const allRooms = await RoomService.takeAllRooms();
    res.status(OK).json(allRooms);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const createManyRooms = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newRooms = await RoomService.addManyRooms(req.body.room);
    res.status(CREATED).json(`Добавлено ${newRooms.count} новых комнат`);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
