const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: {
    type: String,
    require: 'Username cannot be blank',
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    require: 'Password cannot be blank'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (genSaltErr, salt) => {
    if (genSaltErr) {
      return next(genSaltErr);
    }

    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password, (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result);
  });
};

mongoose.model('User', userSchema);
