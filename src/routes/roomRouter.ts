/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  createManyRooms,
  getOneRoom,
} from "src/controllers/room.controller";

export const roomRouter = Router();

roomRouter.post("/add", createRoom);
roomRouter.delete(
  "/delete/:id",

  deleteRoom
);
roomRouter.get(
  "/all",

  getAllRooms
);
roomRouter.post(
  "/add_many",

  createManyRooms
);
roomRouter.get("/:id", getOneRoom);
