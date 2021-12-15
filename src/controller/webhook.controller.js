const request = require('request');
const {Message} = require('../models/message');
const {Recipient} = require('../models/recipient');
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
    for (const event of events) {
      if (event.message && event.message.text) {
        let sender = await Recipient.findOne({senderId: event.sender.id});
        if (!sender) {
          await Recipient.create({
            senderId: event.sender.id,
            state: 0,
            birthDate: null,
          });
          sender = await Recipient.findOne({senderId: event.sender.id});
        }
        await Message.create({
          senderId: event.sender.id,
          message: event.message.text,
        });
        const {success, replyMsg} = await messenger.giveReply(
            event.sender.id,
            sender.state,
            event.message.text,
        );
        await Recipient.updateOne(
            {
              senderId: event.sender.id,
            },
            {$set: {state: (sender.state + success) % 4}},
        );
        sendMessage(event.sender.id, replyMsg);
      }
    }
    res.sendStatus(200);
  } catch (e) {
    console.error(e.message);
  }
};

/**
 * Sends a response message to user
 * @param {number} recipientId Sender's ID
 * @param {string} message Message to be sent
 */
const sendMessage = (recipientId, message) => {
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
};

module.exports = {
  simpleFetch,
  sendRequest,
};
