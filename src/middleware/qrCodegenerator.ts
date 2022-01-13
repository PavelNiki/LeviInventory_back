import QRCode from "qrcode";

export const test = async (item: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const qr = await QRCode.toDataURL(item);

    return qr;
  } catch (e) {
    console.log(e);
  }
};
