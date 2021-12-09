export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FoodMix - Thích Thì Nấu',
    htmlAttrs: {
      lang: 'vi'
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

      {
        rel: 'shortcut icon',
        href: '/favicon/favicon.ico'
      },
      // For new browsers - multisize ico
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '16x16 32x32',
        href: '/favicon/favicon.ico'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/favicon/favicon-152-precomposed.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/favicon/favicon-144-precomposed.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/favicon/favicon-120-precomposed.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/favicon/favicon-114-precomposed.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/favicon-180-precomposed.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/favicon/favicon-72-precomposed.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/favicon/favicon-57.png'
      },
      {
        rel: 'icon',
        sizes: '192x192',
        href: '/favicon/favicon-192.png'
      },
      {
        rel: 'manifest',
        href: '/favicon/manifest.json'
      },

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
  pageTransition: {
    mode: "in-out"
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    { src: '~/plugins/fb_sdk.js', ssr: false },
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/vue-observe-visibility.js', ssr: false },
    { src: '~/plugins/lottie.js', ssr: false },
    { src: '~/plugins/vue-cropperjs.js', ssr: false },
    { src: '~/plugins/cdn.js', ssr: true },
    // { src: '~/plugins/vue-flip-toolkit.js', ssr: false }

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
    '@nuxtjs/moment',
    'nuxt-animejs'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'portal-vue/nuxt'
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
        'faDrumstickBite',
        'faChevronLeft',
        'faPen',
        'faExternalLinkAlt',
        'faHeart',
        // 'faHome',
        'faLock'
      ],
      regular: ['faStar', 'faEnvelope', 'faUser']
    }
  },

  lazySizes: {
    /* module options */
  },

  mq: {
    defaultBreakpoint: 'sm',
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': Infinity
    }
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
  },

  server: {
    port: process.env.PORT, // default: 3000
    host: 'localhost', // default: localhost,
    timing: false
  },

  globals: {
    id: '__foodmix', // replacing __nuxt
  }
}
