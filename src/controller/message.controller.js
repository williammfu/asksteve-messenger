// message controller
const {Message} = require('../models/message');

const fetchAllMessages = async (req, res) => {
  const msg = await Message.find({}).exec();
  res.status(200).send(msg);
};

const fetchMessage = async (req, res) => {
  const msg = await Message.findById(req.params.id).exec();
  if (msg) {
    res.status(200).send(msg);
  } else {
    res.status(400).send({message: `Message ID ${req.params.id} not found`});
  }
};

const deleteMessage = async (req, res) => {
  Message.deleteOne({'_id': req.params.id}).then(function() {
    res.status(200).send({
      message: `Message with ID ${req.params.id} deleted`,
    });
  }).catch(function(err) {
    res.send({message: 'Message not deleted'});
  });
};

module.exports = {
  fetchAllMessages,
  fetchMessage,
  deleteMessage,
};
