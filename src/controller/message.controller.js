// message controller
const {Message} = require('../models/message');

const fetchAllMessages = async (req, res) => {
  const msg = await Message.find({}).exec();
  res.status(200).send(msg);
};

const fetchMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const msg = await Message.findOne({id}, '-_id').exec();
    if (msg) {
      res.status(200).send(msg);
    } else {
      res.status(400).send({message: `Message ID ${req.params.id} not found`});
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteMessage = async (req, res) => {
  const id = req.params.id;
  const msg = await Message.findOneAndDelete({id});
  if (msg) {
    res.status(200).send({
      message: `Message with ID ${req.params.id} deleted`,
    });
  } else {
    res.send({message: 'Message not deleted'});
  }
};

module.exports = {
  fetchAllMessages,
  fetchMessage,
  deleteMessage,
};
