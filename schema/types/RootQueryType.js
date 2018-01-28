const { GraphQLObjectType } = require('graphql');
const UserType = require('./UserType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, context) {
        return context.user;
      }
    }
  }
});

module.exports = RootQueryType;
