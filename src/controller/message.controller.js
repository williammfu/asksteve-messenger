// message controller
const {Message} = require('../mongo');

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
  try {
    const item = await Message.findOneAndRemove({id: req.params.id}).exec();
    if (!item) {
      res.status(400).send({message: `ID ${req.params.id} not found`});
    }
  } catch (e) {
    res.send({message: 'Message not deleted'});
  }
};

module.exports = {
  fetchAllMessages,
  fetchMessage,
  deleteMessage,
};
