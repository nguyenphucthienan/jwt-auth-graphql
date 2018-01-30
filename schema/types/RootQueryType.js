const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');
const UserType = require('./UserType');
const SecretDataType = require('./SecretDataType');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const AuthenticationService = require('../../services/authentication');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, context) {
        return AuthenticationService.requireJwtAuth(context)
          .then((user, err) => {
            if (user) {
              return user;
            }

            return null;
          })
          .catch(err => null);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, context) {
        return AuthenticationService.requireJwtAuth(context)
          .then((user, err) => {
            if (user) {
              return User.find({});
            }

            return null;
          })
          .catch(err => null);
      }
    },
    secret: {
      type: SecretDataType,
      resolve(parentValue, args, context) {
        return AuthenticationService.requireJwtAuth(context)
          .then((user, err) => {
            if (user) {
              return { secret: 'SECRET_DATA' };
            }

            return null;
          })
          .catch(err => null);
      }
    }
  }
});

module.exports = RootQueryType;
