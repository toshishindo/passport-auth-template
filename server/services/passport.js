const passport = require('passport');
const User = require('../models/user');
const config = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const LocalOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(LocalOptions, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, (err, user) => {
    if (err) { return done(err);}
    if (!user) { return done(null, false);}

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err);}
      if (!isMatch) { return done(null, false);}

      console.log('userrr', user);
      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other 
  // othetwise, call done without a user object
  User.findById(payload.sub, (err, user) => {
    if (err) { return doen(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);