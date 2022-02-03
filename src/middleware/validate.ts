import { Users } from ".prisma/client";
import { UserInputModel } from "src/models/user.model";
import validator from "validator";

export const isValid = (user: UserInputModel) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const isValid = validator.isEmail(user.email);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return isValid;
};
