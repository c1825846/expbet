const ApiError = require('../exceptions/api.error')
const tokenService = require('../service/token.service')

class AuthMiddleware {
  isAuthorized(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError())
      }
      const accessToken = authorizationHeader.split(' ')[1]
      if (!accessToken) {
        return next(ApiError.UnauthorizedError())
      }
      const userData = tokenService.validateAccessToken(accessToken)
      if (!userData) {
        return next(ApiError.UnauthorizedError())
      }
      req.user = userData
      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }

  isAdmin(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError())
      }
      const accessToken = authorizationHeader.split(' ')[1]
      if (!accessToken) {
        return next(ApiError.UnauthorizedError())
      }
      const userData = tokenService.validateAccessToken(accessToken)
      if (!userData) {
        return next(ApiError.UnauthorizedError())
      }
      req.user = userData
      if (!req.user.roles.map(r => r.name).includes('admin')) {
        return next(ApiError.UnauthorizedError())
      }
      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }

  isModerator(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError())
      }
      const accessToken = authorizationHeader.split(' ')[1]
      if (!accessToken) {
        return next(ApiError.UnauthorizedError())
      }
      const userData = tokenService.validateAccessToken(accessToken)
      if (!userData) {
        return next(ApiError.UnauthorizedError())
      }
      req.user = userData
      if (!req.user.roles.map(r => r.name).includes('moderator')) {
        return next(ApiError.UnauthorizedError())
      }
      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }

  isBlogger(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError())
      }
      const accessToken = authorizationHeader.split(' ')[1]
      if (!accessToken) {
        return next(ApiError.UnauthorizedError())
      }
      const userData = tokenService.validateAccessToken(accessToken)
      if (!userData) {
        return next(ApiError.UnauthorizedError())
      }
      req.user = userData
      if (!req.user.roles.map(r => r.name).includes('blogger')) {
        return next(ApiError.UnauthorizedError())
      }
      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }
}

module.exports = new AuthMiddleware()
