// Webhook test
require('../app');
require('dotenv').config();
const chai = require('chai');
const baseUrl = `http://localhost:${process.env.PORT}`;
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Message tests', () => {
  describe('/GET', () => {
    it('Fetch all messages', (done) => {
      chai.request(baseUrl)
          .get('/messages')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
    });

    it('Fetch msg ID', (done) => {
      chai.request(baseUrl)
          .get('/messages/999')
          .end((err, res) => {
            res.should.have.status(200);
            res.body._id.should.equal(999);
            done();
          });
    });
  });

  describe('/DELETE', () => {
    it('Delete msg with ID', (done) => {
      chai.request(baseUrl)
          .delete('/messages/999')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.equal('Message with ID 999 deleted');
            done();
          });
    });
  });
});
