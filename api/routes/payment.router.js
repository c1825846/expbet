const Router = require('express').Router
const router = new Router()
const paymentController = require('../controllers/payment.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/full-subscription', authMiddleware.isAuthorized, paymentController.getFullSubscriptionLink)
router.get('/short-subscription', authMiddleware.isAuthorized, paymentController.getShortSubscriptionLink)
router.post('/result', paymentController.handleResult)

module.exports = router
