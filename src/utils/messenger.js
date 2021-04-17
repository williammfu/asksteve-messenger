// Bot State
// 0 - Reply after receiving greeting
// 1 - Reply after receiving name
// 2 - Reply after receiving birth_date
// 3 - Reply after receiving yes/no
var state = 0
var senderName = ''
var senderDate = null

// Constants
const errorMsg = {
  text: 'I\'m sorry, I can\'t seem to identify your message :('
}
const quickReplies = [
  {
    "content_type": "text",
    "title": "Yes",
    "payload": "Yes"
  },
  {
    "content_type": "text",
    "title": "No",
    "payload": "No"
  }
]
const greetings = ['hi', 'hello', 'hai', 'hallo', 'halo', 'greetings', 'helo']
const yess = ['yea', 'yeah', 'yes', 'yah', 'yep', 'yup', 'of course', 'okay']
const nos = ['no', 'nah', 'nope', 'nae', 'naw', 'nay', 'no, thanks']
const findDate = /\d{4}([\/./-])\d{2}\1\d{2}/

const changeState = function () {
  state++
  state %= 4
}

const giveReply = function (msg) {
  switch (state) {
    case 0:
      return askName(msg)
    case 1:
      return askBirthData(msg)
    case 2:
      return askCountDays(msg)
    case 3:
      return giveAnswerOrGoodbye(msg)
  }
}

function createMessage(text, quickReply = null) {
  if (quickReply)
    return {
      text: text,
      quick_replies: quickReply
    }

  return {
    text: text
  }
}

function askName(msg) {
  var temp = msg
  temp = temp.replace(/[\.!,]*$/, '')

  if (greetings.includes(temp)) {
    changeState()
    return createMessage(`Hi, there! Could you tell us your name?`)
  }
  else return errorMsg
}

function askBirthData(msg) {
  senderName = msg
  changeState()
  return createMessage(`Hi ${senderName}! When is your birth date? (YYYY-MM-DD)`)
}

function askCountDays(msg) {
  try {
    let matchString = findDate.exec(msg)
    if (!matchString)
      return createMessage('I can\'t find your birthdate')

    let date = new Date(matchString[0])
    if (date == 'Invalid Date')
      return createMessage('Invalid Date :(')

    changeState()
    senderDate = date
    return createMessage(
      'Would you like to know how many days to your birthday?',
      quickReplies
    )

  } catch (e) {
    return errorMsg
  }
}

function giveAnswerOrGoodbye(msg) {
  console.log(msg)
  msg = msg.replace(/[\.!,]*$/, '')

  if (yess.includes(msg.toLowerCase())) {
    let now = new Date()
    let nearestBday = new Date(
      now.getFullYear() +
      (now.getMonth() > senderDate.getMonth() || (
        now.getMonth() == senderDate.getMonth() && now.getDate() > senderDate.getDate()
      )),
      senderDate.getMonth(), senderDate.getDate()
    )

    let diff = Math.ceil((nearestBday.getTime() - now.getTime()) / (1000 * 3600 * 24))
    changeState()
    return createMessage(`There are ${diff} days left until your next birthday`)

  } else if (nos.includes(msg.toLowerCase())) {
    changeState()
    return createMessage('Goodbye')

  }
  return errorMsg
}

module.exports = {
  giveReply
}