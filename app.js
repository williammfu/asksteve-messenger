// Load dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Load Routers
const webhook = require('./src/routes/webhook.routes');
const messages = require('./src/routes/message.routes');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/webhook', webhook);

// App frontpage
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

// Facebook Webhook
app.use('/webhook', webhook);
app.use('/messages', messages);

const port = process.env.PORT || 3000;
app.listen( port, () => {
  console.log(`Server is running on port ${port}`);
});
