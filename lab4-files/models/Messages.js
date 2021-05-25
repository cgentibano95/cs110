const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messages = new Schema({
  room_id:{
    type: String
  },
  message: {
    type: String,
    required: true
  },
  user: {
    type: String,
  },
  date:{
    type: String,
    default: new Date()
  }

});

module.exports = Item = mongoose.model('message', Messages);