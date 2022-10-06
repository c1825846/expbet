const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('node:path')
require('dotenv').config()

const Team = require('./models/Team')
const Player = require('./models/Player')
const League = require('./models/League')

const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')
const postRouter = require('./routes/post.route')
const paymentRouter = require('./routes/payment.router')
const parserRouter = require('./routes/parser.route')
const errorMiddleware = require('./middlewares/error.middleware')

const authMiddleware = require('./middlewares/auth.middleware')

app = express()

mongoose.connect(process.env.DBURI, err => {
  if (err) throw err
  console.log(`Database connected`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
  credentials: true,
}))
app.use(fileUpload())

app.get('/teams-in-league/:league', async (req, res) => {
  const teams = await Team.find({league: req.params.league}).select({name: 1, _id: 1, tLink: 1})
  res.json(teams)
})

app.get('/leagues-ids', async (req, res) => {
  const leagues = await League.find({}).select({name: 1, country: 1, _id: 1})
  res.json(leagues)
})

app.get('/team/:id', async (req, res) => {
  const team = await Team.findOne({_id: req.params.id}).populate('league').populate({
    path: 'players',
    select: {sLink: 0, __v: 0, goalkeeping: 0}
  })
  res.json(team)
})

app.get('/players-in-team/:team', async (req, res) => {
  const players = await Player.find({team: req.params.team}).select({sLink: 0, __v: 0, goalkeeping: 0})
  res.json(players)
})

app.get('/teams/:q?', async (req, res) => {
  const teams = req.params.q ? await Team.find({
    $and: [{
      name: {
        $regex: `.*${req.params.q}.*`,
        $options: 'i'
      },
    }, {
      league: req.query.league
    }]
  }).select({name: 1, _id: 1}).limit(25) : await Team.find({}).limit(25)
  res.json(teams)
})

app.get('/league/:id', async (req, res) => {
  const league = await League.findOne({_id: req.params.id})
  res.json(league)
})

app.get('/players/:q?', async (req, res) => {
  const players = req.params.q ? await Player.find({
    $or: [{
      fullName: {
        $regex: `.*${req.params.q}.*`,
        $options: 'i'
      }
    }, {
      name: {
        $regex: `.*${req.params.q}.*`,
        $options: 'i'
      }
    }],

  }).limit(25) : await Player.find({}).limit(25)
  res.json(players)
})

app.post('/upload', authMiddleware.isBlogger, (req, res) => {
  if (!req.files) {
    return res.status(500).json({message: 'file not found'})
  }
  const file = req.files.file
  file.mv(path.join(__dirname, '../static/uploads/', file.name), err => {
    if (err) {
      return res.status(500).json({message: 'file uploading error'})
    }
    res.json({filePath: file.name})
  })
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/payment', paymentRouter)
app.use('/parser', parserRouter)
app.use(errorMiddleware)

module.exports = app
