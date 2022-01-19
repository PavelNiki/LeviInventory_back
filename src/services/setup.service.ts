import Setup from "src/repository/setup.repository";
import { Prisma } from "@prisma/client";
const setup = new Setup();

class SetupService {
  addOne = async (item: Prisma.SetupsUncheckedCreateInput) => {
    return await setup.addOne(item);
  };
  updateOne = async (
    item: Prisma.SetupsUncheckedUpdateInput,
    adminId: string
  ) => {
    return await setup.updateSetup(item, adminId);
  };
}
export default new SetupService();
