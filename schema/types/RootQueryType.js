const { GraphQLObjectType } = require('graphql');
const UserType = require('./UserType');
const SecretDataType = require('./SecretDataType');
const AuthenticationService = require('../../services/authentication');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, context) {
        return AuthenticationService.requireJwtAuth(context);
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
          });
      }
    }
  }
});

module.exports = RootQueryType;
