const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./models/User');
require('./services/passportLocal');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
