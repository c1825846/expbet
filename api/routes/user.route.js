const Router = require('express').Router
const UserController = require('../controllers/user.controller')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/me', authMiddleware.isAuthorized, UserController.me)
router.get('/all', authMiddleware.isModerator, UserController.all)
router.delete('/:id', authMiddleware.isModerator, UserController.delete)

module.exports = router
