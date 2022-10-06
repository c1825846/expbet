const userModel = require('../models/User')
const postModel = require('../models/Post')
const postGroupModel = require('../models/PostGroup')
const ApiError = require('../exceptions/api.error')

class PostService {
  async getAll(group, skip, limit) {
    if (!!group){
      return postModel.find({group}).sort({createdDate: -1}).skip(skip).limit(limit)
    }
    return postModel.find({}).sort({createdDate: -1}).skip(skip).limit(limit)
  }

  async getByGroup(groupId) {
    return postModel.find({group: groupId}).sort({createdDate: -1})
  }

  async get(id) {
    return postModel.findById(id)
  }

  async create(postData) {
    return postModel.create(postData)
  }

  async update(id, postData) {
    const post = await postModel.findById(id)
    post.title = postData.title
    post.description = postData.description
    post.text = postData.text
    post.imagePath = postData.imagePath
    post.tags = postData.tags
    post.updatedDate = Date.now()
    post.group = postData.group
    await post.save()
    return post
  }

  async delete(id) {
    await postModel.deleteOne({_id: id})
    return true
  }

  async getAllGroups() {
    return postGroupModel.find({})
  }

  async createGroup(groupData) {
    return postGroupModel.create(groupData)
  }

  async deleteGroup(id) {
    const postsInGroup = await postModel.find({group: id})
    if (postsInGroup.length) {
      throw ApiError.BadRequest('some posts use this group')
    }
    await postGroupModel.deleteOne({_id: id})
    return true
  }
}

module.exports = new PostService()
