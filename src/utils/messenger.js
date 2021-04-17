// Bot State
// 0 - Reply after receiving greeting
// 1 - Reply after receiving name
// 2 - Reply after receiving birth_date
// 3 - Reply after receiving yes/no
var state = 0
var sender_name = ''
const errorMsg = 'I\'m sorry, I can\'t seem to identify your message :('
const greetings = ['hi', 'hello', 'hai', 'hallo', 'halo', 'greetings', 'helo']

const changeState = function() {
  state++
  state %= 3
}

const giveReply = function(msg) {
  switch(state) {
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

function askName(msg) {
  var temp = msg
  temp.replace(/[\.!,]*$/, '')
  
  if(greetings.includes(temp)) {
    changeState()
    return `Hi, there! Could you tell us your name`
  }
  else return errorMsg
}

function askBirthData(msg) {
  changeState()
  return 'Birthday'
}

function askCountDays(msg) {
  changeState()
  return 'Days'
}

function giveAnswerOrGoodbye(msg) {
  changeState()
  return 'Goodbye'
}

module.exports = {
  giveReply
}