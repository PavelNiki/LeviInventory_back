/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Rooms, Prisma } from ".prisma/client";

import Room from "../repository/room.repository";

const room = new Room();
class RoomService {
  addRoom = async (
    roomInput: Prisma.RoomsCreateInput
  ): Promise<Rooms | void> => {
    return await room.addRoom(roomInput);
  };
  addManyRooms = async (
    rooms: Prisma.RoomsCreateManyInput
  ): Promise<Prisma.BatchPayload | void> => {
    return await room.addManyRooms(rooms);
  };
  updateRoom = async (roomInput: Rooms): Promise<Rooms | void> => {
    return await room.addRoom(roomInput);
  };
  getOneRoom = async (id: string): Promise<Rooms | void | null> => {
    return await room.getOneRoom(id);
  };
  getAllRoom = async (): Promise<Rooms[] | void> => {
    return await room.getAllRooms();
  };
  deleteRoom = async (id: string): Promise<Rooms | void> => {
    return await room.deleteRoom(id);
  };
}

export default new RoomService();
