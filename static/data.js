// Runtime storage
let id = 0;
module.exports.data = [];

// Appends a new log
module.exports.push = function(idSender, msg) {
  this.data.push({
    id_msg: id,
    id_sender: idSender,
    message: msg,
  });
  id++;
};

// Find a chat log
module.exports.find = function(id) {
  return this.data.find((msg) => msg.id_msg == id);
};

// Deletes a chat log
module.exports.pop = function(id) {
  const old = this.data.length;
  this.data = this.data.filter(function(msg) {
    return msg.id_msg != id;
  });
  return this.data.length != old;
};
