const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
  senderId: String,
  state: Number,
  birthDate: Date,
});

const Recipient = mongoose.model('Recipient', RecipientSchema);

module.exports = {
  Recipient,
};
