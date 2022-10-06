const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  createdDate: Date,
  updatedDate: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [String],
  group: {
    type: Schema.Types.ObjectId,
    ref: 'PostGroup',
  }
})

module.exports = mongoose.model('Post', schema)
