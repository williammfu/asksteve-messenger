// Runtime storage
var id = 0
module.exports.data = []
module.exports.push = function(id_sender, msg) {
  this.data.push({
    id_msg: id,
    id_sender: id_sender,
    message: msg
  })
  id++
}
module.exports.pop = function(id) { 
  this.data.filter(function(msg) {
    return msg.id_msg != id
  })
}