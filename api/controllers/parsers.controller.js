const sofifaParser = require('../parsers/SofifaParser')
const playerService = require('../service/player.service')

class ParsersController {
  async parseSPlayer(req, res, next) {
    try {
      const {playerId, sLink} = req.body
      const playerData = await sofifaParser.parsePlayer(sLink)
      await playerService.updatePlayer(playerId, playerData)
      res.json({message: 'ok'})
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new ParsersController()
