import AuthService from "../services/auth.service";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.login(email as string, password as string);

    if (user?.token) {
      res.status(OK).setHeader("Authorization", `Bearer ${user?.token}`);
      res.json(user?.user);
    } else {
      res.status(BAD_REQUEST);
    }
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
