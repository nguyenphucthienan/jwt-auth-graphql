const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const SecretDataType = new GraphQLObjectType({
  name: 'SecretDataType',
  fields: {
    secret: { type: GraphQLString }
  },
});

module.exports = SecretDataType;
