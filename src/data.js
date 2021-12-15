// Database connection
require('dotenv').config();
const mongoose = require('mongoose');

const conn = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = {
  conn,
};
