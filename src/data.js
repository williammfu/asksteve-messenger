// Runtime storage
var id = 0
module.exports.data = []

// Appends a new log
module.exports.push = function(id_sender, msg) {
  this.data.push({
    id_msg: id,
    id_sender: id_sender,
    message: msg
  })
  id++
}

// Find a chat log
module.exports.find = function(id) { 
  return this.data.find(msg => msg.id_msg == id)
}

// Deletes a chat log
module.exports.pop = function(id) { 
  let old = this.data.length
  this.data = this.data.filter(function(msg) {
    return msg.id_msg != id
  })
  return this.data.length != old
}