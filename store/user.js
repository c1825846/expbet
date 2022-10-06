export const state = () => ({
  user: {},
  isLoggedIn: false,
  accessToken: '',
})

export const getters = {
  user: state => {
    return state.user
  },
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  isAdmin: state => {
    return state.user?.roles?.map(r => r.name).includes('admin')
  },
  isModerator: state => {
    return state.user?.roles?.map(r => r.name).includes('moderator')
  },
  accessToken: state => {
    return state.accessToken
  },
  isSubscriptionActive: state => {
    const subscribeUntil = new Date(state.user.subscribeUntil)
    return subscribeUntil > Date.now()
  }
}

export const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setIsLoggedIn: (state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn
  },
  setAccessToken: (state, accessToken) => {
    state.accessToken = accessToken
  },

}

export const actions = {
  async login({commit}, loginData) {
    try {
      const response = await this.$api.$post('/api/auth/login', loginData)
      localStorage.setItem('accessToken', response.accessToken)
      commit('setAccessToken', response.accessToken)
      commit('setIsLoggedIn', true)
      commit('setUser', {
        userId: response.userId,
        name: response.name,
        email: response.email,
        roles: response.roles,
        subscribeUntil: response.subscribeUntil,
      })
      await this.$router.push('/')
    } catch (e) {
      console.log('Something during login went wrong')
    }
  },
  async registration({commit}, {registrationData, ref}) {
    try {
      const url = ref ? `/api/auth/registration?ref=${ref}` : '/api/auth/registration'
      const response = await this.$api.$post(url, registrationData)
      localStorage.setItem('accessToken', response.accessToken)
      commit('setAccessToken', response.accessToken)
      commit('setIsLoggedIn', true)
      commit('setUser', {
        userId: response.userId,
        name: response.name,
        email: response.email,
        roles: response.roles,
        subscribeUntil: response.subscribeUntil,
      })
      await this.$router.push('/')
    } catch (e) {
      console.log(e)
    }
  },
  async logout({commit}) {
    try {
      await this.$api.$post('/api/auth/logout')
      commit('setUser', {})
      commit('setIsLoggedIn', false)
      localStorage.removeItem('accessToken')
      commit('setAccessToken', '')
      await this.$router.push('/login')
    } catch (e) {

    }
  },
  async checkAuth({commit}) {
    try {
      const response = await this.$axios.$get('/api/auth/refresh', {withCredentials: true})
      localStorage.setItem('accessToken', response.accessToken)
      commit('setAccessToken', response.accessToken)
      commit('setIsLoggedIn', true)
      commit('setUser', {
        userId: response.userId,
        name: response.name,
        email: response.email,
        roles: response.roles,
        subscribeUntil: response.subscribeUntil,
      })
    } catch (e) {

    }
  }
}
