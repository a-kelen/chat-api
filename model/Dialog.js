const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema({
  left_user: { type: mongoose.Types.ObjectId, ref: 'user' },
  right_user: { type: mongoose.Types.ObjectId, ref: 'user' },
  clear_point: { type: Date, default: null }
})

module.exports = mongoose.model('dialog', schema)