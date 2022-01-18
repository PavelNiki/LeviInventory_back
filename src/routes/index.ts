/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createUser,
  allUsers,
  oneUser,
  deleteUser,
} from "../controllers/user.controller";
import passport from "passport";
import {
  allRooms,
  createRoom,
  deleteRoom,
  createManyRooms,
} from "src/controllers/room.controller";
import {
  addMany,
  addOne,
  getAllInventory,
  getFreeInventory,
  makeAnInventory,
  updateInventoryItem,
} from "src/controllers/inventory.controller";
import { getAllQrcode, getOneQrcode } from "src/controllers/qrcode.controller";
import { authUser } from "src/controllers/auth.controller";
import { addCategory } from "src/controllers/category.controller";
// User-route
const userRouter = Router();

userRouter.post(
  "/add",

  createUser
);

userRouter.get(
  "/all",

  allUsers
);
userRouter.get(
  "/:id",

  oneUser
);
userRouter.delete(
  "/delete/:id",

  deleteUser
);

const roomRouter = Router();
roomRouter.post(
  "/add",

  createRoom
);
roomRouter.delete(
  "/delete/:id",

  deleteRoom
);
roomRouter.get(
  "/all",

  allRooms
);
roomRouter.post(
  "/add_many",

  createManyRooms
);

// inventory
const inventoryRouter = Router();

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

//  qr
const qrRouter = Router();
qrRouter.get("/all", getAllQrcode);
qrRouter.get("/one/:id", getOneQrcode);

// auth rout
const authRouter = Router();
authRouter.post("/login", authUser);

// category router
const categoryRouter = Router();
categoryRouter.post("/add", addCategory);
// Export the base-router
const baseRouter = Router();
baseRouter.use(
  "/users",
  // passport.authenticate("jwt", { session: false }),
  userRouter
);
baseRouter.use(
  "/rooms",
  // passport.authenticate("jwt", { session: false }),
  roomRouter
);
baseRouter.use(
  "/inventory",
  // passport.authenticate("jwt", { session: false }),
  inventoryRouter
);
baseRouter.use(
  "/qr",
  // passport.authenticate("jwt", { session: false }),
  qrRouter
);
baseRouter.use("/auth", authRouter);
baseRouter.use("/category", categoryRouter);
export default baseRouter;
