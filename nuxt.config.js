module.exports = {
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    title: 'hello-html2md',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'helloworld社区开发的轻量强大的html一键转md工具,支持多平台一键转换。' },
      { hid: 'keywords', name: 'keywords', content: 'javscript,html,markdown,vue,html-to-markdown,md,helloworld,helloworld开发者社区' },
      { name: 'renderer', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00A6F4' },

  /*
   ** Global CSS
   */
  css: [
    'assets/css/reset.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios',
    '@/plugins/element-ui',
    { src: '@/plugins/hw-editor', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/component-cache'
  ],
  /*
   ** axios modules
   ** https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true, // Can be also an object with default options
    credentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true, // 打包时用来分析依赖包包大小
    transpile: [],
    extractCSS: true, // 单独提取 css
    babel: {
      'plugins': [
        [
          'component',
          {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }
        ]
      ],
      'comments': true
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000, // 模块的最小体积
        // maxSize: 360000, // 模块的最大体积
        automaticNameDelimiter: '~', // 文件名的连接符
        name: true,
        cacheGroups: { // 缓存组
          styles: {
            test: /\.[css|less|scss|sass]/,
            chunks: 'all',
            priority: 30,
            enforce: true
          },
          'element-ui': {
            test: /node_modules[\\/]element-ui/,
            chunks: 'initial',
            priority: 20,
            name: true,
            enforce: true
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 10,
            enforce: true
          },
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true
          }
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend (config, { isDev, isClient }) {
      if (isClient && !isDev) {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
    }
  },
  server: {
    port: 3031, // default: 3000
    host: 'localhost' // default: localhost
  },
  env: {

  }
}
