import pkg from './package';

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? '/weather/' : '/';

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Weather',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: `${routerBase}LightCloud.png` },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Raleway:wght@500;700&display=swap',
      },
    ],
  },

  router: {
    base: routerBase,
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '##e7e7eb', continuous: true },

  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    headers: { 'X-Requested-With': 'http://localhost:3000' },
  },

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
