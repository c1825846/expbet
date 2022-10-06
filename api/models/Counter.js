const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  _id: {
    type: String,
  },
  seq: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Counter', schema)
