const request = require('request')

const simpleFetch = (req, res) => {
  console.log(req.query)
  if (req.query['hub.verify_token'] === 'verify_token') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Invalid verify token')
  }
}

const sendRequest = (req, res) => {
  var events = req.body.entry[0].messaging
  console.log(req.body)
  for (i = 0; i < events.length; i++) {
    var event = events[i]
    if (event.message && event.message.text) {
      handleEvent(event)
    }
  }
  res.sendStatus(200)
}

// Static functions
function handleEvent(event) {
  console.log(event.message.text)
  if(event.message.text.toLowerCase() === 'hi') {
    sendMessage(event.sender.id, { text: event.message.text + " there!" })
  } else {
    sendMessage(event.sender.id, { text: "Other msg 2020-12-01" })
  }
}

function sendMessage(recipientId, message) {
  request({
      url: 'https://graph.facebook.com/v10.0/me/messages',
      qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
      method: 'POST',
      json: {
          recipient: {id: recipientId},
          message: message,
      }
  }, function(error, response, body) {
      if (error) {
          console.log('Error sending message: ', error)
      } else if (response.body.error) {
          console.log('Error: ', response.body.error)
      }
  })
}

module.exports = {
  simpleFetch,
  sendRequest
}