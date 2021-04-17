// message controller
var localData = require('../data')

const fetchAllMessages = (req, res) => {
  res.status(200).send(localData.data)
}

const fetchMessage = (req, res) => {
  if(req.params.id >= 0 && req.params.id < localData.data.length)
    res.status(200).send(localData.data[req.params.id])
  else
    res.status(400).send({ message: "Message ID not found" })
}

const deleteMessage = (req, res) => {
  if(req.params.id >= 0 && req.params.id < localData.data.length) {
    localData.pop(req.params.id)
    res.status(200).send({ message: `Message ID ${req.params.id} deleted` })
  }
  else
    res.status(400).send({ message: "Message ID not found" })
}

module.exports = {
  fetchAllMessages,
  fetchMessage,
  deleteMessage
}