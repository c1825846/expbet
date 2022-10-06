export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Expbet - Разбор футбольных матчей',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Expbet - инструмент для прогнозирования футбольных матчей на основе тактико-технических показателях команды. Ежедневные прогнозы на футбол. Разбор матчей по составам команд.'},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/style.scss'
  ],
  styleResources: {
    scss: ['./assets/css/*.scss']
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.client.js',
    '~/plugins/api.server.js',
    '~/plugins/gtag.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modulescss
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/yandex-metrika',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'https://expbetsoft.com',
    baseURL: 'http://localhost/api',
  },

  serverMiddleware: [
    {path: "/api", handler: "~/api"},
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru-RU'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  yandexMetrika: {
    id: '89838650',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  },
}
