const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const UserType = require('./types/UserType');
const AuthenticationService = require('../services/authentication');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { username, password }, context) {
        return AuthenticationService.register({ username, password, context });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, context) {
        const { user } = context;
        context.logout();
        return user;
      }
    }
  }
});

module.exports = mutation;
