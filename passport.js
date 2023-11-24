// Server/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/User');

// Configure the local strategy
passport.use(new LocalStrategy(User.authenticate()));

// Configure the JWT strategy
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key', // Change this to your actual secret key
}, (payload, done) => {
  // Find the user associated with the provided token
  User.findById(payload.user._id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

module.exports = passport;
