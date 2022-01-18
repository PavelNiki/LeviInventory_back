/* eslint-disable @typescript-eslint/no-misused-promises */
import { Inventory } from ".prisma/client";
import { test } from "src/middleware/qrCodegenerator";
import { prisma } from "src/prisma/prisma";

class QRC {
  createQrForAllInventory = async () => {
    const inventoryAll = await prisma.inventory.findMany();

    const segment = inventoryAll.map((item: Inventory) => {
      const item2 = {
        id: item.id,
        name: item.name,
        image: item.itemImage,
      };
      const qr = test(JSON.stringify(item2));
      return qr;
    });

    const res: string[] = [];
    for await (const i of segment) {
      res.push(i as string);
    }

    return res;
  };

  createQr = async (id: string): Promise<any> => {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id: Number(id),
      },
    });
    const res = await test(
      JSON.stringify({
        id: inventory?.id,
        name: inventory?.name,
        image: inventory?.itemImage,
      })
    );

    return res;
  };
}
export default new QRC();
