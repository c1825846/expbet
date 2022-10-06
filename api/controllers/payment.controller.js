const paymentService = require('../service/payment.service')
const userService = require('../service/user.service')
const tokenService = require('../service/token.service')

class paymentController {
  async getFullSubscriptionLink(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      const userData = await tokenService.validateAccessToken(accessToken)
      const userId = userData.userId
      const link = await paymentService.createPaymentLink(userId, '3000', 'full')
      res.json({link: link})
    } catch (e) {
      next(e)
    }
  }

  async getShortSubscriptionLink(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      const userData = await tokenService.validateAccessToken(accessToken)
      const userId = userData.userId
      const link = await paymentService.createPaymentLink(userId, '300', 'short')
      res.json({link: link})
    } catch (e) {
      next(e)
    }
  }

  async handleResult(req, res, next) {
    try {
      const paymentInfo = req.body
      const paymentValidation = paymentService.validatePayment(paymentInfo)
      if (!paymentValidation) {
        return res.status(412).json({message: 'bad sign'})
      }
      const payment = await paymentService.finishPayment(paymentInfo.InvId)
      res.send(`OK${paymentInfo.InvId}`)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new paymentController
