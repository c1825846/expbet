const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const schema = new Schema({
  name: String,
  tLink: String,
  sLink: String,
  team: {
    type: ObjectId,
    ref: 'Team',
  },
  number: String,
  position: String,
  nationality: [String],
  age: String,
  overallRating: Number,
  marketValue: String,
  specialities: [String],
  speed: Number,
  finishing: Number,
  tactics: Number,
  passing: Number,
  technics: Number,
  reactions: Number,
  defense: Number,
  tacticsInDefense: Number,
  physics: Number,
  creativity: Number,
  goalkeeping: {
    gKDiving: Number,
    gKHandling: Number,
    gKKicking: Number,
    gKPositioning: Number,
    gKReflexes: Number,
  },
})

module.exports = mongoose.model('Player', schema)
