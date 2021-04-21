// Database connection
require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const conn = mongoose.createConnection(
    process.env.DB_URI,
    {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
);

autoIncrement.initialize(conn);

module.exports = {
  Schema,
  autoIncrement,
  conn,
};
