// Webhook test
const { expect } = require("chai");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { Recipient } = require("../src/models/recipient");
const { giveReply } = require("../src/utils/messenger");
const TEST_RECIPIENT_ID = "unique_123456";

describe("Bot replies tests", () => {
  describe("Check Sent Message", () => {
    before(async () => {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await Recipient.create({
        senderId: TEST_RECIPIENT_ID,
        state: 0,
        birthDate: null,
      });
    });

    after(async () => {
      await Recipient.deleteOne({ senderId: TEST_RECIPIENT_ID });
    });

    it("Not Greeting reply", async () => {
      const { success, replyMsg } = await giveReply(
        TEST_RECIPIENT_ID,
        0,
        "woy"
      );
      expect(replyMsg).to.be.a("object");
      expect(success).to.be.false;
      expect(replyMsg.text).to.equal(
        "I'm sorry, I can't seem to identify your message :("
      );
    });

    it("Ask name after greetings", async () => {
      const { success, replyMsg } = await giveReply(
        TEST_RECIPIENT_ID,
        0,
        "hai!!"
      );
      expect(replyMsg).to.be.a("object");
      expect(success).to.be.true;
      expect(replyMsg.text).to.equal("Hi, there! Could you tell us your name?");
    });

    it("Ask birth date", async () => {
      const senderName = "Will";
      const { success, replyMsg } = await giveReply(
        TEST_RECIPIENT_ID,
        1,
        senderName
      );
      expect(replyMsg).to.be.a("object");
      expect(success).to.be.true;
      expect(replyMsg.text).to.equal(
        `Hi ${senderName}! When is your birth date? (YYYY-MM-DD)`
      );
    });

    it("Invalid date reply", async () => {
      const { success, replyMsg } = await giveReply(
        TEST_RECIPIENT_ID,
        2,
        "2020-31-31"
      ); // Date not exist
      expect(replyMsg).to.be.a("object");
      expect(success).to.be.false;
      expect(replyMsg.text).to.equal("Invalid Date :(");
    });

    it("Valid date reply", async () => {
      const { success, replyMsg } = await giveReply(
        TEST_RECIPIENT_ID,
        2,
        "2020-03-07"
      );
      expect(replyMsg).to.be.a("object");
      expect(success).to.be.true;
      expect(replyMsg.text).to.equal(
        "Would you like to know how many days to your birthday?"
      );
      expect(replyMsg.quick_replies).to.be.an("array");
    });

    it("Answer birthday", async () => {
      birthDate = new Date();
      birthDate.setDate(birthDate.getDate() + 1);
      console.log(
        `${birthDate.getFullYear()}-${
          birthDate.getMonth() + 1
        }-${birthDate.getDate()}`
      );
      const temp = await giveReply(
        TEST_RECIPIENT_ID,
        2,
        `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${birthDate.getDate()}`
      );
      expect(temp.success).to.be.true;
      expect(temp.replyMsg).to.be.a("object");
      const { success, replyMsg } = await giveReply(
        TEST_RECIPIENT_ID,
        3,
        "yes"
      );
      expect(success).to.be.true;
      expect(replyMsg).to.be.a("object");
      expect(replyMsg.text).to.equal(
        `There are 1 days left until your next birthday`
      );
    });

    it("Goodbye", async () => {
      const { success, replyMsg } = await giveReply(TEST_RECIPIENT_ID, 3, "no");
      expect(success).to.be.true;
      expect(replyMsg).to.be.a("object");
      expect(replyMsg.text).to.equal("Goodbye");
    });
  });
});
