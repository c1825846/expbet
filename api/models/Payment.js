const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  _id: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sum: String,
  type: String,
  creatingDate: Date,
  resultDate: Date,
  result: '',
})

module.exports = mongoose.model('Payment', schema)
