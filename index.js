const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./models/User');
require('./services/passportLocal');
require('./services/passportJwt');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
