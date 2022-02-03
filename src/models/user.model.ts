import { Prisma, Users, Inventory } from "@prisma/client";
import { ObjectMapper } from "json-object-mapper";
import { rest } from "lodash";

export class UserInputModel {
  id?: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  inventory?: any;
  password: string;
  image: string;
  setups?: [any];
  updatedBy?: [any];
}

export const userInput = (user: UserInputModel) =>
  ObjectMapper.deserialize(UserInputModel, user);

console.log(
  "test",
  userInput({
    name: "Pavel",
    last_name: "Nikitenko",
    phone: "11111111",
    email: "p.nikitenko@leviossa.net",
    isAdmin: true,
    password: "123456",
    image: "test",
  })
);

export interface IUserWithInventory extends Users {
  inventory?: Inventory;
}

export const userModel = (user: Users) => {
  const { password, ...rest } = user;
  return rest;
};
