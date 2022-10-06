export default function ({$axios, req}, inject) {
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
    let cookies = {}
    req.headers['cookie']?.split(';')?.forEach(cookie => {
      cookies[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim()
    })
    config.headers.Authorization = `Bearer ${cookies.accessToken}`
    // config.headers.Authorization = cookies.accessToken
    return config
  })
  inject('api', api)
}
