import { Users } from ".prisma/client";
import validator from "validator";

export const isValid = (user: Users) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const isValid = validator.isEmail(user.email);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return isValid;
};
