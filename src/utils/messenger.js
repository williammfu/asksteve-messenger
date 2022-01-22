// Bot State
// 0 - Reply after receiving greeting
// 1 - Reply after receiving name
// 2 - Reply after receiving birth_date
// 3 - Reply after receiving yes/no
const { Recipient } = require("../models/recipient");
// let senderDate = null;

// Constants
const errorMsg = "I'm sorry, I can't seem to identify your message :(";
const quickReplies = [
  {
    content_type: "text",
    title: "Yes",
    payload: "Yes",
  },
  {
    content_type: "text",
    title: "No",
    payload: "No",
  },
];
const greetings = ["hi", "hello", "hai", "hallo", "halo", "greetings", "helo"];
const yess = ["yea", "yeah", "yes", "yah", "yep", "yup", "of course", "okay"];
const nos = ["no", "nah", "nope", "nae", "naw", "nay", "no, thanks"];
const findDate = /\d{4}([\/./-])\d{2}\1\d{2}/;

/**
 * Returns the proper message instance
 * @param {string} recipientId sender ID
 * @param {number} state sender current state
 * @param {string} msg sender's message
 * @return {object} response API object
 */
async function giveReply(recipientId, state, msg) {
  switch (state) {
    case 0:
      return askName(msg);
    case 1:
      return askBirthData(msg);
    case 2:
      return await askCountDays(recipientId, msg);
    case 3:
      return await giveAnswerOrGoodbye(recipientId, msg);
  }
}

/**
 * Creates a message instance (Response API)
 * @param {boolean} success true if user input follows format
 * @param {string} text content of message
 * @param {object} quickReply quick reply object (defaults to null)
 * @return {object} response API object
 */
function createMessage(success, text, quickReply = null) {
  return {
    success: success,
    replyMsg: {
      text: text,
      quick_replies: quickReply,
    },
  };
}

/**
 * Creates an error message instance
 * @return {object} response API object
 */
function createErrorMessage() {
  return createMessage(false, errorMsg);
}

/**
 * Checks whether a message is considered a greeting
 * @param {*} msg message received
 * @return {boolean} true, if it's a greeting text
 */
function isGreetings(msg) {
  let temp = msg;
  temp = temp.replace(/[\.!,]*$/, "");

  return greetings.includes(temp);
}

/**
 * Asks user for name
 * @param {string} msg message received
 * @return {object} Message object for user
 */
function askName(msg) {
  if (isGreetings(msg)) {
    return createMessage(true, `Hi, there! Could you tell us your name?`);
  } else {
    return createErrorMessage();
  }
}

/**
 * Ask user for birth date
 * @param {*} msg message received
 * @return {object} Message object for user
 */
function askBirthData(msg) {
  return createMessage(
    true,
    `Hi ${msg.toString()}! When is your birth date? (YYYY-MM-DD)`
  );
}

/**
 * Offers user to count the days
 * @param {string} recipientId sender ID
 * @param {string} msg message received
 * @return {object} Message object for user
 */
async function askCountDays(recipientId, msg) {
  try {
    const matchString = findDate.exec(msg);
    if (!matchString) {
      return createMessage(false, "I can't find your birthdate");
    }

    const date = new Date(matchString[0]);
    if (date == "Invalid Date") {
      return createMessage(false, "Invalid Date :(");
    }

    await Recipient.updateOne({ senderId: recipientId }, { birthDate: date });
    return createMessage(
      true,
      "Would you like to know how many days to your birthday?",
      quickReplies
    );
  } catch (e) {
    return createErrorMessage();
  }
}

/**
 * Gives the number of days or say goodbye
 * @param {string} recipientId sender ID
 * @param {string} msg incoming message string
 * @return {object} message object
 */
async function giveAnswerOrGoodbye(recipientId, msg) {
  const tempMsg = msg.replace(/[\.!,]*$/, "");

  if (yess.includes(tempMsg.toLowerCase())) {
    const now = new Date();
    const rec = await Recipient.findOne({ senderId: recipientId });
    const senderDate = rec.birthDate;
    // To ensure the hour format 00:00:00
    const today = new Date(
      `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate()}`
    );

    if (
      today.getDate() === senderDate.getDate() &&
      today.getMonth() === senderDate.getMonth()
    ) {
      return createMessage(true, "Today is your birthday");
    } else {
      const nearestBday = new Date(
        today.getFullYear() +
          (today.getMonth() > senderDate.getMonth() ||
            (today.getMonth() == senderDate.getMonth() &&
              today.getDate() > senderDate.getDate())),
        senderDate.getMonth(),
        senderDate.getDate()
      );
      const diff = Math.ceil(
        (nearestBday.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );
      return createMessage(
        true,
        `There are ${diff} days left until your next birthday`
      );
    }
  } else if (nos.includes(tempMsg.toLowerCase())) {
    return createMessage(true, "Goodbye");
  }
  return createErrorMessage();
}

module.exports = {
  giveReply,
};
