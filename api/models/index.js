const mongoose = require('mongoose')
const db = {}
db.mongoose = mongoose
db.league = require('League')
db.team = require('Team')
db.player = require('Player')
db.user = require('User')
db.role = require('Role')
db.roles = ['user', 'moderator', 'admin']

module.exports = db
