const { GraphQLSchema } = require('graphql');
const RootQueryType = require('./types/RootQueryType');
const mutation = require('./mutation');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
