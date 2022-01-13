import { Rooms } from ".prisma/client";
import { prisma } from "../prisma/prisma";

class RoomService {
  addRoom = async (room: Rooms) => {
    const newRoom = await prisma.rooms
      .create({
        data: {
          name: room.name,
        },
      })
      .catch((e) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return newRoom;
  };
  removeRoom = async (id: string) => {
    const deleteRoom = await prisma.rooms
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((e: any) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());

    return deleteRoom;
  };
  takeAllRooms = async () => {
    const allRooms = await prisma.rooms
      .findMany({
        include: {
          Inventory: true,
        },
      })
      .catch((e: any) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return allRooms;
  };
  addManyRooms = async (rooms: Rooms[]) => {
    const items = rooms.map((item: Rooms) => {
      const room = {
        name: item.name,
      };
      return room;
    });
    const createRooms = await prisma.rooms.createMany({
      data: items,
      skipDuplicates: true,
    });
    return createRooms;
  };
}

export default new RoomService();
