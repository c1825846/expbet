export const state = () => ({
  leagues: [],
  team1SelectedLeague: null,
  team2SelectedLeague: null,
  team1Teams: [],
  team2Teams: [],
  team1SelectedTeam: null,
  team2SelectedTeam: null,
  team1Players: [],
  team2Players: [],
  team1SelectedPlayers: [],
  team2SelectedPlayers: [],
})

export const getters = {
  leagues: s => s.leagues,
  teamSelectedLeague: s => team => s[`team${team}SelectedLeague`],
  teamTeams: s => team => s[`team${team}Teams`],
  teamSelectedTeam: s => team => s[`team${team}SelectedTeam`],
  teamPlayers: s => team => s[`team${team}Players`],
  teamSelectedPlayers: s => team => s[`team${team}SelectedPlayers`],
  teamSelectedPlayersWithoutGoalkeepers: s => team => s[`team${team}SelectedPlayers`].filter(p => p.position !== 'Goalkeeper'),
  teamForwards: s => team => {
    const forwards = ['Centre-Forward', 'Second Striker', 'Right Winger', 'Left Winger']
    return s[`team${team}SelectedPlayers`].filter(p => forwards.includes(p.position))
  },
  teamMidfielders: s => team => {
    const midfielders = ['Attacking Midfield', 'Left Midfield', 'Right Midfield', 'Central Midfield', 'Defensive Midfield']
    return s[`team${team}SelectedPlayers`].filter(p => midfielders.includes(p.position))
  },
  teamDefenders: s => team => {
    const defenders = ['Right-Back', 'Left-Back', 'Centre-Back']
    return s[`team${team}SelectedPlayers`].filter(p => defenders.includes(p.position))
  },
}

export const mutations = {
  setLeagues: (state, leagues) => {
    state.leagues = leagues.map(l => {
      return {
        _id: l._id,
        name: `${l.country} - ${l.name}`,
      }
    })
  },
  setTeamSelectedLeague: (state, {team, league}) => {
    state[`team${team}SelectedLeague`] = league
  },
  setTeamTeams: (state, {team, teams}) => {
    state[`team${team}Teams`] = teams
  },
  setTeamSelectedTeam: (state, {team, teamId}) => {
    state[`team${team}SelectedTeam`] = teamId
  },
  setTeamPlayers: (state, {team, players}) => {
    state[`team${team}Players`] = players
  },
  setTeamSelectedPlayers: (state, {team, players}) => {
    state[`team${team}SelectedPlayers`] = players.filter(p => {
      return p.overallRating
    })
  },
}

export const actions = {
  async fetchLeagues({commit}) {
    const leagues = await this.$axios.$get('/api/leagues-ids')
    commit('setLeagues', leagues)
  },
  async fetchTeams({commit}, {team, leagueId}) {
    const teams = await this.$axios.$get(`/api/teams-in-league/${leagueId}`)
    commit(`setTeamTeams`, {team, teams})
  },
  async fetchPlayers({commit}, {team, teamId}) {
    const players = await this.$axios.$get(`/api/players-in-team/${teamId}`)
    commit(`setTeamPlayers`, {team, players})
    commit(`setTeamSelectedPlayers`, {team, players})
  }
}
