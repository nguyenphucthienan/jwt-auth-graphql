const { GraphQLObjectType } = require('graphql');
const UserType = require('./UserType');
const AuthenticationService = require('../../services/authentication');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, context) {
        return AuthenticationService.requireJwtAuth(context);
      }
    }
  }
});

module.exports = RootQueryType;
