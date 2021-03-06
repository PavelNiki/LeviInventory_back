/* eslint-disable @typescript-eslint/restrict-template-expressions */
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import UserService from "../services/user.service";
import { isValid } from "../middleware/validate";
import { UserInputModel } from "../models/user.model";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const createUser = async (req: Request, res: Response) => {
  const user: UserInputModel = req.body.user;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isValid(user)) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const user = await UserService.addUser(req.body.user);
      res.status(CREATED).json(user);
    } catch (e) {
      res.status(BAD_REQUEST).json(e);
    }
  } else {
    res.status(BAD_REQUEST).json({ errors: `Invalid email adress` });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserService.takeAllUsers();
    res.status(OK).json(allUsers);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.takeOneUser(req.params.id);
    res.status(OK).json(user);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    res.status(OK).json(user);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
