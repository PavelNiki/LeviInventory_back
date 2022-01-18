import { IUserWithInventory } from "./../models/user.model";
import * as bcrypt from "bcrypt";

import { prisma } from "../prisma/prisma";
import jwt from "jsonwebtoken";

class AuthService {
  login = async (
    email: string,
    password: string
  ): Promise<{ token: string; user: IUserWithInventory }> => {
    const condidate = await prisma.users.findFirst({
      where: {
        email: {
          contains: email,
        },
      },
    });
    if (!condidate) {
      throw new Error("Email does not exist");
    } else {
      const checkPassword = bcrypt.compareSync(password, condidate.password);
      if (checkPassword && condidate.isAdmin) {
        const token: string = jwt.sign(
          {
            email: condidate.email,
            id: condidate.id,
            isAdmin: condidate.isAdmin,
          },
          "leviossa",
          { expiresIn: "12h" }
        );
        return { token: token, user: condidate };
      } else {
        throw new Error("You are not admin");
      }
    }
  };
}
export default new AuthService();
