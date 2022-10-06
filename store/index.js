export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit({commit}, {app, req}) {
    try {
      // const response = await app.$axios.$get('/api/auth/refresh', {withCredentials: true})
      // commit('user/setAccessToken', response.accessToken)
      // commit('user/setIsLoggedIn', true)
      // commit('user/setUser', {
      //   userId: response.userId,
      //   name: response.name,
      //   email: response.email,
      //   roles: response.roles,
      //   subscribeUntil: response.subscribeUntil,
      // })
    } catch (e) {
    }
  },
}
