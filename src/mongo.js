// Database connection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const conn = mongoose.createConnection(
    'mongodb://admin:rO08Urb35B4MorKT@SG-cloves-43305.servers.mongodirector.com:27017/messages',
    {useUnifiedTopology: true, useNewUrlParser: true},
);

autoIncrement.initialize(conn);

const MessageSchema = new Schema({
  senderId: String,
  message: String,
});

MessageSchema.plugin(autoIncrement.plugin, 'Message');
const Message = conn.model('Message', MessageSchema);

module.exports = {
  Message,
};
