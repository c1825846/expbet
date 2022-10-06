const userService = require('../service/user.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const {name, email, password} = req.body
      const ref = req.query.ref
      const userData = await userService.registration(name, email, password, ref)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      res.json({message: 'ok'})
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      console.log(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: false,
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async me(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      const userData = await userService.userInfo(accessToken)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async all(req, res, next) {
    try {
      const users = await userService.getAll()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const users = await userService.delete(req.params.id)
      return res.json({message: 'user deleted'})
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
