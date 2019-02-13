const pkg = require('./package')
const env = require('dotenv').config()
module.exports = {
  mode: 'universal',
  env: {
    AXIOS_BASE_URL: process.env.AXIOS_BASE_URL,
    PUSHER_KEY: process.env.PUSHER_KEY,
    PUSHER_AUTH_ENDPOINT: process.env.PUSHER_AUTH_ENDPOINT,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER
  },
  // env: env.parsed,


  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css', integrity: 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/', crossorigin: 'anonymous' }
    ]
  },


  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#9EA700' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/modal.css',
    '~/assets/css/notifications.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/vue-js-modal',
    './plugins/vue-notification',
    './plugins/mixins/user.js',
    './plugins/mixins/validation.js',
    './plugins/axios.js',
    // { src: './plugins/pusher.js'}
  ],

  router: {
    middleware: [
      'clearValidationErrors'
    ]
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.AXIOS_BASE_URL
    // baseURL: 'https://healthlab-hhs.herokuapp.com/api'

    
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login', method: 'post', propertyName: 'access_token'
          },
          user: {
            url: 'me', method: 'get', propertyName: 'data'
          },
          logout: {
            url: 'logout', method: 'post'
          }
        }
      }
    },
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      home: '/',
     
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    
    }
  }
}
