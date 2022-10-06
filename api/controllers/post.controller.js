const postService = require('../service/post.service')
const userService = require('../service/user.service')
const tokenService = require('../service/token.service')

class PostController {
  async get(req, res, next) {
    try {
      const post = await postService.get(req.params.id)
      res.json(post)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req, res, next) {
    try {
      const groupId = req.query.group
      const skip = req.query.skip
      const limit = req.query.limit
      const posts = await postService.getAll(groupId, skip, limit)
      res.json(posts)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const userData = await tokenService.validateAccessToken(token)
      const postData = req.body.post
      postData.createdDate = Date.now()
      postData.author = userData.userId
      const post = await postService.create(postData)
      res.json(post)
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const post = await postService.update(req.params.id, req.body.post)
      res.json({post})
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      await postService.delete(req.params.id)
      res.json({message: 'post deleted'})
    } catch (e) {
      next(e)
    }
  }

  async getAllGroups(req, res, next) {
    try {
      const groups = await postService.getAllGroups()
      res.json(groups)
    } catch (e) {
      next(e)
    }
  }

  async createGroup(req, res, next) {
    try {
      const name = req.body.name
      const group = await postService.createGroup({name})
      res.json(group)
    } catch (e) {
      next(e)
    }
  }

  async deleteGroup(req, res, next) {
    try {
      await postService.deleteGroup(req.params.id)
      res.json({message: 'post deleted'})
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new PostController()
