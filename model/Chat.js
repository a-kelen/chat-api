const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  avatar: { type: String, default: null },
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
  block_list: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('chat', schema);