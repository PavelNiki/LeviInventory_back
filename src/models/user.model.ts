import { Users, Inventory } from "@prisma/client";
import { Prisma } from "@prisma/client";
export interface IUserWithInventory extends Users {
  inventory?: Inventory;
}

export const userModel = (user: IUserWithInventory) => {
  const model = {
    id: user.id,
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
    inventory: user?.inventory,
  };
  return model;
};
export const allUsersModel = (users: Users[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const model = users.map((user: IUserWithInventory) => {
    const userModel = {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      inventory: user.inventory,
    };
    return userModel;
  });
  return model;
};
