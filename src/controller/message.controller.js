// message controller
const {Message} = require('../models/message');

const fetchAllMessages = async (req, res) => {
  try {
    const msg = await Message.find({}).exec();
    if (msg) {
      res.status(200).send({ok: true, message: 'Success', data: msg});
    } else {
      res.status(400).send({ok: false, message: 'Messages not found'});
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ok: false, message: 'Fail to retrieve messages'});
  }
};

const fetchMessage = async (req, res) => {
  try {
    const {id} = req.params;
    const msg = await Message.findOne({id}, '-_id').exec();
    if (msg) {
      res.status(200).send({ok: true, message: 'Success', data: msg});
    } else {
      res
          .status(400)
          .send({ok: false, message: `Message ID ${req.params.id} not found`});
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ok: false, message: 'Fail to retrieve message'});
  }
};

const deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const msg = await Message.findOneAndDelete({id});
    if (msg) {
      res.status(200).send({
        ok: true,
        message: `Message with ID ${req.params.id} deleted`,
      });
    } else {
      res.send({ok: false, message: 'Message not deleted'});
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ok: false, message: 'Fail to delete data'});
  }
};

module.exports = {
  fetchAllMessages,
  fetchMessage,
  deleteMessage,
};
