import colors from 'vuetify/es5/util/colors'

export default {


  head: {
    script:[{
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      'data-ad-client': 'ca-pub-4611061654102600',
      async: true
    }],
    router: { base: '/InfinitTermoo/' },
    target: 'static', 
    titleTemplate: '%s - InfinitTermoo',
    title: 'InfinitTermoo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=450, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify','@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  fontawesome: {
    icons:{
     solid:true,
     brands:true
    }
   },

}
