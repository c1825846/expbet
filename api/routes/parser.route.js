const Router = require('express').Router
const router = new Router()
const parserController = require('../controllers/parsers.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/parse-s-player', authMiddleware.isAdmin, parserController.parseSPlayer)

module.exports = router
