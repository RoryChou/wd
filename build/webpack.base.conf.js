const path = require('path')
// var utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('busi/weshop')
    }
  },
  module: {
    rules: [
      // {
      //  test: /\.(js|vue)$/,
      //  loader: 'eslint-loader',
      //  enforce: 'pre',
      //  include: [resolve('busi'), resolve('test')],
      //  options: {
      //    formatter: require('eslint-friendly-formatter')
      //  }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('busi'), resolve('test')]
      }
    ]
  },
  plugins: []
}
