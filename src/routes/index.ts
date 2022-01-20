/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { userRouter } from "./userRouter";
import passport from "passport";
import { roomRouter } from "./roomRouter";
import { inventoryRouter } from "./inventoryRouter";
import { getAllQrcode, getOneQrcode } from "src/controllers/qrcode.controller";
import { authUser } from "src/controllers/auth.controller";
import { categoryRouter } from "./categoryRouter";
import { setupRouter } from "./setupRouter";

//  qr
const qrRouter = Router();
qrRouter.get("/all", getAllQrcode);
qrRouter.get("/one/:id", getOneQrcode);

// auth rout
const authRouter = Router();
authRouter.post("/login", authUser);

// category router

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
baseRouter.use("/setup", setupRouter);
export default baseRouter;
