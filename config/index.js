// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    // assetsCdnPublicPath: 'http://10.200.5.119:8099/h5',
    assetsCdnPublicPath: 'http://1s960h2139.51mypc.cn/h5',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: true,
    basePath: path.resolve(__dirname, '../busi'),
    commonResource: {
      js: [
        '//pics.lvjs.com.cn/mobile/lib/vue/vue-router.2.7.0.min.js',
        '//pics.lvjs.com.cn/mobile/lib/vue/vue-2.4.1.min.js',
        '//pics.lvjs.com.cn/mobile/lib/vue/axios-0.16.2.min.js'
      ],
      css: [
        // 'https://pics.lvjs.com.cn/mobile/lib/css/common-3.0.css'
      ]
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {
      pattern: ['/ntrip', '/bullet', '/api', '/usso', '/h5', '/other'],
      options: {
        target: 'https://m.lvmama.com',
        changeOrigin: true,
        headers: {'signal': 'ab4494b2-f532-4f99-b57e-7ca121a137ca'},
        secure: false //不验证证书的安全性
      }
    },
    // proxyTable: {
    //     pattern: ['/ws'],
    //     options: {
    //         target: 'http://10.112.5.33:8082',
    //         changeOrigin: true,
    //         secure: false //不验证证书的安全性
    //     }
    // },

    // CSS Sourcemaps off by default because relative paths are "buggy"        // proxyTable: {
    //     pattern: ['/member', '/visitor'],
    //     options: {
    //         target: 'http://10.112.1.86:8082',
    //         changeOrigin: true,
    //         secure: false //不验证证书的安全性
    //     }
    // },
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}