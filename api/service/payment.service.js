const paymentModel = require('../models/Payment')
const dbCounterService = require('../service/db-counter.service')
const crypto = require('node:crypto')
const userService = require('../service/user.service')
require('dotenv').config()

class paymentService {
  async createPaymentLink(userId, sum, type) {
    const id = await dbCounterService.getNextId('invId')
    const payment = await paymentModel.create({
      _id: id,
      user: userId,
      sum,
      type,
      creatingDate: Date.now(),
    })
    const receipt = {
      sno: 'usn_income',
      items: [{
        sum: sum,
        name: `Продление подписки на сервис expbet`,
        quantity: 1,
        payment_method: 'full_payment',
        payment_object: 'payment',
        tax: 'vat20',
      }]
    }
    const receiptString = JSON.stringify(receipt)
    const signature = crypto.createHash('md5').update(`expbet:${sum}:${id}:${receiptString}:${process.env.ROBOKASSA_PASS1}`).digest('hex')
    const link = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=expbet&InvId=${id}&OutSum=${sum}&Receipt=${receiptString}&SignatureValue=${signature}`
    return link
  }

  async validatePayment(paymentInfo) {
    const resultId = paymentInfo.InvId
    const resultSum = paymentInfo.OutSum
    const resultSignature = paymentInfo.SignatureValue
    const pass2 = process.env.ROBOKASSA_PASS2
    const signature = crypto.createHash('md5').update(`${resultSum}:${resultId}:${pass2}`).digest('hex').toUpperCase()
    if (resultSignature === signature) {
      return `OK${resultId}`
    }
    return false
  }

  async finishPayment(paymentId) {
    const payment = await paymentModel.findById(paymentId)
    if (payment.result !== 'success') {
      if (payment.type === 'full') {
        await userService.addSubscriptionMoths(payment.user, 1)
      }
      if (payment.type === 'short') {
        await userService.addSubscriptionDays(payment.user, 2)
      }
    }
    payment.resultDate = Date.now()
    payment.result = 'success'
    payment.save()
    return payment
  }
}

module.exports = new paymentService()
