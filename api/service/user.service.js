const userModel = require('../models/User')
const roleModel = require('../models/Role')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const tokenService = require('./token.service')
const ApiError = require('../exceptions/api.error')

class UserService {
  async registration(name, email, password, ref) {
    const candidate = await userModel.findOne({$or: [{email}, {name}]})
    if (candidate) {
      throw ApiError.BadRequest(`Email ${email} already in use`)
    }
    const invitingUser = await userModel.findOne({refCode: ref})
    const refCode = uuid.v4()
    const user = await userModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, 7),
      refCode,
      roles: [],
      registrationDate: Date.now(),
      balance: 0,
      invitingUser,
      invitedUsersCounter: 0,
      totalInvitedUsers: 0,
    })
    const tokens = tokenService.generateTokens({
      userId: user._id,
      name: user.name,
      email,
      roles: user.roles,
      subscribeUntil: user.subscribeUntil,
    })
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens,
      userId: user._id,
      name: user.name,
      email,
      roles: user.roles,
      subscribeUntil: user.subscribeUntil,
    }
  }

  async activate(activationLink) {
    const user = await userModel.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequest('User does not exist')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await userModel.findOne({email}).populate('roles')
    if (!user) {
      throw ApiError.BadRequest('User not found')
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
      throw ApiError.BadRequest('Wrong password')
    }
    user.lastLoginDate = Date.now()
    await user.save()
    const tokens = await tokenService.generateTokens({
      userId: user._id,
      name: user.name,
      email,
      roles: user.roles,
      subscribeUntil: user.subscribeUntil,
    })
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens,
      userId: user._id,
      name: user.name,
      email,
      roles: user.roles,
      subscribeUntil: user.subscribeUntil,
    }
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken)
    return true
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const constTokenFromDB = await tokenService.findToken(refreshToken)
    if (!userData || !constTokenFromDB) {
      throw ApiError.UnauthorizedError()
    }
    const user = await userModel.findById(userData.userId).populate('roles', '-__v')
    const tokens = await tokenService.generateTokens({
      userId: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      subscribeUntil: user.subscribeUntil,
    })
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens,
      userId: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      subscribeUntil: user.subscribeUntil,
    }
  }

  async userInfo(accessToken){
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      throw ApiError.UnauthorizedError()
    }
    const user = await userModel.findById(userData.userId).populate('roles', '-__v')
    return {
      name: user.name,
      email: user.email,
      refCode: user.refCode,
      subscribeUntil: user.subscribeUntil,
    }
  }

  async getAll() {
    const users = await userModel.find({})
    return users
  }

  async delete(id) {
    await userModel.deleteOne({_id: id})
    return true
  }

  async addSubscriptionMoths(userId, months) {
    const user = await userModel.findById(userId)
    if (!user.subscribeUntil || user.subscribeUntil < Date.now()){
      const newSubscribeUntil = new Date()
      newSubscribeUntil.setMonth(newSubscribeUntil.getMonth() + months)
      user.subscribeUntil = newSubscribeUntil
    } else {
      const userSubscribeUntil = new Date(user.subscribeUntil)
      userSubscribeUntil.setMonth(userSubscribeUntil.getMonth() + months)
      user.subscribeUntil = userSubscribeUntil
    }
    await user.save()
    return user
  }

  async addSubscriptionDays(userId, days) {
    const user = await userModel.findById(userId)
    if (!user.subscribeUntil || user.subscribeUntil < Date.now()){
      const newSubscribeUntil = new Date()
      newSubscribeUntil.setDate(newSubscribeUntil.getDate() + days)
      user.subscribeUntil = newSubscribeUntil
    } else {
      const userSubscribeUntil = new Date(user.subscribeUntil)
      userSubscribeUntil.setDate(userSubscribeUntil.getDate() + days)
      user.subscribeUntil = userSubscribeUntil
    }
    await user.save()
    return user
  }
}

module.exports = new UserService()
