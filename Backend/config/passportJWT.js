const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'User'
};
passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
  //  console.log('*******extracting******')
  try {
    const user = await User.findById(jwtPayload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports=passport;
