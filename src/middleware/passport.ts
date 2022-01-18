/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ExtractJwt } from "passport-jwt";
import JwtStrategy from "passport-jwt";
import { PrismaClient } from "@prisma/client";

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "leviossa",
};
const prisma = new PrismaClient();

module.exports = (passport: { use: (arg0: JwtStrategy.Strategy) => void }) => {
  passport.use(
    new JwtStrategy.Strategy(option, (payload, done) => {
      try {
        const condidate = async () => {
          await prisma.users.findFirst({
            where: {
              id: payload.id,
            },
          });
        };

        if (condidate) {
          return done(null, condidate);
        } else {
          return done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
