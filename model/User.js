const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  nickname: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  last_activity: { type: Date, default: null },
  block_list: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  chats: [
    {
      chat: { type: Schema.Types.ObjectId, ref: 'chat' },
      clear_point: { type: Date, default: null }
    }
  ],
  dialogs: [{ type: Schema.Types.ObjectId, ref: 'dialog' }],
})
userSchema.index({
  first_name: 'text',
  last_name: 'text',
  nickname: 'text',
  email: 'text'
});
module.exports = mongoose.model('user', userSchema)