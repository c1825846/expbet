const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refCode: {
    type: String,
    required: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
  }],
  registrationDate: Date,
  lastLoginDate: Date,
  lastOnlineDate: Date,
  subscribeUntil: Date,
  balance: Number,
  invitedUsersCounter: Number,
  invitingUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isMadeFirstPayment: Boolean,
  specialPercent: Number,
})

module.exports = mongoose.model('User', schema)
