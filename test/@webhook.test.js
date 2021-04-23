// Webhook test
require('../app');
require('dotenv').config();
const chai = require('chai');
const {Message} = require('../src/models/message');
const baseUrl = `http://localhost:${process.env.PORT}`;
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Webhook tests', () => {
  describe('/GET', () => {
    it('Simple fetch success', (done) => {
      chai.request(baseUrl)
          .get('/webhook')
          .query({
            'hub.mode': 'subscribe',
            'hub.challenge': 'myChallenge',
            'hub.verify_token': 'my_verify_token',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.equal('myChallenge');
            done();
          });
    });
  });

  describe('/POST', () => {
    it('Mock simple send message', (done) => {
      Message.create({
        '_id': 999,
        'senderId': 999,
        'message': 'This is a mock message',
      }, function(err, small) {
        done();
      });
    });
  });
});
