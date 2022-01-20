import Setup from "src/repository/setup.repository";
import { Prisma, Setups } from "@prisma/client";
const setup = new Setup();

class SetupService {
  addOne = async (item: Prisma.SetupsCreateInput): Promise<Setups | void> => {
    return await setup.addOne(item);
  };
  updateOne = async (
    item: Prisma.SetupsUncheckedUpdateInput,
    adminId: string
  ): Promise<Setups | null> => {
    return await setup.updateSetup(item, adminId);
  };
  deleteOne = async (
    itemId: string,
    roomName: string
  ): Promise<Setups | null> => {
    return await setup.deleteOne(itemId, roomName);
  };
}
export default new SetupService();
