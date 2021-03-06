// Load dependencies
require('dotenv').config();
const {conn} = require('./src/data');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Load Routers
const webhook = require('./src/routes/webhook.routes');
const messages = require('./src/routes/message.routes');

const init = async () => {
  await conn();
  const app = express();
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  // App frontpage
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
  });

  // Facebook Webhook
  app.use('/webhook', webhook);
  app.use('/messages', messages);

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

init();
