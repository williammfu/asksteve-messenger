const {Schema, autoIncrement, conn} = require('../data');

const MessageSchema = new Schema({
  senderId: String,
  message: String,
});

MessageSchema.plugin(autoIncrement.plugin, 'Message');
const Message = conn.model('Message', MessageSchema);

module.exports = {
  Message,
};
