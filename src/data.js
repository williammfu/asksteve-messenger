// Database connection
require('dotenv').config();
const mongoose = require('mongoose');

const conn = async () => {
  await mongoose.connect(
      process.env.DB_URI,
      {useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false},
  );
};

module.exports = {
  conn,
};
