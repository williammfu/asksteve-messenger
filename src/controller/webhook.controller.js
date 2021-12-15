const request = require('request');
const {Message} = require('../models/message');
const messenger = require('../utils/messenger');

const FACEBOOK_API_URL = 'https://graph.facebook.com/v10.0/me/messages';

const simpleFetch = (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
};

const sendRequest = async (req, res) => {
  try {
    const events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.message && event.message.text) {
        await Message.create({
          senderId: event.sender.id,
          message: event.message.text,
        });
        sendMessage(
            event.sender.id,
            messenger.giveReply(event.message.text),
        );
      }
    }
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Sends a response message to user
 * @param {number} recipientId Sender's ID
 * @param {string} message Message to be sent
 */
function sendMessage(recipientId, message) {
  request(
      {
        url: FACEBOOK_API_URL,
        qs: {access_token: process.env.FB_ACCESS_TOKEN},
        method: 'POST',
        json: {
          recipient: {id: recipientId},
          message: message,
        },
      },
      function(error, response, body) {
        if (error) {
          console.error('Error sending message: ', error);
        } else if (response.body.error) {
          console.error('Error sending message (body): ', response.body.error);
        }
      },
  );
}

module.exports = {
  simpleFetch,
  sendRequest,
};
