const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: String,
  tLink: String,
  sLink: String,
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }]
})

module.exports = mongoose.model('League', schema)
