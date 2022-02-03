/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createUser,
  getOneUser,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller";
export const userRouter = Router();
userRouter.post(
  "/add",

  createUser
);

userRouter.get(
  "/all",

  getAllUsers
);
userRouter.get(
  "/:id",

  getOneUser
);
userRouter.delete(
  "/delete/:id",

  deleteUser
);
userRouter.patch("/update");
