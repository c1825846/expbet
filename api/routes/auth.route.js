const Router = require('express').Router
const UserController = require('../controllers/user.controller')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/registration',
  body('name').isLength({min: 4, max: 64}),
  body('email').isEmail(),
  body('password').isLength({min: 8, max: 64}),
  UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

module.exports = router
