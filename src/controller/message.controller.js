// message controller
var localData = require('../data')

const fetchAllMessages = (req, res) => {
  res.status(200).send(localData.data)
}

const fetchMessage = (req, res) => {
  let msg = localData.find(req.params.id)
  if(msg)
    res.status(200).send(msg)
  else
    res.status(400).send({ message: `Message ID ${req.params.id} not found` })
}

const deleteMessage = (req, res) => {
  if(localData.pop(req.params.id)) {
    res.status(200).send({ message: `Message ID ${req.params.id} deleted` })
  }
  else
    res.status(400).send({ message: `Message ID ${req.params.id} not found` })
}

module.exports = {
  fetchAllMessages,
  fetchMessage,
  deleteMessage
}