import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import qrcodeService from "src/services/qrcode.service";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
export const getAllQrcode = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const allQrcode = await qrcodeService.createQrForAllInventory();
    // res.set({ "Content-Type": "image/png" });
    res.status(OK).json(allQrcode);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
export const getOneQrcode = async (req: Request, res: Response) => {
  try {
    const qrcode = await qrcodeService.createQr(req.params.id);
    res.status(CREATED).json(qrcode);
  } catch (e) {
    res.status(BAD_REQUEST).json(e);
  }
};
