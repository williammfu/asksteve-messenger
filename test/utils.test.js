// Webhook test
const {expect} = require('chai');
const {giveReply} = require('../src/utils/messenger');

describe('Bot replies tests', () => {
  describe('Check Sent Message', () => {
    it('Not Greeting reply', () => {
      const reply = giveReply('woy');
      expect(reply).to.be.a('object');
      expect(reply.text).to.equal(
          'I\'m sorry, I can\'t seem to identify your message :(',
      );
    });

    it('Ask name after greetings', () => {
      const reply = giveReply('hai!!');
      expect(reply).to.be.a('object');
      expect(reply.text).to.equal(
          'Hi, there! Could you tell us your name?',
      );
    });

    it('Ask birth date', () => {
      const senderName = 'Will';
      const reply = giveReply(senderName);
      expect(reply).to.be.a('object');
      expect(reply.text).to.equal(
          `Hi ${senderName}! When is your birth date? (YYYY-MM-DD)`,
      );
    });

    it('Invalid date reply', () => {
      const reply = giveReply('2020-31-31'); // Date not exist
      expect(reply).to.be.a('object');
      expect(reply.text).to.equal(
          'Invalid Date :(',
      );
    });

    it('Valid date reply', () => {
      const reply = giveReply('2020-03-07');
      expect(reply).to.be.a('object');
      expect(reply.text).to.equal(
          'Would you like to know how many days to your birthday?',
      );
      expect(reply.quick_replies).to.be.an('array');
    });

    it('Answer birthday', () => {
      giveReply('hai!!');
      giveReply('fu');
      birthDate = new Date();
      birthDate.setDate(birthDate.getDate() + 1);
      giveReply(birthDate.toISOString().split('T')[0]);
      const reply = giveReply('yes');
      expect(reply).to.be.a('object');
      expect(reply.text).to.equal(
          `There are 1 days left until your next birthday`,
      );
    });

    it('Goodbye', () => {
      giveReply('hai!!');
      giveReply('fu');
      giveReply('2020-03-07');
      const reply = giveReply('no');
      expect(reply).to.be.a('object');
      expect(reply.text).to.equal(
          'Goodbye',
      );
    });
  });
});
