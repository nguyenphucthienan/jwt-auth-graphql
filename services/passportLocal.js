const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const localLogin = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Username not found' });
    }

    return user.comparePassword(password, (err, result) => {
      if (err) {
        return done(err);
      }

      if (!result) {
        return done(null, false, { message: 'Incorrect username and password' });
      }

      return done(null, user);
    });
  } catch (err) {
    return done(err);
  }
});

passport.use(localLogin);
