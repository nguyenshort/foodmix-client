export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'foodmix-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      {
        src: 'https://connect.facebook.net/en_US/sdk.js',
        async: true,
        crossorigin: "anonymous"
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,500,600,700'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Merriweather:700,400,400'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    { src: '~/plugins/fb_sdk.js', ssr: false },
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/vue-observe-visibility.js', ssr: false },
    { src: '~/plugins/lottie.js', ssr: false },
    { src: '~/plugins/vue-cropperjs.js', ssr: false },
    { src: '~/plugins/cdn.js', ssr: true },
    // { src: '~/plugins/vue-content-loader.js', ssr: false }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '~/components', pathPrefix: false }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    'nuxt-lazysizes',
    ['@nuxtjs/dotenv', { filename: '.env' }],
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      solid: [
        'faSearch',
        'faLongArrowAltRight',
        'faStar',
        'faSortDown',
        'faShareAlt',
        'faPrint',
        'faPlus',
        'faMinus',
        'faCheck',
        'faCommentDots',
        'faUtensils',
        'faTimes',
        'faBookmark',
        'faMobileAlt',
        'faTrashAlt',
        'faClock',
        'faCloudUploadAlt',
        'faUser',
        'faKey',
        'faUndo',
        'faCalendarAlt',
        'faMapMarkerAlt',
        'faDrumstickBite'
      ],
      regular: ['faStar']
    }
  },

  lazySizes: {
    /* module options */
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.forEach((route, index) => {
        if (route.name === 'food') {
          route.path = '/recipe/:slug'
        } else if (route.name === 'category') {
          route.path = '/category/:slug'
        } else if(route.name === 'profile') {
          route.path = '/profile/:slug'
        }
      })
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL
  },
  moment: {
    defaultLocale: 'vi',
    locales: ['vi']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
