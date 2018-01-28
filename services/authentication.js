const mongoose = require('mongoose');
const User = mongoose.model('User');
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

module.exports = { register };
