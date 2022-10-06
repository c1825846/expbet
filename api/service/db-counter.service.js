const counterModel = require('../models/Counter')

class dbCounterService {
  async getNextId(name){
    const ret = await counterModel.findByIdAndUpdate(name, {$inc: {seq: 1}}, {new: true})
    return ret.seq
  }
}

module.exports = new dbCounterService()
