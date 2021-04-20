const request = require('request');
const {Message} = require('../mongo');
const messenger = require('../utils/messenger');

const simpleFetch = (req, res) => {
  if (req.query['hub.verify_token'] === 'verify_token') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
};

const sendRequest = async (req, res) => {
  const events = req.body.entry[0].messaging;
  for (i = 0; i < events.length; i++) {
    const event = events[i];
    if (event.message && event.message.text) {
      console.log(event.message.text)
      await Message.create({
        senderId: event.sender.id,
        message: event.message.text,
      });
      sendMessage(event.sender.id, messenger.giveReply(event.message.text));
    }
  }
  res.sendStatus(200);
};

/**
 * Sends a response message to user
 * @param {number} recipientId Sender's ID
 * @param {string} message Message to be sent
*/
function sendMessage(recipientId, message) {
  request({
    url: 'https://graph.facebook.com/v10.0/me/messages',
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: recipientId},
      message: message,
    },
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

module.exports = {
  simpleFetch,
  sendRequest,
};
