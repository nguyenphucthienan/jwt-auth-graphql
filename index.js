const express = require('express');
const app = express();
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
