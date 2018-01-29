const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

function generateToken(user) {
  return jwt.sign(
    { id: user.id },
    config.secretKey,
  );
}

function register({ username, password, context }) {
  if (!username || !password) {
    throw new Error('You must provide an email and password');
  }

  return User.findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const user = new User({ username, password });
      return user.save();
    })
    .then((user) => {
      user.token = generateToken(user);

      return new Promise((resolve, reject) => {
        resolve(user);
      });
    });
}

function requireLocalAuth({ username, password, context }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err) {
        reject(new Error('Error', err));
      }

      if (!user) {
        reject(new Error('Incorrect username and/or password'));
      }

      user.token = generateToken(user);
      resolve(user);
    })({ body: { username, password } });
  });
}

module.exports = { register, requireLocalAuth };
