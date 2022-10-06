import {Player} from '~/types/Player'
import {MainParams, AttackParams, DefendParams} from '~/types/PlayerParams'

export const getPlayersParamsMixin = {
  methods: {
    getAvgMainParams(players: Array<Player>): MainParams {
      const result: MainParams = {
        speed: 0,
        finishing: 0,
        tactics: 0,
        passing: 0,
        technics: 0,
        reactions: 0,
        defense: 0,
        tacticsInDefense: 0,
        physics: 0,
      }
      if (!players.length) return result
      result.speed = +(players.reduce((acc, p) => acc + p.speed, 0) / players.length).toFixed(1)
      result.finishing = +(players.reduce((acc, p) => acc + p.finishing, 0) / players.length).toFixed(1)
      result.tactics = +(players.reduce((acc, p) => acc + p.tactics, 0) / players.length).toFixed(1)
      result.passing = +(players.reduce((acc, p) => acc + p.passing, 0) / players.length).toFixed(1)
      result.technics = +(players.reduce((acc, p) => acc + p.technics, 0) / players.length).toFixed(1)
      result.reactions = +(players.reduce((acc, p) => acc + p.reactions, 0) / players.length).toFixed(1)
      result.defense = +(players.reduce((acc, p) => acc + p.defense, 0) / players.length).toFixed(1)
      result.tacticsInDefense = +(players.reduce((acc, p) => acc + p.tacticsInDefense, 0) / players.length).toFixed(1)
      result.physics = +(players.reduce((acc, p) => acc + p.physics, 0) / players.length).toFixed(1)
      return result
    },
    getAvgAttackParams(players: Array<Player>): AttackParams {
      const mainAttackParams = this.getAvgMainParams(players)
      const result: AttackParams = {
        speed: 0,
        finishing: 0,
        tactics: 0,
        passing: 0,
        technics: 0,
        reactions: 0,
        physics: 0
      };
      ['speed', 'finishing', 'tactics', 'passing', 'technics', 'reactions', 'physics'].forEach(param => {
        result[param as keyof AttackParams] = mainAttackParams[param as keyof MainParams]
      })
      return result
    },
    getAvgDefendParams(players: Array<Player>): DefendParams {
      const mainDefendParams = this.getAvgMainParams(players)
      const result: DefendParams = {
        speed: 0,
        defense: 0,
        tactics: 0,
        passing: 0,
        technics: 0,
        reactions: 0,
        physics: 0
      };
      ['speed', 'defense', 'tactics', 'passing', 'technics', 'reactions', 'physics'].forEach(param => {
        result[param as keyof DefendParams] = mainDefendParams[param as keyof MainParams]
      })
      return result
    },
    getOverallRating(players: Array<Player>): number {
      return Math.round(players.reduce((acc, player) => {
        return acc + player.overallRating
      }, 0) / players.length) / 10 || 0
    },
    getCreativity(players: Array<Player>): number {
      return players.reduce((acc, p) => {
        return acc + p.creativity
      }, 0)
    },
  }
}
