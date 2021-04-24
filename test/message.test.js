// Webhook test
require('dotenv').config();
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const {Message} = require('../src/models/message');
const {expect} = require('chai');
let mongoServer;
let messageId;

describe('Message tests', () => {
  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    await Message.insertMany([{
      senderId: 12345,
      message: 'Lorem Ipsum',
    },
    {
      senderId: 54321,
      message: 'Ipsum Lorem',
    },
    ]);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('/GET', () => {
    it('Fetch all messages', async () => {
      const res = await Message.find({}).exec();
      messageId = res[0]._id;
      expect(res).to.be.a('array');
    });

    it('Fetch msg ID', async () => {
      const res = await Message.findOne({_id: messageId}).exec();
      expect(res).to.have.property('_id');
      expect(res.senderId).to.equal('12345');
    });
  });

  describe('/DELETE', () => {
    it('Delete msg with ID', async () => {
      const res = await Message.findOneAndDelete({_id: messageId});
      expect(res).to.be.a('object');
    });
  });
});
