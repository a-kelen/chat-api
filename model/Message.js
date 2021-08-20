const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema({
  text: { type: String, default: null },
  date: { type: Date, default: null },
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  chat: { type: Schema.Types.ObjectId, ref: 'chat' },
  replay: { type: Schema.Types.ObjectId, ref: 'message' }
})

module.exports = mongoose.model('message', schema)