const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tLink: {
    type: String,
  },
  sLink: {
    type: String,
  },
  league:{
    type: Schema.Types.ObjectId,
    ref: 'League',
  },
  isNationalTeam: Boolean,
  defensiveStyle: String,
  buildUpPlay: String,
  chanceCreation: String,
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }]
})

module.exports = mongoose.model('Team', schema)
