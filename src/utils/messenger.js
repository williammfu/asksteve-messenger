// Bot State
// 0 - Reply after receiving greeting
// 1 - Reply after receiving name
// 2 - Reply after receiving birth_date
// 3 - Reply after receiving yes/no
let state = 0;
let senderName = '';
let senderDate = null;

// Constants
const errorMsg = {
  text: 'I\'m sorry, I can\'t seem to identify your message :(',
};
const quickReplies = [
  {
    'content_type': 'text',
    'title': 'Yes',
    'payload': 'Yes',
  },
  {
    'content_type': 'text',
    'title': 'No',
    'payload': 'No',
  },
];
const greetings = ['hi', 'hello', 'hai', 'hallo', 'halo', 'greetings', 'helo'];
const yess = ['yea', 'yeah', 'yes', 'yah', 'yep', 'yup', 'of course', 'okay'];
const nos = ['no', 'nah', 'nope', 'nae', 'naw', 'nay', 'no, thanks'];
const findDate = /\d{4}([\/./-])\d{2}\1\d{2}/;

const changeState = function() {
  state++;
  state %= 4;
};

const giveReply = function(msg) {
  if (isGreetings(msg)) state = 0;
  switch (state) {
    case 0:
      return askName(msg);
    case 1:
      return askBirthData(msg);
    case 2:
      return askCountDays(msg);
    case 3:
      return giveAnswerOrGoodbye(msg);
  }
};

/**
 * Creates a message instance (Response API)
 * @param {string} text content of message
 * @param {object} quickReply quick reply object (defaults to null)
 * @return {object} response API object
 */
function createMessage(text, quickReply = null) {
  if (quickReply) {
    return {
      text: text,
      quick_replies: quickReply,
    };
  }

  return {
    text: text,
  };
}

/**
 * Checks whether a message is considered a greeting
 * @param {*} msg message received
 * @return {boolean} true, if it's a greeting text
 */
function isGreetings(msg) {
  let temp = msg;
  temp = temp.replace(/[\.!,]*$/, '');

  return greetings.includes(temp);
}

/**
 * Asks user for name
 * @param {string} msg message received
 * @return {object} Message object for user
 */
function askName(msg) {
  if (isGreetings(msg)) {
    changeState();
    return createMessage(`Hi, there! Could you tell us your name?`);
  } else return errorMsg;
}

/**
 * Ask user for birth date
 * @param {*} msg message received
 * @return {object} Message object for user
 */
function askBirthData(msg) {
  senderName = msg;
  changeState();
  return createMessage(
      `Hi ${senderName}! When is your birth date? (YYYY-MM-DD)`,
  );
}

/**
 * Offers user to count the days
 * @param {*} msg message received
 * @return {object} Message object for user
 */
function askCountDays(msg) {
  try {
    const matchString = findDate.exec(msg);
    if (!matchString) {
      return createMessage('I can\'t find your birthdate');
    }

    const date = new Date(matchString[0]);
    if (date == 'Invalid Date') {
      return createMessage('Invalid Date :(');
    }

    changeState();
    senderDate = date;
    return createMessage(
        'Would you like to know how many days to your birthday?',
        quickReplies,
    );
  } catch (e) {
    return errorMsg;
  }
}

/**
 * Gives the number of days or say goodbye
 * @param {string} msg incoming message string
 * @return {object} message object
 */
function giveAnswerOrGoodbye(msg) {
  msg = msg.replace(/[\.!,]*$/, '');

  if (yess.includes(msg.toLowerCase())) {
    const now = new Date();
    const nearestBday = new Date(
        now.getFullYear() +
      (now.getMonth() > senderDate.getMonth() || (
        now.getMonth() == senderDate.getMonth() &&
        now.getDate() > senderDate.getDate()
      )),
        senderDate.getMonth(), senderDate.getDate(),
    );
    const diff = Math.ceil(
        (nearestBday.getTime() - now.getTime()) / (1000 * 3600 * 24));
    changeState();
    return createMessage(
        `There are ${diff} days left until your next birthday`,
    );
  } else if (nos.includes(msg.toLowerCase())) {
    changeState();
    return createMessage('Goodbye');
  }
  return errorMsg;
}

module.exports = {
  giveReply,
};
