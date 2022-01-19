import { Prisma, Users } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { prisma } from "../prisma/prisma";

export default class User {
  addUser = async (user: Prisma.UsersCreateInput): Promise<Users | void> => {
    const condidate = await prisma.users.findFirst({
      where: {
        email: user.email,
      },
    });

    if (condidate) {
      throw new Error("Email already use");
    } else {
      if (user.isAdmin) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(user.password, salt);
        const newUser = await prisma.users
          .create({
            data: {
              name: user.name,
              last_name: user.last_name,
              password: hashPassword,
              email: user.email,
              isAdmin: true,
              phone: user.phone,
              image: user.image,
            },
            include: {
              inventory: true,
            },
          })

          .catch((e) => console.error(e))
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          .finally(() => prisma.$disconnect());

        // return userModel(newUser as Users);
        return newUser;
      } else {
        const pass = "123456";
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(pass, salt);

        const newUser = await prisma.users
          .create({
            data: {
              name: user.name,
              last_name: user.last_name,
              password: hashPassword,
              email: user.email,
              phone: user.phone,
              image: user.image,
            },
            include: {
              inventory: true,
            },
          })

          .catch((e) => console.error(e))
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          .finally(() => prisma.$disconnect());

        return newUser;
      }
    }
  };
  takeAllUsers = async (): Promise<Users[] | void> => {
    const allUsers = await prisma.users
      .findMany({
        include: {
          inventory: true,
        },
      })
      .catch((e) => console.error(e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(() => prisma.$disconnect());
    return allUsers;
  };

  takeOneUser = async (userId: string): Promise<Users | null> => {
    const oneUser = await prisma.users.findFirst({
      where: {
        id: Number(userId),
      },
      include: {
        inventory: true,
      },
    });
    return oneUser;
  };

  deleteUser = async (userId: string): Promise<Users | null> => {
    const deleteUser = await prisma.users.delete({
      where: {
        id: Number(userId),
      },
    });
    // await InventoryService.removeUserInventoryToStorage();
    return deleteUser;
  };
}
