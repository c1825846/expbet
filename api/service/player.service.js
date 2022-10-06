const playerModel = require('../models/Player')

class PlayerService{
  async updatePlayer(playerId, playerData) {
    const player = await playerModel.findById(playerId)
    Object.keys(playerData).forEach(key => {
      player[key] = playerData[key]
    })
    await player.save()
  }
}

module.exports = new PlayerService()
