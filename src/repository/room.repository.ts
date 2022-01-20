import { prisma } from "../prisma/prisma";
import { Rooms, Prisma } from "@prisma/client";

export default class Room {
  addRoom = async (room: Prisma.RoomsCreateInput): Promise<Rooms | void> => {
    // const newRoom = await prisma.rooms
    //   .create({
    //     data: room,
    //   })
    //   .catch((e) => console.error(e));

    // return newRoom;
    return await prisma.rooms
      .create({
        data: room,
      })
      .catch((e) => console.error(e));
  };

  deleteRoom = async (id: string) => {
    const deleteRoom = await prisma.rooms
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((e: any) => console.error(e));

    return deleteRoom;
  };
  getOneRoom = async (id: string): Promise<Rooms | void | null> => {
    const room = await prisma.rooms
      .findFirst({
        where: {
          id: +id,
        },
        include: {
          Inventory: true,
          Setups: true,
        },
      })
      .catch((e) => console.error(e));
    return room;
  };
  getAllRooms = async (): Promise<Rooms[] | void> => {
    const allRooms = await prisma.rooms
      .findMany({
        include: {
          Inventory: true,
          Setups: true,
        },
      })
      .catch((e) => console.error(e));
    return allRooms;
  };

  addManyRooms = async (rooms: Prisma.RoomsCreateManyInput): Promise<any> => {
    const createRooms = await prisma.rooms
      .createMany({
        data: rooms,
        skipDuplicates: true,
      })
      .catch((e) => console.error(e));
    return createRooms;
  };
  updateRoom = async (item: Rooms) => {
    return await prisma.rooms
      .update({
        where: {
          id: +item.id,
        },
        data: item,
        include: {
          Inventory: true,
          Setups: true,
        },
      })
      .catch((e) => console.error(e));
  };
}
