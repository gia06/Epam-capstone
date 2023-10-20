import { Loader } from '../interfaces/general';
import passport from 'passport';
import passportJwt from 'passport-jwt';

export const loadPassport: Loader = (app, { services }) => {
  const ExtractJwt = passportJwt.ExtractJwt;
  const StrategyJwt = passportJwt.Strategy;

  passport.use(
    new StrategyJwt(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await services.userService.findById(jwtPayload.id);

          if (user) {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
