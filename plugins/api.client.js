export default function ({$axios}, inject) {
  const api = $axios.create({
    withCredentials: true,
    headers: {
      common: {
        Accept: 'text/plain, */*',
      }
    }
  })
  api.baseURL = process.env.API_URL
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
  })
  api.interceptors.response.use((config) => {
    return config
  }, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await this.$axios.$get('/api/auth/refresh', {withCredentials: true})
        localStorage.setItem('accessToken', response.accessToken)
        return api.request(originalRequest)
      } catch (e) {
        console.log(e)
      }
    }
    throw error
  })
  inject('api', api)
}
